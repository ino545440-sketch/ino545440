import React from 'react';
import { 
  BASIC_ATTRIBUTES_OPTIONS, 
  TIME_OPTIONS, 
  BUDGET_OPTIONS, 
  HALL_OPTIONS, 
  LITERACY_OPTIONS, 
  REWARD_OPTIONS 
} from '../constants';
import { PersonaInput, SelectOption } from '../types';

interface InputSectionProps {
  input: PersonaInput;
  setInput: React.Dispatch<React.SetStateAction<PersonaInput>>;
  onSubmit: () => void;
  isLoading: boolean;
}

const SelectionGroup = ({ 
  label, 
  options, 
  value, 
  onChange,
  color = "purple"
}: { 
  label: string; 
  options: SelectOption[]; 
  value: string; 
  onChange: (val: string) => void;
  color?: "purple" | "indigo" | "blue" | "cyan" | "emerald";
}) => {
  const isCustom = value !== "" && !options.some(opt => opt.value === value);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
  };

  const colorClasses = {
    purple: { border: 'border-purple-500', bg: 'bg-purple-900/10', text: 'text-purple-400', ring: 'focus:ring-purple-500/50', hoverBorder: 'hover:border-purple-400', activeBg: 'bg-purple-900/30' },
    indigo: { border: 'border-indigo-500', bg: 'bg-indigo-900/10', text: 'text-indigo-400', ring: 'focus:ring-indigo-500/50', hoverBorder: 'hover:border-indigo-400', activeBg: 'bg-indigo-900/30' },
    blue: { border: 'border-blue-500', bg: 'bg-blue-900/10', text: 'text-blue-400', ring: 'focus:ring-blue-500/50', hoverBorder: 'hover:border-blue-400', activeBg: 'bg-blue-900/30' },
    cyan: { border: 'border-cyan-500', bg: 'bg-cyan-900/10', text: 'text-cyan-400', ring: 'focus:ring-cyan-500/50', hoverBorder: 'hover:border-cyan-400', activeBg: 'bg-cyan-900/30' },
    emerald: { border: 'border-emerald-500', bg: 'bg-emerald-900/10', text: 'text-emerald-400', ring: 'focus:ring-emerald-500/50', hoverBorder: 'hover:border-emerald-400', activeBg: 'bg-emerald-900/30' },
  };
  
  const theme = colorClasses[color] || colorClasses.purple;

  return (
    <div className="mb-6">
      <h4 className={`text-sm font-bold uppercase tracking-wider mb-3 flex items-center ${theme.text} opacity-80`}>
        {label}
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`
              relative p-3 rounded-lg border text-left transition-all duration-200 group
              ${value === opt.value 
                ? `${theme.border} bg-slate-800 shadow-[0_0_10px_rgba(0,0,0,0.3)]` 
                : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:bg-slate-800 hover:border-slate-600'}
            `}
          >
            <div className={`font-bold text-xs mb-0.5 group-hover:text-white ${value === opt.value ? 'text-white' : 'text-slate-300'}`}>
              {opt.label}
            </div>
            {/* Shorten description for compact view if needed, or keep as is */}
            <div className="text-[10px] opacity-60 leading-tight">{opt.description}</div>
            {value === opt.value && (
              <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${theme.bg.replace('/10', '')} shadow-[0_0_5px_currentColor]`}></div>
            )}
          </button>
        ))}
      </div>
      
      {/* Manual Input Field */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className={`text-sm transition-colors ${isCustom ? theme.text : 'text-slate-600'}`}>✎</span>
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`${label}を自由に入力...`}
          className={`
            w-full bg-slate-950 border rounded-lg py-2 pl-9 pr-8 text-sm text-slate-200 placeholder-slate-700
            focus:outline-none focus:ring-1 transition-all duration-200
            ${isCustom ? `${theme.border} ${theme.bg}` : 'border-slate-800 hover:border-slate-700'}
            ${theme.ring}
          `}
        />
        {value && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-600 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

const SectionContainer = ({ title, children, color = "purple" }: { title: string, children: React.ReactNode, color?: string }) => {
  const borderColors = {
    purple: "border-purple-500/30",
    blue: "border-blue-500/30",
    emerald: "border-emerald-500/30",
    pink: "border-pink-500/30"
  };
  const bgColors = {
    purple: "bg-purple-500",
    blue: "bg-blue-500",
    emerald: "bg-emerald-500",
    pink: "bg-pink-500"
  };

  return (
    <div className={`bg-slate-900/50 backdrop-blur-sm p-5 rounded-2xl border ${borderColors[color as keyof typeof borderColors] || borderColors.purple} shadow-xl mb-6`}>
      <h3 className="text-lg font-bold text-white mb-5 flex items-center">
        <span className={`inline-block w-1.5 h-6 ${bgColors[color as keyof typeof bgColors] || bgColors.purple} mr-3 rounded-full`}></span>
        {title}
      </h3>
      {children}
    </div>
  );
};

const InputSection: React.FC<InputSectionProps> = ({ input, setInput, onSubmit, isLoading }) => {
  
  const isUserMode = input.inputMode === 'user';
  
  const isFormValid = isUserMode
    ? (input.basicAttributes && input.time && input.budget && input.hall && input.literacy && input.reward)
    : (input.productConcept && input.productConcept.length > 5);

  return (
    <div>
      {/* Mode Switcher Tabs */}
      <div className="flex p-1 bg-slate-900 rounded-xl mb-6 border border-slate-800">
        <button
          onClick={() => setInput(prev => ({ ...prev, inputMode: 'user' }))}
          className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            isUserMode 
              ? 'bg-slate-700 text-white shadow-md' 
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <span>👤</span> ユーザーから生成
        </button>
        <button
          onClick={() => setInput(prev => ({ ...prev, inputMode: 'product' }))}
          className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            !isUserMode 
              ? 'bg-pink-900/60 text-pink-100 shadow-md border border-pink-500/30' 
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <span>🎰</span> スペックから逆算
        </button>
      </div>

      {isUserMode ? (
        <>
          {/* Section 1: User Profile */}
          <SectionContainer title="1. ユーザー属性・制約 (Profile & Constraints)" color="blue">
            <SelectionGroup 
              label="基本属性" 
              options={BASIC_ATTRIBUTES_OPTIONS} 
              value={input.basicAttributes}
              onChange={(val) => setInput(prev => ({ ...prev, basicAttributes: val }))}
              color="blue"
            />
            <SelectionGroup 
              label="時間帯 (Time)" 
              options={TIME_OPTIONS} 
              value={input.time}
              onChange={(val) => setInput(prev => ({ ...prev, time: val }))}
              color="blue"
            />
            <SelectionGroup 
              label="予算 (Budget)" 
              options={BUDGET_OPTIONS} 
              value={input.budget}
              onChange={(val) => setInput(prev => ({ ...prev, budget: val }))}
              color="blue"
            />
          </SectionContainer>

          {/* Section 2: Psychology & Behavior */}
          <SectionContainer title="2. 行動・心理 (Behavior & Psychology)" color="purple">
            <SelectionGroup 
              label="ホール選び (Hall Selection)" 
              options={HALL_OPTIONS} 
              value={input.hall}
              onChange={(val) => setInput(prev => ({ ...prev, hall: val }))}
              color="purple"
            />
            <SelectionGroup 
              label="リテラシー・遊び方 (Literacy)" 
              options={LITERACY_OPTIONS} 
              value={input.literacy}
              onChange={(val) => setInput(prev => ({ ...prev, literacy: val }))}
              color="indigo"
            />
            <SelectionGroup 
              label="求める報酬・欲求 (Desire)" 
              options={REWARD_OPTIONS} 
              value={input.reward}
              onChange={(val) => setInput(prev => ({ ...prev, reward: val }))}
              color="purple"
            />
          </SectionContainer>
        </>
      ) : (
        /* Product Driven Input Mode */
        <SectionContainer title="プロダクト概要・コンセプト (Product Concept)" color="pink">
          <div className="mb-2">
            <p className="text-slate-400 text-sm mb-4">
              作りたい機種のスペック、演出の特徴、版権テーマなどを入力してください。
              AIがその台を「最も打ちたくなる（または打たざるを得ない）」ターゲットユーザーを逆算してプロファイリングします。
            </p>
            <textarea
              value={input.productConcept}
              onChange={(e) => setInput(prev => ({ ...prev, productConcept: e.target.value }))}
              placeholder="例：
・大当り確率1/319、RUSH突入率55%、継続率81%の王道バトルスペック
・通常時からも1500発取れる安心設計だが、右打ちはオール1500発×高速消化
・演出は「Re:ゼロ」のような先バレ重視。無駄なリーチはいらない
・版権は「昭和のヤンキー漫画」で、ターゲットは氷河期世代..."
              className="w-full bg-slate-950 border border-pink-500/30 rounded-xl p-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors h-64 resize-none leading-relaxed"
            />
          </div>
        </SectionContainer>
      )}

      {/* Section 3: Notes (Common) */}
      <div className="bg-slate-900/50 backdrop-blur-sm p-5 rounded-2xl border border-slate-700 shadow-xl mb-6">
        <h3 className="text-lg font-bold text-slate-300 mb-4 flex items-center">
          <span className="inline-block w-1.5 h-6 bg-slate-600 mr-3 rounded-full"></span>
          その他・補足 (Notes)
        </h3>
        <textarea
          value={input.customNote}
          onChange={(e) => setInput(prev => ({ ...prev, customNote: e.target.value }))}
          placeholder="その他、考慮してほしい条件があれば..."
          className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-colors h-24 resize-none"
        />
      </div>

      <button
        onClick={onSubmit}
        disabled={isLoading || !isFormValid}
        className={`
          w-full py-5 rounded-xl font-bold text-xl tracking-wider uppercase transition-all duration-300 relative overflow-hidden
          ${isLoading || !isFormValid
            ? 'bg-slate-800 cursor-not-allowed text-slate-500 border border-slate-700' 
            : isUserMode 
              ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-500 hover:via-purple-500 hover:to-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]'
              : 'bg-gradient-to-r from-pink-600 via-rose-600 to-orange-600 hover:from-pink-500 hover:via-rose-500 hover:to-orange-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.4)]'
            }
        `}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-3">
            <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing...
          </span>
        ) : (
          isUserMode ? "ペルソナ生成 (Generate)" : "ターゲット分析・生成 (Analyze)"
        )}
      </button>
      {!isFormValid && (
        <p className="text-center text-red-400 text-xs mt-3 opacity-80">
          {isUserMode ? "※全ての項目を選択または入力してください" : "※プロダクトの概要を入力してください"}
        </p>
      )}
    </div>
  );
};

export default InputSection;