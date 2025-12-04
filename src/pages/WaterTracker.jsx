import React from 'react';
import { useHealth } from '../context/HealthContext';
import Card from '../components/Card';
import { Droplets, Plus, RefreshCw } from 'lucide-react';

const WaterTracker = () => {
    const { dailyStats, addWater, resetWater } = useHealth();

    const percentage = Math.min((dailyStats.water / 8) * 100, 100);

    return (
        <div className="max-w-2xl mx-auto text-center space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Hydration Tracker
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Daily Goal: 8 Glasses (2 Liters)
                </p>
            </header>

            <div className="relative w-64 h-64 mx-auto">
                {/* Circular Progress */}
                <div className="absolute inset-0 rounded-full border-8 border-slate-100 dark:border-slate-800"></div>
                <div
                    className="absolute inset-0 rounded-full border-8 border-blue-500 transition-all duration-1000 ease-out"
                    style={{
                        clipPath: `inset(${100 - percentage}% 0 0 0)`
                    }}
                ></div>

                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Droplets size={48} className="text-blue-500 mb-2" />
                    <span className="text-5xl font-bold text-slate-900 dark:text-white">
                        {dailyStats.water}
                    </span>
                    <span className="text-slate-500">/ 8 glasses</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <button
                    onClick={addWater}
                    disabled={dailyStats.water >= 8}
                    className="btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Plus size={24} /> Drink Water
                </button>
                <button
                    onClick={resetWater}
                    className="btn-secondary py-4 text-lg"
                >
                    <RefreshCw size={24} /> Reset
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Hydration</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                        Boosts energy and relieves fatigue.
                    </p>
                </Card>
                <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Skin Health</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                        Promotes healthy and glowing skin.
                    </p>
                </Card>
                <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Digestion</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                        Aids in digestion and nutrient absorption.
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default WaterTracker;
