import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import Card from '../components/Card';
import { Utensils, Plus, Flame, Search, ThumbsUp, ThumbsDown, Star } from 'lucide-react';
import { foodDatabase } from '../data/foodDatabase';

const CalorieTracker = () => {
    const { dailyStats, addCaloriesEaten } = useHealth();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFood, setSelectedFood] = useState(null);
    const [showResults, setShowResults] = useState(false);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setShowResults(true);
        setSelectedFood(null);
    };

    const filteredFoods = foodDatabase.filter(food =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectFood = (food) => {
        setSelectedFood(food);
        setSearchTerm(food.name);
        setShowResults(false);
    };

    const handleAddFood = () => {
        if (!selectedFood) return;
        addCaloriesEaten(selectedFood.calories, selectedFood.name);
        setSearchTerm('');
        setSelectedFood(null);
    };

    const remaining = 2000 - dailyStats.caloriesEaten;
    const progress = Math.min((dailyStats.caloriesEaten / 2000) * 100, 100);

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Smart Calorie Tracker
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Search for foods to get instant nutritional insights.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Summary Card */}
                <Card className="md:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Daily Summary</h2>
                            <p className="text-slate-500">Goal: 2000 kcal</p>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                                {remaining}
                            </p>
                            <p className="text-sm text-slate-500">kcal remaining</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-500 ${progress > 100 ? 'bg-red-500' : 'bg-primary-500'
                                    }`}
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                                <Utensils size={20} className="text-green-600 dark:text-green-400" />
                                <span className="font-medium text-green-900 dark:text-green-100">Eaten</span>
                            </div>
                            <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                                {dailyStats.caloriesEaten}
                            </p>
                        </div>
                        <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                                <Flame size={20} className="text-orange-600 dark:text-orange-400" />
                                <span className="font-medium text-orange-900 dark:text-orange-100">Burned</span>
                            </div>
                            <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                                {dailyStats.caloriesBurned}
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Smart Food Search */}
                <Card title="Add Food">
                    <div className="relative mb-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                                placeholder="Search food (e.g. Panipuri)..."
                                className="input-field pl-10"
                            />
                        </div>

                        {showResults && searchTerm && (
                            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                                {filteredFoods.length > 0 ? (
                                    filteredFoods.map(food => (
                                        <button
                                            key={food.id}
                                            onClick={() => handleSelectFood(food)}
                                            className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                        >
                                            <div className="font-medium text-slate-900 dark:text-white">{food.name}</div>
                                            <div className="text-xs text-slate-500">{food.calories} kcal • {food.type}</div>
                                        </button>
                                    ))
                                ) : (
                                    <div className="p-4 text-sm text-slate-500 text-center">No foods found. Try 'Apple' or 'Rice'.</div>
                                )}
                            </div>
                        )}
                    </div>

                    {selectedFood && (
                        <div className="animate-fade-in space-y-4">
                            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">{selectedFood.name}</h3>
                                    <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${selectedFood.type === 'veg' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                        {selectedFood.type}
                                    </span>
                                </div>

                                <div className="flex items-center gap-1 mb-3">
                                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                    <span className="text-sm font-medium">{selectedFood.rating}/10 Taste</span>
                                    <span className="text-slate-300 mx-2">|</span>
                                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Health Score: {selectedFood.healthScore}/10</span>
                                </div>

                                <div className="grid grid-cols-3 gap-2 text-center text-xs mb-4">
                                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg">
                                        <div className="text-slate-500">Protein</div>
                                        <div className="font-semibold">{selectedFood.protein}</div>
                                    </div>
                                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg">
                                        <div className="text-slate-500">Carbs</div>
                                        <div className="font-semibold">{selectedFood.carbs}</div>
                                    </div>
                                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg">
                                        <div className="text-slate-500">Fat</div>
                                        <div className="font-semibold">{selectedFood.fat}</div>
                                    </div>
                                </div>

                                <div className="space-y-3 text-sm">
                                    <div>
                                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium mb-1">
                                            <ThumbsUp size={14} /> Advantages
                                        </div>
                                        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 pl-1">
                                            {selectedFood.advantages.slice(0, 2).map((adv, i) => (
                                                <li key={i}>{adv}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 text-red-500 dark:text-red-400 font-medium mb-1">
                                            <ThumbsDown size={14} /> Disadvantages
                                        </div>
                                        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 pl-1">
                                            {selectedFood.disadvantages.slice(0, 2).map((dis, i) => (
                                                <li key={i}>{dis}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <button onClick={handleAddFood} className="w-full btn-primary">
                                <Plus size={20} /> Add {selectedFood.calories} kcal
                            </button>
                        </div>
                    )}
                </Card>
            </div>

            {/* Food Log */}
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Today's Log</h3>
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                {dailyStats.foodLog && dailyStats.foodLog.length > 0 ? (
                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {dailyStats.foodLog.map((entry, index) => (
                            <div key={index} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-white">{entry.food}</p>
                                    <p className="text-xs text-slate-500">{entry.time}</p>
                                </div>
                                <span className="font-semibold text-slate-700 dark:text-slate-300">
                                    {entry.calories} kcal
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center text-slate-500">
                        No food entries yet today.
                    </div>
                )}
            </div>
        </div>
    );
};

export default CalorieTracker;
