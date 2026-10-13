// HumanCalc - חידות של תנועה, משקל וכוח
// TgSofts +9725914007

const QUESTIONS_PER_GAME = 5;

const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (list) => list[Math.floor(Math.random() * list.length)];
const fmt = (n) => n.toLocaleString('he-IL');

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
