// NEXORA Life OS - Ultimate Mobile App
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Target, 
  Clock, 
  MessageCircle, 
  Settings, 
  Star,
  Heart,
  Zap,
  TrendingUp,
  Calendar,
  User,
  ChevronRight,
  Play,
  CheckCircle,
  Circle,
  Sparkles,
  Moon,
  Sun
} from 'lucide-react';

// Demo Data for Ahmed Khaled
const demoUser = {
  name: "أحمد خالد",
  nameEn: "Ahmed Khaled",
  age: 28,
  city: "القاهرة",
  timezone: "Africa/Cairo",
  personality: {
    openness: 85,
    conscientiousness: 70,
    extraversion: 65,
    agreeableness: 90,
    neuroticism: 30
  },
  values: ["العائلة", "الإيمان", "التعليم", "الاحترام"],
  lifeScore: 75,
  pillars: {
    health: 50,
    wealth: 70,
    relationships: 85,
    growth: 80
  },
  currentEnergy: 60,
  goals: [
    { id: 1, title: "ادخار 500 جنيه", progress: 60, category: "wealth" },
    { id: 2, title: "رياضة يومية", progress: 30, category: "health" },
    { id: 3, title: "زيارة العائلة", progress: 90, category: "relationships" },
    { id: 4, title: "قراءة كتاب", progress: 45, category: "growth" }
  ],
  todayTasks: [
    { id: 1, title: "صلاة الجمعة", completed: true, energy: "high" },
    { id: 2, title: "رياضة", completed: false, energy: "medium" },
    { id: 3, title: "قراءة قرآن", completed: true, energy: "high" },
    { id: 4, title: "فطور صحي", completed: true, energy: "medium" }
  ]
};

