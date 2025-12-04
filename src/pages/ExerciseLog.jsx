import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import Card from '../components/Card';
import { Dumbbell, Timer, Flame, Plus } from 'lucide-react';

const ACTIVITIES = [
    { id: 'walk', name: 'Walking', caloriesPerMin: 4 },
    { id: 'run', name: 'Running', caloriesPerMin: 11.5 },
    { id: 'yoga', name: 'Yoga', caloriesPerMin: 3 },
    { id: 'gym', name: 'Gym Workout', caloriesPerMin: 6 },
    { id: 'cycle', name: 'Cycling', caloriesPerMin: 7.5 },
    { id: 'swim', name: 'Swimming', caloriesPerMin: 8.5 },
];

const ExerciseLog = () => {
    const { addCaloriesBurned } = useHealth();
    const [selectedActivity, setSelectedActivity] = useState(ACTIVITIES[0].id);
    const [duration, setDuration] = useState('');

    const handleLogExercise = (e) => {
        e.preventDefault();
        if (!duration) return;

        const activity = ACTIVITIES.find(a => a.id === selectedActivity);
        const burned = Math.round(activity.caloriesPerMin * parseInt(duration));

        addCaloriesBurned(burned);
        setDuration('');
        alert(`Great job! You burned approximately ${burned} calories.`);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Exercise Log
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Record your workouts and track calories burned.
                </p>
            </header>

            <Card>
                <form onSubmit={handleLogExercise} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Activity Type
                            </label>
                            <div className="space-y-2">
                                {ACTIVITIES.map((activity) => (
                                    <label
                                        key={activity.id}
                                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${selectedActivity === activity.id
                                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 ring-1 ring-primary-500'
                                                : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="activity"
                                                value={activity.id}
                                                checked={selectedActivity === activity.id}
                                                onChange={(e) => setSelectedActivity(e.target.value)}
                                                className="text-primary-600 focus:ring-primary-500"
                                            />
                                            <span className="font-medium text-slate-900 dark:text-white">
                                                {activity.name}
                                            </span>
                                        </div>
                                        <span className="text-xs text-slate-500">
                                            ~{activity.caloriesPerMin} kcal/min
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Duration (minutes)
                                </label>
                                <div className="relative">
                                    <Timer className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type="number"
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                        placeholder="e.g. 30"
                                        className="input-field pl-10"
                                        min="1"
                                    />
                                </div>
                            </div>

                            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Flame className="text-orange-500" size={20} />
                                    <span className="font-medium text-orange-900 dark:text-orange-100">Estimated Burn</span>
                                </div>
                                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                                    {duration ? Math.round(ACTIVITIES.find(a => a.id === selectedActivity).caloriesPerMin * parseInt(duration)) : 0}
                                    <span className="text-sm font-normal text-orange-800 dark:text-orange-300 ml-1">kcal</span>
                                </div>
                            </div>

                            <button type="submit" className="w-full btn-primary">
                                <Plus size={20} /> Log Workout
                            </button>
                        </div>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default ExerciseLog;
