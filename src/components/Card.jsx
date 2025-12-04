import React from 'react';

const Card = ({ children, className = '', title, icon: Icon, action }) => {
    return (
        <div className={`card ${className}`}>
            {(title || Icon || action) && (
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        {Icon && (
                            <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
                                <Icon size={20} />
                            </div>
                        )}
                        {title && <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{title}</h3>}
                    </div>
                    {action && <div>{action}</div>}
                </div>
            )}
            {children}
        </div>
    );
};

export default Card;
