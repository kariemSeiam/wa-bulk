import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    MessageCircle, Phone, Facebook, Check, AlertTriangle, Loader2,
    Copy, CheckCircle, ExternalLink, ChevronLeft, X, Upload,
    Sparkles, Zap, Star, ArrowUpRight, Shield, Clock, MessageSquare
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext.jsx';

const PlaceCard = ({ place, onUpdateStatus, onSendMessage }) => {
    const { getAnimationClass, isRTL, getRTLClass, getTransitionClass } = useTheme();
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
                bg: 'bg-gradient-to-br from-light-success-50 via-light-success-100 to-light-success-50 dark:from-dark-success-900 dark:via-dark-success-800 dark:to-dark-success-900',
                text: 'text-light-success-700 dark:text-dark-success-300',
                border: 'border-light-success-200/40 dark:border-dark-success-600/40',
                label: 'متصل',
                glow: 'shadow-light-success-500/20 dark:shadow-dark-success-500/30',
                icon: Shield,
                pulse: 'bg-light-success-500 dark:bg-dark-success-400'
            },
            unsupported: {
                bg: 'bg-gradient-to-br from-light-error-50 via-light-error-100 to-light-error-50 dark:from-dark-error-900 dark:via-dark-error-800 dark:to-dark-error-900',
                text: 'text-light-error-700 dark:text-dark-error-300',
                border: 'border-light-error-200/40 dark:border-dark-error-600/40',
                label: 'غير مدعوم',
                glow: 'shadow-light-error-500/20 dark:shadow-dark-error-500/30',
                icon: X,
                pulse: 'bg-light-error-500 dark:bg-dark-error-400'
            },
            not_connected: {
                bg: 'bg-gradient-to-br from-light-warning-50 via-light-warning-100 to-light-warning-50 dark:from-dark-warning-900 dark:via-dark-warning-800 dark:to-dark-warning-900',
                text: 'text-light-warning-700 dark:text-dark-warning-300',
                border: 'border-light-warning-200/40 dark:border-dark-warning-600/40',
                label: 'غير متصل',
                glow: 'shadow-light-warning-500/20 dark:shadow-dark-warning-500/30',
                icon: Clock,
                pulse: 'bg-light-warning-500 dark:bg-dark-warning-400'
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
                group relative bg-surface-primary/80 border border-light/30 dark:border-dark-border-light/30
                rounded-4xl overflow-hidden ${getTransitionClass('normal')}
                hover:scale-105 hover:shadow-glass ${statusConfig.glow}
                backdrop-blur-glass ${getAnimationClass('animate-fade-in-up')}
                cursor-pointer touch-target
            `}
            role="article"
            aria-labelledby={`place-name-${place.id}`}
        >
            {/* Glass overlay effect */}
            <div className="absolute inset-0 bg-glass-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Status Indicator */}
            <div className={`
                absolute top-4 right-4 z-20
                flex items-center gap-2 px-4 py-2 rounded-full text-sm 
                ${statusConfig.bg} ${statusConfig.text} border ${statusConfig.border}
                backdrop-blur-glass transition-all duration-300
                ${getAnimationClass('group-hover:animate-bounce-soft')}
            `}>
                <statusConfig.icon className="w-3 h-3" />
                <span className="font-semibold">{statusConfig.label}</span>
                <div className={`w-2 h-2 rounded-full ${statusConfig.pulse} ${getAnimationClass('animate-pulse-soft')}`} />
            </div>

            {/* Sparkle effects */}
            {!getAnimationClass('') && isHovered && (
                <>
                    <div className={`absolute top-6 left-6 w-1 h-1 bg-light-primary-400 dark:bg-dark-primary-400 rounded-full ${getAnimationClass('animate-pulse-soft')}`} />
                    <div className={`absolute bottom-8 right-8 w-1.5 h-1.5 bg-light-accent-400 dark:bg-dark-accent-400 rounded-full ${getAnimationClass('animate-pulse-soft')}`} style={{ animationDelay: '0.5s' }} />
                </>
            )}

            {/* Main Content */}
            <div className="relative p-8 space-y-6 z-10">
                {/* Header */}
                <div className="space-y-4 pt-8">
                    <h3 
                        id={`place-name-${place.id}`}
                        className="font-bold text-xl text-primary group-hover:text-light-primary-600 dark:group-hover:text-dark-primary-400 
                                   transition-colors duration-300 line-clamp-2 leading-tight"
                    >
                        {place.name}
                    </h3>

                    {/* Price Range Badge */}
                    {place.price_range && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-light-accent-50 dark:bg-dark-accent-900 border border-light-accent-200/30 dark:border-dark-accent-600/30 rounded-full text-sm font-semibold text-light-accent-700 dark:text-dark-accent-300">
                            <Star className="w-3 h-3" />
                            {place.price_range}
                        </div>
                    )}

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <button
                            onClick={() => copyToClipboard(place.phone)}
                            className="
                                flex items-center gap-4 w-full text-secondary 
                                bg-surface-secondary/60 border border-light/20 dark:border-dark-border-light/20
                                hover:bg-surface-tertiary/60 px-5 py-4 rounded-3xl text-sm 
                                transition-all duration-300 group/phone relative overflow-hidden backdrop-blur-glass
                                focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
                                hover:scale-102 touch-target
                            "
                            aria-label={`نسخ رقم الهاتف ${place.phone}`}
                            title="انقر لنسخ رقم الهاتف"
                        >
                            <div className="w-10 h-10 rounded-2xl bg-light-primary-100 dark:bg-dark-primary-800 flex items-center justify-center group-hover/phone:scale-110 transition-transform duration-300">
                                <Phone size={18} className="text-light-primary-600 dark:text-dark-primary-400" />
                            </div>
                            <span className="font-mono flex-1 text-right font-semibold">
                                {place.phone}
                            </span>
                            <div className={`
                                absolute inset-0 bg-light-success-500/10 dark:bg-dark-success-500/10
                                transition-transform duration-500 ease-out rounded-3xl
                                ${copiedPhone ? 'translate-x-0' : 'translate-x-full'}
                            `} />
                            {copiedPhone ? (
                                <CheckCircle size={18} className="text-light-success-600 dark:text-dark-success-400 shrink-0 relative animate-bounce-soft" />
                            ) : (
                                <Copy size={18} className="opacity-0 group-hover/phone:opacity-100 transition-opacity relative text-light-primary-600 dark:text-dark-primary-400" />
                            )}
                        </button>

                        {place.facebook_url && (
                            <a
                                href={place.facebook_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    flex items-center gap-4 text-light-primary-600 dark:text-dark-primary-400
                                    bg-light-primary-50/60 dark:bg-dark-primary-900/60 
                                    hover:bg-light-primary-100/60 dark:hover:bg-dark-primary-800/60 
                                    border border-light-primary-200/30 dark:border-dark-primary-600/30
                                    px-5 py-4 rounded-3xl text-sm transition-all duration-300 group/fb backdrop-blur-glass
                                    focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
                                    hover:scale-102 touch-target
                                "
                                aria-label="فتح صفحة الفيسبوك"
                            >
                                <div className="w-10 h-10 rounded-2xl bg-light-primary-100 dark:bg-dark-primary-800 flex items-center justify-center group-hover/fb:scale-110 transition-transform duration-300">
                                    <Facebook size={18} />
                                </div>
                                <span className="truncate font-semibold flex-1">صفحة الفيسبوك</span>
                                <ArrowUpRight size={16} className="opacity-0 group-hover/fb:opacity-100 transition-opacity" />
                            </a>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-6 border-t border-light/20 dark:border-dark-border-light/20">
                    {place.status === 'not_connected' && (
                        <>
                            <button
                                onClick={() => onUpdateStatus(place.id, 'connected')}
                                className="
                                    flex-1 bg-gradient-to-r from-light-success-500 via-light-success-600 to-light-success-700
                                    dark:from-dark-success-600 dark:via-dark-success-700 dark:to-dark-success-800
                                    text-white py-4 px-4 rounded-3xl flex items-center justify-center gap-2
                                    hover:from-light-success-400 hover:via-light-success-500 hover:to-light-success-600
                                    dark:hover:from-dark-success-500 dark:hover:via-dark-success-600 dark:hover:to-dark-success-700
                                    transition-all duration-300 shadow-glow hover:shadow-glow-strong
                                    focus:outline-none focus:ring-2 focus:ring-light-success-500 dark:focus:ring-dark-success-500
                                    font-bold hover:scale-105 touch-target
                                "
                                aria-label="تحديد كمتصل"
                            >
                                <Check size={18} />
                                <span>متصل</span>
                            </button>
                            <button
                                onClick={() => onUpdateStatus(place.id, 'unsupported')}
                                className="
                                    flex-1 bg-surface-secondary/80 border border-light/30 dark:border-dark-border-light/30
                                    text-secondary hover:text-primary hover:bg-surface-tertiary/80 backdrop-blur-glass
                                    py-4 px-4 rounded-3xl flex items-center justify-center gap-2
                                    transition-all duration-300 font-bold
                                    focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
                                    hover:scale-105 touch-target
                                "
                                aria-label="تحديد كغير مدعوم"
                            >
                                <X size={18} />
                                <span>غير مدعوم</span>
                            </button>
                        </>
                    )}
                    
                    {place.status === 'connected' && (
                        <button
                            onClick={() => onSendMessage(place)}
                            className="
                                w-full bg-gradient-to-r from-light-primary-500 via-light-primary-600 to-light-primary-700
                                dark:from-dark-primary-600 dark:via-dark-primary-700 dark:to-dark-primary-800
                                text-white py-4 px-6 rounded-3xl flex items-center justify-center gap-3
                                hover:from-light-primary-400 hover:via-light-primary-500 hover:to-light-primary-600
                                dark:hover:from-dark-primary-500 dark:hover:via-dark-primary-600 dark:hover:to-dark-primary-700
                                transition-all duration-300 shadow-glow hover:shadow-glow-strong
                                focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
                                font-bold group/send hover:scale-105 touch-target
                            "
                            aria-label="إرسال رسالة واتساب"
                        >
                            <MessageCircle size={20} />
                            <span>إرسال رسالة</span>
                            <ChevronLeft 
                                size={20} 
                                className={`
                                    opacity-0 group-hover/send:opacity-100 transition-opacity
                                    ${isRTL ? 'rotate-180' : ''} ${getAnimationClass('group-hover/send:animate-bounce-soft')}
                                `}
                            />
                        </button>
                    )}
                    
                    {place.status === 'unsupported' && (
                        <div className="w-full py-4 px-6 rounded-3xl bg-light-error-50 dark:bg-dark-error-900 border border-light-error-200/30 dark:border-dark-error-600/30 flex items-center justify-center gap-3 text-light-error-700 dark:text-dark-error-300 font-bold">
                            <X size={20} />
                            <span>غير متاح للإرسال</span>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
};

// Enhanced Status Filter Component
const StatusFilter = ({ counts, activeStatus, onStatusChange }) => {
    const { getAnimationClass, getRTLClass, getTransitionClass } = useTheme();
    
    const statusOptions = [
        { key: 'all', label: 'الكل', icon: Star, count: Object.values(counts).reduce((a, b) => a + b, 0) },
        { key: 'not_connected', label: 'غير متصل', icon: Clock, count: counts.not_connected },
        { key: 'connected', label: 'متصل', icon: Shield, count: counts.connected },
        { key: 'unsupported', label: 'غير مدعوم', icon: X, count: counts.unsupported }
    ];

    return (
        <div className={`flex gap-3 overflow-x-auto hide-scrollbar pb-3 mb-6 ${getAnimationClass('animate-slide-in-right')}`}>
            {statusOptions.map(({ key, label, icon: Icon, count }) => (
                <button
                    key={key}
                    onClick={() => onStatusChange(key === 'all' ? null : key)}
                    className={`
                        flex items-center gap-3 px-6 py-4 rounded-3xl whitespace-nowrap backdrop-blur-glass
                        transition-all duration-300 ease-spring font-bold text-sm touch-target
                        focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
                        ${(activeStatus === key || (key === 'all' && !activeStatus))
                            ? 'bg-gradient-to-r from-light-primary-500 via-light-primary-600 to-light-primary-700 dark:from-dark-primary-600 dark:via-dark-primary-700 dark:to-dark-primary-800 text-white shadow-glow scale-105'
                            : 'bg-surface-secondary/80 border border-light/30 dark:border-dark-border-light/30 text-secondary hover:bg-surface-tertiary/80 hover:text-primary hover:scale-102'
                        }
                    `}
                    aria-pressed={activeStatus === key || (key === 'all' && !activeStatus)}
                    aria-label={`تصفية حسب ${label}`}
                >
                    <Icon size={16} />
                    <span>{label}</span>
                    <span className={`
                        px-3 py-1 rounded-full text-xs font-bold min-w-[28px] text-center
                        ${(activeStatus === key || (key === 'all' && !activeStatus))
                            ? 'bg-white/20 text-white' 
                            : 'bg-light-primary-100 dark:bg-dark-primary-800 text-light-primary-700 dark:text-dark-primary-300'
                        }
                    `}>
                        {count || 0}
                    </span>
                </button>
            ))}
        </div>
    );
};

// Main PlacesGrid Component
export const PlacesGrid = ({ places, onUpdateStatus, onSendMessage }) => {
    const { getAnimationClass, isRTL } = useTheme();
    const [statusFilter, setStatusFilter] = useState(null);

    const filteredPlaces = places.filter(place => 
        !statusFilter || place.status === statusFilter
    );

    const statusCounts = {
        connected: places.filter(p => p.status === 'connected').length,
        not_connected: places.filter(p => p.status === 'not_connected').length,
        unsupported: places.filter(p => p.status === 'unsupported').length,
    };

    if (!places || places.length === 0) {
        return (
            <div className={`
                text-center py-20 ${getAnimationClass('animate-fade-in-up')}
            `}>
                <div className="max-w-lg mx-auto">
                    <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-surface-secondary to-surface-tertiary rounded-full flex items-center justify-center backdrop-blur-glass shadow-glass">
                        <MessageCircle className="w-12 h-12 text-light-primary-500 dark:text-dark-primary-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-4 bg-gradient-to-r from-light-primary-600 to-light-primary-700 dark:from-dark-primary-400 dark:to-dark-primary-300 bg-clip-text text-transparent">
                        لا توجد أماكن للعرض
                    </h3>
                    <p className="text-secondary text-lg leading-relaxed">
                        جرب تغيير مرشحات البحث أو تحديث القائمة
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8" dir="rtl">
            {/* Status Filter */}
            <StatusFilter 
                counts={statusCounts}
                activeStatus={statusFilter}
                onStatusChange={setStatusFilter}
            />

            {/* Responsive Grid */}
            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredPlaces.map((place, index) => (
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

// Enhanced Custom Form Components
const CustomInput = ({ label, name, value, onChange, placeholder, disabled, type = 'text', icon: Icon }) => {
    const { getTransitionClass } = useTheme();
    
    return (
        <div className="space-y-3">
            <label className="text-sm font-bold text-secondary block flex items-center gap-2">
                {Icon && <Icon className="w-4 h-4" />}
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className="
                    w-full bg-surface-secondary/80 border border-light/30 dark:border-dark-border-light/30
                    rounded-3xl px-6 py-4 text-primary placeholder-tertiary backdrop-blur-glass
                    focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
                    focus:border-transparent transition-all duration-300
                    disabled:opacity-50 disabled:cursor-not-allowed
                    text-right font-medium hover:scale-102 touch-target
                "
                dir="rtl"
            />
        </div>
    );
};

const CustomTextarea = ({ label, name, value, onChange, placeholder, disabled, hint, icon: Icon }) => {
    const { getTransitionClass } = useTheme();
    
    return (
        <div className="space-y-3">
            <label className="text-sm font-bold text-secondary block flex items-center gap-2">
                {Icon && <Icon className="w-4 h-4" />}
                {label}
            </label>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                rows={5}
                className="
                    w-full bg-surface-secondary/80 border border-light/30 dark:border-dark-border-light/30
                    rounded-3xl px-6 py-4 text-primary placeholder-tertiary backdrop-blur-glass
                    focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
                    focus:border-transparent transition-all duration-300 resize-none
                    disabled:opacity-50 disabled:cursor-not-allowed
                    text-right font-medium hover:scale-102 touch-target
                "
                dir="rtl"
            />
            {hint && (
                <p className="text-sm text-tertiary bg-surface-secondary/50 rounded-2xl p-4 backdrop-blur-glass">
                    <strong>نصيحة:</strong> {hint}
                </p>
            )}
        </div>
    );
};

const CustomButton = ({ onClick, disabled, variant = 'primary', children, className = '', icon: Icon }) => {
    const { getAnimationClass, getTransitionClass } = useTheme();
    
    const variants = {
        primary: `
            bg-gradient-to-r from-light-primary-500 via-light-primary-600 to-light-primary-700
            dark:from-dark-primary-600 dark:via-dark-primary-700 dark:to-dark-primary-800
            hover:from-light-primary-400 hover:via-light-primary-500 hover:to-light-primary-600
            dark:hover:from-dark-primary-500 dark:hover:via-dark-primary-600 dark:hover:to-dark-primary-700
            text-white shadow-glow hover:shadow-glow-strong
        `,
        secondary: `
            bg-surface-secondary/80 border border-light/30 dark:border-dark-border-light/30
            text-secondary hover:text-primary hover:bg-surface-tertiary/80 backdrop-blur-glass
        `
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                w-full py-4 px-6 rounded-3xl flex items-center justify-center gap-3
                transition-all duration-300 font-bold
                focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
                disabled:opacity-50 disabled:cursor-not-allowed
                ${variants[variant]}
                ${getAnimationClass('hover:scale-105')}
                touch-target
                ${className}
            `}
        >
            {Icon && <Icon size={20} />}
            {children}
        </button>
    );
};

