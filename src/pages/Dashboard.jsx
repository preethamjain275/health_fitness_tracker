import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHealth } from '../context/HealthContext';
import Card from '../components/Card';
import {
    Footprints,
    Droplets,
    Moon,
    Utensils,
    Flame,
    Activity,
    Heart,
    Lightbulb,
    Plus,
    ArrowRight
} from 'lucide-react';

const TIPS = [
    "Drink a glass of water first thing in the morning.",
    "Take a 10-minute walk after meals to aid digestion.",
    "Aim for 7-9 hours of sleep for optimal recovery.",
    "Eat more fiber-rich foods to stay full longer.",
    "Stretch daily to improve flexibility and reduce stress.",
    "Limit processed sugar intake for better energy levels.",
    "Practice deep breathing when you feel stressed.",
    "Stand up and move every hour if you have a desk job."
];

const Dashboard = () => {
    const {
        dailyStats,
        updateDailyStat,
        calculateBMI,
        getBMICategory,
        addWater
    } = useHealth();

    const [stepsInput, setStepsInput] = useState('');
    const [heartRateInput, setHeartRateInput] = useState('');
    const [tip] = useState(() => TIPS[Math.floor(Math.random() * TIPS.length)]);

    const handleAddSteps = (e) => {
        e.preventDefault();
        if (!stepsInput) return;
        updateDailyStat('steps', dailyStats.steps + parseInt(stepsInput));
        setStepsInput('');
    };

    const handleUpdateHeartRate = (e) => {
        e.preventDefault();
        if (!heartRateInput) return;
        updateDailyStat('heartRate', parseInt(heartRateInput));
        setHeartRateInput('');
    };

    const bmi = calculateBMI();
    const bmiCategory = getBMICategory(bmi);

    return (
        <div className="space-y-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Health Dashboard
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Track your daily progress and stay healthy.
                </p>
            </header>

            {/* Health Tip */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 text-white shadow-lg mb-8">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                        <Lightbulb size={24} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-1">Daily Health Tip</h3>
                        <p className="text-primary-50">{tip}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Steps */}
                <Card title="Steps" icon={Footprints}>
                    <div className="mb-4">
                        <span className="text-3xl font-bold text-slate-900 dark:text-white">
                            {dailyStats.steps.toLocaleString()}
                        </span>
                        <span className="text-sm text-slate-500 ml-2">steps</span>
                    </div>
                    <form onSubmit={handleAddSteps} className="flex gap-2">
                        <input
                            type="number"
                            value={stepsInput}
                            onChange={(e) => setStepsInput(e.target.value)}
                            placeholder="Add steps..."
                            className="input-field text-sm py-1"
                        />
                        <button type="submit" className="btn-primary p-2 rounded-lg">
                            <Plus size={16} />
                        </button>
                    </form>
                </Card>

                {/* Water */}
                <Card title="Water Intake" icon={Droplets}>
                    <div className="mb-4">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-3xl font-bold text-slate-900 dark:text-white">
                                {dailyStats.water}
                                <span className="text-lg text-slate-500 font-normal">/8</span>
                            </span>
                            <span className="text-sm text-slate-500">glasses</span>
                        </div>
                        <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min((dailyStats.water / 8) * 100, 100)}%` }}
                            />
                        </div>
                    </div>
                    <button onClick={addWater} className="w-full btn-secondary text-sm">
                        <Plus size={16} /> Add Glass
                    </button>
                </Card>

                {/* Calories */}
                <Card title="Calories" icon={Utensils}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <p className="text-xs text-slate-500 mb-1">Eaten</p>
                            <p className="text-xl font-bold text-green-600 dark:text-green-400">
                                {dailyStats.caloriesEaten}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 mb-1">Burned</p>
                            <p className="text-xl font-bold text-orange-600 dark:text-orange-400">
                                {dailyStats.caloriesBurned}
                            </p>
                        </div>
                    </div>
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                        <p className="text-sm text-slate-600 dark:text-slate-400 flex justify-between">
                            <span>Net:</span>
                            <span className="font-semibold">
                                {dailyStats.caloriesEaten - dailyStats.caloriesBurned} kcal
                            </span>
                        </p>
                    </div>
                </Card>

                {/* Sleep */}
                <Card title="Sleep" icon={Moon}>
                    <div className="mb-4">
                        <span className="text-3xl font-bold text-slate-900 dark:text-white">
                            {dailyStats.sleep}
                        </span>
                        <span className="text-sm text-slate-500 ml-2">hours</span>
                    </div>
                    <Link to="/sleep" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
                        Manage Sleep <ArrowRight size={14} />
                    </Link>
                </Card>

                {/* BMI */}
                <Card title="BMI" icon={Activity}>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-3xl font-bold text-slate-900 dark:text-white">
                            {bmi}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${bmiCategory === 'Normal'
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                            }`}>
                            {bmiCategory}
                        </span>
                    </div>
                    <Link to="/bmi" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
                        View Details <ArrowRight size={14} />
                    </Link>
                </Card>

                {/* Heart Rate */}
                <Card title="Heart Rate" icon={Heart}>
                    <div className="mb-4">
                        <span className="text-3xl font-bold text-slate-900 dark:text-white">
                            {dailyStats.heartRate}
                        </span>
                        <span className="text-sm text-slate-500 ml-2">bpm</span>
                    </div>
                    <form onSubmit={handleUpdateHeartRate} className="flex gap-2">
                        <input
                            type="number"
                            value={heartRateInput}
                            onChange={(e) => setHeartRateInput(e.target.value)}
                            placeholder="Update..."
                            className="input-field text-sm py-1"
                        />
                        <button type="submit" className="btn-primary p-2 rounded-lg">
                            <Activity size={16} />
                        </button>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
