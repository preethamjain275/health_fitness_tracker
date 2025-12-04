import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import { useHealth } from '../context/HealthContext';
import Card from '../components/Card';

const WeeklyActivity = () => {
    const { dailyStats } = useHealth();

    // Generate mock data for the last 6 days + today
    const generateWeeklyData = () => {
        const data = [];
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const today = new Date();

        for (let i = 6; i > 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            data.push({
                name: days[d.getDay()],
                steps: Math.floor(Math.random() * 5000) + 3000,
                calories: Math.floor(Math.random() * 500) + 1500,
                burned: Math.floor(Math.random() * 300) + 200,
            });
        }

        // Add today's real data
        data.push({
            name: 'Today',
            steps: dailyStats.steps,
            calories: dailyStats.caloriesEaten,
            burned: dailyStats.caloriesBurned,
        });

        return data;
    };

    const data = generateWeeklyData();

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Weekly Activity
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Visual insights into your health trends over the last 7 days.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Steps Chart */}
                <Card title="Steps Overview">
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                                <YAxis stroke="#64748b" fontSize={12} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        borderRadius: '8px',
                                        border: 'none',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                    }}
                                />
                                <Legend />
                                <Bar dataKey="steps" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Steps" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Calories Chart */}
                <Card title="Calories Analysis">
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorBurned" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                                <YAxis stroke="#64748b" fontSize={12} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        borderRadius: '8px',
                                        border: 'none',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                    }}
                                />
                                <Legend />
                                <Area
                                    type="monotone"
                                    dataKey="calories"
                                    stroke="#22c55e"
                                    fillOpacity={1}
                                    fill="url(#colorCalories)"
                                    name="Calories Eaten"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="burned"
                                    stroke="#f97316"
                                    fillOpacity={1}
                                    fill="url(#colorBurned)"
                                    name="Calories Burned"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default WeeklyActivity;