// Enhanced Add List Dialog Component
export const AddListDialog = ({ onClose, onSuccess }) => {
    const { getAnimationClass, isRTL, getTransitionClass } = useTheme();
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
            />
            <div className={`
                relative w-full max-w-2xl bg-surface-primary/95 border border-light/30 dark:border-dark-border-light/30
                rounded-4xl shadow-glass-strong backdrop-blur-glass p-8 ${getAnimationClass('animate-scale-in')}
            `}>
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-bold text-primary bg-gradient-to-r from-light-primary-600 to-light-primary-700 dark:from-dark-primary-400 dark:to-dark-primary-300 bg-clip-text text-transparent">
                        إضافة قائمة جديدة
                    </h3>
                    <button
                        onClick={onClose}
                        className="
                            p-3 rounded-2xl hover:bg-surface-secondary/80 
                            transition-colors group focus:outline-none backdrop-blur-glass
                            focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
                        "
                        aria-label="إغلاق"
                    >
                        <X size={24} className="text-tertiary group-hover:text-primary transition-colors" />
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-light-error-50/80 dark:bg-dark-error-900/80 border border-light-error-200/40 dark:border-dark-error-600/40 rounded-3xl p-6 mb-6 backdrop-blur-glass">
                        <p className="text-sm text-light-error-700 dark:text-dark-error-300 font-semibold">
                            {error}
                        </p>
                    </div>
                )}

                {/* Form */}
                <div className="space-y-8">
                    <CustomInput
                        label="اسم القائمة"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="اكتب اسم القائمة..."
                        disabled={loading}
                        icon={Sparkles}
                    />

                    <div className="space-y-3">
                        <label className="text-sm font-bold text-secondary block flex items-center gap-2">
                            <Upload className="w-4 h-4" />
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
                                w-full bg-surface-secondary/80 border border-light/30 dark:border-dark-border-light/30
                                rounded-3xl p-6 text-sm flex items-center justify-center gap-4 backdrop-blur-glass
                                cursor-pointer hover:bg-surface-tertiary/80 transition-all group hover:scale-102 touch-target
                                ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                            `}
                        >
                            <Upload size={20} className="text-secondary group-hover:text-primary transition-colors" />
                            <span className="text-secondary group-hover:text-primary font-bold">
                                اختر ملف JSON
                            </span>
                            <Zap className="w-4 h-4 text-light-primary-500 dark:text-dark-primary-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </label>
                    </div>

                    <CustomTextarea
                        label="قالب الرسالة"
                        name="messageTemplate"
                        value={formData.messageTemplate}
                        onChange={handleChange}
                        placeholder="اكتب قالب الرسالة هنا..."
                        disabled={loading}
                        hint="المتغيرات المتاحة: {name} للاسم، {phone_number} لرقم الهاتف، {facebook_url} لرابط الفيسبوك"
                        icon={MessageSquare}
                    />

                    <div className="flex gap-4 pt-6">
                        <CustomButton
                            onClick={() => document.getElementById('file-upload').click()}
                            disabled={loading || !formData.name || !formData.messageTemplate}
                            variant="primary"
                            icon={Upload}
                        >
                            <span>
                                {loading ? 'جاري الرفع...' : 'رفع القائمة'}
                            </span>
                        </CustomButton>
                        <CustomButton
                            onClick={onClose}
                            disabled={loading}
                            variant="secondary"
                            className="w-auto px-8"
                        >
                            <span>إلغاء</span>
                        </CustomButton>
                    </div>
                </div>
            </div>
        </div>
    );
};


