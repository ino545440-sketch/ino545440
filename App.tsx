import React, { useState } from 'react';
import InputSection from './components/InputSection';
import PersonaDisplay from './components/PersonaDisplay';
import { generatePersona } from './services/geminiService';
import { GeneratedPersona, PersonaInput } from './types';

const App: React.FC = () => {
  const [input, setInput] = useState<PersonaInput>({
    inputMode: 'user',
    basicAttributes: "",
    time: "",
    budget: "",
    hall: "",
    literacy: "",
    reward: "",
    productConcept: "",
    customNote: ""
  });
  
  const [persona, setPersona] = useState<GeneratedPersona | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setPersona(null); // Clear previous result to focus user on loading
    
    try {
      const result = await generatePersona(input);
      setPersona(result);
      
      // Smooth scroll to result on mobile
      setTimeout(() => {
        const resultElement = document.getElementById('result-section');
        if (resultElement) {
          resultElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);

    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-12 bg-[#0f172a] text-slate-200 selection:bg-purple-500 selection:text-white">
      {/* Background Graphic Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-purple-500/10 rounded-2xl mb-4 border border-purple-500/20">
            <span className="text-3xl mr-3">🎰</span>
            <h1 className="text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 tracking-tight">
              PACHINKO PERSONA LAB
            </h1>
          </div>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            遊技者の「制約」「欲求」「態度」、あるいは「プロダクトの特徴」から、Gemini AIが次世代e機（スマートパチンコ）のターゲットペルソナと開発指針を生成します。
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Input */}
          <div className="lg:col-span-5 lg:sticky lg:top-8">
            <InputSection 
              input={input} 
              setInput={setInput} 
              onSubmit={handleGenerate} 
              isLoading={loading}
            />
            
            {error && (
               <div className="mt-4 p-4 bg-red-900/50 border border-red-500/50 rounded-xl text-red-200 text-sm">
                <strong>Error:</strong> {error}
              </div>
            )}
          </div>

          {/* Right Column: Output */}
          <div id="result-section" className="lg:col-span-7">
            {loading ? (
              <div className="h-96 flex flex-col items-center justify-center text-slate-500 bg-slate-900/30 rounded-2xl border border-slate-800/50 border-dashed animate-pulse">
                <div className="text-4xl mb-4">🧠</div>
                <div className="text-xl font-medium">Synthesizing Behavior Patterns...</div>
                <div className="text-sm mt-2 opacity-60">Wait a moment for the AI to "Think"</div>
              </div>
            ) : persona ? (
              <PersonaDisplay data={persona} />
            ) : (
              <div className="flex flex-col gap-6">
                <div className="p-6 flex flex-col items-center justify-center text-slate-500 bg-slate-900/20 rounded-2xl border border-slate-800 border-dashed">
                  <div className="w-12 h-12 mb-3 rounded-full bg-slate-800 flex items-center justify-center text-xl border border-slate-700">
                    👈
                  </div>
                  <p className="font-medium text-center">左側のフォームから詳細条件を選択・入力して生成を開始してください</p>
                </div>

                {/* Example Output Display */}
                <div className="bg-slate-900/40 rounded-2xl p-6 border border-slate-800 relative">
                  <div className="absolute -top-3 left-6 px-3 py-1 bg-slate-800 text-[10px] font-bold text-slate-400 border border-slate-700 rounded-full tracking-wider">
                    OUTPUT SAMPLE
                  </div>
                  
                  <div className="mt-2">
                    <h3 className="text-xl font-bold text-purple-300 mb-2 neon-text">【現代のスピード狂サラリーマン】</h3>
                    <p className="text-sm text-slate-400 mb-5 pb-4 border-b border-slate-800">
                      <span className="font-semibold text-slate-500 mr-2">属性:</span> 
                      30代男性、会社員、平日夜がメイン
                    </p>
                    
                    <div className="space-y-4">
                      <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                        <div className="text-xs font-bold text-yellow-500 mb-1 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                          求めるスペック
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          「タイパ重視」。短時間で投資分を回収できる高出玉・高速機。
                        </p>
                      </div>
                      
                      <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                        <div className="text-xs font-bold text-cyan-500 mb-1 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                          演出嗜好
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          演出は飛ばしたい派。「先バレ（入賞時フラッシュ）」を設定し、光らなければスマホを見ている。ダラダラした長いリーチ演出は嫌う。
                        </p>
                      </div>

                      <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                        <div className="text-xs font-bold text-emerald-500 mb-1 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                          開発ヒント
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          変動秒数を極限まで削る。通常時の無駄な煽りを排除し、カスタム機能を充実させる。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
        
        <footer className="mt-20 border-t border-slate-800 pt-8 text-center text-slate-600 text-sm">
          <p>Powered by Google Gemini 2.5 Flash & React</p>
          <p className="mt-1">※このツールはエンターテイメント及び企画補助を目的としています。生成された内容は架空の分析です。</p>
        </footer>

      </div>
    </div>
  );
};

export default App;