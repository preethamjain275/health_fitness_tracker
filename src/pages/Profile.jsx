import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import Card from '../components/Card';
import { User, Save } from 'lucide-react';

const Profile = () => {
    const { userProfile, setUserProfile } = useHealth();
    const [formData, setFormData] = useState(userProfile);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'name' || name === 'gender' ? value : parseFloat(value)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setUserProfile(formData);
        alert('Profile saved successfully!');
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Your Profile
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Manage your personal information and health metrics.
                </p>
            </header>

            <Card>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-center mb-6">
                        <div className="w-24 h-24 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400">
                            <User size={48} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="input-field"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Gender
                            </label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="input-field"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Age
                            </label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className="input-field"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Height (cm)
                            </label>
                            <input
                                type="number"
                                name="height"
                                value={formData.height}
                                onChange={handleChange}
                                className="input-field"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Weight (kg)
                            </label>
                            <input
                                type="number"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                className="input-field"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button type="submit" className="w-full btn-primary">
                            <Save size={20} /> Save Changes
                        </button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default Profile;
