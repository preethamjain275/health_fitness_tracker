import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import Card from '../components/Card';
import { Moon, Sun, Clock } from 'lucide-react';

const SleepMonitor = () => {
    const { dailyStats, updateDailyStat } = useHealth();
    const [sleepTime, setSleepTime] = useState('');
    const [wakeTime, setWakeTime] = useState('');

    const calculateSleep = (e) => {
        e.preventDefault();
        if (!sleepTime || !wakeTime) return;

        const start = new Date(`2000/01/01 ${sleepTime}`);
        const end = new Date(`2000/01/01 ${wakeTime}`);

        // Handle overnight sleep (e.g. 11 PM to 7 AM)
        if (end < start) {
            end.setDate(end.getDate() + 1);
        }

        const diffMs = end - start;
        const diffHrs = (diffMs / (1000 * 60 * 60)).toFixed(1);

        updateDailyStat('sleep', parseFloat(diffHrs));
    };

    const getSleepQuality = (hours) => {
        if (hours < 5) return { text: "Poor", color: "text-red-500", advice: "Try to get more rest. Lack of sleep affects health." };
        if (hours < 7) return { text: "Fair", color: "text-yellow-500", advice: "You're close to the target. Aim for 7-9 hours." };
        if (hours <= 9) return { text: "Good", color: "text-green-500", advice: "Great job! This is the optimal sleep duration." };
        return { text: "Oversleeping", color: "text-orange-500", advice: "Too much sleep can also make you feel groggy." };
    };

    const quality = getSleepQuality(dailyStats.sleep);

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Sleep Monitor
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Track your sleep cycles and improve rest quality.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="Log Sleep">
                    <form onSubmit={calculateSleep} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Bedtime
                            </label>
                            <div className="relative">
                                <Moon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="time"
                                    value={sleepTime}
                                    onChange={(e) => setSleepTime(e.target.value)}
                                    className="input-field pl-10"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Wake Up Time
                            </label>
                            <div className="relative">
                                <Sun className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="time"
                                    value={wakeTime}
                                    onChange={(e) => setWakeTime(e.target.value)}
                                    className="input-field pl-10"
                                />
                            </div>
                        </div>
                        <button type="submit" className="w-full btn-primary">
                            Calculate Duration
                        </button>
                    </form>
                </Card>

                <Card title="Sleep Analysis">
                    <div className="text-center py-6">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 mb-4">
                            <Clock size={32} />
                        </div>
                        <div className="text-4xl font-bold text-slate-900 dark:text-white mb-1">
                            {dailyStats.sleep}
                            <span className="text-lg font-normal text-slate-500 ml-1">hrs</span>
                        </div>
                        <p className={`font-medium ${quality.color} mb-4`}>
                            {quality.text} Quality
                        </p>
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 text-sm text-slate-600 dark:text-slate-300">
                            {quality.advice}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default SleepMonitor;