// Welcome Screen Component
const WelcomeScreen = ({ onNext }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-emerald-600 flex flex-col items-center justify-center p-6 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Geometric Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="islamic-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <polygon points="10,1 4,7 4,13 10,19 16,13 16,7" fill="currentColor"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#islamic-pattern)" />
        </svg>
      </div>

      {/* Animated Logo */}
      <motion.div
        className="text-center mb-8"
        initial={{ scale: 0.5, y: 50 }}
        animate={{ scale: isVisible ? 1.05 : 1, y: 0 }}
        transition={{ 
          duration: 0.6,
          type: "spring",
          stiffness: 200,
          damping: 20
        }}
      >
        <h1 className="text-6xl font-bold text-white mb-2 font-cairo">
          NEXORA
        </h1>
        <div className="text-yellow-400 text-sm tracking-widest">
          نظام تشغيل الحياة
        </div>
      </motion.div>

      {/* Greeting Text */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <p className="text-white text-xl mb-2 font-cairo">
          حياتك على وشك تتحول للأفضل ✨
        </p>
        <p className="text-blue-200 text-sm">
          مرحباً في القاهرة
        </p>
      </motion.div>

      {/* Confetti Animation */}
      <motion.div
        className="absolute top-1/4 left-1/2 transform -translate-x-1/2"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <Sparkles className="text-yellow-400 w-8 h-8" />
      </motion.div>

      {/* Start Button */}
      <motion.button
        onClick={onNext}
        className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 px-12 py-4 rounded-full text-xl font-bold font-cairo shadow-lg border-2 border-yellow-300"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95, rotateZ: 1 }}
      >
        ابدأ الآن
      </motion.button>

      {/* Device Detection Badge */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <span className="text-white text-sm">📱 مُحسَّن للهاتف المحمول</span>
      </motion.div>
    </motion.div>
  );
};

// Personality Quiz Screen
const PersonalityQuizScreen = ({ onNext }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      text: "اختر صباحك المثالي",
      options: [
        { id: 'a', text: "رياضة مع الأصدقاء", image: "🏃‍♂️", trait: "extraversion" },
        { id: 'b', text: "قراءة في هدوء", image: "📚", trait: "openness" },
        { id: 'c', text: "تنظيم اليوم", image: "📋", trait: "conscientiousness" },
        { id: 'd', text: "مساعدة الآخرين", image: "🤝", trait: "agreeableness" }
      ]
    },
    {
      id: 2,
      text: "عند مواجهة تحدي جديد",
      options: [
        { id: 'a', text: "أخطط بعناية", image: "🎯", trait: "conscientiousness" },
        { id: 'b', text: "أجرب طرق مبتكرة", image: "💡", trait: "openness" },
        { id: 'c', text: "أطلب المساعدة", image: "👥", trait: "agreeableness" },
        { id: 'd', text: "أواجهه بثقة", image: "💪", trait: "extraversion" }
      ]
    },
    {
      id: 3,
      text: "أفضل طريقة للاسترخاء",
      options: [
        { id: 'a', text: "تأمل وذكر", image: "🕌", trait: "openness" },
        { id: 'b', text: "وقت مع العائلة", image: "👨‍👩‍👧‍👦", trait: "agreeableness" },
        { id: 'c', text: "ترتيب المنزل", image: "🏠", trait: "conscientiousness" },
        { id: 'd', text: "نشاط اجتماعي", image: "🎉", trait: "extraversion" }
      ]
    },
    {
      id: 4,
      text: "هدفك الأهم في الحياة",
      options: [
        { id: 'a', text: "إسعاد العائلة", image: "❤️", trait: "agreeableness" },
        { id: 'b', text: "تحقيق النجاح", image: "🏆", trait: "conscientiousness" },
        { id: 'c', text: "اكتشاف الجديد", image: "🌟", trait: "openness" },
        { id: 'd', text: "بناء علاقات", image: "🤗", trait: "extraversion" }
      ]
    }
  ];

  const handleAnswer = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setShowResults(true);
      }, 300);
    }
  };

  const calculatePersonality = () => {
    const traits = {
      openness: 0,
      conscientiousness: 0,
      extraversion: 0,
      agreeableness: 0,
      neuroticism: 20 // Base level
    };

    answers.forEach(answer => {
      traits[answer.trait] += 25;
    });

    return traits;
  };

  if (showResults) {
    const personality = calculatePersonality();
    const dominantTrait = Object.keys(personality).reduce((a, b) => 
      personality[a] > personality[b] ? a : b
    );

    const traitDescriptions = {
      openness: "مبدع ومنفتح على التجارب الجديدة",
      conscientiousness: "منظم ومنضبط في تحقيق الأهداف",
      extraversion: "اجتماعي ومحب للتفاعل مع الآخرين",
      agreeableness: "متعاطف ومتعاون مع الجميع",
      neuroticism: "هادئ ومتوازن عاطفياً"
    };

    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-6 flex flex-col justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="bg-white rounded-3xl p-8 shadow-xl max-w-md mx-auto"
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <div className="text-center mb-6">
            <motion.div
              className="w-20 h-20 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <User className="text-white w-10 h-10" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-800 font-cairo mb-2">
              شخصيتك المميزة
            </h2>
            <p className="text-gray-600 font-cairo">
              {traitDescriptions[dominantTrait]}
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {Object.entries(personality).map(([trait, score]) => (
              <div key={trait} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 font-cairo">
                  {traitDescriptions[trait]}
                </span>
                <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
                <span className="text-sm font-bold text-gray-800">
                  {score}%
                </span>
              </div>
            ))}
          </div>

          <motion.button
            onClick={onNext}
            className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-4 rounded-2xl font-bold font-cairo text-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            متابعة الرحلة
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Progress Bar */}
      <div className="mb-8 pt-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600 font-cairo">
            سؤال {currentQuestion + 1} من {questions.length}
          </span>
          <span className="text-sm text-gray-600">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <motion.div
        key={currentQuestion}
        className="text-center mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 font-cairo">
          {currentQ.text}
        </h2>
      </motion.div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-4">
        {currentQ.options.map((option, index) => (
          <motion.button
            key={option.id}
            onClick={() => handleAnswer(option)}
            className="bg-white rounded-2xl p-6 shadow-md border-2 border-transparent hover:border-blue-300 transition-all"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-4xl mb-3">{option.image}</div>
            <p className="text-gray-800 font-cairo text-sm font-medium">
              {option.text}
            </p>
          </motion.button>
        ))}
      </div>

      {/* Swipe Instructions */}
      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-gray-500 text-sm font-cairo">
          اضغط لاختيار إجابتك
        </p>
      </motion.div>
    </motion.div>
  );
};

