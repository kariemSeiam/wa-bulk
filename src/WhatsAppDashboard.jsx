import React, { useState, useEffect, useCallback } from 'react';
import {
  MessageCircle, Search, Plus, Check, X, AlertTriangle,
  Upload, Loader2, Facebook, Phone, MessageSquare,
  ChevronRight, Settings, MoreVertical, ArrowUpDown,
  Sparkles, Zap, TrendingUp
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { AddListDialog, PlacesGrid } from './PlacesGrid.jsx';
import Logo from './components/Logo.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import SearchBar from './components/SearchBar.jsx';
import { FullScreenLoading, SkeletonGrid } from './components/LoadingComponents.jsx';

// Demo data for Arabic Riyal businesses
const DEMO_LISTS = [
  {
    id: 1,
    name: "شركات ومحلات الرياض - العملة السعودية",
    description: "قائمة بالشركات والمحلات التجارية في الرياض التي تتعامل بالريال السعودي",
    message_template: "مرحباً {name}، نود التعامل معكم. رقم الهاتف: {phone_number}",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
    places_count: 8
  }
];

const DEMO_PLACES = {
  1: {
    places: [
      {
        id: 1,
        name: "مطعم البيك - الرياض",
        phone: "+966112345678",
        facebook_url: "https://facebook.com/albaiksa",
        status: "connected",
        currency: "SAR",
        price_range: "50-150 ريال سعودي"
      },
      {
        id: 2,
        name: "مجوهرات الدانة الذهبية",
        phone: "+966112345679",
        facebook_url: "https://facebook.com/aldanajewelry",
        status: "connected",
        currency: "SAR",
        price_range: "500-5000 ريال سعودي"
      },
      {
        id: 3,
        name: "متجر الكتروني - تقنية المستقبل",
        phone: "+966112345680",
        facebook_url: "https://facebook.com/futuretech",
        status: "not_connected",
        currency: "SAR",
        price_range: "100-3000 ريال سعودي"
      },
      {
        id: 4,
        name: "صيدلية النور الطبية",
        phone: "+966112345681",
        facebook_url: "https://facebook.com/alnourpharmacy",
        status: "connected",
        currency: "SAR",
        price_range: "20-500 ريال سعودي"
      },
      {
        id: 5,
        name: "مركز الأزياء الملكية",
        phone: "+966112345682",
        facebook_url: "https://facebook.com/royalfashion",
        status: "unsupported",
        currency: "SAR",
        price_range: "200-2000 ريال سعودي"
      },
      {
        id: 6,
        name: "مكتبة جرير الرئيسية",
        phone: "+966112345683",
        facebook_url: "https://facebook.com/jarirbooks",
        status: "connected",
        currency: "SAR",
        price_range: "25-800 ريال سعودي"
      },
      {
        id: 7,
        name: "مطعم الشرقي للمأكولات اللبنانية",
        phone: "+966112345684",
        facebook_url: "https://facebook.com/sharkirest",
        status: "not_connected",
        currency: "SAR",
        price_range: "40-250 ريال سعودي"
      },
      {
        id: 8,
        name: "محل الواحة للعطور والبخور",
        phone: "+966112345685",
        facebook_url: "https://facebook.com/alwahaparfumes",
        status: "connected",
        currency: "SAR",
        price_range: "30-1500 ريال سعودي"
      }
    ]
  }
};

// Enhanced Modern Stats Card Component
const StatsCard = ({ label, value, color = 'primary', icon: Icon, trend, description }) => {
  const { getAnimationClass, isDark, getTransitionClass } = useTheme();
  
  const colorVariants = {
    primary: {
      bg: `bg-gradient-to-br from-light-primary-50 via-light-primary-50 to-light-primary-100 dark:from-dark-primary-900 dark:via-dark-primary-800 dark:to-dark-primary-700`,
      text: `text-light-primary-700 dark:text-dark-primary-300`,
      border: `border-light-primary-200/30 dark:border-dark-primary-600/30`,
      glow: `shadow-light-primary-500/10 dark:shadow-dark-primary-500/20`,
      accent: `bg-light-primary-500 dark:bg-dark-primary-600`,
      icon: `text-light-primary-600 dark:text-dark-primary-400`
    },
    success: {
      bg: `bg-gradient-to-br from-light-success-50 via-light-success-50 to-light-success-100 dark:from-dark-success-900 dark:via-dark-success-800 dark:to-dark-success-700`,
      text: `text-light-success-700 dark:text-dark-success-300`,
      border: `border-light-success-200/30 dark:border-dark-success-600/30`,
      glow: `shadow-light-success-500/10 dark:shadow-dark-success-500/20`,
      accent: `bg-light-success-500 dark:bg-dark-success-600`,
      icon: `text-light-success-600 dark:text-dark-success-400`
    },
    warning: {
      bg: `bg-gradient-to-br from-light-warning-50 via-light-warning-50 to-light-warning-100 dark:from-dark-warning-900 dark:via-dark-warning-800 dark:to-dark-warning-700`,
      text: `text-light-warning-700 dark:text-dark-warning-300`,
      border: `border-light-warning-200/30 dark:border-dark-warning-600/30`,
      glow: `shadow-light-warning-500/10 dark:shadow-dark-warning-500/20`,
      accent: `bg-light-warning-500 dark:bg-dark-warning-600`,
      icon: `text-light-warning-600 dark:text-dark-warning-400`
    },
    error: {
      bg: `bg-gradient-to-br from-light-error-50 via-light-error-50 to-light-error-100 dark:from-dark-error-900 dark:via-dark-error-800 dark:to-dark-error-700`,
      text: `text-light-error-700 dark:text-dark-error-300`,
      border: `border-light-error-200/30 dark:border-dark-error-600/30`,
      glow: `shadow-light-error-500/10 dark:shadow-dark-error-500/20`,
      accent: `bg-light-error-500 dark:bg-dark-error-600`,
      icon: `text-light-error-600 dark:text-dark-error-400`
    }
  };
  
  const variant = colorVariants[color] || colorVariants.primary;
  
  return (
    <div 
      className={`
        group relative overflow-hidden ${variant.bg} 
        border ${variant.border} rounded-3xl p-6
        ${getTransitionClass('normal')} backdrop-blur-sm
        hover:scale-105 hover:shadow-glow ${variant.glow}
        cursor-pointer touch-target
        ${getAnimationClass('hover:animate-float')}
      `}
      role="button"
      tabIndex={0}
      aria-label={`${label}: ${value}${description ? ` - ${description}` : ''}`}
    >
      {/* Glass overlay effect */}
      <div className="absolute inset-0 bg-glass-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Sparkle effects */}
      {!getAnimationClass('') && (
        <>
          <div className={`absolute top-2 right-2 w-1 h-1 ${variant.accent} rounded-full ${getAnimationClass('animate-pulse-soft')}`} />
          <div className={`absolute bottom-3 left-3 w-0.5 h-0.5 ${variant.accent} rounded-full ${getAnimationClass('animate-pulse-soft')}`} style={{ animationDelay: '1s' }} />
        </>
      )}
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className={`${variant.text} text-sm font-semibold tracking-wide`}>
            {label}
          </div>
          {Icon && (
            <div className={`
              w-10 h-10 rounded-2xl ${variant.accent}/10 flex items-center justify-center
              group-hover:scale-110 transition-transform duration-300
            `}>
              <Icon className={`w-5 h-5 ${variant.icon}`} />
            </div>
          )}
        </div>
        
        {/* Value */}
        <div className="flex items-end gap-2 mb-3">
          <div className={`
            text-3xl font-bold text-primary 
            group-hover:scale-110 transition-transform duration-300
            ${getAnimationClass('group-hover:animate-bounce-soft')}
          `}>
            {value}
          </div>
          {trend && (
            <div className={`
              flex items-center gap-1 text-xs font-medium
              ${trend > 0 ? 'text-light-success-600 dark:text-dark-success-400' : 'text-light-error-600 dark:text-dark-error-400'}
            `}>
              <TrendingUp className={`w-3 h-3 ${trend < 0 ? 'rotate-180' : ''}`} />
              <span>{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
        
        {/* Description */}
        {description && (
          <div className="text-xs text-tertiary font-medium">
            {description}
          </div>
        )}
        
        {/* Progress bar */}
        <div className={`w-full h-1.5 ${variant.accent}/20 rounded-full overflow-hidden mt-4`}>
          <div className={`
            h-full ${variant.accent} rounded-full transition-all duration-1000 ease-out
            group-hover:w-full
          `} style={{ width: '75%' }} />
        </div>
      </div>
    </div>
  );
};

const WhatsAppDashboard = () => {
  const { 
    isDark, 
    isRTL, 
    getAnimationClass, 
    getThemeClass, 
    getRTLClass,
    shouldReduceMotion,
    getTransitionClass
  } = useTheme();

  // State Management
  const [places, setPlaces] = useState([]);
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddListDialog, setShowAddListDialog] = useState(false);
  const [showEditMessageDialog, setShowEditMessageDialog] = useState(false);
  const [messageTemplate, setMessageTemplate] = useState('');

  // Stats state
  const [stats, setStats] = useState({
    total: 0,
    connected: 0,
    not_connected: 0,
    unsupported: 0
  });

  // Handler for WhatsApp action
  const handleSendMessage = useCallback((place) => {
    const encodedMessage = encodeURIComponent(place.formatted_message);
    window.open(`https://wa.me/${place.phone}?text=${encodedMessage}`, '_blank');
  }, []);

  // Update place status handler (demo mode)
  const updatePlaceStatus = async (placeId, newStatus) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setPlaces(prevPlaces =>
        prevPlaces.map(place =>
          place.id === placeId ? { ...place, status: newStatus } : place
        )
      );
    } catch (error) {
      console.error('Error updating place status:', error);
    }
  };

  // Fetch lists (using demo data)
  const fetchLists = useCallback(async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setLists(DEMO_LISTS);
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  }, []);

  // Update message template (demo mode)
  const updateMessageTemplate = async () => {
    if (!selectedList) return;
    
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSelectedList(prev => ({ ...prev, message_template: messageTemplate }));
      setShowEditMessageDialog(false);
      await fetchPlaces(selectedList.id);
    } catch (error) {
      console.error('Error updating message template:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch places (using demo data)
  const fetchPlaces = useCallback(async (listId) => {
    if (!listId) return;
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const demoData = DEMO_PLACES[listId];
      if (demoData) {
        setPlaces(demoData.places);
      } else {
        setPlaces([]);
      }
    } catch (error) {
      console.error('Error fetching places:', error);
    }
    setLoading(false);
  }, []);

  // Effects
  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  useEffect(() => {
    if (lists.length > 0 && !selectedList) {
      setSelectedList(lists[0]);
    }
  }, [lists, selectedList]);

  useEffect(() => {
    if (selectedList) {
      fetchPlaces(selectedList.id);
      setMessageTemplate(selectedList.message_template);
    }
  }, [selectedList, fetchPlaces]);

  useEffect(() => {
    setStats({
      total: places.length,
      connected: places.filter(p => p.status === 'connected').length,
      not_connected: places.filter(p => p.status === 'not_connected').length,
      unsupported: places.filter(p => p.status === 'unsupported').length
    });
  }, [places]);

  return (
    <div 
      className="min-h-screen bg-surface-primary text-primary transition-all duration-500 ease-out-quart relative overflow-hidden"
      dir="rtl"
    >
      {/* Modern animated background with glassmorphism */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Primary gradient orbs */}
        <div className={`
          absolute -top-24 -right-24 w-96 h-96 
          bg-gradient-radial from-light-primary-500/20 via-light-primary-500/10 to-transparent
          dark:from-dark-primary-500/30 dark:via-dark-primary-500/15 dark:to-transparent
          rounded-full blur-3xl
          ${getAnimationClass('animate-float')}
        `} />
        <div className={`
          absolute top-1/3 -left-32 w-80 h-80 
          bg-gradient-radial from-light-accent-500/15 via-light-accent-500/8 to-transparent
          dark:from-dark-accent-500/25 dark:via-dark-accent-500/12 dark:to-transparent
          rounded-full blur-2xl
          ${getAnimationClass('animate-float')}
        `} style={{ animationDelay: '2s' }} />
        <div className={`
          absolute bottom-1/4 right-1/4 w-64 h-64 
          bg-gradient-radial from-light-success-500/12 via-light-success-500/6 to-transparent
          dark:from-dark-success-500/20 dark:via-dark-success-500/10 dark:to-transparent
          rounded-full blur-2xl
          ${getAnimationClass('animate-float')}
        `} style={{ animationDelay: '4s' }} />
        
        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 bg-gradient-conic from-transparent via-light-primary-500/5 to-transparent dark:via-dark-primary-500/10 opacity-50" />
      </div>
      
      <main className="container mx-auto px-4 pb-8 relative z-10 max-w-7xl">
        {/* Enhanced Header Section */}
        <header className="py-8">
          <div className="flex items-center justify-between mb-8">
            {/* Logo and Navigation */}
            <div className="flex items-center gap-6">
              <Logo showSubtitle={!selectedList} />
              {selectedList && (
                <div className={`
                  hidden sm:flex items-center gap-4 text-secondary 
                  bg-surface-secondary/80 border border-light/30 dark:border-dark-border-light/30
                  px-6 py-3 rounded-3xl backdrop-blur-glass
                  ${getAnimationClass('animate-slide-in-right')}
                  ${getTransitionClass('normal')}
                  hover:bg-surface-tertiary/80 hover:scale-105
                `}>
                  <div className="w-2.5 h-2.5 rounded-full bg-light-success-500 dark:bg-dark-success-400 animate-pulse-soft" />
                  <span className="font-semibold text-sm">{selectedList.name}</span>
                  <ChevronRight 
                    size={18} 
                    className="text-light-success-500 dark:text-dark-success-400 rotate-180" 
                  />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAddListDialog(true)}
                className="
                  group relative bg-gradient-to-br from-light-primary-500 via-light-primary-600 to-light-primary-700
                  dark:from-dark-primary-600 dark:via-dark-primary-700 dark:to-dark-primary-800
                  w-14 h-14 rounded-3xl flex items-center justify-center 
                  hover:from-light-primary-400 hover:via-light-primary-500 hover:to-light-primary-600
                  dark:hover:from-dark-primary-500 dark:hover:via-dark-primary-600 dark:hover:to-dark-primary-700
                  transition-all duration-300 shadow-glow hover:shadow-glow-strong
                  sm:w-auto sm:px-6 sm:h-auto sm:py-4 sm:gap-3
                  hover:scale-110 focus:outline-none 
                  focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
                  text-white font-semibold touch-target
                "
                aria-label="إنشاء قائمة جديدة"
              >
                <div className="absolute inset-0 bg-glass-gradient rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Plus size={22} className="drop-shadow-sm flex-shrink-0 relative z-10" />
                <span className="hidden sm:inline text-sm drop-shadow-sm relative z-10">
                  قائمة جديدة
                </span>
                <Sparkles className={`hidden sm:inline w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity relative z-10 ${getAnimationClass('animate-wiggle')}`} />
              </button>

              {selectedList && (
                <button
                  onClick={() => setShowEditMessageDialog(true)}
                  className="
                    group relative bg-surface-secondary/80 border border-light/30 dark:border-dark-border-light/30
                    w-14 h-14 rounded-3xl flex items-center justify-center backdrop-blur-glass
                    hover:bg-surface-tertiary/80 transition-all duration-300
                    sm:w-auto sm:px-6 sm:h-auto sm:py-4 sm:gap-3
                    hover:scale-105 hover:shadow-medium focus:outline-none 
                    focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
                    touch-target
                  "
                  aria-label="تعديل قالب الرسالة"
                >
                  <MessageSquare size={20} className="text-secondary group-hover:text-primary transition-colors flex-shrink-0" />
                  <span className="hidden sm:inline text-sm text-secondary group-hover:text-primary font-semibold">
                    تعديل الرسالة
                  </span>
                </button>
              )}
              
              <ThemeToggle variant="simple" />
            </div>
          </div>

          {/* Enhanced Stats Section */}
          {selectedList && (
            <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 ${getAnimationClass('animate-fade-in-up')}`}>
              <StatsCard 
                label="الإجمالي" 
                value={stats.total} 
                color="primary"
                icon={MessageCircle}
                trend={12}
                description="إجمالي الأماكن"
              />
              <StatsCard 
                label="متصل" 
                value={stats.connected} 
                color="success"
                icon={Check}
                trend={8}
                description="جاهز للإرسال"
              />
              <StatsCard 
                label="غير متصل" 
                value={stats.not_connected} 
                color="warning"
                icon={AlertTriangle}
                trend={-5}
                description="يحتاج مراجعة"
              />
              <StatsCard 
                label="غير مدعوم" 
                value={stats.unsupported} 
                color="error"
                icon={X}
                trend={-15}
                description="غير متاح"
              />
            </div>
          )}

          {/* Enhanced Lists Section */}
          <div className="mb-8">
            <div className="overflow-x-auto hide-scrollbar">
              <div className="flex gap-4 pb-3 min-w-max">
                {lists.map(list => (
                  <button
                    key={list.id}
                    onClick={() => setSelectedList(list)}
                    className={`
                      px-8 py-4 rounded-3xl whitespace-nowrap flex items-center gap-3
                      transition-all duration-300 ease-spring font-semibold text-sm
                      focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
                      backdrop-blur-glass touch-target
                      ${selectedList?.id === list.id
                        ? 'bg-gradient-to-r from-light-primary-500 via-light-primary-600 to-light-primary-700 dark:from-dark-primary-600 dark:via-dark-primary-700 dark:to-dark-primary-800 text-white shadow-glow scale-105'
                        : 'bg-surface-secondary/80 border border-light/30 dark:border-dark-border-light/30 text-secondary hover:bg-surface-tertiary/80 hover:text-primary hover:scale-102'
                      }
                    `}
                    aria-pressed={selectedList?.id === list.id}
                  >
                    <Zap className={`w-4 h-4 ${selectedList?.id === list.id ? 'text-white' : 'text-light-primary-500 dark:text-dark-primary-400'}`} />
                    {list.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Search Section */}
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="البحث في الأماكن والجهات..."
            className="mb-4"
          />
        </header>

        {/* Main Content */}
        {selectedList ? (
          loading ? (
            <SkeletonGrid count={8} />
          ) : (
            <PlacesGrid
              places={places.filter(place =>
                place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                place.phone.includes(searchTerm)
              )}
              onSendMessage={handleSendMessage}
              onUpdateStatus={updatePlaceStatus}
            />
          )
        ) : (
          <div className={`
            text-center py-20 ${getAnimationClass('animate-fade-in-up')}
          `}>
            <div className="max-w-lg mx-auto">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-surface-secondary to-surface-tertiary rounded-full flex items-center justify-center backdrop-blur-glass shadow-glass">
                <MessageCircle className="w-16 h-16 text-light-primary-500 dark:text-dark-primary-400" />
              </div>
              <h2 className="text-3xl font-bold text-primary mb-6 bg-gradient-to-r from-light-primary-600 to-light-primary-700 dark:from-dark-primary-400 dark:to-dark-primary-300 bg-clip-text text-transparent">
                مرحباً بك في وا بلك
              </h2>
              <p className="text-secondary mb-10 text-lg leading-relaxed">
                ابدأ بإنشاء قائمة جديدة لإرسال الرسائل الجماعية عبر واتساب بطريقة احترافية وسريعة
              </p>
              <button
                onClick={() => setShowAddListDialog(true)}
                className="
                  group bg-gradient-to-r from-light-primary-500 via-light-primary-600 to-light-primary-700
                  dark:from-dark-primary-600 dark:via-dark-primary-700 dark:to-dark-primary-800
                  px-10 py-5 rounded-3xl flex items-center justify-center gap-4 mx-auto
                  hover:from-light-primary-400 hover:via-light-primary-500 hover:to-light-primary-600
                  dark:hover:from-dark-primary-500 dark:hover:via-dark-primary-600 dark:hover:to-dark-primary-700
                  transition-all duration-300 shadow-glow hover:shadow-glow-strong
                  hover:scale-110 text-white font-bold text-lg
                  focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
                  touch-target
                "
              >
                <Plus size={24} className="flex-shrink-0" />
                <span className="whitespace-nowrap">إنشاء قائمة جديدة</span>
                <ChevronRight 
                  size={24} 
                  className={`
                    opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0
                    ${isRTL ? 'rotate-180' : ''} ${getAnimationClass('group-hover:animate-bounce-soft')}
                  `} 
                />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Add List Dialog */}
      {showAddListDialog && (
        <AddListDialog
          onClose={() => setShowAddListDialog(false)}
          onSuccess={() => {
            fetchLists();
            setShowAddListDialog(false);
          }}
        />
      )}

      {/* Enhanced Edit Message Dialog */}
      {showEditMessageDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowEditMessageDialog(false)}
            aria-hidden="true"
          />
          <div className={`
            relative w-full max-w-2xl bg-surface-primary/95 border border-light/30 dark:border-dark-border-light/30
            rounded-4xl shadow-glass-strong backdrop-blur-glass p-8 ${getAnimationClass('animate-scale-in')}
          `}>
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-primary bg-gradient-to-r from-light-primary-600 to-light-primary-700 dark:from-dark-primary-400 dark:to-dark-primary-300 bg-clip-text text-transparent">
                تعديل قالب الرسالة
              </h3>
              <button
                onClick={() => setShowEditMessageDialog(false)}
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

            {/* Message Template */}
            <div className="space-y-6">
              <div>
                <label className="text-sm text-secondary block mb-3 font-semibold">
                  قالب الرسالة
                </label>
                <textarea
                  value={messageTemplate}
                  onChange={(e) => setMessageTemplate(e.target.value)}
                  placeholder="اكتب قالب الرسالة هنا..."
                  className="
                    w-full bg-surface-secondary/80 border border-light/30 dark:border-dark-border-light/30
                    rounded-3xl p-6 text-primary placeholder-tertiary backdrop-blur-glass
                    focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
                    focus:border-transparent transition-all duration-300 h-40 resize-none
                    text-right font-medium
                  "
                  aria-describedby="template-help"
                  dir="rtl"
                />
                <p id="template-help" className="text-sm text-tertiary mt-3 bg-surface-secondary/50 rounded-2xl p-4 backdrop-blur-glass">
                  <strong>المتغيرات المتاحة:</strong> {'{name}'} للاسم، {'{phone_number}'} لرقم الهاتف، {'{facebook_url}'} لرابط الفيسبوك
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <button
                  onClick={updateMessageTemplate}
                  disabled={loading}
                  className="
                    flex-1 bg-gradient-to-r from-light-primary-500 via-light-primary-600 to-light-primary-700
                    dark:from-dark-primary-600 dark:via-dark-primary-700 dark:to-dark-primary-800
                    py-4 rounded-3xl flex items-center justify-center gap-3
                    hover:from-light-primary-400 hover:via-light-primary-500 hover:to-light-primary-600
                    dark:hover:from-dark-primary-500 dark:hover:via-dark-primary-600 dark:hover:to-dark-primary-700
                    transition-all duration-300 shadow-glow hover:shadow-glow-strong
                    text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed
                    focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
                    hover:scale-105 touch-target
                  "
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Check className="w-5 h-5" />
                  )}
                  <span>{loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}</span>
                </button>
                <button
                  onClick={() => setShowEditMessageDialog(false)}
                  className="
                    px-8 py-4 rounded-3xl bg-surface-secondary/80 border border-light/30 dark:border-dark-border-light/30
                    text-secondary hover:text-primary hover:bg-surface-tertiary/80 backdrop-blur-glass
                    transition-all duration-300 font-semibold
                    focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
                    hover:scale-105 touch-target
                  "
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Loading State for Message Template */}
      {loading && showEditMessageDialog && (
        <FullScreenLoading 
          message="جاري حفظ التغييرات..." 
          subMessage="يرجى الانتظار قليلاً"
        />
      )}
    </div>
  );
};

export default WhatsAppDashboard;