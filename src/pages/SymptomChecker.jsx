import React, { useState } from 'react';
import Card from '../components/Card';
import { Stethoscope, AlertCircle, CheckCircle2 } from 'lucide-react';

const SYMPTOMS = [
    "Headache",
    "Fever",
    "Cough",
    "Fatigue",
    "Sore Throat",
    "Nausea",
    "Muscle Pain",
    "Dizziness"
];

const SymptomChecker = () => {
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [showAdvice, setShowAdvice] = useState(false);

    const toggleSymptom = (symptom) => {
        setSelectedSymptoms(prev =>
            prev.includes(symptom)
                ? prev.filter(s => s !== symptom)
                : [...prev, symptom]
        );
        setShowAdvice(false);
    };

    const handleCheck = () => {
        if (selectedSymptoms.length === 0) return;
        setShowAdvice(true);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Symptom Checker
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Select your symptoms to get general health advice.
                </p>
            </header>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4 flex gap-3">
                <AlertCircle className="text-blue-600 dark:text-blue-400 flex-shrink-0" size={24} />
                <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Disclaimer:</strong> This tool provides general advice only and is not a substitute for professional medical diagnosis or treatment. If you have severe symptoms, please consult a doctor immediately.
                </p>
            </div>

            <Card title="What are you feeling?">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    {SYMPTOMS.map((symptom) => (
                        <button
                            key={symptom}
                            onClick={() => toggleSymptom(symptom)}
                            className={`p-3 rounded-xl text-sm font-medium transition-all ${selectedSymptoms.includes(symptom)
                                    ? 'bg-primary-600 text-white shadow-md transform scale-105'
                                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                                }`}
                        >
                            {symptom}
                        </button>
                    ))}
                </div>
                <button
                    onClick={handleCheck}
                    disabled={selectedSymptoms.length === 0}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Check Symptoms
                </button>
            </Card>

            {showAdvice && (
                <div className="animate-fade-in">
                    <Card className="border-l-4 border-l-green-500">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
                                <CheckCircle2 size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                    General Advice
                                </h3>
                                <ul className="space-y-2 text-slate-600 dark:text-slate-300 list-disc list-inside">
                                    <li>Stay hydrated by drinking plenty of water.</li>
                                    <li>Get adequate rest to help your body recover.</li>
                                    <li>Monitor your temperature if you have a fever.</li>
                                    <li>Avoid self-medication without consulting a pharmacist.</li>
                                    <li>If symptoms persist for more than 3 days, see a doctor.</li>
                                </ul>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default SymptomChecker;
