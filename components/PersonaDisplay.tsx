import React, { useState } from 'react';
import { GeneratedPersona } from '../types';

interface PersonaDisplayProps {
  data: GeneratedPersona | null;
}

const SectionCard = ({ title, children, icon, colorClass = "text-white" }: { title: string, children: React.ReactNode, icon: React.ReactNode, colorClass?: string }) => (
  <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700 mb-4 shadow-lg">
    <h3 className={`font-bold text-lg mb-4 flex items-center gap-2 ${colorClass}`}>
      {icon}
      {title}
    </h3>
    {children}
  </div>
);

const ListItems = ({ items }: { items: string[] }) => (
  <ul className="space-y-2">
    {items.map((item, idx) => (
      <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm leading-relaxed">
        <span className="mt-1.5 w-1.5 h-1.5 bg-slate-500 rounded-full flex-shrink-0"></span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const SlidePreview = ({ data, slideIndex, setSlideIndex }: { data: GeneratedPersona, slideIndex: number, setSlideIndex: (n: number) => void }) => {
  const next = () => setSlideIndex(Math.min(3, slideIndex + 1));
  const prev = () => setSlideIndex(Math.max(0, slideIndex - 1));

  const renderContent = () => {
    switch (slideIndex) {
      case 0: // Title Slide (Infographic Style)
        return (
          <div className="h-full flex flex-col items-center justify-center text-center px-12 relative bg-gradient-to-br from-indigo-900 to-slate-900 text-white">
             {/* Background Elements */}
            <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white/5 rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl"></div>

            <div className="bg-white/10 px-4 py-1 rounded-full text-indigo-200 text-xs font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-sm border border-white/20">
              Target Persona Profile
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tight drop-shadow-xl">
              {data.name}
            </h1>
            
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mb-8 rounded-full"></div>

            <p className="text-xl md:text-2xl font-medium text-purple-200 italic mb-10 max-w-2xl leading-relaxed">
              "{data.catchphrase}"
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {data.keywords.map((k, i) => (
                <div key={i} className="flex flex-col items-center">
                   <div className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg shadow-lg text-sm text-indigo-300 font-bold">
                     #{k}
                   </div>
                </div>
              ))}
            </div>
            
            <div className="absolute bottom-6 left-0 w-full text-center text-slate-500 text-[10px] tracking-wider uppercase">
              CONFIDENTIAL / PACHINKO PRODUCT DEVELOPMENT
            </div>
          </div>
        );

      case 1: // Profile & Life (Infographic Style)
        return (
          <div className="h-full flex flex-col bg-slate-50 text-slate-800 p-8">
            <div className="flex justify-between items-end mb-6 border-b-2 border-slate-200 pb-2">
              <h3 className="text-2xl font-black text-slate-800">WHO IS THIS?</h3>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">01. Profile & Life</span>
            </div>

            <div className="grid grid-cols-12 gap-6 h-[85%]">
              {/* Left Column: Basic Info Cards */}
              <div className="col-span-4 flex flex-col gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-indigo-500">
                   <div className="text-[10px] uppercase text-slate-400 font-bold mb-1">Basic Attribute</div>
                   <div className="font-bold text-lg text-slate-800">{data.attributes.basic}</div>
                </div>
                
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex-1 flex flex-col gap-4">
                   <div className="text-[10px] uppercase text-slate-400 font-bold">Play Style Stats</div>
                   
                   <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 p-2 rounded border border-slate-200">
                        <div className="text-xs text-indigo-500 font-bold">Time</div>
                        <div className="text-sm font-bold truncate">{data.attributes.playStyle.time}</div>
                      </div>
                      <div className="bg-slate-50 p-2 rounded border border-slate-200">
                        <div className="text-xs text-indigo-500 font-bold">Budget</div>
                        <div className="text-sm font-bold truncate">{data.attributes.playStyle.budget}</div>
                      </div>
                      <div className="col-span-2 bg-slate-50 p-2 rounded border border-slate-200">
                        <div className="text-xs text-indigo-500 font-bold">Hall</div>
                        <div className="text-sm font-bold truncate">{data.attributes.playStyle.hall}</div>
                      </div>
                   </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-4 rounded-xl shadow text-white">
                  <div className="text-[10px] uppercase opacity-70 font-bold mb-1">Visual Image</div>
                  <div className="text-sm font-medium leading-snug">{data.visualImage}</div>
                </div>
              </div>

              {/* Right Column: Private Life Infographic */}
              <div className="col-span-8 bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col">
                <h4 className="font-bold text-slate-800 text-lg mb-4 flex items-center">
                   <span className="w-2 h-6 bg-indigo-500 mr-2 rounded-sm"></span>
                   Private Life Context
                </h4>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                   <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                      <div className="text-xs font-bold text-orange-600 uppercase mb-1">Stressors (Trigger)</div>
                      <div className="flex flex-wrap gap-2">
                         {data.privateLife.stressors.map((s, i) => (
                           <span key={i} className="px-2 py-1 bg-white rounded shadow-sm text-xs font-bold text-orange-800">{s}</span>
                         ))}
                      </div>
                   </div>
                   <div className="bg-teal-50 p-3 rounded-lg border border-teal-100">
                      <div className="text-xs font-bold text-teal-600 uppercase mb-1">Hobbies (Interests)</div>
                      <div className="flex flex-wrap gap-2">
                         {data.privateLife.hobbies.map((h, i) => (
                           <span key={i} className="px-2 py-1 bg-white rounded shadow-sm text-xs font-bold text-teal-800">{h}</span>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="flex-1 bg-slate-50 rounded-lg p-4 border border-slate-100 relative">
                   <div className="text-xs font-bold text-slate-400 uppercase mb-3 absolute top-3 right-4">Daily Timeline</div>
                   <div className="h-full flex items-center">
                     <div className="w-1 bg-slate-200 h-[80%] mx-4 relative rounded-full">
                        {/* Timeline decoration - simplistic representation */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-indigo-400 rounded-full"></div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-400 rounded-full"></div>
                     </div>
                     <div className="flex-1 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap font-medium">
                        {data.privateLife.dailyRoutine}
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2: // Specs & Flow (Deep Dive Style)
        return (
          <div className="h-full flex flex-col bg-slate-50 text-slate-800 p-8">
            <div className="flex justify-between items-end mb-6 border-b-2 border-slate-200 pb-2">
              <h3 className="text-2xl font-black text-slate-800">WHAT DO THEY WANT?</h3>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">02. Specs & Flow</span>
            </div>

            <div className="flex h-[85%] gap-6">
              {/* Left: Specs */}
              <div className="w-1/2 bg-white rounded-xl shadow-lg border-t-4 border-yellow-400 p-6 flex flex-col relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-yellow-400/10 rounded-full"></div>
                
                <h4 className="font-bold text-xl text-slate-800 mb-2">Specs & Risk</h4>
                <p className="text-yellow-600 font-bold text-lg mb-4 border-b border-slate-100 pb-4">{data.specs.summary}</p>
                
                <div className="flex-1 space-y-4 mb-4">
                  {data.specs.details.map((detail, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold text-xs shrink-0">
                        {i + 1}
                      </div>
                      <div className="text-slate-700 font-medium text-sm">
                        {detail}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Deep Insight Box */}
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 relative z-10 mt-auto">
                   <div className="flex items-center gap-2 mb-2 text-yellow-700 font-bold text-xs uppercase tracking-wider">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                      Latent Need (潜在的需要)
                   </div>
                   <p className="text-sm text-yellow-900 leading-snug font-medium italic">
                      "{data.specs.latentNeed}"
                   </p>
                </div>
              </div>

              {/* Right: Flow */}
              <div className="w-1/2 bg-slate-800 rounded-xl shadow-lg p-6 flex flex-col text-white relative overflow-hidden">
                 <div className="absolute -left-10 -top-10 w-40 h-40 bg-cyan-500/10 rounded-full"></div>

                 <h4 className="font-bold text-xl text-white mb-2 z-10">UX Flow & Style</h4>
                 <p className="text-cyan-400 font-bold text-lg mb-4 border-b border-slate-700 pb-4 z-10">{data.enshutsu.style}</p>
                 
                 <div className="flex-1 relative z-10 space-y-3 mb-4">
                    {data.enshutsu.behaviors.map((beh, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                        <div className="text-sm font-medium text-slate-300">
                            {beh}
                        </div>
                      </div>
                    ))}
                 </div>

                 {/* Deep Insight Box */}
                 <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600 relative z-10 mt-auto backdrop-blur-sm">
                   <div className="flex items-center gap-2 mb-2 text-cyan-300 font-bold text-xs uppercase tracking-wider">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                      Psychological Insight (心理的洞察)
                   </div>
                   <p className="text-sm text-cyan-50 leading-snug font-medium italic">
                      "{data.enshutsu.psychologicalInsight}"
                   </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 3: // Dev Advice
        return (
          <div className="h-full flex flex-col bg-slate-50 text-slate-800 p-8">
            <div className="flex justify-between items-end mb-6 border-b-2 border-slate-200 pb-2">
              <h3 className="text-2xl font-black text-slate-800">DEVELOPMENT GUIDE</h3>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">03. Do's & Don'ts</span>
            </div>

            <div className="grid grid-cols-2 gap-8 h-[85%]">
               {/* DO Section */}
               <div className="bg-emerald-50 rounded-2xl p-1 border-2 border-emerald-100 flex flex-col h-full">
                  <div className="bg-emerald-500 text-white p-3 text-center font-black tracking-widest uppercase rounded-t-xl shadow-sm">
                     MUST HAVE (DO)
                  </div>
                  <div className="flex-1 p-6 overflow-y-auto">
                     <ul className="space-y-4">
                        {data.developerAdvice.dos.map((d, i) => (
                           <li key={i} className="flex gap-3 items-start">
                              <div className="w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                                 <svg className="w-4 h-4 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                              </div>
                              <span className="text-emerald-900 font-bold text-sm leading-relaxed">{d}</span>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>

               {/* DON'T Section */}
               <div className="bg-red-50 rounded-2xl p-1 border-2 border-red-100 flex flex-col h-full">
                  <div className="bg-red-500 text-white p-3 text-center font-black tracking-widest uppercase rounded-t-xl shadow-sm">
                     NEVER DO (DON'T)
                  </div>
                  <div className="flex-1 p-6 overflow-y-auto">
                     <ul className="space-y-4">
                        {data.developerAdvice.donts.map((d, i) => (
                           <li key={i} className="flex gap-3 items-start">
                              <div className="w-6 h-6 rounded-full bg-red-200 flex items-center justify-center shrink-0 mt-0.5">
                                 <svg className="w-4 h-4 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                              </div>
                              <span className="text-red-900 font-bold text-sm leading-relaxed">{d}</span>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`w-full aspect-video rounded-xl shadow-2xl relative overflow-hidden transition-colors duration-500 border border-slate-700 bg-slate-100`}>
      {renderContent()}
      
      {/* Controls */}
      <div className={`absolute bottom-4 right-6 flex items-center gap-4 z-20 ${slideIndex === 0 || slideIndex === 2 ? 'text-white/80' : 'text-slate-400'}`}>
        <button 
          onClick={prev} 
          disabled={slideIndex === 0} 
          className="p-2 bg-black/10 hover:bg-black/20 rounded-full disabled:opacity-20 disabled:cursor-not-allowed transition-all transform hover:scale-110 active:scale-95 backdrop-blur-sm"
        >
           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="font-mono font-bold text-sm select-none tracking-widest">
           {slideIndex + 1} / 4
        </div>
        <button 
          onClick={next} 
          disabled={slideIndex === 3} 
          className="p-2 bg-black/10 hover:bg-black/20 rounded-full disabled:opacity-20 disabled:cursor-not-allowed transition-all transform hover:scale-110 active:scale-95 backdrop-blur-sm"
        >
           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
};

const PersonaDisplay: React.FC<PersonaDisplayProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'simple' | 'detailed' | 'slides'>('simple');
  const [slideIndex, setSlideIndex] = useState(0);

  if (!data) return null;

  // --- Report Generation Logic ---

  const generateSimpleReport = (persona: GeneratedPersona) => {
    return `【${persona.name}】
属性: ${persona.attributes.basic}

求めるスペック: ${persona.specs.summary}
(詳細: ${persona.specs.details.join('、')})
💡潜在的需要: ${persona.specs.latentNeed}

演出嗜好: ${persona.enshutsu.style}
(行動: ${persona.enshutsu.behaviors.join('、')})
🧠心理的洞察: ${persona.enshutsu.psychologicalInsight}

開発ヒント: ${persona.developerAdvice.dos.join('。')}
(NG事項: ${persona.developerAdvice.donts.join('、')})`;
  };

  const generateDetailedReport = (persona: GeneratedPersona) => {
    return `1. 【ヘッダー】キャッチコピーと象徴的なビジュアル
ネーミング: 「${persona.name}」
キャッチフレーズ: 「${persona.catchphrase}」
キーワードタグ: ${persona.keywords.map(k => `#${k}`).join(' ')}

2. 【左側】デモグラ・ライフスタイル（基本データ）
基本属性: ${persona.attributes.basic}
稼働スタイル:
・時間帯: ${persona.attributes.playStyle.time}
・予算: ${persona.attributes.playStyle.budget}
・ホール選び: ${persona.attributes.playStyle.hall}
・リテラシー: ${persona.attributes.playStyle.literacy}

【背景分析・プライベート】
・ルーティン: ${persona.privateLife.dailyRoutine}
・趣味: ${persona.privateLife.hobbies.join(', ')}
・ストレス要因: ${persona.privateLife.stressors.join(', ')}
--------------------------------------
背景分析サマリ:
${persona.backgroundAnalysis}

3. 【右側】スペック・演出・開発指針
[求めるスペック]
概要: ${persona.specs.summary}
詳細:
${persona.specs.details.map(d => `・${d}`).join('\n')}
💡潜在的需要 (Deep Insight):
${persona.specs.latentNeed}

[演出嗜好]
概要: ${persona.enshutsu.style}
行動:
${persona.enshutsu.behaviors.map(b => `・${b}`).join('\n')}
🧠心理的洞察 (Psychological Insight):
${persona.enshutsu.psychologicalInsight}

4. 【開発者への提言】
[DO - 実装すべき]
${persona.developerAdvice.dos.map(d => `・${d}`).join('\n')}

[DON'T - 避けるべき]
${persona.developerAdvice.donts.map(d => `・${d}`).join('\n')}
`;
  };

  const reportText = activeTab === 'simple' ? generateSimpleReport(data) : generateDetailedReport(data);

  const handleDownloadText = () => {
    const textToDownload = activeTab === 'slides' ? generateDetailedReport(data) : reportText;
    const blob = new Blob([textToDownload], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.name.replace(/\s+/g, '_')}_${activeTab === 'slides' ? 'detailed' : activeTab}_report.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadHtml = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.name} - Persona Presentation</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap" rel="stylesheet">
    <style>
      body { font-family: 'Noto Sans JP', sans-serif; overflow: hidden; }
      .slide { display: none; height: 100vh; width: 100vw; }
      .slide.active { display: flex; }
    </style>
</head>
<body class="bg-black text-white">
    <!-- Controls -->
    <div class="fixed bottom-6 right-6 z-50 flex items-center gap-4 text-slate-400 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
        <button onclick="changeSlide(-1)" class="p-2 hover:text-white transition">
           <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div id="indicator" class="font-mono font-bold text-sm select-none tracking-widest text-white">1 / 4</div>
        <button onclick="changeSlide(1)" class="p-2 hover:text-white transition">
           <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </button>
    </div>

    <!-- SLIDE 1: Title -->
    <div id="slide-0" class="slide active flex-col items-center justify-center text-center px-12 relative bg-gradient-to-br from-indigo-900 to-slate-900">
        <div class="absolute top-10 left-10 w-32 h-32 border-4 border-white/5 rounded-full"></div>
        <div class="absolute bottom-10 right-10 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl"></div>
        <div class="bg-white/10 px-4 py-1 rounded-full text-indigo-200 text-xs font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-sm border border-white/20">Target Persona Profile</div>
        <h1 class="text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tight drop-shadow-xl text-white">${data.name}</h1>
        <div class="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mb-8 rounded-full"></div>
        <p class="text-xl md:text-2xl font-medium text-purple-200 italic mb-10 max-w-2xl leading-relaxed">"${data.catchphrase}"</p>
        <div class="flex flex-wrap justify-center gap-4">
            ${data.keywords.map(k => `<div class="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg shadow-lg text-sm text-indigo-300 font-bold">#${k}</div>`).join('')}
        </div>
        <div class="absolute bottom-6 left-0 w-full text-center text-slate-500 text-[10px] tracking-wider uppercase">CONFIDENTIAL / PACHINKO PRODUCT DEVELOPMENT</div>
    </div>

    <!-- SLIDE 2: Profile -->
    <div id="slide-1" class="slide flex-col bg-slate-50 text-slate-800 p-8">
        <div class="flex justify-between items-end mb-6 border-b-2 border-slate-200 pb-2">
            <h3 class="text-3xl font-black text-slate-800">WHO IS THIS?</h3>
            <span class="text-sm font-bold text-slate-400 uppercase tracking-widest">01. Profile & Life</span>
        </div>
        <div class="grid grid-cols-12 gap-6 h-full pb-10">
            <div class="col-span-4 flex flex-col gap-4">
                <div class="bg-white p-6 rounded-xl shadow-sm border-l-4 border-indigo-500">
                    <div class="text-xs uppercase text-slate-400 font-bold mb-1">Basic Attribute</div>
                    <div class="font-bold text-xl text-slate-800">${data.attributes.basic}</div>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex-1 flex flex-col gap-4">
                    <div class="text-xs uppercase text-slate-400 font-bold">Play Style Stats</div>
                    <div class="grid grid-cols-1 gap-4">
                        <div class="bg-slate-50 p-3 rounded border border-slate-200"><div class="text-xs text-indigo-500 font-bold">Time</div><div class="text-base font-bold">${data.attributes.playStyle.time}</div></div>
                        <div class="bg-slate-50 p-3 rounded border border-slate-200"><div class="text-xs text-indigo-500 font-bold">Budget</div><div class="text-base font-bold">${data.attributes.playStyle.budget}</div></div>
                        <div class="bg-slate-50 p-3 rounded border border-slate-200"><div class="text-xs text-indigo-500 font-bold">Hall</div><div class="text-base font-bold">${data.attributes.playStyle.hall}</div></div>
                    </div>
                </div>
                <div class="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-xl shadow text-white">
                    <div class="text-xs uppercase opacity-70 font-bold mb-1">Visual Image</div>
                    <div class="text-base font-medium leading-snug">${data.visualImage}</div>
                </div>
            </div>
            <div class="col-span-8 bg-white rounded-xl shadow-sm border border-slate-200 p-8 flex flex-col">
                <h4 className="font-bold text-slate-800 text-xl mb-6 flex items-center"><span className="w-2 h-6 bg-indigo-500 mr-3 rounded-sm"></span>Private Life Context</h4>
                <div class="grid grid-cols-2 gap-6 mb-6">
                    <div class="bg-orange-50 p-4 rounded-lg border border-orange-100">
                        <div class="text-xs font-bold text-orange-600 uppercase mb-2">Stressors (Trigger)</div>
                        <div class="flex flex-wrap gap-2">${data.privateLife.stressors.map(s => `<span class="px-2 py-1 bg-white rounded shadow-sm text-xs font-bold text-orange-800">${s}</span>`).join('')}</div>
                    </div>
                    <div class="bg-teal-50 p-4 rounded-lg border border-teal-100">
                        <div class="text-xs font-bold text-teal-600 uppercase mb-2">Hobbies (Interests)</div>
                        <div class="flex flex-wrap gap-2">${data.privateLife.hobbies.map(h => `<span class="px-2 py-1 bg-white rounded shadow-sm text-xs font-bold text-teal-800">${h}</span>`).join('')}</div>
                    </div>
                </div>
                <div class="flex-1 bg-slate-50 rounded-lg p-6 border border-slate-100 relative">
                    <div class="text-xs font-bold text-slate-400 uppercase mb-3 absolute top-4 right-6">Daily Timeline</div>
                    <div class="h-full flex items-center">
                        <div class="w-1 bg-slate-200 h-[80%] mx-6 relative rounded-full">
                            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-indigo-400 rounded-full"></div>
                            <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-400 rounded-full"></div>
                        </div>
                        <div class="flex-1 text-base text-slate-700 leading-relaxed whitespace-pre-wrap font-medium">${data.privateLife.dailyRoutine}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- SLIDE 3: Specs & Flow -->
    <div id="slide-2" class="slide flex-col bg-slate-50 text-slate-800 p-8">
        <div class="flex justify-between items-end mb-6 border-b-2 border-slate-200 pb-2">
            <h3 class="text-3xl font-black text-slate-800">WHAT DO THEY WANT?</h3>
            <span class="text-sm font-bold text-slate-400 uppercase tracking-widest">02. Specs & Flow</span>
        </div>
        <div class="flex h-full gap-6 pb-10">
            <!-- Left: Specs -->
            <div class="w-1/2 bg-white rounded-xl shadow-lg border-t-4 border-yellow-400 p-8 flex flex-col relative overflow-hidden">
                <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-yellow-400/10 rounded-full"></div>
                <h4 class="font-bold text-2xl text-slate-800 mb-2">Specs & Risk</h4>
                <p class="text-yellow-600 font-bold text-xl mb-6 border-b border-slate-100 pb-4">${data.specs.summary}</p>
                <div class="flex-1 space-y-4 mb-4">
                    ${data.specs.details.map((detail, i) => `
                    <div class="flex items-center gap-4">
                        <div class="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold text-xs shrink-0">${i + 1}</div>
                        <div class="text-slate-700 font-medium text-lg">${detail}</div>
                    </div>`).join('')}
                </div>
                <!-- Deep Insight -->
                <div class="bg-yellow-50 p-5 rounded-lg border border-yellow-100 relative z-10 mt-auto">
                   <div class="flex items-center gap-2 mb-2 text-yellow-700 font-bold text-sm uppercase tracking-wider">
                      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                      Latent Need (潜在的需要)
                   </div>
                   <p class="text-base text-yellow-900 leading-snug font-medium italic">"${data.specs.latentNeed}"</p>
                </div>
            </div>
            <!-- Right: Flow -->
            <div class="w-1/2 bg-slate-800 rounded-xl shadow-lg p-8 flex flex-col text-white relative overflow-hidden">
                <div class="absolute -left-10 -top-10 w-40 h-40 bg-cyan-500/10 rounded-full"></div>
                <h4 class="font-bold text-2xl text-white mb-2 z-10">UX Flow & Style</h4>
                <p class="text-cyan-400 font-bold text-xl mb-6 border-b border-slate-700 pb-4 z-10">${data.enshutsu.style}</p>
                <div class="flex-1 relative z-10 space-y-4 mb-4">
                    ${data.enshutsu.behaviors.map(beh => `
                    <div class="flex items-center gap-3">
                        <div class="w-2 h-2 rounded-full bg-cyan-500 shrink-0"></div>
                        <div class="text-lg font-medium text-slate-300">${beh}</div>
                    </div>`).join('')}
                </div>
                <!-- Deep Insight -->
                 <div class="bg-slate-700/50 p-5 rounded-lg border border-slate-600 relative z-10 mt-auto backdrop-blur-sm">
                   <div class="flex items-center gap-2 mb-2 text-cyan-300 font-bold text-sm uppercase tracking-wider">
                      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                      Psychological Insight (心理的洞察)
                   </div>
                   <p class="text-base text-cyan-50 leading-snug font-medium italic">"${data.enshutsu.psychologicalInsight}"</p>
                </div>
            </div>
        </div>
    </div>

    <!-- SLIDE 4: Guide -->
    <div id="slide-3" class="slide flex-col bg-slate-50 text-slate-800 p-8">
        <div class="flex justify-between items-end mb-6 border-b-2 border-slate-200 pb-2">
            <h3 class="text-3xl font-black text-slate-800">DEVELOPMENT GUIDE</h3>
            <span class="text-sm font-bold text-slate-400 uppercase tracking-widest">03. Do's & Don'ts</span>
        </div>
        <div class="grid grid-cols-2 gap-8 h-full pb-10">
            <div class="bg-emerald-50 rounded-2xl p-1 border-2 border-emerald-100 flex flex-col h-full">
                <div class="bg-emerald-500 text-white p-4 text-center font-black tracking-widest uppercase rounded-t-xl shadow-sm text-xl">MUST HAVE (DO)</div>
                <div class="flex-1 p-8 overflow-y-auto">
                    <ul class="space-y-6">
                        ${data.developerAdvice.dos.map(d => `
                        <li class="flex gap-4 items-start">
                            <div class="w-8 h-8 rounded-full bg-emerald-200 flex items-center justify-center shrink-0 mt-0.5 text-emerald-700 font-bold">✓</div>
                            <span class="text-emerald-900 font-bold text-lg leading-relaxed">${d}</span>
                        </li>`).join('')}
                    </ul>
                </div>
            </div>
            <div class="bg-red-50 rounded-2xl p-1 border-2 border-red-100 flex flex-col h-full">
                <div class="bg-red-500 text-white p-4 text-center font-black tracking-widest uppercase rounded-t-xl shadow-sm text-xl">NEVER DO (DON'T)</div>
                <div class="flex-1 p-8 overflow-y-auto">
                    <ul class="space-y-6">
                        ${data.developerAdvice.donts.map(d => `
                        <li class="flex gap-4 items-start">
                            <div class="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center shrink-0 mt-0.5 text-red-700 font-bold">✕</div>
                            <span class="text-red-900 font-bold text-lg leading-relaxed">${d}</span>
                        </li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <script>
        let currentSlide = 0;
        const totalSlides = 4;
        const slides = document.querySelectorAll('.slide');
        const indicator = document.getElementById('indicator');

        function updateSlide() {
            slides.forEach((s, i) => {
                if (i === currentSlide) s.classList.add('active');
                else s.classList.remove('active');
            });
            indicator.innerText = (currentSlide + 1) + ' / ' + totalSlides;
        }

        function changeSlide(dir) {
            const next = currentSlide + dir;
            if (next >= 0 && next < totalSlides) {
                currentSlide = next;
                updateSlide();
            }
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === ' ') changeSlide(1);
            if (e.key === 'ArrowLeft') changeSlide(-1);
        });
    </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.name.replace(/\s+/g, '_')}_Presentation.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="animate-fade-in-up pb-10">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-6 md:p-8 border border-indigo-500/30 shadow-[0_0_30px_rgba(79,70,229,0.2)] mb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-70"></div>
        
        {/* Keywords */}
        <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
          {data.keywords.map((kw, i) => (
            <span key={i} className="px-2 py-0.5 bg-indigo-500/20 border border-indigo-500/30 rounded text-[10px] md:text-xs text-indigo-200 tracking-wider">
              #{kw}
            </span>
          ))}
        </div>

        <div className="text-center md:text-left">
          <div className="text-indigo-300 text-sm font-bold tracking-widest uppercase mb-2">Target Persona</div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-2 neon-text">
            {data.name}
          </h2>
          <p className="text-lg md:text-xl text-purple-200 font-bold mb-4 italic">
            "{data.catchphrase}"
          </p>
          <div className="text-slate-400 text-sm flex items-center justify-center md:justify-start gap-2 bg-slate-950/30 py-2 px-4 rounded-lg inline-block">
             <span className="opacity-70">👤</span> {data.visualImage}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Profile Card */}
        <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
           <h3 className="font-bold text-lg mb-4 text-purple-300 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            基本属性・稼働スタイル
           </h3>
           <div className="space-y-3 text-sm">
             <div className="flex justify-between border-b border-slate-700/50 pb-2">
               <span className="text-slate-400">基本属性</span>
               <span className="text-slate-200 font-medium text-right">{data.attributes.basic}</span>
             </div>
             <div className="flex justify-between border-b border-slate-700/50 pb-2">
               <span className="text-slate-400">時間帯</span>
               <span className="text-slate-200 font-medium text-right">{data.attributes.playStyle.time}</span>
             </div>
             <div className="flex justify-between border-b border-slate-700/50 pb-2">
               <span className="text-slate-400">予算</span>
               <span className="text-slate-200 font-medium text-right">{data.attributes.playStyle.budget}</span>
             </div>
             <div className="flex justify-between border-b border-slate-700/50 pb-2">
               <span className="text-slate-400">ホール選び</span>
               <span className="text-slate-200 font-medium text-right">{data.attributes.playStyle.hall}</span>
             </div>
             <div className="flex justify-between pb-2">
               <span className="text-slate-400">リテラシー</span>
               <span className="text-slate-200 font-medium text-right">{data.attributes.playStyle.literacy}</span>
             </div>
           </div>
        </div>

        {/* Private Context Card */}
        <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 flex flex-col">
          <h3 className="font-bold text-lg mb-4 text-purple-300 flex items-center gap-2">
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             プライベート背景 (Private Context)
          </h3>
          <div className="flex-1 space-y-4">
             <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
               <div className="text-xs text-orange-400 font-bold mb-1">ストレス要因 (Stressors)</div>
               <div className="text-sm text-slate-300">{data.privateLife.stressors.join(', ')}</div>
             </div>
             <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
               <div className="text-xs text-teal-400 font-bold mb-1">趣味・関心 (Hobbies)</div>
               <div className="text-sm text-slate-300">{data.privateLife.hobbies.join(', ')}</div>
             </div>
             <div className="text-sm text-slate-400 italic mt-2 border-t border-slate-700 pt-2">
               Routine: {data.privateLife.dailyRoutine.substring(0, 80)}...
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Specs Section */}
        <SectionCard 
          title="求めるスペック仕様 (Specs)" 
          colorClass="text-yellow-400"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
        >
          <div className="mb-3 font-semibold text-yellow-100 text-lg">{data.specs.summary}</div>
          <ListItems items={data.specs.details} />
          
          <div className="mt-4 pt-4 border-t border-yellow-500/30">
             <div className="text-xs font-bold text-yellow-500 uppercase flex items-center gap-1 mb-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                💡 Deep Insight (潜在的需要)
             </div>
             <p className="text-sm text-yellow-100 italic opacity-90 pl-5">"{data.specs.latentNeed}"</p>
          </div>
        </SectionCard>

        {/* Enshutsu Section */}
        <SectionCard 
          title="演出・遊技スタイル (Flow & UI)" 
          colorClass="text-cyan-400"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          }
        >
          <div className="mb-3 font-semibold text-cyan-100 text-lg">{data.enshutsu.style}</div>
          <ListItems items={data.enshutsu.behaviors} />

          <div className="mt-4 pt-4 border-t border-cyan-500/30">
             <div className="text-xs font-bold text-cyan-400 uppercase flex items-center gap-1 mb-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                🧠 Psychological Insight (心理的洞察)
             </div>
             <p className="text-sm text-cyan-100 italic opacity-90 pl-5">"{data.enshutsu.psychologicalInsight}"</p>
          </div>
        </SectionCard>

        {/* Developer Advice Section */}
        <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden shadow-lg">
          <div className="bg-slate-800 p-4 border-b border-slate-700 flex items-center gap-2">
             <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <h3 className="font-bold text-lg text-white">開発者への提言 (Dev Advice)</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-5 border-b md:border-b-0 md:border-r border-slate-700 bg-emerald-900/10">
              <h4 className="font-bold text-emerald-400 mb-3 flex items-center">
                <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-xs mr-2 border border-emerald-500/50">DO</span>
                実装すべき要素
              </h4>
              <ul className="space-y-2">
                {data.developerAdvice.dos.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5 bg-red-900/10">
              <h4 className="font-bold text-red-400 mb-3 flex items-center">
                <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-xs mr-2 border border-red-500/50">DON'T</span>
                避けるべき要素
              </h4>
               <ul className="space-y-2">
                {data.developerAdvice.donts.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                    <span className="text-red-500 mt-0.5">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Text Report Download Section */}
        <div className="mt-8 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
            <h3 className="font-bold text-lg text-slate-300 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              出力レポート (Export)
            </h3>
            
            <div className="flex bg-slate-800 p-1 rounded-lg">
              <button 
                onClick={() => setActiveTab('simple')}
                className={`px-4 py-1.5 text-sm rounded-md font-medium transition-all ${activeTab === 'simple' ? 'bg-slate-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
              >
                簡易形式
              </button>
              <button 
                onClick={() => setActiveTab('detailed')}
                className={`px-4 py-1.5 text-sm rounded-md font-medium transition-all ${activeTab === 'detailed' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
              >
                企画書形式
              </button>
              <button 
                onClick={() => setActiveTab('slides')}
                className={`px-4 py-1.5 text-sm rounded-md font-medium transition-all flex items-center gap-2 ${activeTab === 'slides' ? 'bg-pink-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
                スライドプレビュー
              </button>
            </div>
          </div>
          
          <div className="relative">
             {activeTab === 'slides' ? (
                <SlidePreview data={data} slideIndex={slideIndex} setSlideIndex={setSlideIndex} />
             ) : (
               <div className="bg-slate-950 p-6 rounded-xl border border-slate-700 font-mono text-sm text-slate-400 shadow-inner h-64 overflow-y-auto custom-scrollbar">
                <pre className="whitespace-pre-wrap leading-relaxed font-sans md:font-mono">
                  {reportText}
                </pre>
               </div>
             )}
            
            <div className="absolute -bottom-14 md:bottom-4 right-0 md:right-4 flex gap-3 z-30">
              <button 
                onClick={handleDownloadText}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                テキスト (.txt)
              </button>
              <button 
                onClick={handleDownloadHtml}
                className="px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-lg transform hover:-translate-y-1 active:translate-y-0"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                スライド (.html)
              </button>
            </div>
          </div>
          
          <p className="mt-16 md:mt-2 text-xs text-slate-500 text-center md:text-right">
            ※企画書形式は、ヘッダー情報・基本属性・詳細な稼働スタイルなどを含みます。
          </p>
        </div>

      </div>
    </div>
  );
};

export default PersonaDisplay;