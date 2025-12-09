export interface PersonaInput {
  inputMode: 'user' | 'product'; // 'user' = Create from attributes, 'product' = Reverse engineer from specs
  
  // User Driven Mode Inputs
  basicAttributes: string; // 1. 基本属性
  time: string;           // 2. 時間帯
  budget: string;         // 3. 予算
  hall: string;           // 4. ホール選び
  literacy: string;       // 5. リテラシー
  reward: string;         // 6. 求める報酬 (欲求)
  
  // Product Driven Mode Input
  productConcept: string; // スペック・演出・コンセプトの概要

  customNote: string;     // 共通: その他補足
}

export interface GeneratedPersona {
  // Header / Concept
  name: string;          // ネーミング
  catchphrase: string;   // キャッチフレーズ
  visualImage: string;   // アイコン/画像イメージ
  keywords: string[];    // キーワードタグ

  // Left Side / Demographics
  attributes: {
    basic: string;       // 基本属性
    playStyle: {
      time: string;      // 時間帯
      budget: string;    // 予算
      hall: string;      // ホール選び
      literacy: string;  // リテラシー
    };
  };

  // Deep Dive: Private Life & Context
  privateLife: {
    dailyRoutine: string;  // e.g. "07:00 起床 -> 21:00 残業終了 -> 21:30 ホール着..."
    hobbies: string[];     // パチンコ以外の趣味
    stressors: string[];   // 抱えているストレス・悩み
  };

  backgroundAnalysis: string; // Summary analysis

  specs: {
    summary: string;
    details: string[];
    latentNeed: string; // 潜在的需要 (Deep Insight)
  };
  enshutsu: {
    style: string;
    behaviors: string[];
    psychologicalInsight: string; // 心理的洞察 (Deep Insight)
  };
  developerAdvice: {
    dos: string[];
    donts: string[];
  };
}

export interface SelectOption {
  value: string;
  label: string;
  description: string;
}