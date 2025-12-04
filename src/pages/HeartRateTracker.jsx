import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import Card from '../components/Card';
import { Heart, Activity } from 'lucide-react';

const HeartRateTracker = () => {
    const { dailyStats, updateDailyStat } = useHealth();
    const [bpm, setBpm] = useState('');

    const handleUpdate = (e) => {
        e.preventDefault();
        if (!bpm) return;
        updateDailyStat('heartRate', parseInt(bpm));
        setBpm('');
    };

    const getStatus = (rate) => {
        if (rate < 60) return { label: "Low (Bradycardia)", color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30" };
        if (rate <= 100) return { label: "Normal", color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/30" };
        return { label: "High (Tachycardia)", color: "text-red-500", bg: "bg-red-100 dark:bg-red-900/30" };
    };

    const status = getStatus(dailyStats.heartRate);

    return (
        <div className="max-w-xl mx-auto space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Heart Rate Monitor
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Track your resting heart rate.
                </p>
            </header>

            <Card className="text-center py-10">
                <div className="relative inline-block mb-6">
                    <Heart
                        size={80}
                        className={`text-red-500 ${dailyStats.heartRate > 100 ? 'animate-pulse' : ''}`}
                        fill={dailyStats.heartRate > 100 ? "currentColor" : "none"}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Activity size={32} className="text-white" />
                    </div>
                </div>

                <div className="text-6xl font-bold text-slate-900 dark:text-white mb-2">
                    {dailyStats.heartRate}
                    <span className="text-xl font-normal text-slate-500 ml-2">BPM</span>
                </div>

                <div className={`inline-block px-4 py-2 rounded-full font-medium mb-8 ${status.color} ${status.bg}`}>
                    {status.label}
                </div>

                <form onSubmit={handleUpdate} className="max-w-xs mx-auto flex gap-2">
                    <input
                        type="number"
                        value={bpm}
                        onChange={(e) => setBpm(e.target.value)}
                        placeholder="Enter BPM"
                        className="input-field"
                    />
                    <button type="submit" className="btn-primary">
                        Update
                    </button>
                </form>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-sm">
                <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div className="font-semibold text-slate-900 dark:text-white mb-1">Low</div>
                    <div className="text-blue-500">&lt; 60 BPM</div>
                </div>
                <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div className="font-semibold text-slate-900 dark:text-white mb-1">Normal</div>
                    <div className="text-green-500">60 - 100 BPM</div>
                </div>
                <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div className="font-semibold text-slate-900 dark:text-white mb-1">High</div>
                    <div className="text-red-500">&gt; 100 BPM</div>
                </div>
            </div>
        </div>
    );
};

export default HeartRateTracker;
