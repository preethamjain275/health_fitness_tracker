import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import Card from '../components/Card';
import { Bot, Sparkles, HeartPulse, Leaf, AlertTriangle, Search } from 'lucide-react';
import { remediesDatabase, healthTips } from '../data/remediesDatabase';

const HealthAssistant = () => {
    const { userProfile, setUserProfile } = useHealth();
    const [activeTab, setActiveTab] = useState('remedies'); // 'remedies', 'tips', 'profile'
    const [symptomSearch, setSymptomSearch] = useState('');

    const handleProfileUpdate = (key, value) => {
        setUserProfile(prev => ({ ...prev, [key]: value }));
    };

    const filteredRemedies = remediesDatabase.filter(r =>
        r.symptoms.some(s => s.toLowerCase().includes(symptomSearch.toLowerCase())) ||
        r.id.includes(symptomSearch.toLowerCase())
    );

    const getPersonalizedTips = () => {
        let tips = [...healthTips.general];
        if (userProfile.goal === 'lose') tips = [...tips, ...healthTips.weight_loss];
        if (userProfile.goal === 'gain') tips = [...tips, ...healthTips.weight_gain];
        return tips;
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <header className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none">
                    <Bot size={32} className="text-white" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                        AI Health Assistant
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Smart remedies, personalized tips, and holistic guidance.
                    </p>
                </div>
            </header>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {[
                    { id: 'remedies', label: 'Home Remedies', icon: Leaf },
                    { id: 'tips', label: 'Smart Tips', icon: Sparkles },
                    { id: 'profile', label: 'My Preferences', icon: HeartPulse },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                            }`}
                    >
                        <tab.icon size={18} />
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="animate-fade-in">
                {activeTab === 'remedies' && (
                    <div className="space-y-6">
                        <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none">
                            <h2 className="text-xl font-bold mb-2">Natural Healing</h2>
                            <p className="text-indigo-100 mb-6">
                                Find safe, effective home remedies for common ailments without medicines.
                            </p>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="text"
                                    value={symptomSearch}
                                    onChange={(e) => setSymptomSearch(e.target.value)}
                                    placeholder="Describe your problem (e.g., 'dandruff', 'ear pain', 'headache')..."
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                                />
                            </div>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {symptomSearch && filteredRemedies.map(remedy => (
                                <Card key={remedy.id} className="border-l-4 border-l-indigo-500">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white capitalize mb-4">
                                        {remedy.id.replace('_', ' ')}
                                    </h3>

                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2 flex items-center gap-2">
                                                <Leaf size={16} /> Natural Remedies
                                            </h4>
                                            <ul className="space-y-2">
                                                {remedy.remedies.map((r, i) => (
                                                    <li key={i} className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
                                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                                                        {r}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                                            <h4 className="text-xs font-bold text-yellow-700 dark:text-yellow-400 uppercase mb-1">
                                                Dietary Tip
                                            </h4>
                                            <p className="text-sm text-yellow-800 dark:text-yellow-200">
                                                {remedy.dietary_tips}
                                            </p>
                                        </div>

                                        <div className="flex items-start gap-2 text-xs text-slate-400 italic">
                                            <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
                                            {remedy.warning}
                                        </div>
                                    </div>
                                </Card>
                            ))}

                            {symptomSearch && filteredRemedies.length === 0 && (
                                <div className="col-span-full text-center py-12 text-slate-500">
                                    No remedies found for "{symptomSearch}". Try searching for "dandruff", "ear pain", or "stomach pain".
                                </div>
                            )}

                            {!symptomSearch && (
                                <div className="col-span-full text-center py-12">
                                    <div className="inline-flex p-4 bg-slate-100 dark:bg-slate-800 rounded-full mb-4">
                                        <Search size={32} className="text-slate-400" />
                                    </div>
                                    <p className="text-slate-500">Type a symptom above to see magic remedies!</p>
                                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                                        {['Dandruff', 'Ear Pain', 'Headache', 'Stomach Pain', 'Leg Pain'].map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs text-slate-500">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'tips' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {getPersonalizedTips().map((tip, index) => (
                                <Card key={index} className="hover:shadow-md transition-shadow">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl text-green-600 dark:text-green-400">
                                            <Sparkles size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                                                Smart Tip #{index + 1}
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                                {tip}
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'profile' && (
                    <Card title="Customize Your AI Assistant">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                                    Dietary Preference
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    {['veg', 'non-veg'].map(type => (
                                        <button
                                            key={type}
                                            onClick={() => handleProfileUpdate('diet', type)}
                                            className={`p-4 rounded-xl border-2 transition-all capitalize ${userProfile.diet === type
                                                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                                                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                                                }`}
                                        >
                                            {type === 'veg' ? 'Vegetarian 🌱' : 'Non-Vegetarian 🍗'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                                    Health Goal
                                </label>
                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        { id: 'lose', label: 'Lose Weight', icon: '📉' },
                                        { id: 'maintain', label: 'Maintain', icon: '⚖️' },
                                        { id: 'gain', label: 'Gain Weight', icon: '📈' },
                                    ].map(goal => (
                                        <button
                                            key={goal.id}
                                            onClick={() => handleProfileUpdate('goal', goal.id)}
                                            className={`p-4 rounded-xl border-2 transition-all ${userProfile.goal === goal.id
                                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                                                }`}
                                        >
                                            <div className="text-2xl mb-2">{goal.icon}</div>
                                            <div className="font-medium">{goal.label}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default HealthAssistant;
