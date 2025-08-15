import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    MessageCircle, Phone, Facebook, Check, AlertTriangle, Loader2,
    Copy, CheckCircle, ExternalLink, ChevronLeft, X, Upload
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext.jsx';

const PlaceCard = ({ place, onUpdateStatus, onSendMessage }) => {
    const { getAnimationClass, isRTL, getRTLClass } = useTheme();
    const [copiedPhone, setCopiedPhone] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedPhone(true);
            setTimeout(() => setCopiedPhone(false), 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    const getStatusConfig = (status) => {
        const configs = {
            connected: {
                bg: 'bg-light-success-50 dark:bg-dark-success-200/10',
                text: 'text-light-success-700 dark:text-dark-success-400',
                border: 'border-light-success-200 dark:border-dark-success-600/30',
                label: 'متصل',
                glow: 'shadow-light-success-500/10 dark:shadow-dark-success-500/20'
            },
            unsupported: {
                bg: 'bg-light-error-50 dark:bg-dark-error-200/10',
                text: 'text-light-error-700 dark:text-dark-error-400',
                border: 'border-light-error-200 dark:border-dark-error-600/30',
                label: 'غير مدعوم',
                glow: 'shadow-light-error-500/10 dark:shadow-dark-error-500/20'
            },
            not_connected: {
                bg: 'bg-light-warning-50 dark:bg-dark-warning-200/10',
                text: 'text-light-warning-700 dark:text-dark-warning-400',
                border: 'border-light-warning-200 dark:border-dark-warning-600/30',
                label: 'غير متصل',
                glow: 'shadow-light-warning-500/10 dark:shadow-dark-warning-500/20'
            }
        };
        return configs[status] || configs.not_connected;
    };

    const statusConfig = getStatusConfig(place.status);

    return (
        <article
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
                group relative bg-surface-primary border border-light dark:border-dark-border-light
                rounded-3xl overflow-hidden transition-all duration-500 ease-out-quart
                hover:scale-102 hover:shadow-medium ${statusConfig.glow}
                backdrop-blur-sm ${getAnimationClass('animate-fade-in-up')}
            `}
            role="article"
            aria-labelledby={`place-name-${place.id}`}
        >
            {/* Status Indicator */}
            <div className={`
                absolute top-4 ${getRTLClass('left-4', 'right-4')} 
                flex items-center gap-2 px-3 py-1.5 rounded-full text-sm 
                ${statusConfig.bg} ${statusConfig.text} border ${statusConfig.border}
                backdrop-blur-sm transition-all duration-300
            `}>
                <span className="w-2 h-2 rounded-full bg-current animate-pulse-soft" />
                <span className="font-medium">{statusConfig.label}</span>
            </div>

            {/* Main Content */}
            <div className="relative p-6 space-y-6">
                {/* Header */}
                <div className="space-y-4 pt-8">
                    <h3 
                        id={`place-name-${place.id}`}
                        className="font-semibold text-lg text-primary group-hover:text-light-primary-600 dark:group-hover:text-dark-primary-400 
                                   transition-colors duration-300 line-clamp-2"
                    >
                        {place.name}
                    </h3>

                    {/* Contact Info */}
                    <div className="space-y-3">
                        <button
                            onClick={() => copyToClipboard(place.phone)}
                            className="
                                flex items-center gap-3 w-full text-secondary 
                                bg-surface-secondary border border-light dark:border-dark-border-light
                                hover:bg-surface-tertiary px-4 py-3 rounded-2xl text-sm 
                                transition-all duration-300 group/phone relative overflow-hidden
                                focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
                            "
                            aria-label={`نسخ رقم الهاتف ${place.phone}`}
                            title="انقر لنسخ رقم الهاتف"
                        >
                            <Phone size={16} className="shrink-0" />
                            <span className={`font-mono flex-1 ${getRTLClass('text-left', 'text-right')}`}>
                                {place.phone}
                            </span>
                            <div className={`
                                absolute inset-0 bg-light-success-500/10 dark:bg-dark-success-500/10
                                transition-transform duration-500 ease-out
                                ${copiedPhone ? 'translate-x-0' : 'translate-x-full'}
                            `} />
                            {copiedPhone ? (
                                <CheckCircle size={16} className="text-light-success-600 dark:text-dark-success-400 shrink-0 relative" />
                            ) : (
                                <Copy size={16} className="opacity-0 group-hover/phone:opacity-100 transition-opacity relative" />
                            )}
                        </button>

                        {place.facebook_url && (
                            <a
                                href={place.facebook_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    flex items-center gap-3 text-light-primary-600 dark:text-dark-primary-400
                                    bg-light-primary-50 dark:bg-dark-primary-200/10 
                                    hover:bg-light-primary-100 dark:hover:bg-dark-primary-200/20 
                                    border border-light-primary-200 dark:border-dark-primary-600/30
                                    px-4 py-3 rounded-2xl text-sm transition-all duration-300 group/fb
                                    focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
                                "
                                aria-label="فتح صفحة الفيسبوك"
                            >
                                <Facebook size={16} className="shrink-0" />
                                <span className="truncate">صفحة الفيسبوك</span>
                                <ExternalLink size={14} className="opacity-0 group-hover/fb:opacity-100 transition-opacity" />
                            </a>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-light dark:border-dark-border-light">
                    {place.status === 'not_connected' && (
                        <>
                            <button
                                onClick={() => onUpdateStatus(place.id, 'connected')}
                                className="
                                    flex-1 bg-gradient-to-r from-light-success-500 to-light-success-600
                                    dark:from-dark-success-600 dark:to-dark-success-700
                                    text-white py-3 px-4 rounded-2xl flex items-center justify-center gap-2
                                    hover:from-light-success-400 hover:to-light-success-500
                                    dark:hover:from-dark-success-500 dark:hover:to-dark-success-600
                                    transition-all duration-300 shadow-soft hover:shadow-glow
                                    focus:outline-none focus:ring-2 focus:ring-light-success-500 dark:focus:ring-dark-success-500
                                    font-medium
                                "
                                aria-label="تحديد كمتصل"
                            >
                                <Check size={16} />
                                <span>متصل</span>
                            </button>
                            <button
                                onClick={() => onUpdateStatus(place.id, 'unsupported')}
                                className="
                                    flex-1 bg-surface-secondary border border-light dark:border-dark-border-light
                                    text-secondary hover:text-primary hover:bg-surface-tertiary
                                    py-3 px-4 rounded-2xl flex items-center justify-center gap-2
                                    transition-all duration-300 font-medium
                                    focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
                                "
                                aria-label="تحديد كغير مدعوم"
                            >
                                <X size={16} />
                                <span>غير مدعوم</span>
                            </button>
                        </>
                    )}
                    
                    {place.status === 'connected' && (
                        <button
                            onClick={() => onSendMessage(place)}
                            className="
                                w-full bg-gradient-to-r from-light-primary-500 to-light-primary-600
                                dark:from-dark-primary-600 dark:to-dark-primary-700
                                text-white py-3 px-4 rounded-2xl flex items-center justify-center gap-2
                                hover:from-light-primary-400 hover:to-light-primary-500
                                dark:hover:from-dark-primary-500 dark:hover:to-dark-primary-600
                                transition-all duration-300 shadow-soft hover:shadow-glow
                                focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
                                font-medium group/send
                            "
                            aria-label="إرسال رسالة واتساب"
                        >
                            <MessageCircle size={16} />
                            <span>إرسال رسالة</span>
                            <ChevronLeft 
                                size={16} 
                                className={`
                                    opacity-0 group-hover/send:opacity-100 transition-opacity
                                    ${isRTL ? 'rotate-180' : ''}
                                `}
                            />
                        </button>
                    )}
                </div>
            </div>
        </article>
    );
};

// Status Filter Component
const StatusFilter = ({ counts, activeStatus, onStatusChange }) => {
    const { getAnimationClass, getRTLClass } = useTheme();
    
    const statusOptions = [
        { key: 'not_connected', label: 'غير متصل', icon: AlertTriangle },
        { key: 'connected', label: 'متصل', icon: Check },
        { key: 'unsupported', label: 'غير مدعوم', icon: X }
    ];

    return (
        <div className={`flex gap-3 overflow-x-auto hide-scrollbar pb-2 ${getAnimationClass('animate-slide-in-right')}`}>
            {statusOptions.map(({ key, label, icon: Icon }) => (
                <button
                    key={key}
                    onClick={() => onStatusChange(key)}
                    className={`
                        flex items-center gap-3 px-6 py-3 rounded-2xl whitespace-nowrap
                        transition-all duration-300 ease-out-quart font-medium
                        focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
                        ${activeStatus === key
                            ? 'bg-gradient-to-r from-light-primary-500 to-light-primary-600 dark:from-dark-primary-600 dark:to-dark-primary-700 text-white shadow-soft'
                            : 'bg-surface-secondary border border-light dark:border-dark-border-light text-secondary hover:bg-surface-tertiary hover:text-primary'
                        }
                    `}
                    aria-pressed={activeStatus === key}
                    aria-label={`تصفية حسب ${label}`}
                >
                    <Icon size={16} />
                    <span>{label}</span>
                    <span className={`
                        px-2 py-1 rounded-full text-xs font-bold min-w-[24px] text-center
                        ${activeStatus === key 
                            ? 'bg-white/20 text-white' 
                            : 'bg-light-primary-100 dark:bg-dark-primary-800 text-light-primary-700 dark:text-dark-primary-300'
                        }
                    `}>
                        {counts[key] || 0}
                    </span>
                </button>
            ))}
        </div>
    );
};

// Main PlacesGrid Component
export const PlacesGrid = ({ places, onUpdateStatus, onSendMessage }) => {
    const { getAnimationClass, isRTL } = useTheme();

    if (!places || places.length === 0) {
        return (
            <div className={`
                text-center py-16 ${getAnimationClass('animate-fade-in-up')}
            `}>
                <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 mx-auto mb-6 bg-surface-secondary rounded-full flex items-center justify-center">
                        <MessageCircle className="w-8 h-8 text-tertiary" />
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-3">
                        لا توجد أماكن للعرض
                    </h3>
                    <p className="text-secondary">
                        جرب تغيير مرشحات البحث أو تحديث القائمة
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Responsive Grid */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {places.map((place, index) => (
                    <div
                        key={place.id}
                        className={`
                            ${getAnimationClass('animate-fade-in-up')}
                        `}
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <PlaceCard
                            place={place}
                            onUpdateStatus={onUpdateStatus}
                            onSendMessage={onSendMessage}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

// Custom Form Components
const CustomInput = ({ label, name, value, onChange, placeholder, disabled, type = 'text' }) => {
    const { getRTLClass } = useTheme();
    
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-secondary block">
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={`
                    w-full bg-surface-secondary border border-light dark:border-dark-border-light
                    rounded-2xl px-4 py-3 text-primary placeholder-tertiary
                    focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
                    focus:border-transparent transition-all duration-300
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${getRTLClass('text-left', 'text-right')}
                `}
                dir={getRTLClass('ltr', 'rtl')}
            />
        </div>
    );
};

const CustomTextarea = ({ label, name, value, onChange, placeholder, disabled, hint }) => {
    const { getRTLClass } = useTheme();
    
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-secondary block">
                {label}
            </label>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                rows={4}
                className={`
                    w-full bg-surface-secondary border border-light dark:border-dark-border-light
                    rounded-2xl px-4 py-3 text-primary placeholder-tertiary
                    focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
                    focus:border-transparent transition-all duration-300 resize-none
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${getRTLClass('text-left', 'text-right')}
                `}
                dir={getRTLClass('ltr', 'rtl')}
            />
            {hint && (
                <p className="text-xs text-tertiary">
                    {hint}
                </p>
            )}
        </div>
    );
};

const CustomButton = ({ onClick, disabled, variant = 'primary', children, className = '' }) => {
    const { getAnimationClass } = useTheme();
    
    const variants = {
        primary: `
            bg-gradient-to-r from-light-primary-500 to-light-primary-600
            dark:from-dark-primary-600 dark:to-dark-primary-700
            hover:from-light-primary-400 hover:to-light-primary-500
            dark:hover:from-dark-primary-500 dark:hover:to-dark-primary-600
            text-white shadow-soft hover:shadow-glow
        `,
        secondary: `
            bg-surface-secondary border border-light dark:border-dark-border-light
            text-secondary hover:text-primary hover:bg-surface-tertiary
        `
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                w-full py-3 px-4 rounded-2xl flex items-center justify-center gap-2
                transition-all duration-300 font-medium
                focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
                disabled:opacity-50 disabled:cursor-not-allowed
                ${variants[variant]}
                ${getAnimationClass('hover:scale-102')}
                ${className}
            `}
        >
            {children}
        </button>
    );
};

