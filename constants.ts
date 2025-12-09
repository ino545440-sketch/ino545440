import { SelectOption } from './types';

// 1. 基本属性
export const BASIC_ATTRIBUTES_OPTIONS: SelectOption[] = [
  {
    value: "30-40代 男性会社員",
    label: "30-40代 男性会社員 (独身)",
    description: "可処分所得はあるが、仕事のストレスが多く、時間がない。"
  },
  {
    value: "20代 学生/フリーター",
    label: "20代 学生/フリーター",
    description: "時間は比較的自由だが、軍資金に限りがある。コスパ重視。"
  },
  {
    value: "シニア層 (年金受給)",
    label: "シニア層 (年金受給)",
    description: "毎日来店可能。勝ち負けよりコミュニティや安心感を重視。"
  },
  {
    value: "主婦/パート",
    label: "主婦/パート",
    description: "家事の合間や夕方までの稼働。1パチや甘デジを好む傾向も。"
  },
  {
    value: "高所得・経営者クラス",
    label: "高所得・経営者クラス",
    description: "金に糸目はつけない。レートや投資額より「面白いか」が全て。"
  }
];

// 2. 時間帯
export const TIME_OPTIONS: SelectOption[] = [
  {
    value: "平日夜 (19:00〜)",
    label: "平日夜 (19:00以降)",
    description: "仕事終わりの短時間勝負。時速と瞬発力が命。"
  },
  {
    value: "休日のみ (朝から全ツッパ)",
    label: "休日のみ (朝から全ツッパ)",
    description: "平日は打てない分、休日は開店から閉店まで粘る気概がある。"
  },
  {
    value: "毎日 (日中メイン)",
    label: "毎日 (日中メイン)",
    description: "常連客。生活の一部としてルーティン化している。"
  },
  {
    value: "不定期 (隙間時間)",
    label: "不定期 (隙間時間)",
    description: "待ち合わせ前や買い物ついでなど、1時間以内の遊技。"
  }
];

// 3. 予算
export const BUDGET_OPTIONS: SelectOption[] = [
  {
    value: "お小遣い制 (月3万)",
    label: "お小遣い制 (月3万)",
    description: "負けられない戦い。低投資で当たる台を探す。"
  },
  {
    value: "生活費を削るレベル",
    label: "生活費を削るレベル",
    description: "ヒリつきを求める。ハイリスク・ハイリターンを辞さない。"
  },
  {
    value: "潤沢 (5万〜/日)",
    label: "潤沢 (5万〜/日)",
    description: "投資額は気にしない。出るまで突っ込むパワープレイ。"
  },
  {
    value: "勝ち分で回す (堅実)",
    label: "勝ち分で回す (堅実)",
    description: "持ち玉遊技を徹底し、現金投資を極力嫌う。"
  }
];

// 4. ホール選び
export const HALL_OPTIONS: SelectOption[] = [
  {
    value: "駅近・通勤経路",
    label: "駅近・通勤経路",
    description: "利便性最優先。スペックより寄りやすさ。"
  },
  {
    value: "特定日・イベント重視",
    label: "特定日・イベント重視",
    description: "旧イベ日や取材が入る店を調べて遠征する。"
  },
  {
    value: "快適性・設備重視",
    label: "快適性・設備重視",
    description: "パーソナルシステム、禁煙/分煙、椅子の座り心地などで選ぶ。"
  },
  {
    value: "地元密着・過疎店",
    label: "地元密着・過疎店",
    description: "人が少なく、まったり打てる店を好む。"
  }
];

// 5. リテラシー
export const LITERACY_OPTIONS: SelectOption[] = [
  {
    value: "情弱・ライト層 (ポスターで選ぶ)",
    label: "情弱・ライト層",
    description: "スペック詳細は見ない。版権や雰囲気、ポスターのインパクトで座る。"
  },
  {
    value: "ガチ勢 (期待値・ボーダー)",
    label: "ガチ勢 (期待値重視)",
    description: "回転率、ボーダーラインを常に意識。無駄玉を嫌う。"
  },
  {
    value: "効率・タイパ勢",
    label: "効率・タイパ勢",
    description: "通常時はスマホ。先バレ設定で当たりの時だけ画面を見る。"
  },
  {
    value: "オカルト・波読み勢",
    label: "オカルト・波読み勢",
    description: "グラフの波、好調台、遠隔などを信じて立ち回る。"
  }
];

// 6. 求める報酬 (欲求)
export const REWARD_OPTIONS: SelectOption[] = [
  {
    value: "金銭的爆発・脳汁",
    label: "金銭的爆発・脳汁",
    description: "3000発、高速消化。リスクを背負ってでも圧倒的な出玉速度を求める。"
  },
  {
    value: "承認欲求・ドヤ",
    label: "承認欲求・ドヤ",
    description: "レア演出、プレミア、リザルト画面をSNSにアップしたい。"
  },
  {
    value: "没入・現実逃避",
    label: "没入・現実逃避",
    description: "好きな版権の世界に浸りたい。嫌なことを忘れたい。"
  },
  {
    value: "攻略・支配感",
    label: "攻略・支配感",
    description: "仕組みを理解し、技術介入や知識で台をコントロールした気になりたい。"
  }
];