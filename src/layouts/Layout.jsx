import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useHealth } from '../context/HealthContext';
import {
    LayoutDashboard,
    Activity,
    Utensils,
    Droplets,
    Moon,
    Dumbbell,
    Stethoscope,
    Heart,
    User,
    BarChart2,
    Sun,
    Menu,
    X,
    Bot
} from 'lucide-react';

const Layout = ({ children }) => {
    const { darkMode, setDarkMode } = useHealth();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const navItems = [
        { path: '/', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/assistant', label: 'AI Assistant', icon: Bot },
        { path: '/bmi', label: 'BMI', icon: Activity },
        { path: '/calories', label: 'Calories', icon: Utensils },
        { path: '/water', label: 'Water', icon: Droplets },
        { path: '/sleep', label: 'Sleep', icon: Moon },
        { path: '/exercise', label: 'Exercise', icon: Dumbbell },
        { path: '/symptoms', label: 'Symptoms', icon: Stethoscope },
        { path: '/heart', label: 'Heart Rate', icon: Heart },
        { path: '/activity', label: 'Activity', icon: BarChart2 },
        { path: '/profile', label: 'Profile', icon: User },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold">
                                H
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                                HealthTrack
                            </span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-1">
                            {navItems.slice(0, 6).map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`p-2 rounded-lg transition-colors ${isActive(item.path)
                                            ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                        }`}
                                    title={item.label}
                                >
                                    <item.icon size={20} />
                                </Link>
                            ))}

                            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2" />

                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center gap-2">
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium transition-colors ${isActive(item.path)
                                            ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                        }`}
                                >
                                    <item.icon size={20} />
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {children}
            </main>
        </div>
    );
};

export default Layout;
