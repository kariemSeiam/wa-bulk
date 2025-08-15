import React, { useState, useEffect, useCallback } from 'react';
import {
  MessageCircle, Search, Plus, Check, X, AlertTriangle,
  Upload, Loader2, Facebook, Phone, MessageSquare,
  ChevronRight, Settings, MoreVertical, ArrowUpDown
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { AddListDialog, PlacesGrid } from './PlacesGrid.jsx';
import Logo from './components/Logo.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import SearchBar from './components/SearchBar.jsx';

// Enhanced Stats Card Component with Theme Support
const StatsCard = ({ label, value, color = 'primary', icon: Icon }) => {
  const { getAnimationClass, isDark } = useTheme();
  
  const colorVariants = {
    primary: {
      bg: `bg-light-primary-50 dark:bg-dark-primary-200/10`,
      text: `text-light-primary-700 dark:text-dark-primary-400`,
      border: `border-light-primary-200 dark:border-dark-primary-600/30`,
      glow: `shadow-light-primary-500/10 dark:shadow-dark-primary-500/20`,
      accent: `bg-light-primary-500 dark:bg-dark-primary-600`
    },
    success: {
      bg: `bg-light-success-50 dark:bg-dark-success-200/10`,
      text: `text-light-success-700 dark:text-dark-success-400`,
      border: `border-light-success-200 dark:border-dark-success-600/30`,
      glow: `shadow-light-success-500/10 dark:shadow-dark-success-500/20`,
      accent: `bg-light-success-500 dark:bg-dark-success-600`
    },
    warning: {
      bg: `bg-light-warning-50 dark:bg-dark-warning-200/10`,
      text: `text-light-warning-700 dark:text-dark-warning-400`,
      border: `border-light-warning-200 dark:border-dark-warning-600/30`,
      glow: `shadow-light-warning-500/10 dark:shadow-dark-warning-500/20`,
      accent: `bg-light-warning-500 dark:bg-dark-warning-600`
    },
    error: {
      bg: `bg-light-error-50 dark:bg-dark-error-200/10`,
      text: `text-light-error-700 dark:text-dark-error-400`,
      border: `border-light-error-200 dark:border-dark-error-600/30`,
      glow: `shadow-light-error-500/10 dark:shadow-dark-error-500/20`,
      accent: `bg-light-error-500 dark:bg-dark-error-600`
    }
  };
  
  const variant = colorVariants[color] || colorVariants.primary;
  
  return (
    <div 
      className={`
        ${variant.bg} border ${variant.border}
        rounded-2xl p-4 transition-all duration-300 ease-out-quart
        hover:scale-102 hover:shadow-medium ${variant.glow}
        group cursor-pointer backdrop-blur-sm
        ${getAnimationClass('hover:animate-float')}
      `}
      role="button"
      tabIndex={0}
      aria-label={`${label}: ${value}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className={`${variant.text} text-sm font-medium`}>
          {label}
        </div>
        {Icon && (
          <div className={`w-8 h-8 rounded-xl ${variant.accent}/10 flex items-center justify-center`}>
            <Icon className={`w-4 h-4 ${variant.text}`} />
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-primary mb-1 group-hover:scale-105 transition-transform duration-300">
        {value}
      </div>
      <div className={`w-full h-1 ${variant.accent}/20 rounded-full overflow-hidden`}>
        <div className={`
          h-full ${variant.accent} rounded-full transition-all duration-700 ease-out
          group-hover:w-full
        `} style={{ width: '60%' }} />
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
    shouldReduceMotion 
  } = useTheme();

  // State Management
  const [places, setPlaces] = useState([]);
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddListDialog, setShowAddListDialog] = useState(false);
  const [showEditMessageDialog, setShowEditMessageDialog] = useState(false);
  const [showThemePanel, setShowThemePanel] = useState(false);
  const [messageTemplate, setMessageTemplate] = useState('');
  const [newListData, setNewListData] = useState({
    name: '',
    messageTemplate: '',
    file: null
  });

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

  // Update place status handler
  const updatePlaceStatus = async (placeId, newStatus) => {
    try {
      const response = await fetch(`https://wabulk.pythonanywhere.com/api/places/${placeId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setPlaces(prevPlaces =>
          prevPlaces.map(place =>
            place.id === placeId ? { ...place, status: newStatus } : place
          )
        );
      }
    } catch (error) {
      console.error('Error updating place status:', error);
    }
  };

  // Fetch lists
  const fetchLists = useCallback(async () => {
    try {
      const response = await fetch('https://wabulk.pythonanywhere.com/api/lists');
      const data = await response.json();
      setLists(data);
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  }, []);

  // Update message template
  const updateMessageTemplate = async () => {
    if (!selectedList) return;
    
    try {
      setLoading(true);
      const response = await fetch(`https://wabulk.pythonanywhere.com/api/lists/${selectedList.id}/message-template`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message_template: messageTemplate })
      });

      if (response.ok) {
        setSelectedList(prev => ({ ...prev, message_template: messageTemplate }));
        setShowEditMessageDialog(false);
        await fetchPlaces(selectedList.id);
      }
    } catch (error) {
      console.error('Error updating message template:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch places
  const fetchPlaces = useCallback(async (listId) => {
    if (!listId) return;
    setLoading(true);
    try {
      const response = await fetch(`https://wabulk.pythonanywhere.com/api/lists/${listId}/places`);
      const data = await response.json();
      setPlaces(data.places);
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
      className={`
        min-h-screen bg-surface-primary text-primary
        transition-all duration-500 ease-out-quart
        ${getRTLClass('', 'rtl')}
      `}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className={`
          absolute top-20 ${getRTLClass('left-10', 'right-10')} w-32 h-32 
          bg-light-primary-500/5 dark:bg-dark-primary-500/10 rounded-full blur-3xl
          ${getAnimationClass('animate-pulse-soft')}
        `} />
        <div className={`
          absolute top-40 ${getRTLClass('right-20', 'left-20')} w-24 h-24 
          bg-light-accent-500/5 dark:bg-dark-accent-500/10 rounded-full blur-2xl
          ${getAnimationClass('animate-pulse-soft')}
        `} style={{ animationDelay: '1s' }} />
        <div className={`
          absolute bottom-20 left-1/3 w-40 h-40 
          bg-light-success-500/5 dark:bg-dark-success-500/10 rounded-full blur-3xl
          ${getAnimationClass('animate-pulse-soft')}
        `} style={{ animationDelay: '2s' }} />
      </div>
      
      <main className="container mx-auto px-4 pb-6 relative z-10">
        {/* Header Section */}
        <header className="py-6">
          <div className="flex items-center justify-between mb-6">
            {/* Logo and Navigation */}
            <div className="flex items-center gap-4">
              <Logo showSubtitle={!selectedList} />
              {selectedList && (
                <div className={`
                  hidden sm:flex items-center gap-3 text-secondary 
                  bg-surface-secondary border border-light dark:border-dark-border-light
                  px-4 py-2 rounded-2xl backdrop-blur-sm
                  ${getAnimationClass('animate-slide-in-right')}
                `}>
                  <ChevronRight 
                    size={16} 
                    className={`text-light-success-500 dark:text-dark-success-400 ${isRTL ? 'rotate-180' : ''}`} 
                  />
                  <span className="font-medium">{selectedList.name}</span>
                  <div className="w-2 h-2 rounded-full bg-light-success-500 dark:bg-dark-success-400 animate-pulse-soft" />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <ThemeToggle variant="simple" />
              
              {selectedList && (
                <button
                  onClick={() => setShowEditMessageDialog(true)}
                  className="
                    group relative bg-surface-secondary border border-light dark:border-dark-border-light
                    w-12 h-12 rounded-2xl flex items-center justify-center 
                    hover:bg-surface-tertiary transition-all duration-300
                    sm:w-auto sm:px-4 sm:h-auto sm:py-3 
                    hover:scale-105 hover:shadow-medium focus:outline-none 
                    focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
                  "
                  aria-label="تعديل قالب الرسالة"
                >
                  <MessageSquare size={20} className="text-secondary group-hover:text-primary transition-colors" />
                  <span className="hidden sm:inline sm:mr-2 text-secondary group-hover:text-primary font-medium">
                    تعديل الرسالة
                  </span>
                </button>
              )}
              
              <button
                onClick={() => setShowAddListDialog(true)}
                className="
                  group relative bg-gradient-to-br from-light-primary-500 to-light-primary-600
                  dark:from-dark-primary-600 dark:to-dark-primary-700
                  w-12 h-12 rounded-2xl flex items-center justify-center 
                  hover:from-light-primary-400 hover:to-light-primary-500
                  dark:hover:from-dark-primary-500 dark:hover:to-dark-primary-600
                  transition-all duration-300 shadow-soft hover:shadow-glow
                  sm:w-auto sm:px-4 sm:h-auto sm:py-3 
                  hover:scale-105 focus:outline-none 
                  focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
                  text-white
                "
                aria-label="إنشاء قائمة جديدة"
              >
                <Plus size={20} className="drop-shadow-sm" />
                <span className="hidden sm:inline sm:mr-2 font-medium drop-shadow-sm">
                  قائمة جديدة
                </span>
              </button>
            </div>
          </div>

          {/* Stats Section */}
          {selectedList && (
            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 ${getAnimationClass('animate-fade-in-up')}`}>
              <StatsCard 
                label="الإجمالي" 
                value={stats.total} 
                color="primary"
                icon={MessageCircle}
              />
              <StatsCard 
                label="متصل" 
                value={stats.connected} 
                color="success"
                icon={Check}
              />
              <StatsCard 
                label="غير متصل" 
                value={stats.not_connected} 
                color="warning"
                icon={AlertTriangle}
              />
              <StatsCard 
                label="غير مدعوم" 
                value={stats.unsupported} 
                color="error"
                icon={X}
              />
            </div>
          )}

          {/* Lists Section */}
          <div className="mb-6">
            <div className="overflow-x-auto hide-scrollbar">
              <div className="flex gap-3 pb-2 min-w-max">
                {lists.map(list => (
                  <button
                    key={list.id}
                    onClick={() => setSelectedList(list)}
                    className={`
                      px-6 py-3 rounded-2xl whitespace-nowrap flex items-center gap-2
                      transition-all duration-300 ease-out-quart font-medium
                      focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
                      ${selectedList?.id === list.id
                        ? 'bg-gradient-to-r from-light-primary-500 to-light-primary-600 dark:from-dark-primary-600 dark:to-dark-primary-700 text-white shadow-soft'
                        : 'bg-surface-secondary border border-light dark:border-dark-border-light text-secondary hover:bg-surface-tertiary hover:text-primary'
                      }
                    `}
                    aria-pressed={selectedList?.id === list.id}
                  >
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
            showFilters={selectedList !== null}
            onFilterClick={() => {
              // Future filter functionality
              console.log('Filter clicked');
            }}
            className="mb-2"
          />
        </header>

        {/* Main Content */}
        {selectedList ? (
          <PlacesGrid
            places={places.filter(place =>
              place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              place.phone.includes(searchTerm)
            )}
            onSendMessage={handleSendMessage}
            onUpdateStatus={updatePlaceStatus}
          />
        ) : (
          <div className={`
            text-center py-16 ${getAnimationClass('animate-fade-in-up')}
          `}>
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-surface-secondary rounded-full flex items-center justify-center">
                <MessageCircle className="w-12 h-12 text-tertiary" />
              </div>
              <h2 className="text-2xl font-bold text-primary mb-4">
                مرحباً بك في وا بلك
              </h2>
              <p className="text-secondary mb-8">
                ابدأ بإنشاء قائمة جديدة لإرسال الرسائل الجماعية عبر واتساب
              </p>
              <button
                onClick={() => setShowAddListDialog(true)}
                className="
                  group bg-gradient-to-r from-light-primary-500 to-light-primary-600
                  dark:from-dark-primary-600 dark:to-dark-primary-700
                  px-8 py-4 rounded-2xl flex items-center gap-3 mx-auto
                  hover:from-light-primary-400 hover:to-light-primary-500
                  dark:hover:from-dark-primary-500 dark:hover:to-dark-primary-600
                  transition-all duration-300 shadow-soft hover:shadow-glow
                  hover:scale-105 text-white font-medium
                  focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
                "
              >
                <Plus size={20} />
                <span>إنشاء قائمة جديدة</span>
                <ChevronRight 
                  size={20} 
                  className={`
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    ${isRTL ? 'rotate-180' : ''}
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

      {/* Edit Message Dialog */}
      {showEditMessageDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowEditMessageDialog(false)}
            aria-hidden="true"
          />
          <div className={`
            relative w-full max-w-lg bg-surface-primary border border-light dark:border-dark-border-light
            rounded-3xl shadow-strong p-6 ${getAnimationClass('animate-scale-in')}
          `}>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-primary">
                تعديل قالب الرسالة
              </h3>
              <button
                onClick={() => setShowEditMessageDialog(false)}
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

            {/* Message Template */}
            <div className="space-y-4">
              <div>
                <label className="text-sm text-secondary block mb-2 font-medium">
                  قالب الرسالة
                </label>
                <textarea
                  value={messageTemplate}
                  onChange={(e) => setMessageTemplate(e.target.value)}
                  placeholder="اكتب قالب الرسالة هنا..."
                  className="
                    w-full bg-surface-secondary border border-light dark:border-dark-border-light
                    rounded-2xl p-4 text-primary placeholder-tertiary
                    focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
                    focus:border-transparent transition-all duration-300 h-32 resize-none
                  "
                  aria-describedby="template-help"
                />
                <p id="template-help" className="text-xs text-tertiary mt-2">
                  المتغيرات المتاحة: {'{name}'}, {'{phone_number}'}, {'{facebook_url}'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={updateMessageTemplate}
                  disabled={loading}
                  className="
                    flex-1 bg-gradient-to-r from-light-primary-500 to-light-primary-600
                    dark:from-dark-primary-600 dark:to-dark-primary-700
                    py-3 rounded-2xl flex items-center justify-center gap-2
                    hover:from-light-primary-400 hover:to-light-primary-500
                    dark:hover:from-dark-primary-500 dark:hover:to-dark-primary-600
                    transition-all duration-300 shadow-soft hover:shadow-glow
                    text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed
                    focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
                  "
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  <span>حفظ التغييرات</span>
                </button>
                <button
                  onClick={() => setShowEditMessageDialog(false)}
                  className="
                    px-6 py-3 rounded-2xl bg-surface-secondary border border-light dark:border-dark-border-light
                    text-secondary hover:text-primary hover:bg-surface-tertiary
                    transition-all duration-300 font-medium
                    focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
                  "
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-surface-primary border border-light dark:border-dark-border-light rounded-3xl p-8 shadow-strong">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-light-primary-500 dark:bg-dark-primary-500 blur-xl opacity-20" />
                <Loader2 className="animate-spin text-light-primary-500 dark:text-dark-primary-400 relative" size={32} />
              </div>
              <span className="text-xl font-medium text-primary">جاري التحميل...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppDashboard;