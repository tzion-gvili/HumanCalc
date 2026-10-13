// HumanCalc - חידות של תנועה, משקל וכוח
// TgSofts +9725914007

const QUESTIONS_PER_GAME = 5;

const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (list) => list[Math.floor(Math.random() * list.length)];
const fmt = (n) => n.toLocaleString('he-IL');

// Resistor pairs (2-60 ohm) whose parallel value is a whole number.
const PARALLEL_PAIRS = [];
for (let a = 2; a <= 60; a++) {
    for (let b = a; b <= 60; b++) {
        if ((a * b) % (a + b) === 0) PARALLEL_PAIRS.push([a, b]);
    }
}

const TOPICS = {
    speed: { name: 'מהירות, זמן ודרך', icon: '⏱️' },
    weight: { name: 'משקלים ומחירים', icon: '⚖️' },
    force: { name: 'כוח ותוצאות', icon: '💥' }
};

// Each generator picks numbers so the answer always comes out whole.
const GENERATORS = {
    speed: [
        () => {
            const v = pick([600, 700, 800, 900]);
            const t = rnd(2, 6);
            const d = v * t;
            return {
                icon: '✈️',
                text: `מטוס טס במהירות של ${fmt(v)} קמ״ש. המרחק ליעד הוא ${fmt(d)} ק״מ. כמה שעות תימשך הטיסה?`,
                answer: t, unit: 'שעות',
                hint: 'זמן = דרך ÷ מהירות',
                explain: `${fmt(d)} ÷ ${fmt(v)} = ${t} שעות`
            };
        },
        () => {
            const v = pick([20, 25, 30, 40]);
            const t = rnd(3, 10);
            return {
                icon: '🚢',
                text: `ספינה שטה במהירות של ${v} קמ״ש במשך ${t} שעות. איזה מרחק היא עברה?`,
                answer: v * t, unit: 'ק״מ',
                hint: 'דרך = מהירות × זמן',
                explain: `${v} × ${t} = ${fmt(v * t)} ק״מ`
            };
        },
        () => {
            const v = pick([200, 250, 400, 500, 800, 1000]);
            const t = rnd(3, 12);
            const d = v * t;
            return {
                icon: '🚀',
                text: `טיל טס במהירות של ${fmt(v)} מטר בשנייה. המטרה נמצאת במרחק ${fmt(d)} מטר. כמה שניות ייקח לטיל להגיע?`,
                answer: t, unit: 'שניות',
                hint: 'זמן = דרך ÷ מהירות',
                explain: `${fmt(d)} ÷ ${fmt(v)} = ${t} שניות`
            };
        },
        () => {
            const r = pick([2, 3, 4, 5]);
            const t = rnd(10, 30);
            const h = r * t;
            return {
                icon: '🎈',
                text: `כדור פורח עולה ${r} מטר בכל דקה. כמה דקות ייקח לו להגיע לגובה ${fmt(h)} מטר?`,
                answer: t, unit: 'דקות',
                hint: 'זמן = גובה ÷ מהירות העלייה',
                explain: `${fmt(h)} ÷ ${r} = ${t} דקות`
            };
        },
        () => {
            const v = pick([50, 60, 70, 80, 90]);
            const t = rnd(2, 5);
            const d = v * t;
            return {
                icon: '🚚',
                text: `משאית נסעה ${fmt(d)} ק״מ ב-${t} שעות. מה הייתה המהירות הממוצעת שלה?`,
                answer: v, unit: 'קמ״ש',
                hint: 'מהירות = דרך ÷ זמן',
                explain: `${fmt(d)} ÷ ${t} = ${v} קמ״ש`
            };
        },
        () => {
            const v1 = pick([40, 50, 60, 70, 80]);
            const v2 = pick([40, 50, 60, 70, 80]);
            const t = rnd(1, 4);
            const d = (v1 + v2) * t;
            return {
                icon: '🚚',
                text: `שתי משאיות יוצאות באותו רגע זו לקראת זו. המרחק ביניהן ${fmt(d)} ק״מ. אחת נוסעת ${v1} קמ״ש והשנייה ${v2} קמ״ש. בעוד כמה שעות הן ייפגשו?`,
                answer: t, unit: 'שעות',
                hint: 'כשנוסעים זה לקראת זה, מחברים את המהירויות. ואז: זמן = דרך ÷ מהירות',
                explain: `${v1} + ${v2} = ${v1 + v2} קמ״ש ביחד. ${fmt(d)} ÷ ${v1 + v2} = ${t} שעות`
            };
        },
        () => {
            const start = rnd(6, 12);
            const v = pick([500, 600, 800]);
            const t = rnd(2, 5);
            const d = v * t;
            return {
                icon: '🛫',
                text: `מטוס ממריא בשעה ${start}:00 וטס ${fmt(d)} ק״מ במהירות של ${v} קמ״ש. באיזו שעה הוא ינחת? (כתבו רק את השעה)`,
                answer: start + t, unit: ':00',
                hint: 'קודם חשבו כמה שעות הטיסה (דרך ÷ מהירות), ואז הוסיפו לשעת ההמראה',
                explain: `${fmt(d)} ÷ ${v} = ${t} שעות. ${start} + ${t} = ${start + t}:00`
            };
        },
        () => {
            const r = pick([10, 20, 30, 40]);
            const h = pick([500, 1000, 1500, 2000]);
            const km = (r * h) / 1000;
            return {
                icon: '🪂',
                text: `לדאון יש יחס גלישה של ${r}: על כל מטר שהוא יורד, הוא מתקדם ${r} מטר קדימה. הוא נמצא בגובה ${fmt(h)} מטר. כמה ק״מ הוא יכול לגלוש עד הקרקע?`,
                answer: km, unit: 'ק״מ',
                hint: 'מרחק = יחס גלישה × גובה  (L/D = d ÷ h). בסוף מחלקים ב-1,000 כדי לקבל ק״מ',
                explain: `${r} × ${fmt(h)} = ${fmt(r * h)} מטר = ${km} ק״מ`
            };
        },
        () => {
            const [a, where] = pick([[340, 'ליד הקרקע'], [300, 'בגובה רב']]);
            const M = rnd(1, 5);
            const v = a * M;
            const craft = M > 3 ? 'טיל' : 'מטוס קרב';
            const icon = M > 3 ? '🚀' : '🛩️';
            if (Math.random() < 0.5) {
                return {
                    icon,
                    text: `${where}, מהירות הקול היא ${a} מטר בשנייה. ${craft} טס במהירות של ${fmt(v)} מטר בשנייה. באיזה מספר מאך הוא טס?`,
                    answer: M, unit: 'מאך',
                    hint: 'מספר מאך = מהירות ÷ מהירות הקול  (M = V ÷ a)',
                    explain: `${fmt(v)} ÷ ${a} = מאך ${M}`
                };
            }
            return {
                icon,
                text: `${where}, מהירות הקול היא ${a} מטר בשנייה. ${craft} טס במאך ${M}. מה המהירות שלו?`,
                answer: v, unit: 'מ׳/ש',
                hint: 'מהירות = מספר מאך × מהירות הקול  (V = M × a)',
                explain: `${M} × ${a} = ${fmt(v)} מ׳/ש`
            };
        },
        () => {
            const V = pick([40, 60, 80]);
            const a = pick([2, 4, 5]);
            const s = (V * V) / (2 * a);
            return {
                icon: '🛫',
                text: `מטוס מאיץ על המסלול בתאוצה של ${a} מטר לשנייה בריבוע. הוא ממריא כשהמהירות שלו מגיעה ל-${V} מטר בשנייה. כמה מטר מסלול הוא צריך?`,
                answer: s, unit: 'מטר',
                hint: 'מרחק המראה = מהירות × מהירות ÷ (2 × תאוצה)  (s = V² ÷ 2a)',
                explain: `${V} × ${V} = ${fmt(V * V)}. ${fmt(V * V)} ÷ ${2 * a} = ${fmt(s)} מטר`
            };
        },
        () => {
            const t = rnd(2, 5);
            const h = 5 * t * t;
            return {
                icon: '🪨',
                text: `אבן נופלת מגשר גבוה. היא נופלת ${t} שניות עד שהיא פוגעת במים. מאיזה גובה היא נפלה? (קחו g = 10)`,
                answer: h, unit: 'מטר',
                hint: 'גובה הנפילה = חצי × 10 × זמן × זמן  (h = ½ × g × t²)',
                explain: `½ × 10 × ${t} × ${t} = ${h} מטר`
            };
        },
        () => {
            const v0 = pick([0, 5, 10, 15, 20]);
            const a = rnd(1, 5);
            const t = rnd(2, 10);
            const v = v0 + a * t;
            return {
                icon: '🏎️',
                text: `${v0 === 0 ? 'מכונית עומדת במקום.' : `מכונית נוסעת במהירות של ${v0} מטר בשנייה.`} היא מאיצה בתאוצה של ${a} מטר לשנייה בריבוע במשך ${t} שניות. מה המהירות שלה בסוף?`,
                answer: v, unit: 'מ׳/ש',
                hint: 'מהירות סופית = מהירות התחלתית + תאוצה × זמן  (v = v0 + a × t)',
                explain: `${v0} + ${a} × ${t} = ${v0} + ${a * t} = ${v} מ׳/ש`
            };
        },
        () => {
            const v0 = pick([0, 10, 20, 30]);
            const a = rnd(2, 6);
            const t = rnd(2, 10);
            const v = v0 + a * t;
            return {
                icon: '🏍️',
                text: `${v0 === 0 ? 'אופנוע יצא מעמידה והגיע' : `אופנוע האיץ מ-${v0} מטר בשנייה`} ל-${v} מטר בשנייה תוך ${t} שניות. מה הייתה התאוצה שלו?`,
                answer: a, unit: 'מ׳/ש²',
                hint: 'תאוצה = (מהירות סופית − מהירות התחלתית) ÷ זמן  (a = (v − v0) ÷ t)',
                explain: `(${v} − ${v0}) ÷ ${t} = ${v - v0} ÷ ${t} = ${a} מ׳/ש²`
            };
        },
        () => {
            const a = pick([2, 4, 5, 8]);
            const t = rnd(2, 8);
            const v0 = a * t;
            return {
                icon: '🚆',
                text: `רכבת נוסעת במהירות של ${v0} מטר בשנייה ומתחילה לבלום. היא מאטה ב-${a} מטר לשנייה בכל שנייה. אחרי כמה שניות היא תעצור?`,
                answer: t, unit: 'שניות',
                hint: 'בבלימה: v = v0 − a × t. כשהרכבת עוצרת v = 0, ולכן t = v0 ÷ a',
                explain: `${v0} ÷ ${a} = ${t} שניות`
            };
        },
        () => {
            const v0 = pick([0, 5, 10, 20]);
            const a = pick([2, 4, 6]);
            const t = rnd(2, 8);
            const s = v0 * t + (a * t * t) / 2;
            return {
                icon: '🚗',
                text: `${v0 === 0 ? 'מכונית יוצאת מעמידה' : `מכונית נוסעת במהירות התחלתית של ${v0} מטר בשנייה`}, ומאיצה בתאוצה של ${a} מטר לשנייה בריבוע במשך ${t} שניות. איזה מרחק היא עברה?`,
                answer: s, unit: 'מטר',
                hint: 'דרך = מהירות התחלתית × זמן + חצי × תאוצה × זמן × זמן  (s = v0 × t + ½ × a × t²)',
                explain: `${v0} × ${t} + ½ × ${a} × ${t} × ${t} = ${v0 * t} + ${(a * t * t) / 2} = ${s} מטר`
            };
        },
        () => {
            const t = rnd(1, 5);
            const v0 = 10 * t;
            return {
                icon: '🏐',
                text: `זורקים כדור ישר למעלה במהירות של ${v0} מטר בשנייה. אחרי כמה שניות הוא יעצור בנקודה הכי גבוהה? (קחו g = 10)`,
                answer: t, unit: 'שניות',
                hint: 'בזמן העלייה: v = v0 − g × t. בנקודה הגבוהה v = 0, ולכן t = v0 ÷ 10',
                explain: `${v0} ÷ 10 = ${t} שניות`
            };
        },
        () => {
            const inWater = Math.random() < 0.5;
            const v = inWater ? 1500 : 340;
            const f = inWater ? pick([15, 30, 50, 75, 100, 150, 300, 500, 750, 1500]) : pick([17, 20, 34, 68, 85, 170, 340]);
            const lambda = v / f;
            const text = inWater
                ? `מהירות הקול במים היא 1,500 מטר בשנייה. דולפין משמיע צליל בתדר של ${f} הרץ. מה אורך הגל של הצליל?`
                : `מהירות הקול באוויר היא 340 מטר בשנייה. רמקול משמיע צליל בתדר של ${f} הרץ. מה אורך הגל של הצליל?`;
            return {
                icon: inWater ? '🐬' : '🔊',
                text,
                answer: lambda, unit: 'מטר',
                hint: 'אורך גל = מהירות ÷ תדר  (λ = v ÷ f)',
                explain: `${fmt(v)} ÷ ${f} = ${lambda} מטר`
            };
        },
        () => {
            const v = pick([500, 600, 800]);
            const w = pick([50, 100]);
            const t = rnd(2, 5);
            const d = (v - w) * t;
            return {
                icon: '🌬️',
                text: `מטוס טס במהירות של ${v} קמ״ש, אבל נושבת נגדו רוח של ${w} קמ״ש. המרחק ליעד הוא ${fmt(d)} ק״מ. כמה שעות תימשך הטיסה?`,
                answer: t, unit: 'שעות',
                hint: 'רוח נגדית מורידה מהמהירות: מהירות אמיתית = מהירות המטוס − הרוח. ואז: זמן = דרך ÷ מהירות',
                explain: `${v} − ${w} = ${v - w} קמ״ש. ${fmt(d)} ÷ ${v - w} = ${t} שעות`
            };
        },
        () => {
            const t = rnd(2, 9);
            return {
                icon: '⛈️',
                text: `ראיתם ברק, ושמעתם את הרעם רק אחרי ${t} שניות. מהירות הקול היא 340 מטר בשנייה. כמה מטר רחוק מכם הברק?`,
                answer: 340 * t, unit: 'מטר',
                hint: 'האור מגיע כמעט מיד, והקול מגיע לאט. דרך = מהירות הקול × זמן',
                explain: `340 × ${t} = ${fmt(340 * t)} מטר`
            };
        },
        () => {
            const t = rnd(2, 9);
            const d = 300000 * t;
            return {
                icon: '🛰️',
                text: `לוויין שולח אות רדיו לכדור הארץ. האות עובר 300,000 ק״מ בכל שנייה (מהירות האור). המרחק הוא ${fmt(d)} ק״מ. כמה שניות ייקח לאות להגיע?`,
                answer: t, unit: 'שניות',
                hint: 'זמן = דרך ÷ מהירות',
                explain: `${fmt(d)} ÷ 300,000 = ${t} שניות`
            };
        },
        () => {
            const use = pick([250, 500]);
            const h = rnd(6, 20);
            const cap = use * h;
            return {
                icon: '📱',
                text: `בסוללה של טלפון יש ${fmt(cap)} מיליאמפר-שעה. הטלפון צורך ${use} מיליאמפר בכל שעה. כמה שעות תחזיק הסוללה?`,
                answer: h, unit: 'שעות',
                hint: 'זמן = קיבולת הסוללה ÷ צריכה בשעה',
                explain: `${fmt(cap)} ÷ ${use} = ${h} שעות`
            };
        }
    ],

    weight: [
        () => {
            const c = pick([20, 25, 40, 50]);
            const n = rnd(10, 40);
            const max = c * n;
            return {
                icon: '🚚',
                text: `משאית יכולה להעמיס עד ${fmt(max)} ק״ג. כל ארגז שוקל ${c} ק״ג. כמה ארגזים לכל היותר אפשר להעמיס עליה?`,
                answer: n, unit: 'ארגזים',
                hint: 'מספר ארגזים = המשקל המקסימלי ÷ משקל ארגז אחד',
                explain: `${fmt(max)} ÷ ${c} = ${n} ארגזים`
            };
        },
        () => {
            const n = rnd(5, 20);
            const k = pick([10, 20, 25]);
            const p = pick([50, 80, 100, 120]);
            const total = n * k * p;
            return {
                icon: '🚢',
                text: `ספינת משא מובילה ${n} מכולות. כל מכולה שוקלת ${k} טון. ההובלה עולה ${p} ₪ לכל טון. כמה עולה כל ההובלה?`,
                answer: total, unit: '₪',
                hint: 'קודם חשבו כמה טון יש בסך הכול, ואז כפלו במחיר לטון',
                explain: `${n} × ${k} = ${n * k} טון. ${n * k} × ${p} = ${fmt(total)} ₪`
            };
        },
        () => {
            const f = pick([2000, 2500, 3000]);
            const h = rnd(2, 6);
            const pr = pick([2, 3, 4]);
            const total = f * h * pr;
            return {
                icon: '✈️',
                text: `מטוס שורף ${fmt(f)} ליטר דלק בכל שעת טיסה. הטיסה נמשכת ${h} שעות, וליטר דלק עולה ${pr} ₪. כמה יעלה הדלק לכל הטיסה?`,
                answer: total, unit: '₪',
                hint: 'ליטרים בסך הכול = ליטרים לשעה × שעות. ואז כפלו במחיר לליטר',
                explain: `${fmt(f)} × ${h} = ${fmt(f * h)} ליטר. ${fmt(f * h)} × ${pr} = ${fmt(total)} ₪`
            };
        },
        () => {
            const n = rnd(2, 4);
            const s = rnd(3, 12);
            const load = n * 80 + s * 10;
            return {
                icon: '🎈',
                text: `הסל של כדור פורח יכול לשאת ${load} ק״ג. עולים אליו ${n} נוסעים, וכל אחד שוקל 80 ק״ג. כמה שקי חול של 10 ק״ג אפשר עוד להוסיף?`,
                answer: s, unit: 'שקים',
                hint: 'קודם חשבו כמה שוקלים הנוסעים. מה שנשאר מחלקים ב-10',
                explain: `${n} × 80 = ${n * 80} ק״ג. ${load} − ${n * 80} = ${s * 10} ק״ג. ${s * 10} ÷ 10 = ${s} שקים`
            };
        },
        () => {
            const n = pick([4, 6, 8, 10]);
            const p = rnd(6, 18) * 50;
            const total = n * p;
            return {
                icon: '🛞',
                text: `קנו ${n} צמיגים חדשים למשאית ושילמו ${fmt(total)} ₪. כמה עלה צמיג אחד?`,
                answer: p, unit: '₪',
                hint: 'מחיר של אחד = המחיר הכולל ÷ מספר הצמיגים',
                explain: `${fmt(total)} ÷ ${n} = ${p} ₪`
            };
        },
        () => {
            const perKg = pick([15, 20, 25, 30]);
            const kg = rnd(3, 20);
            return {
                icon: '📦',
                text: `משלוח חבילה במטוס עולה ${perKg} ₪ לכל ק״ג. החבילה שוקלת ${kg} ק״ג. כמה עולה המשלוח?`,
                answer: perKg * kg, unit: '₪',
                hint: 'מחיר = מחיר לק״ג × מספר הק״ג',
                explain: `${perKg} × ${kg} = ${perKg * kg} ₪`
            };
        },
        () => {
            const S = pick([10, 15, 20]);
            const ws = pick([40, 50, 60, 80]);
            const W = S * ws;
            return {
                icon: '🛬',
                text: `מטוס קל שוקל ${fmt(W)} ק״ג. שטח הכנפיים שלו הוא ${S} מטר רבוע. מה העומס על הכנף (כמה ק״ג על כל מטר רבוע)?`,
                answer: ws, unit: 'ק״ג למ״ר',
                hint: 'עומס כנף = משקל ÷ שטח הכנף  (W/S)',
                explain: `${fmt(W)} ÷ ${S} = ${ws} ק״ג למ״ר`
            };
        },
        () => {
            const ar = pick([5, 8, 10]);
            const c = pick([1, 2]);
            const b = ar * c;
            const S = b * c;
            return {
                icon: '🦅',
                text: `מוטת הכנפיים של מטוס (מקצה לקצה) היא ${b} מטר, ושטח הכנפיים ${S} מטר רבוע. מה יחס הממדים (Aspect Ratio) של הכנף?`,
                answer: ar, unit: '',
                hint: 'יחס ממדים = מוטה × מוטה ÷ שטח  (AR = b² ÷ S)',
                explain: `${b} × ${b} = ${b * b}. ${b * b} ÷ ${S} = ${ar}`
            };
        },
        () => {
            const A = pick([2, 4, 5]);
            const P = pick([100, 200, 500, 1000]);
            const F = P * A;
            return {
                icon: '📦',
                text: `ארגז כבד לוחץ על הרצפה בכוח של ${fmt(F)} ניוטון. הוא עומד על שטח של ${A} מטר רבוע. מה הלחץ על הרצפה?`,
                answer: P, unit: 'פסקל',
                hint: 'לחץ = כוח ÷ שטח  (P = F ÷ A)',
                explain: `${fmt(F)} ÷ ${A} = ${fmt(P)} פסקל`
            };
        },
        () => {
            const P = pick([1, 2, 3]);
            const h = rnd(2, 8);
            return {
                icon: '❄️',
                text: `מזגן בהספק של ${P} קילוואט פועל ${h} שעות. כמה קוט״ש (קילוואט-שעה) של חשמל הוא צרך?`,
                answer: P * h, unit: 'קוט״ש',
                hint: 'אנרגיה = הספק × זמן  (E = P × t)',
                explain: `${P} × ${h} = ${P * h} קוט״ש`
            };
        },
        () => {
            const P = pick([1, 2, 3]);
            const h = pick([5, 10]);
            const kwh = P * h;
            const cost = (kwh * 6) / 10;
            return {
                icon: '🧾',
                text: `תנור חשמלי בהספק של ${P} קילוואט דלק ${h} שעות. כל קוט״ש עולה 0.6 ₪. כמה עלה החשמל?`,
                answer: cost, unit: '₪',
                hint: 'קודם: קוט״ש = הספק × שעות. ואז כפלו במחיר של קוט״ש אחד',
                explain: `${P} × ${h} = ${kwh} קוט״ש. ${kwh} × 0.6 = ${cost} ₪`
            };
        },
        () => {
            const n = pick([100, 150, 200, 250]);
            const per = pick([20, 30, 40]);
            const F = n * per;
            return {
                icon: '⛽',
                text: `מטוס שרף ${fmt(F)} ליטר דלק בטיסה. היו בו ${n} נוסעים. כמה ליטר דלק יצאו על כל נוסע?`,
                answer: per, unit: 'ליטר',
                hint: 'ליטר לנוסע = כל הדלק ÷ מספר הנוסעים',
                explain: `${fmt(F)} ÷ ${n} = ${per} ליטר`
            };
        },
        () => {
            const [name, rho] = pick([['ברזל', 8], ['אלומיניום', 3], ['זהב', 19], ['מים', 1]]);
            const V = rnd(2, 12);
            return {
                icon: '🧱',
                text: `ליטר אחד של ${name} שוקל ${rho} ק״ג. כמה שוקלים ${V} ליטר של ${name}?`,
                answer: rho * V, unit: 'ק״ג',
                hint: 'מסה = צפיפות × נפח  (m = ρ × V)',
                explain: `${rho} × ${V} = ${rho * V} ק״ג`
            };
        },
        () => {
            const empty = pick([3000, 4000, 5000]);
            const fuel = pick([1000, 1500, 2000]);
            const n = rnd(5, 20);
            const max = empty + fuel + n * 100;
            return {
                icon: '🛄',
                text: `מטוס קטן יכול להמריא עם ${fmt(max)} ק״ג לכל היותר. המטוס הריק שוקל ${fmt(empty)} ק״ג, והדלק ${fmt(fuel)} ק״ג. כל נוסע עם מזוודה שוקל 100 ק״ג. כמה נוסעים לכל היותר אפשר להעלות?`,
                answer: n, unit: 'נוסעים',
                hint: 'מורידים מהמשקל המקסימלי את המטוס והדלק. מה שנשאר מחלקים ב-100',
                explain: `${fmt(max)} − ${fmt(empty)} − ${fmt(fuel)} = ${fmt(n * 100)} ק״ג. ${fmt(n * 100)} ÷ 100 = ${n} נוסעים`
            };
        },
        () => {
            const W = pick([60, 100]);
            const n = rnd(2, 10);
            const hours = pick([5, 10]);
            const wh = W * n * hours;
            return {
                icon: '💡',
                text: `בבית יש ${n} נורות, כל אחת של ${W} וואט. כולן דולקות ${hours} שעות. כמה וואט-שעה של חשמל הן צרכו?`,
                answer: wh, unit: 'וואט-שעה',
                hint: 'קודם: ההספק של כל הנורות = מספר × וואט. ואז כפלו בשעות',
                explain: `${n} × ${W} = ${fmt(n * W)} וואט. ${fmt(n * W)} × ${hours} = ${fmt(wh)} וואט-שעה`
            };
        }
    ],

    force: [
        () => {
            const m = pick([100, 200, 500]);
            const a = pick([10, 20, 30, 50]);
            return {
                icon: '🚀',
                text: `טיל במסה של ${m} ק״ג מאיץ בתאוצה של ${a} מטר לשנייה בריבוע. איזה כוח דוחף אותו?`,
                answer: m * a, unit: 'ניוטון',
                hint: 'כוח = מסה × תאוצה  (F = m × a)',
                explain: `${m} × ${a} = ${fmt(m * a)} ניוטון`
            };
        },
        () => {
            const m = pick([2000, 4000, 5000]);
            const a = pick([1, 2, 3]);
            const F = m * a;
            return {
                icon: '🚚',
                text: `המנוע של משאית במסה של ${fmt(m)} ק״ג דוחף אותה בכוח של ${fmt(F)} ניוטון. מה התאוצה שלה (במטר לשנייה בריבוע)?`,
                answer: a, unit: 'מ׳/ש²',
                hint: 'תאוצה = כוח ÷ מסה  (a = F ÷ m)',
                explain: `${fmt(F)} ÷ ${fmt(m)} = ${a} מ׳/ש²`
            };
        },
        () => {
            const m = rnd(30, 90) * 10;
            return {
                icon: '🎈',
                text: `כדור פורח צריך להרים סל, נוסעים וציוד במסה כוללת של ${m} ק״ג. מה כוח ההרמה המינימלי שהוא צריך? (קחו g = 10)`,
                answer: m * 10, unit: 'ניוטון',
                hint: 'כוח הכובד = מסה × 10. כדי להרים, צריך לפחות כוח כזה כלפי מעלה',
                explain: `${m} × 10 = ${fmt(m * 10)} ניוטון`
            };
        },
        () => {
            const F = pick([1000, 2000, 5000]);
            const h = rnd(3, 20);
            return {
                icon: '🏗️',
                text: `מנוף בנמל מרים מכולה מספינה בכוח של ${fmt(F)} ניוטון לגובה של ${h} מטר. כמה עבודה הוא עושה?`,
                answer: F * h, unit: 'ג׳אול',
                hint: 'עבודה = כוח × דרך  (W = F × d)',
                explain: `${fmt(F)} × ${h} = ${fmt(F * h)} ג׳אול`
            };
        },
        () => {
            const P = pick([500, 1000, 2000, 4000]);
            const t = pick([5, 10, 20]);
            const W = P * t;
            return {
                icon: '🚢',
                text: `המנוע של סירה עושה עבודה של ${fmt(W)} ג׳אול ב-${t} שניות. מה ההספק שלו?`,
                answer: P, unit: 'וואט',
                hint: 'הספק = עבודה ÷ זמן  (P = W ÷ t)',
                explain: `${fmt(W)} ÷ ${t} = ${fmt(P)} וואט`
            };
        },
        () => {
            const tons = pick([2, 4, 5, 8]);
            const wheels = pick([4, 8]);
            const perWheel = (tons * 1000 * 10) / wheels;
            return {
                icon: '🚚',
                text: `משאית במסה של ${tons} טון עומדת על ${wheels} גלגלים. המשקל מתחלק שווה בין הגלגלים. איזה כוח לוחץ כל גלגל על הכביש? (טון = 1,000 ק״ג, g = 10)`,
                answer: perWheel, unit: 'ניוטון',
                hint: 'קודם: כוח הכובד = מסה בק״ג × 10. ואז מחלקים במספר הגלגלים',
                explain: `${tons} × 1,000 × 10 = ${fmt(tons * 10000)} ניוטון. ÷ ${wheels} = ${fmt(perWheel)} ניוטון`
            };
        },
        () => {
            const m = pick([5, 7, 10]);
            const v = rnd(2, 9);
            return {
                icon: '🎳',
                text: `כדור באולינג במסה של ${m} ק״ג מתגלגל במהירות של ${v} מטר בשנייה. מה התנע שלו?`,
                answer: m * v, unit: 'ק״ג·מ׳/ש',
                hint: 'תנע = מסה × מהירות  (p = m × v)',
                explain: `${m} × ${v} = ${m * v} ק״ג·מ׳/ש`
            };
        },
        () => {
            const m = pick([2, 4, 6, 10]);
            const v = pick([2, 3, 4, 5, 10]);
            const E = (m * v * v) / 2;
            return {
                icon: '⚽',
                text: `כדור במסה של ${m} ק״ג עף במהירות של ${v} מטר בשנייה. מה האנרגיה הקינטית (אנרגיית התנועה) שלו?`,
                answer: E, unit: 'ג׳אול',
                hint: 'אנרגיה קינטית = חצי × מסה × מהירות × מהירות  (E = ½ × m × v²)',
                explain: `½ × ${m} × ${v} × ${v} = ${fmt(E)} ג׳אול`
            };
        },
        () => {
            const m = rnd(40, 90);
            const h = pick([10, 20, 50, 100]);
            const E = m * 10 * h;
            return {
                icon: '🧗',
                text: `מטפס במסה של ${m} ק״ג עלה לגובה של ${h} מטר. כמה אנרגיית גובה (אנרגיה פוטנציאלית) הוא צבר? (קחו g = 10)`,
                answer: E, unit: 'ג׳אול',
                hint: 'אנרגיית גובה = מסה × 10 × גובה  (E = m × g × h)',
                explain: `${m} × 10 × ${h} = ${fmt(E)} ג׳אול`
            };
        },
        () => {
            const n = pick([2, 3, 4, 5]);
            const W = pick([10000, 20000, 50000]);
            const L = n * W;
            return {
                icon: '🌀',
                text: `מטוס שוקל ${fmt(W)} ניוטון. בפנייה חדה, הכנפיים מרימות אותו בכוח של ${fmt(L)} ניוטון. מה מקדם העומס (כמה g מרגיש הטייס)?`,
                answer: n, unit: 'g',
                hint: 'מקדם עומס = כוח העילוי ÷ המשקל  (n = L ÷ W)',
                explain: `${fmt(L)} ÷ ${fmt(W)} = ${n}g`
            };
        },
        () => {
            const ratio = pick([10, 15, 20]);
            const T = pick([1000, 2000, 5000]);
            const W = ratio * T;
            return {
                icon: '✈️',
                text: `מטוס שוקל ${fmt(W)} ניוטון. יחס העילוי לגרר שלו (L/D) הוא ${ratio}. כמה דחף צריך המנוע לתת כדי לטוס ישר וקבוע?`,
                answer: T, unit: 'ניוטון',
                hint: 'דחף נדרש = משקל ÷ יחס עילוי לגרר  (T = W ÷ (L/D))',
                explain: `${fmt(W)} ÷ ${ratio} = ${fmt(T)} ניוטון`
            };
        },
        () => {
            const I = rnd(2, 10);
            const R = pick([2, 3, 4, 5, 6]);
            const V = I * R;
            return {
                icon: '🔋',
                text: `סוללה של ${V} וולט מחוברת לנגד של ${R} אוהם. איזה זרם עובר במעגל?`,
                answer: I, unit: 'אמפר',
                hint: 'זרם = מתח ÷ התנגדות  (חוק אוהם: I = V ÷ R)',
                explain: `${V} ÷ ${R} = ${I} אמפר`
            };
        },
        () => {
            const I = rnd(2, 8);
            const R = pick([5, 10, 20, 25]);
            return {
                icon: '💡',
                text: `דרך נורה עם התנגדות של ${R} אוהם עובר זרם של ${I} אמפר. מה המתח על הנורה?`,
                answer: I * R, unit: 'וולט',
                hint: 'מתח = זרם × התנגדות  (חוק אוהם: V = I × R)',
                explain: `${I} × ${R} = ${I * R} וולט`
            };
        },
        () => {
            const I = rnd(2, 10);
            const P = 230 * I;
            return {
                icon: '☕',
                text: `קומקום חשמלי מחובר לשקע של 230 וולט. זורם בו זרם של ${I} אמפר. מה ההספק שלו?`,
                answer: P, unit: 'וואט',
                hint: 'הספק = מתח × זרם  (P = V × I)',
                explain: `230 × ${I} = ${fmt(P)} וואט`
            };
        },
        () => {
            const r1 = rnd(2, 20);
            const r2 = rnd(2, 20);
            const r3 = rnd(2, 20);
            return {
                icon: '🔗',
                text: `שלושה נגדים מחוברים בטור (אחד אחרי השני): ${r1} אוהם, ${r2} אוהם ו-${r3} אוהם. מה ההתנגדות הכוללת?`,
                answer: r1 + r2 + r3, unit: 'אוהם',
                hint: 'בטור פשוט מחברים: R = R1 + R2 + R3',
                explain: `${r1} + ${r2} + ${r3} = ${r1 + r2 + r3} אוהם`
            };
        },
        () => {
            const [r1, r2] = pick(PARALLEL_PAIRS);
            const total = (r1 * r2) / (r1 + r2);
            return {
                icon: '🔀',
                text: `שני נגדים מחוברים במקביל (זה לצד זה): ${r1} אוהם ו-${r2} אוהם. מה ההתנגדות הכוללת?`,
                answer: total, unit: 'אוהם',
                hint: 'בשני נגדים במקביל: R = (R1 × R2) ÷ (R1 + R2)',
                explain: `(${r1} × ${r2}) ÷ (${r1} + ${r2}) = ${r1 * r2} ÷ ${r1 + r2} = ${total} אוהם`
            };
        },
        () => {
            const k = pick([2, 4, 5, 10]);
            const N1 = pick([1000, 2000]);
            const N2 = N1 / k;
            const V1 = pick([200, 240, 400, 1000]);
            const V2 = V1 / k;
            return {
                icon: '🔌',
                text: `לשנאי יש ${fmt(N1)} כריכות בסליל הראשון ו-${fmt(N2)} כריכות בסליל השני. נכנס אליו מתח של ${fmt(V1)} וולט. איזה מתח יוצא ממנו?`,
                answer: V2, unit: 'וולט',
                hint: 'המתח משתנה כמו מספר הכריכות: V2 = V1 × N2 ÷ N1',
                explain: `${fmt(V1)} × ${fmt(N2)} ÷ ${fmt(N1)} = ${fmt(V2)} וולט`
            };
        },
        () => {
            const I = rnd(2, 5);
            const R = pick([2, 5, 10]);
            const P = I * I * R;
            return {
                icon: '🔥',
                text: `בגוף חימום עם התנגדות של ${R} אוהם עובר זרם של ${I} אמפר. כמה חום הוא מפיק (בוואט)?`,
                answer: P, unit: 'וואט',
                hint: 'חום (חימום ג׳ול) = זרם × זרם × התנגדות  (P = I² × R)',
                explain: `${I} × ${I} × ${R} = ${P} וואט`
            };
        }
    ]
};