// Add List Dialog Component
export const AddListDialog = ({ onClose, onSuccess }) => {
    const { getAnimationClass, isRTL } = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        messageTemplate: '',
        file: null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!formData.name || !formData.messageTemplate) {
            setError('يرجى ملء جميع الحقول المطلوبة');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const places = JSON.parse(e.target.result);

                    const payload = {
                        name: formData.name,
                        message_template: formData.messageTemplate,
                        places: places
                    };

                    const response = await fetch('https://wabulk.pythonanywhere.com/api/lists', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });

                    if (response.ok) {
                        onSuccess();
                    } else {
                        const errorData = await response.json();
                        setError(errorData.message || 'حدث خطأ أثناء إنشاء القائمة');
                    }
                } catch (parseError) {
                    setError('ملف JSON غير صالح');
                }
            };
            reader.readAsText(file);
        } catch (error) {
            setError('حدث خطأ أثناء قراءة الملف');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
            />
            <div className={`
                relative w-full max-w-lg bg-surface-primary border border-light dark:border-dark-border-light
                rounded-3xl shadow-strong p-6 ${getAnimationClass('animate-scale-in')}
            `}>
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-primary">
                        إضافة قائمة جديدة
                    </h3>
                    <button
                        onClick={onClose}
                        className="
                            p-2 rounded-xl hover:bg-surface-secondary 
                            transition-colors group focus:outline-none
                            focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
                        "
                        aria-label="إغلاق"
                    >
                        <X size={20} className="text-tertiary group-hover:text-primary transition-colors" />
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-light-error-50 dark:bg-dark-error-200/10 border border-light-error-200 dark:border-dark-error-600/30 rounded-2xl p-4 mb-6">
                        <p className="text-sm text-light-error-700 dark:text-dark-error-400">
                            {error}
                        </p>
                    </div>
                )}

                {/* Form */}
                <div className="space-y-6">
                    <CustomInput
                        label="اسم القائمة"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="اكتب اسم القائمة..."
                        disabled={loading}
                    />

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-secondary block">
                            ملف JSON
                        </label>
                        <input
                            type="file"
                            id="file-upload"
                            accept=".json"
                            onChange={handleFileUpload}
                            disabled={loading}
                            className="hidden"
                        />
                        <label
                            htmlFor="file-upload"
                            className={`
                                w-full bg-surface-secondary border border-light dark:border-dark-border-light
                                rounded-2xl p-4 text-sm flex items-center justify-center gap-3
                                cursor-pointer hover:bg-surface-tertiary transition-all group
                                ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                            `}
                        >
                            <Upload size={18} className="text-secondary group-hover:text-primary transition-colors" />
                            <span className="text-secondary group-hover:text-primary font-medium">
                                اختر ملف JSON
                            </span>
                        </label>
                    </div>

                    <CustomTextarea
                        label="قالب الرسالة"
                        name="messageTemplate"
                        value={formData.messageTemplate}
                        onChange={handleChange}
                        placeholder="اكتب قالب الرسالة هنا..."
                        disabled={loading}
                        hint="المتغيرات المتاحة: {name}, {phone_number}, {facebook_url}"
                    />

                    <div className="flex gap-3 pt-4">
                        <CustomButton
                            onClick={() => document.getElementById('file-upload').click()}
                            disabled={loading || !formData.name || !formData.messageTemplate}
                            variant="primary"
                        >
                            <Upload size={16} />
                            <span>
                                {loading ? 'جاري الرفع...' : 'رفع القائمة'}
                            </span>
                        </CustomButton>
                        <CustomButton
                            onClick={onClose}
                            disabled={loading}
                            variant="secondary"
                            className="w-auto px-6"
                        >
                            <span>إلغاء</span>
                        </CustomButton>
                    </div>
                </div>
            </div>
        </div>
    );
};


