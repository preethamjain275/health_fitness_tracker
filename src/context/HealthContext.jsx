import React, { createContext, useContext, useState, useEffect } from 'react';

const HealthContext = createContext();

export const useHealth = () => useContext(HealthContext);

export const HealthProvider = ({ children }) => {
    // Initialize state from localStorage or defaults
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        return saved ? JSON.parse(saved) : false;
    });

    const [userProfile, setUserProfile] = useState(() => {
        const saved = localStorage.getItem('userProfile');
        return saved ? JSON.parse(saved) : {
            name: 'User',
            age: 25,
            weight: 70, // kg
            height: 175, // cm
            gender: 'male',
            diet: 'veg', // 'veg' or 'non-veg'
            goal: 'maintain' // 'lose', 'gain', 'maintain'
        };
    });

    const [dailyStats, setDailyStats] = useState(() => {
        const saved = localStorage.getItem('dailyStats');
        const today = new Date().toDateString();

        if (saved) {
            const parsed = JSON.parse(saved);
            // Reset if it's a new day
            if (parsed.date !== today) {
                return {
                    date: today,
                    steps: 0,
                    water: 0, // glasses
                    sleep: 0, // hours
                    caloriesEaten: 0,
                    caloriesBurned: 0,
                    heartRate: 72,
                    mood: 'neutral',
                    symptoms: [],
                    foodLog: []
                };
            }
            return parsed;
        }

        return {
            date: today,
            steps: 0,
            water: 0,
            sleep: 0,
            caloriesEaten: 0,
            caloriesBurned: 0,
            heartRate: 72,
            mood: 'neutral',
            symptoms: [],
            foodLog: []
        };
    });

    // Persist state to localStorage
    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    useEffect(() => {
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
    }, [userProfile]);

    useEffect(() => {
        localStorage.setItem('dailyStats', JSON.stringify(dailyStats));
    }, [dailyStats]);

    // Helper functions
    const updateDailyStat = (key, value) => {
        setDailyStats(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const addWater = () => {
        if (dailyStats.water < 8) {
            updateDailyStat('water', dailyStats.water + 1);
        }
    };

    const resetWater = () => {
        updateDailyStat('water', 0);
    };

    const addCaloriesEaten = (amount, foodName = 'Manual Entry') => {
        const newLog = [...(dailyStats.foodLog || []), { food: foodName, calories: parseInt(amount), time: new Date().toLocaleTimeString() }];
        setDailyStats(prev => ({
            ...prev,
            caloriesEaten: prev.caloriesEaten + parseInt(amount),
            foodLog: newLog
        }));
    };

    const addCaloriesBurned = (amount) => {
        updateDailyStat('caloriesBurned', dailyStats.caloriesBurned + parseInt(amount));
    };

    const calculateBMI = () => {
        const heightInMeters = userProfile.height / 100;
        return (userProfile.weight / (heightInMeters * heightInMeters)).toFixed(1);
    };

    const getBMICategory = (bmi) => {
        if (bmi < 18.5) return 'Underweight';
        if (bmi < 25) return 'Normal';
        if (bmi < 30) return 'Overweight';
        return 'Obese';
    };

    return (
        <HealthContext.Provider value={{
            darkMode,
            setDarkMode,
            userProfile,
            setUserProfile,
            dailyStats,
            updateDailyStat,
            addWater,
            resetWater,
            addCaloriesEaten,
            addCaloriesBurned,
            calculateBMI,
            getBMICategory
        }}>
            {children}
        </HealthContext.Provider>
    );
};