class HumanCalc {
    constructor() {
        this.questions = [];
        this.current = 0;
        this.score = 0;
        this.audioContext = null;
        this.$ = (id) => document.getElementById(id);
        this.init();
    }

    init() {
        this.$('startBtn').addEventListener('click', () => this.startGame());
        this.$('againBtn').addEventListener('click', () => this.startGame());
        this.$('checkBtn').addEventListener('click', () => this.checkAnswer());
        this.$('hintBtn').addEventListener('click', () => this.showHint());
        this.$('nextBtn').addEventListener('click', () => this.nextQuestion());
        this.$('answerInput').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.checkAnswer();
        });
        this.showBestScore();
        this.initAudio();
    }

    // ---------- game flow ----------

    buildQuestions() {
        // Every topic at least once, then two more at random. No generator twice.
        const topics = ['speed', 'weight', 'force', pick(['speed', 'weight', 'force']), pick(['speed', 'weight', 'force'])];
        const used = new Set();
        const list = this.shuffle(topics).map(topic => {
            const options = GENERATORS[topic].filter(g => !used.has(g));
            const gen = pick(options);
            used.add(gen);
            return { topic, ...gen(), points: 0, hintUsed: false, done: false };
        });
        return list;
    }

    startGame() {
        this.questions = this.buildQuestions();
        this.current = 0;
        this.score = 0;
        this.show('gameScreen');
        this.renderQuestion();
        this.playSound(440, 0.2, 'sine');
    }

    renderQuestion() {
        const q = this.questions[this.current];
        const topic = TOPICS[q.topic];

        this.$('progressText').textContent = `שאלה ${this.current + 1} מתוך ${QUESTIONS_PER_GAME}`;
        this.$('scoreText').textContent = `ניקוד: ${this.score}`;
        this.$('progressFill').style.width = `${(this.current / QUESTIONS_PER_GAME) * 100}%`;

        this.$('questionTopic').textContent = `${topic.icon} ${topic.name}`;
        this.$('questionIcon').textContent = q.icon;
        this.$('questionText').textContent = q.text;
        this.$('answerUnit').textContent = q.unit;

        const input = this.$('answerInput');
        input.value = '';
        input.disabled = false;
        this.$('checkBtn').disabled = false;
        this.$('hintBtn').disabled = false;
        this.$('hintBox').classList.remove('show');
        this.$('feedback').textContent = '';
        this.$('feedback').className = 'feedback';
        this.$('nextBtn').classList.add('hidden');
        this.$('questionCard').classList.remove('correct', 'incorrect');
        input.focus();
    }

    showHint() {
        const q = this.questions[this.current];
        if (q.done) return;
        q.hintUsed = true;
        this.$('hintBox').textContent = `💡 ${q.hint}`;
        this.$('hintBox').classList.add('show');
        this.$('hintBtn').disabled = true;
        this.playSound(400, 0.2, 'sine');
    }

    checkAnswer() {
        const q = this.questions[this.current];
        if (q.done) return;

        const input = this.$('answerInput');
        const value = parseFloat(input.value);
        const feedback = this.$('feedback');

        if (isNaN(value)) {
            feedback.textContent = 'נא לכתוב מספר';
            feedback.className = 'feedback incorrect';
            return;
        }

        q.done = true;
        q.userAnswer = value;
        q.correct = Math.abs(value - q.answer) < 0.01;
        q.points = q.correct ? (q.hintUsed ? 0.5 : 1) : 0;
        this.score += q.points;

        input.disabled = true;
        this.$('checkBtn').disabled = true;
        this.$('hintBtn').disabled = true;

        const card = this.$('questionCard');
        card.classList.add(q.correct ? 'correct' : 'incorrect');

        if (q.correct) {
            feedback.innerHTML = `✓ נכון! ${q.hintUsed ? '(חצי נקודה, כי השתמשת ברמז)' : 'כל הכבוד!'}<br><span class="explain">${q.explain}</span>`;
            feedback.className = 'feedback correct';
            this.playSuccessSound();
            if (!q.hintUsed) {
                this.playCandySound();
                this.throwCandies(card);
            }
        } else {
            feedback.innerHTML = `✗ לא נכון. התשובה הנכונה: ${fmt(q.answer)} ${q.unit}<br><span class="explain">${q.explain}</span>`;
            feedback.className = 'feedback incorrect';
            this.playErrorSound();
        }

        this.$('scoreText').textContent = `ניקוד: ${this.score}`;
        const next = this.$('nextBtn');
        next.textContent = this.current === QUESTIONS_PER_GAME - 1 ? 'לתוצאות 🏁' : 'לשאלה הבאה ←';
        next.classList.remove('hidden');
        next.focus();
    }

    nextQuestion() {
        this.current++;
        if (this.current < QUESTIONS_PER_GAME) {
            this.renderQuestion();
        } else {
            this.showResults();
        }
    }

    showResults() {
        this.$('progressFill').style.width = '100%';
        const s = this.score;

        let title, message;
        if (s === QUESTIONS_PER_GAME) {
            title = '🏆 מושלם!';
            message = 'טייס, קברניט ומהנדס בבת אחת!';
            this.playCelebrationSound();
        } else if (s >= 4) {
            title = '🎉 מצוין!';
            message = 'כמעט הכול נכון. עוד משחק אחד לציון מושלם?';
            this.playCelebrationSound();
        } else if (s >= 2.5) {
            title = '👍 יפה מאוד!';
            message = 'אתם בדרך הנכונה. נסו שוב!';
        } else {
            title = '💪 לא לוותר!';
            message = 'קראו את ההסבר בכל שאלה ונסו שוב.';
        }

        const best = parseFloat(localStorage.getItem('humanCalcBest') || '0');
        if (s > best) {
            localStorage.setItem('humanCalcBest', String(s));
            message += ' 🌟 שיא חדש!';
        }

        this.$('resultsTitle').textContent = title;
        this.$('resultsScore').textContent = `הציון שלך: ${s} מתוך ${QUESTIONS_PER_GAME}`;
        this.$('resultsStars').textContent = '⭐'.repeat(Math.round(s)) || '🙂';
        this.$('resultsMessage').textContent = message;

        const list = this.$('resultsList');
        list.innerHTML = '';
        this.questions.forEach((q, i) => {
            const li = document.createElement('li');
            const mark = q.correct ? (q.hintUsed ? '½' : '✓') : '✗';
            li.className = q.correct ? 'ok' : 'bad';
            li.textContent = `${mark}  שאלה ${i + 1} ${q.icon}  התשובה: ${fmt(q.answer)} ${q.unit}`;
            list.appendChild(li);
        });

        this.show('resultsScreen');
        this.showBestScore();
    }

    showBestScore() {
        const best = localStorage.getItem('humanCalcBest');
        this.$('bestScore').textContent = best ? `🌟 השיא שלך: ${best} מתוך ${QUESTIONS_PER_GAME}` : '';
    }

    show(id) {
        ['startScreen', 'gameScreen', 'resultsScreen'].forEach(s => this.$(s).classList.toggle('hidden', s !== id));
    }

    shuffle(array) {
        const a = [...array];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    // ---------- sounds ----------

    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            // Mobile browsers only allow audio after the first touch or click.
            const resumeAudio = async () => {
                if (this.audioContext && this.audioContext.state === 'suspended') {
                    try { await this.audioContext.resume(); } catch (e) { /* ignore */ }
                }
            };
            document.addEventListener('touchstart', resumeAudio, { once: true });
            document.addEventListener('click', resumeAudio, { once: true });
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }

    async playSound(frequency, duration, type = 'sine') {
        if (!this.audioContext) return;
        if (this.audioContext.state === 'suspended') {
            try { await this.audioContext.resume(); } catch (e) { return; }
        }
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        oscillator.frequency.value = frequency;
        oscillator.type = type;
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    playSuccessSound() {
        [523.25, 659.25, 783.99, 987.77].forEach((freq, i) => {
            setTimeout(() => this.playSound(freq, 0.2, 'sine'), i * 150);
        });
    }

    playErrorSound() {
        this.playSound(200, 0.3, 'sawtooth');
    }

    playCelebrationSound() {
        [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, i) => {
            setTimeout(() => this.playSound(freq, 0.3, 'sine'), i * 100);
        });
    }

    playCandySound() {
        [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51].forEach((freq, i) => {
            setTimeout(() => this.playSound(freq, 0.15 + i * 0.03, 'sine'), i * 80);
        });
        setTimeout(() => this.playSound(1567.98, 0.2, 'triangle'), 200);
        setTimeout(() => this.playSound(1975.53, 0.2, 'triangle'), 300);
    }

    throwCandies(element) {
        const candyEmojis = ['🍬', '🍭', '🍫', '🍪', '🧁', '🍩', '✈️', '🚀'];
        const numCandies = 8;
        requestAnimationFrame(() => {
            const rect = element.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return;
            const startX = rect.left + rect.width / 2;
            const startY = rect.top + rect.height / 2;

            for (let i = 0; i < numCandies; i++) {
                setTimeout(() => {
                    const candy = document.createElement('div');
                    candy.className = 'candy';
                    candy.textContent = pick(candyEmojis);
                    candy.style.left = startX + 'px';
                    candy.style.top = startY + 'px';
                    document.body.appendChild(candy);
                    candy.offsetHeight;

                    const angle = (Math.PI * 2 * i) / numCandies + (Math.random() - 0.5) * 0.5;
                    const distance = 150 + Math.random() * 100;
                    const endX = Math.cos(angle) * distance;
                    const endY = Math.sin(angle) * distance - 50;
                    const rotation = Math.random() * 720 - 360;

                    requestAnimationFrame(() => requestAnimationFrame(() => {
                        candy.style.transform = `translate(${endX}px, ${endY}px) rotate(${rotation}deg)`;
                        candy.style.opacity = '0';
                    }));
                    setTimeout(() => candy.remove(), 2000);
                }, i * 50);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new HumanCalc();
});
