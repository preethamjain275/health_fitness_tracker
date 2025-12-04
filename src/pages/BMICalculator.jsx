import React, { useState, useEffect } from 'react';
import { useHealth } from '../context/HealthContext';
import Card from '../components/Card';
import { Activity, Info } from 'lucide-react';

const BMICalculator = () => {
    const { userProfile, setUserProfile, calculateBMI, getBMICategory } = useHealth();

    const [height, setHeight] = useState(userProfile.height);
    const [weight, setWeight] = useState(userProfile.weight);
    const [bmi, setBmi] = useState(0);
    const [category, setCategory] = useState('');

    useEffect(() => {
        const h = height / 100;
        const val = (weight / (h * h)).toFixed(1);
        setBmi(val);
        setCategory(getBMICategory(val));
    }, [height, weight]);

    const handleSave = () => {
        setUserProfile(prev => ({
            ...prev,
            height: parseFloat(height),
            weight: parseFloat(weight)
        }));
        alert('Profile updated successfully!');
    };

    const getSuggestion = (cat) => {
        switch (cat) {
            case 'Underweight': return "You should aim to gain some weight through a balanced diet rich in protein and healthy fats.";
            case 'Normal': return "Great job! Maintain your current lifestyle with regular exercise and a balanced diet.";
            case 'Overweight': return "Consider increasing physical activity and monitoring your calorie intake to reach a healthier weight.";
            case 'Obese': return "It's recommended to consult a healthcare provider for a personalized plan to improve your health.";
            default: return "";
        }
    };

    const getIdealWeightRange = (h) => {
        const min = (18.5 * (h / 100) * (h / 100)).toFixed(1);
        const max = (24.9 * (h / 100) * (h / 100)).toFixed(1);
        return `${min} - ${max} kg`;
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    BMI Calculator
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Calculate your Body Mass Index and check your health status.
                </p>
            </header>

            <Card className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Height (cm)
                        </label>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Weight (kg)
                        </label>
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="input-field"
                        />
                    </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 mb-6 text-center">
                    <p className="text-sm text-slate-500 mb-2">Your BMI is</p>
                    <div className="text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                        {bmi}
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${category === 'Normal'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                        {category}
                    </span>
                </div>

                <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                        <Info className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" size={20} />
                        <div>
                            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">Health Suggestion</h4>
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                                {getSuggestion(category)}
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center p-4 border border-slate-100 dark:border-slate-800 rounded-xl">
                        <span className="text-slate-600 dark:text-slate-400">Ideal Weight Range</span>
                        <span className="font-semibold text-slate-900 dark:text-white">
                            {getIdealWeightRange(height)}
                        </span>
                    </div>
                </div>

                <div className="mt-8">
                    <button onClick={handleSave} className="w-full btn-primary">
                        Update Profile
                    </button>
                </div>
            </Card>
        </div>
    );
};

export default BMICalculator;