// Core Values Screen
const CoreValuesScreen = ({ onNext }) => {
  const [values, setValues] = useState([
    { id: 1, text: "العائلة", icon: "👨‍👩‍👧‍👦", description: "كل قرار يؤثر على الأسرة" },
    { id: 2, text: "الإيمان", icon: "🕌", description: "الدين أساس كل شيء" },
    { id: 3, text: "التعليم", icon: "📚", description: "العلم نور" },
    { id: 4, text: "الاحترام", icon: "🤝", description: "احترام الآخرين والذات" },
    { id: 5, text: "الصحة", icon: "💪", description: "الصحة تاج على رؤوس الأصحاء" },
    { id: 6, text: "الإبداع", icon: "🎨", description: "التفكير خارج الصندوق" }
  ]);
  
  const [selectedValues, setSelectedValues] = useState([]);
  const [showExplanation, setShowExplanation] = useState(null);

  const handleValueSelect = (value) => {
    if (selectedValues.find(v => v.id === value.id)) {
      setSelectedValues(selectedValues.filter(v => v.id !== value.id));
    } else if (selectedValues.length < 4) {
      setSelectedValues([...selectedValues, value]);
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="pt-8 pb-4">
        <h2 className="text-2xl font-bold text-gray-800 font-cairo text-center mb-2">
          رتب قيمك الأساسية
        </h2>
        <p className="text-gray-600 font-cairo text-center text-sm">
          اختر 4 قيم تمثلك ({selectedValues.length}/4)
        </p>
      </div>

      {/* Selected Values */}
      {selectedValues.length > 0 && (
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-lg font-bold text-gray-700 font-cairo mb-3">
            قيمك المختارة:
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedValues.map((value, index) => (
              <motion.div
                key={value.id}
                className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-4 py-2 rounded-full flex items-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="mr-2">{value.icon}</span>
                <span className="font-cairo text-sm">{value.text}</span>
                <span className="ml-2 text-xs bg-white/20 rounded-full w-5 h-5 flex items-center justify-center">
                  {index + 1}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Values Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {values.map((value, index) => {
          const isSelected = selectedValues.find(v => v.id === value.id);
          return (
            <motion.button
              key={value.id}
              onClick={() => handleValueSelect(value)}
              onLongPress={() => setShowExplanation(value)}
              className={`bg-white rounded-2xl p-6 shadow-md border-2 transition-all ${
                isSelected 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-transparent hover:border-gray-300'
              } ${selectedValues.length >= 4 && !isSelected ? 'opacity-50' : ''}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: isSelected ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={selectedValues.length >= 4 && !isSelected}
            >
              <div className="text-3xl mb-2">{value.icon}</div>
              <p className="text-gray-800 font-cairo font-medium text-sm">
                {value.text}
              </p>
              {isSelected && (
                <motion.div
                  className="mt-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <CheckCircle className="text-blue-500 w-5 h-5 mx-auto" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Continue Button */}
      {selectedValues.length >= 3 && (
        <motion.button
          onClick={onNext}
          className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-4 rounded-2xl font-bold font-cairo text-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          متابعة
        </motion.button>
      )}

      {/* Explanation Modal */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowExplanation(null)}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 max-w-sm"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="text-4xl mb-3">{showExplanation.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 font-cairo mb-2">
                  {showExplanation.text}
                </h3>
                <p className="text-gray-600 font-cairo text-sm">
                  {showExplanation.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// First Goal Screen
const FirstGoalScreen = ({ onNext }) => {
  const [goal, setGoal] = useState("");
  const [subTasks, setSubTasks] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = [
    "ادخار 1000 جنيه",
    "رياضة يومية",
    "زيارة العائلة أسبوعياً",
    "قراءة كتاب شهرياً",
    "تعلم مهارة جديدة"
  ];

  const generateSubTasks = (goalText) => {
    const taskMap = {
      "ادخار": ["تقليل المصروفات", "بيع شيء قديم", "إيجاد دخل إضافي"],
      "رياضة": ["المشي 30 دقيقة", "تمارين منزلية", "شرب الماء أكثر"],
      "زيارة": ["تحديد موعد", "التواصل مع العائلة", "تحضير هدية"],
      "قراءة": ["اختيار كتاب", "تحديد وقت يومي", "تلخيص ما قرأت"],
      "تعلم": ["اختيار المهارة", "إيجاد مصادر", "ممارسة يومية"]
    };

    for (const [key, tasks] of Object.entries(taskMap)) {
      if (goalText.includes(key)) {
        return tasks;
      }
    }
    return ["خطوة أولى", "خطوة ثانية", "خطوة ثالثة"];
  };

  const handleGoalChange = (text) => {
    setGoal(text);
    if (text.length > 3) {
      setSubTasks(generateSubTasks(text));
    } else {
      setSubTasks([]);
    }
  };

  const handleSuggestion = (suggestion) => {
    setGoal(suggestion);
    setSubTasks(generateSubTasks(suggestion));
    setShowSuggestions(false);
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="pt-8 pb-6">
        <h2 className="text-2xl font-bold text-gray-800 font-cairo text-center mb-2">
          هدفك الأول
        </h2>
        <p className="text-gray-600 font-cairo text-center text-sm">
          ما هدفك الأول هذا الأسبوع؟
        </p>
      </div>

      {/* Goal Input */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={goal}
            onChange={(e) => handleGoalChange(e.target.value)}
            placeholder="اكتب هدفك هنا..."
            className="w-full bg-white rounded-2xl p-4 text-right font-cairo text-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
            dir="rtl"
          />
          <button
            onClick={() => setShowSuggestions(!showSuggestions)}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500"
          >
            <Sparkles className="w-5 h-5" />
          </button>
        </div>

        {/* Suggestions */}
        <AnimatePresence>
          {showSuggestions && (
            <motion.div
              className="mt-3 bg-white rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {suggestions.map((suggestion, index) => (
                <motion.button
                  key={suggestion}
                  onClick={() => handleSuggestion(suggestion)}
                  className="w-full text-right p-4 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 font-cairo"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Sparkles className="inline w-4 h-4 ml-2 text-yellow-500" />
                  {suggestion}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sub Tasks */}
      <AnimatePresence>
        {subTasks.length > 0 && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-bold text-gray-700 font-cairo mb-4">
              خطوات تحقيق الهدف:
            </h3>
            <div className="space-y-3">
              {subTasks.map((task, index) => (
                <motion.div
                  key={task}
                  className="bg-white rounded-xl p-4 shadow-sm flex items-center"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Circle className="w-5 h-5 text-gray-400 ml-3" />
                  <span className="font-cairo text-gray-700">{task}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue Button */}
      {goal.length > 3 && (
        <motion.button
          onClick={onNext}
          className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-4 rounded-2xl font-bold font-cairo text-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          إنشاء الهدف ✨
        </motion.button>
      )}
    </motion.div>
  );
};

// AI Introduction Screen
const AIIntroScreen = ({ onNext }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `مرحباً ${demoUser.name}! أنا نوفا، رفيقك الذكي في رحلة تطوير الذات. تعلمت أسلوبك: إبداعي ومخلص للعائلة والقيم. 🌟`,
      sender: 'nova',
      timestamp: new Date()
    }
  ]);
  const [userInput, setUserInput] = useState("");

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const newUserMessage = {
      id: messages.length + 1,
      text: userInput,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newUserMessage]);
    setUserInput("");

    // Simulate Nova's response
    setTimeout(() => {
      const responses = [
        "ربنا يوفقك! سأكون معك في كل خطوة 💪",
        "أحب حماسك! دعني أساعدك في تنظيم أهدافك",
        "ممتاز! سنحقق أهدافك معاً إن شاء الله"
      ];
      
      const novaResponse = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'nova',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, novaResponse]);
    }, 1000);
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="bg-white shadow-sm p-6 pt-12">
        <div className="flex items-center">
          <motion.div
            className="w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mr-4"
            animate={{ 
              boxShadow: [
                "0 0 0 0 rgba(59, 130, 246, 0.7)",
                "0 0 0 10px rgba(59, 130, 246, 0)",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="text-white w-6 h-6" />
          </motion.div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 font-cairo">
              نوفا - مساعدك الذكي
            </h2>
            <p className="text-gray-500 text-sm font-cairo">
              متصل الآن
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div
              className={`max-w-xs px-4 py-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-800 shadow-sm'
              }`}
            >
              <p className="font-cairo text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
              }`}>
                {message.timestamp.toLocaleTimeString('ar-EG', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-white p-6 border-t border-gray-100">
        <div className="flex items-center space-x-3 space-x-reverse">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="اكتب رسالتك..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-right font-cairo focus:outline-none focus:ring-2 focus:ring-blue-500"
            dir="rtl"
          />
          <motion.button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white rounded-full p-3"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </motion.button>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-center mt-4 space-x-2 space-x-reverse">
          <button className="bg-gray-100 rounded-full px-4 py-2 text-sm font-cairo text-gray-600">
            ساعدني في هدفي
          </button>
          <button className="bg-gray-100 rounded-full px-4 py-2 text-sm font-cairo text-gray-600">
            نصائح يومية
          </button>
        </div>

        {/* Continue to Dashboard */}
        <motion.button
          onClick={onNext}
          className="w-full mt-6 bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-4 rounded-2xl font-bold font-cairo text-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          ادخل إلى لوحة التحكم
        </motion.button>
      </div>
    </motion.div>
  );
};

// Main Dashboard Screen
const DashboardScreen = ({ onNavigate }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "صباح الخير";
    if (hour < 18) return "مساء الخير";
    return "مساء الخير";
  };

  const getEnergyStatus = () => {
    if (demoUser.currentEnergy < 40) return { text: "طاقة منخفضة - خذ استراحة", color: "text-red-500", icon: "😴" };
    if (demoUser.currentEnergy > 80) return { text: "طاقة عالية - وقت الإنجاز", color: "text-green-500", icon: "⚡" };
    return { text: "طاقة متوسطة - استمر", color: "text-yellow-500", icon: "😊" };
  };

  const energyStatus = getEnergyStatus();

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="bg-white shadow-sm p-6 pt-12 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 font-cairo">
              {getGreeting()} {demoUser.name}
            </h1>
            <p className="text-gray-500 font-cairo text-sm">
              {currentTime.toLocaleDateString('ar-EG', { 
                weekday: 'long',
                day: 'numeric',
                month: 'long'
              })}
            </p>
          </div>
          <motion.div
            className="w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <User className="text-white w-6 h-6" />
          </motion.div>
        </div>

        {/* Energy Status */}
        <motion.div
          className="bg-gray-50 rounded-2xl p-4 flex items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-2xl ml-3">{energyStatus.icon}</span>
          <div>
            <p className={`font-cairo font-medium ${energyStatus.color}`}>
              {energyStatus.text}
            </p>
            <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${demoUser.currentEnergy}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Life Score Circle */}
      <div className="p-6">
        <motion.div
          className="bg-white rounded-3xl p-8 shadow-lg text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h3 className="text-lg font-bold text-gray-700 font-cairo mb-4">
            نقاط الحياة
          </h3>
          
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-gray-200"
              />
              <motion.circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 56}`}
                className="text-blue-500"
                initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                animate={{ 
                  strokeDashoffset: 2 * Math.PI * 56 * (1 - demoUser.lifeScore / 100)
                }}
                transition={{ duration: 2, delay: 0.5 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.span 
                  className="text-3xl font-bold text-gray-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  {demoUser.lifeScore}
                </motion.span>
                <div className="text-gray-500 text-sm">من 100</div>
              </div>
            </div>
          </div>

          <motion.div
            className="text-4xl mb-2"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 2,
              delay: 1.5,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            😊
          </motion.div>
        </motion.div>
      </div>

      {/* Four Pillars */}
      <div className="px-6 mb-6">
        <h3 className="text-lg font-bold text-gray-700 font-cairo mb-4">
          أركان الحياة الأربعة
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { key: 'health', title: 'الصحة', icon: Heart, color: 'from-red-400 to-pink-500' },
            { key: 'wealth', title: 'المال', icon: TrendingUp, color: 'from-green-400 to-emerald-500' },
            { key: 'relationships', title: 'العلاقات', icon: Heart, color: 'from-purple-400 to-pink-500' },
            { key: 'growth', title: 'النمو', icon: Star, color: 'from-yellow-400 to-orange-500' }
          ].map((pillar, index) => {
            const IconComponent = pillar.icon;
            const score = demoUser.pillars[pillar.key];
            
            return (
              <motion.div
                key={pillar.key}
                className="bg-white rounded-2xl p-4 shadow-md"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`w-10 h-10 bg-gradient-to-r ${pillar.color} rounded-full flex items-center justify-center mb-3`}>
                  <IconComponent className="text-white w-5 h-5" />
                </div>
                <h4 className="font-cairo font-bold text-gray-800 text-sm mb-2">
                  {pillar.title}
                </h4>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <motion.div
                    className={`bg-gradient-to-r ${pillar.color} h-2 rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                  />
                </div>
                <p className="text-gray-600 text-xs font-cairo">
                  {score}%
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Daily Priorities */}
      <div className="px-6 mb-8">
        <h3 className="text-lg font-bold text-gray-700 font-cairo mb-4">
          أولويات اليوم
        </h3>
        <div className="space-y-3">
          {demoUser.todayTasks.slice(0, 3).map((task, index) => (
            <motion.div
              key={task.id}
              className="bg-white rounded-xl p-4 shadow-sm flex items-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              >
                {task.completed ? (
                  <CheckCircle className="w-6 h-6 text-green-500 ml-3" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-400 ml-3" />
                )}
              </motion.div>
              <span className={`font-cairo flex-1 ${
                task.completed ? 'text-gray-500 line-through' : 'text-gray-800'
              }`}>
                {task.title}
              </span>
              <div className={`w-2 h-2 rounded-full ${
                task.energy === 'high' ? 'bg-green-400' :
                task.energy === 'medium' ? 'bg-yellow-400' : 'bg-red-400'
              }`} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation currentPage="dashboard" onNavigate={onNavigate} />
    </motion.div>
  );
};

// Bottom Navigation Component
const BottomNavigation = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'الرئيسية' },
    { id: 'goals', icon: Target, label: 'الأهداف' },
    { id: 'timeline', icon: Clock, label: 'الجدول' },
    { id: 'chat', icon: MessageCircle, label: 'نوفا' },
    { id: 'settings', icon: Settings, label: 'الإعدادات' }
  ];

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconComponent className="w-5 h-5 mb-1" />
              <span className="text-xs font-cairo font-medium">
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  className="w-1 h-1 bg-blue-600 rounded-full mt-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

// Goals Screen
const GoalsScreen = ({ onNavigate }) => {
  const [expandedGoal, setExpandedGoal] = useState(null);

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="bg-white shadow-sm p-6 pt-12 rounded-b-3xl">
        <h1 className="text-2xl font-bold text-gray-800 font-cairo text-center">
          أهدافك
        </h1>
        <p className="text-gray-500 font-cairo text-center text-sm mt-1">
          رحلتك نحو النجاح
        </p>
      </div>

      {/* Goals List */}
      <div className="p-6 space-y-4">
        {demoUser.goals.map((goal, index) => (
          <motion.div
            key={goal.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.button
              onClick={() => setExpandedGoal(expandedGoal === goal.id ? null : goal.id)}
              className="w-full p-6 text-right"
              whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <ChevronRight 
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    expandedGoal === goal.id ? 'rotate-90' : ''
                  }`} 
                />
                <h3 className="font-cairo font-bold text-gray-800">
                  {goal.title}
                </h3>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-emerald-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${goal.progress}%` }}
                  transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {goal.progress}% مكتمل
                </span>
                <div className={`w-3 h-3 rounded-full ${
                  goal.category === 'health' ? 'bg-red-400' :
                  goal.category === 'wealth' ? 'bg-green-400' :
                  goal.category === 'relationships' ? 'bg-purple-400' :
                  'bg-yellow-400'
                }`} />
              </div>
            </motion.button>

            <AnimatePresence>
              {expandedGoal === goal.id && (
                <motion.div
                  className="px-6 pb-6"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-gray-600 font-cairo text-sm mb-3">
                      خطوات تحقيق الهدف:
                    </p>
                    <div className="space-y-2">
                      {["خطوة أولى", "خطوة ثانية", "خطوة ثالثة"].map((step, i) => (
                        <div key={i} className="flex items-center">
                          <Circle className="w-4 h-4 text-gray-400 ml-2" />
                          <span className="text-gray-600 font-cairo text-sm">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <BottomNavigation currentPage="goals" onNavigate={onNavigate} />
    </motion.div>
  );
};

// AI Chat Screen
const ChatScreen = ({ onNavigate }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `مرحباً ${demoUser.name}! كيف يمكنني مساعدتك اليوم؟ 🌟`,
      sender: 'nova',
      timestamp: new Date()
    }
  ]);
  const [userInput, setUserInput] = useState("");

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const newUserMessage = {
      id: messages.length + 1,
      text: userInput,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newUserMessage]);
    setUserInput("");

    // Simulate Nova's response
    setTimeout(() => {
      const responses = [
        "ممتاز! دعني أساعدك في تحقيق هذا الهدف 💪",
        "فكرة رائعة! إليك خطة عملية:",
        "ربنا يوفقك! سنحقق هذا معاً إن شاء الله ✨"
      ];
      
      const novaResponse = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'nova',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, novaResponse]);
    }, 1000);
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex flex-col pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="bg-white shadow-sm p-6 pt-12">
        <div className="flex items-center">
          <motion.div
            className="w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mr-4"
            animate={{ 
              boxShadow: [
                "0 0 0 0 rgba(59, 130, 246, 0.7)",
                "0 0 0 10px rgba(59, 130, 246, 0)",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="text-white w-6 h-6" />
          </motion.div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 font-cairo">
              نوفا - مساعدك الذكي
            </h2>
            <p className="text-gray-500 text-sm font-cairo">
              متصل الآن • يكتب...
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div
              className={`max-w-xs px-4 py-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white rounded-br-md'
                  : 'bg-white text-gray-800 shadow-sm rounded-bl-md'
              }`}
            >
              <p className="font-cairo text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
              }`}>
                {message.timestamp.toLocaleTimeString('ar-EG', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-white p-6 border-t border-gray-100">
        <div className="flex items-center space-x-3 space-x-reverse">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="اكتب رسالتك..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-right font-cairo focus:outline-none focus:ring-2 focus:ring-blue-500"
            dir="rtl"
          />
          <motion.button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white rounded-full p-3"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </motion.button>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-center mt-4 space-x-2 space-x-reverse">
          <button className="bg-gray-100 rounded-full px-4 py-2 text-sm font-cairo text-gray-600">
            ساعدني في هدفي
          </button>
          <button className="bg-gray-100 rounded-full px-4 py-2 text-sm font-cairo text-gray-600">
            نصائح يومية
          </button>
        </div>
      </div>

      <BottomNavigation currentPage="chat" onNavigate={onNavigate} />
    </motion.div>
  );
};

// Settings Screen
const SettingsScreen = ({ onNavigate }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [ramadanMode, setRamadanMode] = useState(false);

  const settingsSections = [
    {
      title: "الإعدادات العامة",
      items: [
        { 
          id: 'notifications', 
          label: 'الإشعارات', 
          type: 'toggle', 
          value: notifications, 
          onChange: setNotifications,
          icon: '🔔'
        },
        { 
          id: 'darkMode', 
          label: 'الوضع الليلي', 
          type: 'toggle', 
          value: darkMode, 
          onChange: setDarkMode,
          icon: darkMode ? '🌙' : '☀️'
        }
      ]
    },
    {
      title: "الإعدادات الثقافية",
      items: [
        { 
          id: 'ramadanMode', 
          label: 'وضع رمضان', 
          type: 'toggle', 
          value: ramadanMode, 
          onChange: setRamadanMode,
          icon: '🌙'
        },
        { 
          id: 'language', 
          label: 'اللغة', 
          type: 'select', 
          value: 'العربية',
          icon: '🌍'
        }
      ]
    },
    {
      title: "البيانات والخصوصية",
      items: [
        { 
          id: 'export', 
          label: 'تصدير البيانات', 
          type: 'button',
          icon: '📤'
        },
        { 
          id: 'privacy', 
          label: 'إعدادات الخصوصية', 
          type: 'button',
          icon: '🔒'
        }
      ]
    }
  ];

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="bg-white shadow-sm p-6 pt-12 rounded-b-3xl">
        <h1 className="text-2xl font-bold text-gray-800 font-cairo text-center">
          الإعدادات
        </h1>
        <div className="flex items-center justify-center mt-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
            <User className="text-white w-8 h-8" />
          </div>
        </div>
        <p className="text-center font-cairo text-gray-700 mt-2">
          {demoUser.name}
        </p>
      </div>

      {/* Settings Sections */}
      <div className="p-6 space-y-6">
        {settingsSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
          >
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <h3 className="font-cairo font-bold text-gray-800 text-right">
                {section.title}
              </h3>
            </div>
            
            <div className="divide-y divide-gray-100">
              {section.items.map((item, itemIndex) => (
                <motion.div
                  key={item.id}
                  className="p-4 flex items-center justify-between"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (sectionIndex * 0.1) + (itemIndex * 0.05) }}
                >
                  <div className="flex items-center">
                    {item.type === 'toggle' && (
                      <motion.button
                        onClick={() => item.onChange(!item.value)}
                        className={`w-12 h-6 rounded-full p-1 transition-colors ${
                          item.value ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="w-4 h-4 bg-white rounded-full shadow-sm"
                          animate={{ x: item.value ? 24 : 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      </motion.button>
                    )}
                    {item.type === 'button' && (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                    {item.type === 'select' && (
                      <span className="text-gray-500 font-cairo text-sm">
                        {item.value}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    <span className="font-cairo text-gray-800 mr-3">
                      {item.label}
                    </span>
                    <span className="text-xl">{item.icon}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <BottomNavigation currentPage="settings" onNavigate={onNavigate} />
    </motion.div>
  );
};

// Timeline Screen
const TimelineScreen = ({ onNavigate }) => {
  const timelineEvents = [
    { 
      id: 1, 
      title: "صلاة الجمعة", 
      time: "12:30", 
      type: "prayer", 
      completed: true,
      mood: "peaceful"
    },
    { 
      id: 2, 
      title: "غداء عائلي", 
      time: "14:00", 
      type: "family", 
      completed: true,
      mood: "happy"
    },
    { 
      id: 3, 
      title: "رياضة", 
      time: "16:00", 
      type: "health", 
      completed: false,
      mood: "motivated"
    },
    { 
      id: 4, 
      title: "قراءة", 
      time: "20:00", 
      type: "growth", 
      completed: false,
      mood: "calm"
    }
  ];

  const getEventIcon = (type) => {
    switch(type) {
      case 'prayer': return '🕌';
      case 'family': return '👨‍👩‍👧‍👦';
      case 'health': return '💪';
      case 'growth': return '📚';
      default: return '📅';
    }
  };

  const getMoodColor = (mood) => {
    switch(mood) {
      case 'peaceful': return 'from-blue-400 to-blue-600';
      case 'happy': return 'from-yellow-400 to-orange-500';
      case 'motivated': return 'from-green-400 to-emerald-600';
      case 'calm': return 'from-purple-400 to-indigo-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="bg-white shadow-sm p-6 pt-12 rounded-b-3xl">
        <h1 className="text-2xl font-bold text-gray-800 font-cairo text-center">
          جدولك اليومي
        </h1>
        <p className="text-gray-500 font-cairo text-center text-sm mt-1">
          {new Date().toLocaleDateString('ar-EG', { 
            weekday: 'long',
            day: 'numeric',
            month: 'long'
          })}
        </p>
      </div>

      {/* Timeline */}
      <div className="p-6">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute right-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-300 to-emerald-300" />
          
          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.id}
              className="relative flex items-center mb-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              {/* Timeline Dot */}
              <motion.div
                className={`absolute right-6 w-4 h-4 bg-gradient-to-r ${getMoodColor(event.mood)} rounded-full border-4 border-white shadow-lg z-10`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2 + 0.3 }}
              />
              
              {/* Event Card */}
              <motion.div
                className={`bg-white rounded-2xl p-4 shadow-md mr-12 flex-1 ${
                  event.completed ? 'opacity-75' : ''
                }`}
                whileHover={{ scale: 1.02, x: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500 font-cairo">
                    {event.time}
                  </span>
                  <div className="flex items-center">
                    <span className="text-xl ml-2">{getEventIcon(event.type)}</span>
                    {event.completed && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </div>
                
                <h4 className="font-cairo font-bold text-gray-800 text-right">
                  {event.title}
                </h4>
                
                {event.completed && (
                  <div className="mt-2 flex items-center justify-end">
                    <span className="text-xs text-green-600 font-cairo mr-2">
                      مكتمل
                    </span>
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNavigation currentPage="timeline" onNavigate={onNavigate} />
    </motion.div>
  );
};

// Main NEXORA App Component
const NexoraApp = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  const handleScreenNavigation = (screen) => {
    setCurrentScreen(screen);
  };

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
    setCurrentScreen('dashboard');
  };

  const renderScreen = () => {
    if (!hasCompletedOnboarding) {
      switch (currentScreen) {
        case 'welcome':
          return <WelcomeScreen onNext={() => setCurrentScreen('quiz')} />;
        case 'quiz':
          return <PersonalityQuizScreen onNext={() => setCurrentScreen('values')} />;
        case 'values':
          return <CoreValuesScreen onNext={() => setCurrentScreen('goal')} />;
        case 'goal':
          return <FirstGoalScreen onNext={() => setCurrentScreen('ai-intro')} />;
        case 'ai-intro':
          return <AIIntroScreen onNext={handleOnboardingComplete} />;
        default:
          return <WelcomeScreen onNext={() => setCurrentScreen('quiz')} />;
      }
    }

    switch (currentScreen) {
      case 'dashboard':
        return <DashboardScreen onNavigate={handleScreenNavigation} />;
      case 'goals':
        return <GoalsScreen onNavigate={handleScreenNavigation} />;
      case 'timeline':
        return <TimelineScreen onNavigate={handleScreenNavigation} />;
      case 'chat':
        return <ChatScreen onNavigate={handleScreenNavigation} />;
      case 'settings':
        return <SettingsScreen onNavigate={handleScreenNavigation} />;
      default:
        return <DashboardScreen onNavigate={handleScreenNavigation} />;
    }
  };

  return (
    <div className="font-cairo" dir="rtl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default NexoraApp;