// 各教科の問題データ（単元別）
const quizData = {
    math: {
        name: "数学",
        icon: "📐",
        units: [
            {
                name: "計算",
                questions: [
                    {
                        question: "(-3) × (-4) の計算結果は？",
                        options: ["-12", "-7", "7", "12"],
                        answer: 3,
                        explanation: "負の数 × 負の数 = 正の数。3 × 4 = 12"
                    },
                    {
                        question: "1/2 + 1/3 の値は？",
                        options: ["2/5", "5/6", "1/5", "2/6"],
                        answer: 1,
                        explanation: "1/2 + 1/3 = 3/6 + 2/6 = 5/6"
                    },
                    {
                        question: "2³ の計算結果は？",
                        options: ["5", "6", "8", "9"],
                        answer: 2,
                        explanation: "2³ = 2 × 2 × 2 = 8"
                    },
                    {
                        question: "√49 の値は？",
                        options: ["5", "6", "7", "8"],
                        answer: 2,
                        explanation: "7 × 7 = 49 なので、√49 = 7"
                    }
                ]
            },
            {
                name: "方程式",
                questions: [
                    {
                        question: "2x + 5 = 11 のとき、x の値は？",
                        options: ["2", "3", "4", "6"],
                        answer: 1,
                        explanation: "2x + 5 = 11 → 2x = 6 → x = 3"
                    },
                    {
                        question: "比例式 2:3 = 6:x のとき、x は？",
                        options: ["4", "6", "9", "12"],
                        answer: 2,
                        explanation: "2 × x = 3 × 6 → 2x = 18 → x = 9"
                    },
                    {
                        question: "3x - 7 = 8 のとき、x の値は？",
                        options: ["3", "5", "7", "15"],
                        answer: 1,
                        explanation: "3x - 7 = 8 → 3x = 15 → x = 5"
                    }
                ]
            },
            {
                name: "図形",
                questions: [
                    {
                        question: "三角形の内角の和は何度？",
                        options: ["90度", "180度", "270度", "360度"],
                        answer: 1,
                        explanation: "三角形の内角の和は常に180度です。"
                    },
                    {
                        question: "正方形の面積が36cm²のとき、一辺の長さは？",
                        options: ["4cm", "6cm", "9cm", "12cm"],
                        answer: 1,
                        explanation: "6 × 6 = 36 なので、一辺は6cm"
                    },
                    {
                        question: "円周率πは約いくつ？",
                        options: ["2.14", "3.14", "4.14", "5.14"],
                        answer: 1,
                        explanation: "円周率πは約3.14159...で、約3.14です。"
                    }
                ]
            },
            {
                name: "関数",
                questions: [
                    {
                        question: "y = 2x + 3 のグラフの傾きは？",
                        options: ["2", "3", "5", "6"],
                        answer: 0,
                        explanation: "y = ax + b の形で、a が傾きを表します。この場合 a = 2"
                    },
                    {
                        question: "y = -3x のグラフはどの象限を通らない？",
                        options: ["第1象限", "第2象限", "第3象限", "第4象限"],
                        answer: 1,
                        explanation: "y = -3x は原点を通り、第2象限と第4象限を通らない反比例のグラフです。"
                    },
                    {
                        question: "y = x² のグラフの形は？",
                        options: ["直線", "放物線", "双曲線", "円"],
                        answer: 1,
                        explanation: "y = x² は放物線（パラボラ）を描きます。"
                    }
                ]
            }
        ]
    },
    japanese: {
        name: "国語",
        icon: "📖",
        units: [
            {
                name: "漢字",
                questions: [
                    {
                        question: "「憂鬱」の読み方は？",
                        options: ["ゆううつ", "うつつ", "ゆうれい", "ゆうこう"],
                        answer: 0,
                        explanation: "憂鬱（ゆううつ）は、気分が晴れない様子を表します。"
                    },
                    {
                        question: "「木」の部首は？",
                        options: ["き", "もく", "きへん", "そのもの（木）"],
                        answer: 3,
                        explanation: "「木」自体が部首で、「木部」に属します。"
                    },
                    {
                        question: "「山」の音読みは？",
                        options: ["やま", "サン", "たけ", "ザン"],
                        answer: 1,
                        explanation: "「山」の音読みは「サン」、訓読みは「やま」です。"
                    }
                ]
            },
            {
                name: "文法",
                questions: [
                    {
                        question: "「走る」の活用の種類は？",
                        options: ["五段活用", "上一段活用", "下一段活用", "カ行変格活用"],
                        answer: 0,
                        explanation: "「走る」は五段活用動詞です。（走らない、走ります、走る、走れば、走ろう）"
                    },
                    {
                        question: "「彼は足が速い」の「が」は何？",
                        options: ["接続助詞", "格助詞", "副助詞", "終助詞"],
                        answer: 1,
                        explanation: "「が」は主語を示す格助詞です。"
                    },
                    {
                        question: "敬語「いらっしゃる」は何の尊敬語？",
                        options: ["言う", "食べる", "いる・行く・来る", "見る"],
                        answer: 2,
                        explanation: "「いらっしゃる」は「いる」「行く」「来る」の尊敬語です。"
                    }
                ]
            },
            {
                name: "語彙・表現",
                questions: [
                    {
                        question: "「急がば回れ」の意味として適切なのは？",
                        options: ["急いでいるときほど遠回りした方がよい", "回り道をすると遅くなる", "急いで走るべきだ", "回転して進むべきだ"],
                        answer: 0,
                        explanation: "急いでいるときこそ、安全な遠回りをした方が結果的に早いという教訓です。"
                    },
                    {
                        question: "「美しい」の反対語は？",
                        options: ["醜い", "汚い", "暗い", "弱い"],
                        answer: 0,
                        explanation: "「美しい」の反対語は「醜い（みにくい）」です。"
                    },
                    {
                        question: "次のうち、擬音語はどれ？",
                        options: ["きらきら", "ワンワン", "のろのろ", "じっと"],
                        answer: 1,
                        explanation: "「ワンワン」は犬の鳴き声を表す擬音語です。きらきらは擬態語。"
                    },
                    {
                        question: "俳句の季語で「桜」はどの季節？",
                        options: ["春", "夏", "秋", "冬"],
                        answer: 0,
                        explanation: "桜は春の季語です。"
                    }
                ]
            }
        ]
    },
    english: {
        name: "英語",
        icon: "🌐",
        units: [
            {
                name: "単語",
                questions: [
                    {
                        question: "\"book\" の意味は？",
                        options: ["机", "本", "椅子", "窓"],
                        answer: 1,
                        explanation: "book は「本」という意味です。"
                    },
                    {
                        question: "\"beautiful\" の意味は？",
                        options: ["大きい", "美しい", "難しい", "簡単な"],
                        answer: 1,
                        explanation: "beautiful は「美しい」という意味の形容詞です。"
                    },
                    {
                        question: "\"Thank you very much.\" の意味は？",
                        options: ["さようなら", "どういたしまして", "本当にありがとうございます", "おはようございます"],
                        answer: 2,
                        explanation: "Thank you very much は「本当にありがとうございます」という意味です。"
                    }
                ]
            },
            {
                name: "文法",
                questions: [
                    {
                        question: "\"I ___ a student.\" の空欄に入るのは？",
                        options: ["is", "am", "are", "be"],
                        answer: 1,
                        explanation: "主語が I のとき、be動詞は am を使います。"
                    },
                    {
                        question: "\"apple\" の複数形は？",
                        options: ["apples", "appls", "applees", "apple"],
                        answer: 0,
                        explanation: "一般的な名詞の複数形は -s をつけます。"
                    },
                    {
                        question: "\"She plays tennis.\" を疑問文にすると？",
                        options: ["Does she plays tennis?", "Does she play tennis?", "Do she play tennis?", "Is she play tennis?"],
                        answer: 1,
                        explanation: "三人称単数の疑問文は Does + 主語 + 動詞の原形 の形になります。"
                    },
                    {
                        question: "現在進行形を作るのに必要なのは？",
                        options: ["be動詞 + 動詞の原形", "be動詞 + 動詞ing", "do + 動詞の原形", "have + 過去分詞"],
                        answer: 1,
                        explanation: "現在進行形は「be動詞 + 動詞ing」の形で作ります。"
                    }
                ]
            },
            {
                name: "会話・表現",
                questions: [
                    {
                        question: "\"Can you swim?\" に対する答えとして適切なのは？",
                        options: ["Yes, I do.", "Yes, I can.", "Yes, I am.", "Yes, I have."],
                        answer: 1,
                        explanation: "Can で聞かれたら、can で答えます。"
                    },
                    {
                        question: "\"I went to school yesterday.\" の \"went\" は何の過去形？",
                        options: ["want", "go", "get", "win"],
                        answer: 1,
                        explanation: "went は go の過去形です。go - went - gone"
                    },
                    {
                        question: "\"bigger\" は何の比較級？",
                        options: ["bag", "big", "bug", "beg"],
                        answer: 1,
                        explanation: "big の比較級は bigger です。（big - bigger - biggest）"
                    }
                ]
            }
        ]
    },
    science: {
        name: "理科",
        icon: "🔬",
        units: [
            {
                name: "物理",
                questions: [
                    {
                        question: "電流の単位は？",
                        options: ["ボルト（V）", "アンペア（A）", "オーム（Ω）", "ワット（W）"],
                        answer: 1,
                        explanation: "電流の単位はアンペア（A）です。電圧はボルト、抵抗はオーム。"
                    },
                    {
                        question: "音が伝わる速さが最も速い物質は？",
                        options: ["空気", "水", "鉄", "真空"],
                        answer: 2,
                        explanation: "固体である鉄は、空気や水より音を速く伝えます。真空では音は伝わりません。"
                    }
                ]
            },
            {
                name: "化学",
                questions: [
                    {
                        question: "水の化学式は？",
                        options: ["CO2", "H2O", "O2", "NaCl"],
                        answer: 1,
                        explanation: "水は水素（H）2つと酸素（O）1つからなるH2Oです。"
                    },
                    {
                        question: "酸性の水溶液の性質として正しいのは？",
                        options: ["BTB溶液を青くする", "リトマス紙を赤くする", "石けん水のような手触り", "pH7以上"],
                        answer: 1,
                        explanation: "酸性の水溶液は青いリトマス紙を赤くします。"
                    }
                ]
            },
            {
                name: "生物",
                questions: [
                    {
                        question: "植物の光合成で必要なものは？",
                        options: ["酸素と水", "二酸化炭素と水", "窒素と水", "二酸化炭素と酸素"],
                        answer: 1,
                        explanation: "光合成には二酸化炭素と水が必要で、酸素と糖を生成します。"
                    },
                    {
                        question: "人間の体で血液を全身に送り出す器官は？",
                        options: ["肺", "胃", "心臓", "腎臓"],
                        answer: 2,
                        explanation: "心臓がポンプの役割をして、血液を全身に送り出します。"
                    },
                    {
                        question: "遺伝の法則を発見した科学者は？",
                        options: ["ダーウィン", "メンデル", "ニュートン", "アインシュタイン"],
                        answer: 1,
                        explanation: "メンデルがエンドウマメの実験で遺伝の法則を発見しました。"
                    }
                ]
            },
            {
                name: "地学",
                questions: [
                    {
                        question: "地球から最も近い恒星は？",
                        options: ["月", "火星", "太陽", "北極星"],
                        answer: 2,
                        explanation: "太陽は地球から約1億5000万km離れた最も近い恒星です。"
                    },
                    {
                        question: "火山岩と深成岩の違いを決める要因は？",
                        options: ["成分", "冷却速度", "色", "硬さ"],
                        answer: 1,
                        explanation: "冷却速度の違いで結晶の大きさが変わり、火山岩と深成岩に分かれます。"
                    },
                    {
                        question: "月の満ち欠けの周期は約何日？",
                        options: ["7日", "15日", "29日", "365日"],
                        answer: 2,
                        explanation: "月の満ち欠け（朔望月）は約29.5日です。"
                    }
                ]
            }
        ]
    },
    social: {
        name: "社会",
        icon: "🌍",
        units: [
            {
                name: "地理",
                questions: [
                    {
                        question: "日本の首都は？",
                        options: ["大阪", "京都", "東京", "名古屋"],
                        answer: 2,
                        explanation: "日本の首都は東京です。"
                    },
                    {
                        question: "日本で最も長い川は？",
                        options: ["利根川", "信濃川", "石狩川", "多摩川"],
                        answer: 1,
                        explanation: "信濃川は367kmで日本最長の川です。"
                    },
                    {
                        question: "日本の最南端にある島は？",
                        options: ["与那国島", "沖ノ鳥島", "南鳥島", "択捉島"],
                        answer: 1,
                        explanation: "沖ノ鳥島が日本最南端の島です。"
                    },
                    {
                        question: "地図で北を上にしたとき、等高線の間隔が狭いところは？",
                        options: ["平地", "急な斜面", "ゆるやかな斜面", "窪地"],
                        answer: 1,
                        explanation: "等高線の間隔が狭いほど、傾斜が急であることを示します。"
                    }
                ]
            },
            {
                name: "歴史",
                questions: [
                    {
                        question: "鎌倉幕府を開いた人物は？",
                        options: ["源頼朝", "足利尊氏", "徳川家康", "織田信長"],
                        answer: 0,
                        explanation: "1185年（または1192年）に源頼朝が鎌倉幕府を開きました。"
                    },
                    {
                        question: "第二次世界大戦が終わった年は？",
                        options: ["1939年", "1941年", "1945年", "1950年"],
                        answer: 2,
                        explanation: "第二次世界大戦は1945年に終結しました。"
                    },
                    {
                        question: "聖徳太子が制定したとされるものは？",
                        options: ["大宝律令", "十七条の憲法", "武家諸法度", "御成敗式目"],
                        answer: 1,
                        explanation: "聖徳太子は604年に十七条の憲法を制定したとされています。"
                    }
                ]
            },
            {
                name: "公民",
                questions: [
                    {
                        question: "三権分立の「三権」に含まれないのは？",
                        options: ["立法権", "行政権", "司法権", "選挙権"],
                        answer: 3,
                        explanation: "三権は立法（国会）、行政（内閣）、司法（裁判所）です。"
                    },
                    {
                        question: "国会の種類で、毎年1回召集されるのは？",
                        options: ["通常国会", "臨時国会", "特別国会", "緊急集会"],
                        answer: 0,
                        explanation: "通常国会は毎年1月に召集され、150日間開かれます。"
                    },
                    {
                        question: "日本の選挙権年齢は？",
                        options: ["16歳以上", "18歳以上", "20歳以上", "25歳以上"],
                        answer: 1,
                        explanation: "2016年から選挙権年齢は18歳以上に引き下げられました。"
                    }
                ]
            }
        ]
    }
};
