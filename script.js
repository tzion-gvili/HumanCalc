// HumanCalc - Math Practice Application
// TgSofts +9725914007

class HumanCalc {
    constructor() {
        this.currentExercises = [];
        this.kooklot = parseInt(localStorage.getItem('humanCalcKooklot') || '0');
        this.currentClassLevel = 1;
        this.audioContext = null;
        this.init();
    }

    init() {
        this.updateKooklotDisplay();
        this.setupEventListeners();
        this.initAudio();
    }

    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }

    playSound(frequency, duration, type = 'sine') {
        if (!this.audioContext) return;

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
        // Play a cheerful ascending melody
        const notes = [523.25, 659.25, 783.99, 987.77]; // C, E, G, B
        notes.forEach((freq, index) => {
            setTimeout(() => {
                this.playSound(freq, 0.2, 'sine');
            }, index * 150);
        });
    }

    playErrorSound() {
        // Play a gentle descending tone
        this.playSound(200, 0.3, 'sawtooth');
    }

    playCelebrationSound() {
        // Play a victory fanfare
        const fanfare = [523.25, 659.25, 783.99, 1046.50, 1318.51];
        fanfare.forEach((freq, index) => {
            setTimeout(() => {
                this.playSound(freq, 0.3, 'sine');
            }, index * 100);
        });
    }

    setupEventListeners() {
        document.getElementById('startBtn').addEventListener('click', () => {
            this.startNewExerciseSet();
        });

        // Allow Enter key to submit answers
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const focusedInput = document.activeElement;
                if (focusedInput && focusedInput.classList.contains('answer-input')) {
                    const exerciseIndex = parseInt(focusedInput.dataset.index);
                    this.checkAnswer(exerciseIndex);
                }
            }
        });
    }

    generateExercise(classLevel) {
        const level = parseInt(classLevel);
        let exercise;

        if (level <= 2) {
            // Class 1-2: Simple addition and subtraction (1-20)
            const a = Math.floor(Math.random() * 20) + 1;
            const b = Math.floor(Math.random() * 20) + 1;
            const operations = ['+', '-'];
            const op = operations[Math.floor(Math.random() * operations.length)];
            
            if (op === '+') {
                exercise = { question: `${a} + ${b}`, answer: a + b };
            } else {
                const max = Math.max(a, b);
                const min = Math.min(a, b);
                exercise = { question: `${max} - ${min}`, answer: max - min };
            }
        } else if (level <= 4) {
            // Class 3-4: Addition, subtraction, simple multiplication (1-100)
            const a = Math.floor(Math.random() * 100) + 1;
            const b = Math.floor(Math.random() * 100) + 1;
            const operations = ['+', '-', '*'];
            const op = operations[Math.floor(Math.random() * operations.length)];
            
            if (op === '+') {
                exercise = { question: `${a} + ${b}`, answer: a + b };
            } else if (op === '-') {
                const max = Math.max(a, b);
                const min = Math.min(a, b);
                exercise = { question: `${max} - ${min}`, answer: max - min };
            } else {
                const smallA = Math.floor(Math.random() * 10) + 1;
                const smallB = Math.floor(Math.random() * 10) + 1;
                exercise = { question: `${smallA} × ${smallB}`, answer: smallA * smallB };
            }
        } else if (level <= 6) {
            // Class 5-6: All operations, larger numbers, simple division
            const operations = ['+', '-', '*', '/'];
            const op = operations[Math.floor(Math.random() * operations.length)];
            
            if (op === '+') {
                const a = Math.floor(Math.random() * 500) + 1;
                const b = Math.floor(Math.random() * 500) + 1;
                exercise = { question: `${a} + ${b}`, answer: a + b };
            } else if (op === '-') {
                const a = Math.floor(Math.random() * 500) + 1;
                const b = Math.floor(Math.random() * a) + 1;
                exercise = { question: `${a} - ${b}`, answer: a - b };
            } else if (op === '*') {
                const a = Math.floor(Math.random() * 20) + 1;
                const b = Math.floor(Math.random() * 20) + 1;
                exercise = { question: `${a} × ${b}`, answer: a * b };
            } else {
                const b = Math.floor(Math.random() * 12) + 1;
                const a = b * (Math.floor(Math.random() * 10) + 1);
                exercise = { question: `${a} ÷ ${b}`, answer: a / b };
            }
        } else if (level <= 8) {
            // Class 7-8: Fractions, decimals, negative numbers
            const types = ['basic', 'decimal', 'fraction', 'negative'];
            const type = types[Math.floor(Math.random() * types.length)];
            
            if (type === 'basic') {
                const a = Math.floor(Math.random() * 1000) + 1;
                const b = Math.floor(Math.random() * 1000) + 1;
                const op = ['+', '-', '*'][Math.floor(Math.random() * 3)];
                if (op === '+') {
                    exercise = { question: `${a} + ${b}`, answer: a + b };
                } else if (op === '-') {
                    exercise = { question: `${a} - ${b}`, answer: a - b };
                } else {
                    exercise = { question: `${a} × ${b}`, answer: a * b };
                }
            } else if (type === 'decimal') {
                const a = (Math.random() * 100).toFixed(1);
                const b = (Math.random() * 100).toFixed(1);
                const op = ['+', '-'][Math.floor(Math.random() * 2)];
                const result = op === '+' ? parseFloat(a) + parseFloat(b) : parseFloat(a) - parseFloat(b);
                exercise = { question: `${a} ${op} ${b}`, answer: parseFloat(result.toFixed(1)) };
            } else if (type === 'fraction') {
                const num1 = Math.floor(Math.random() * 10) + 1;
                const den1 = Math.floor(Math.random() * 10) + 1;
                const num2 = Math.floor(Math.random() * 10) + 1;
                const den2 = Math.floor(Math.random() * 10) + 1;
                const op = ['+', '-'][Math.floor(Math.random() * 2)];
                // Simplified fraction addition/subtraction
                if (den1 === den2) {
                    const result = op === '+' ? num1 + num2 : num1 - num2;
                    exercise = { question: `${num1}/${den1} ${op} ${num2}/${den2}`, answer: result / den1 };
                } else {
                    const lcm = den1 * den2;
                    const newNum1 = num1 * den2;
                    const newNum2 = num2 * den1;
                    const result = op === '+' ? newNum1 + newNum2 : newNum1 - newNum2;
                    exercise = { question: `${num1}/${den1} ${op} ${num2}/${den2}`, answer: result / lcm };
                }
            } else {
                const a = Math.floor(Math.random() * 100) - 50;
                const b = Math.floor(Math.random() * 100) - 50;
                const op = ['+', '-'][Math.floor(Math.random() * 2)];
                exercise = { question: `(${a}) ${op} (${b})`, answer: op === '+' ? a + b : a - b };
            }
        } else if (level <= 10) {
            // Class 9-10: Algebra, powers, square roots
            const types = ['algebra', 'power', 'sqrt', 'complex'];
            const type = types[Math.floor(Math.random() * types.length)];
            
            if (type === 'algebra') {
                const a = Math.floor(Math.random() * 20) + 1;
                const b = Math.floor(Math.random() * 20) + 1;
                const c = Math.floor(Math.random() * 20) + 1;
                exercise = { question: `${a}x + ${b} = ${a * c + b}`, answer: c };
            } else if (type === 'power') {
                const base = Math.floor(Math.random() * 10) + 2;
                const exp = Math.floor(Math.random() * 4) + 2;
                exercise = { question: `${base}^${exp}`, answer: Math.pow(base, exp) };
            } else if (type === 'sqrt') {
                const num = Math.floor(Math.random() * 20) + 1;
                const square = num * num;
                exercise = { question: `√${square}`, answer: num };
            } else {
                const a = Math.floor(Math.random() * 100) + 1;
                const b = Math.floor(Math.random() * 100) + 1;
                const c = Math.floor(Math.random() * 100) + 1;
                exercise = { question: `${a} × ${b} + ${c}`, answer: a * b + c };
            }
        } else {
            // Class 11-12: Advanced algebra, trigonometry, logarithms
            const types = ['advanced', 'trig', 'log', 'complex'];
            const type = types[Math.floor(Math.random() * types.length)];
            
            if (type === 'advanced') {
                const a = Math.floor(Math.random() * 20) + 1;
                const b = Math.floor(Math.random() * 20) + 1;
                const c = Math.floor(Math.random() * 20) + 1;
                exercise = { question: `${a}x² + ${b}x = ${a * c * c + b * c}`, answer: c };
            } else if (type === 'trig') {
                const angles = [0, 30, 45, 60, 90];
                const angle = angles[Math.floor(Math.random() * angles.length)];
                const funcs = ['sin', 'cos'];
                const func = funcs[Math.floor(Math.random() * funcs.length)];
                let answer;
                if (func === 'sin') {
                    answer = Math.sin(angle * Math.PI / 180);
                } else {
                    answer = Math.cos(angle * Math.PI / 180);
                }
                exercise = { question: `${func}(${angle}°)`, answer: parseFloat(answer.toFixed(3)) };
            } else if (type === 'log') {
                const base = Math.floor(Math.random() * 5) + 2;
                const exp = Math.floor(Math.random() * 5) + 1;
                const num = Math.pow(base, exp);
                exercise = { question: `log${base}(${num})`, answer: exp };
            } else {
                const a = Math.floor(Math.random() * 50) + 1;
                const b = Math.floor(Math.random() * 50) + 1;
                const c = Math.floor(Math.random() * 50) + 1;
                exercise = { question: `(${a} + ${b}) × ${c} - ${a}`, answer: (a + b) * c - a };
            }
        }

        exercise.userAnswer = null;
        exercise.correct = null;
        return exercise;
    }

    startNewExerciseSet() {
        const classLevel = document.getElementById('classLevel').value;
        this.currentClassLevel = parseInt(classLevel);
        this.currentExercises = [];
        
        // Generate 10 exercises
        for (let i = 0; i < 10; i++) {
            this.currentExercises.push(this.generateExercise(classLevel));
        }

        this.renderExercises();
        document.getElementById('resultsContainer').classList.remove('show');
        
        // Play a gentle sound when starting
        this.playSound(440, 0.2, 'sine');
    }

    renderExercises() {
        const container = document.getElementById('exercisesContainer');
        container.innerHTML = '';

        this.currentExercises.forEach((exercise, index) => {
            const exerciseDiv = document.createElement('div');
            exerciseDiv.className = 'exercise-item';
            exerciseDiv.id = `exercise-${index}`;

            const questionDiv = document.createElement('div');
            questionDiv.className = 'exercise-question';
            questionDiv.innerHTML = `
                <span class="exercise-number">${index + 1}/10</span>
                <span>${exercise.question} = </span>
            `;

            const input = document.createElement('input');
            input.type = 'number';
            input.className = 'answer-input';
            input.dataset.index = index;
            input.step = 'any';
            input.placeholder = 'Your answer';

            const checkBtn = document.createElement('button');
            checkBtn.className = 'check-btn';
            checkBtn.textContent = 'Check';
            checkBtn.onclick = () => this.checkAnswer(index);

            const hintBtn = document.createElement('button');
            hintBtn.className = 'hint-btn';
            hintBtn.textContent = '💡 Hint (-1 Kooklot)';
            hintBtn.onclick = () => this.showHint(index);

            const calcBtn = document.createElement('button');
            calcBtn.className = 'calc-btn-small';
            calcBtn.textContent = '🔢 Calculator (-1 Kooklot)';
            calcBtn.onclick = () => this.openCalculator();

            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';
            buttonContainer.appendChild(checkBtn);
            buttonContainer.appendChild(hintBtn);
            buttonContainer.appendChild(calcBtn);

            const feedback = document.createElement('div');
            feedback.className = 'feedback';
            feedback.id = `feedback-${index}`;

            const hintDiv = document.createElement('div');
            hintDiv.className = 'hint-display';
            hintDiv.id = `hint-${index}`;
            hintDiv.style.display = 'none';

            questionDiv.appendChild(input);
            exerciseDiv.appendChild(questionDiv);
            exerciseDiv.appendChild(buttonContainer);
            exerciseDiv.appendChild(hintDiv);
            exerciseDiv.appendChild(feedback);
            container.appendChild(exerciseDiv);
        });

        // Focus on first input
        const firstInput = container.querySelector('.answer-input');
        if (firstInput) {
            firstInput.focus();
        }
    }

    checkAnswer(index) {
        const exercise = this.currentExercises[index];
        const input = document.querySelector(`#exercise-${index} .answer-input`);
        const feedback = document.getElementById(`feedback-${index}`);
        const exerciseDiv = document.getElementById(`exercise-${index}`);
        const checkBtn = exerciseDiv.querySelector('.check-btn');

        const userAnswer = parseFloat(input.value);
        
        if (isNaN(userAnswer)) {
            feedback.textContent = 'Please enter a number!';
            feedback.className = 'feedback incorrect';
            return;
        }

        exercise.userAnswer = userAnswer;
        
        // Allow small floating point differences
        const tolerance = 0.01;
        const isCorrect = Math.abs(userAnswer - exercise.answer) < tolerance;

        exercise.correct = isCorrect;
        exerciseDiv.classList.remove('correct', 'incorrect');
        exerciseDiv.classList.add(isCorrect ? 'correct' : 'incorrect');
        
        input.disabled = true;
        checkBtn.disabled = true;

        if (isCorrect) {
            feedback.textContent = '✓ Correct! Great job!';
            feedback.className = 'feedback correct';
            this.playSuccessSound();
        } else {
            feedback.textContent = `✗ Incorrect. The correct answer is ${exercise.answer}`;
            feedback.className = 'feedback incorrect';
            this.playErrorSound();
        }

        // Check if all exercises are completed
        setTimeout(() => {
            this.checkAllCompleted();
        }, 500);
    }

    checkAllCompleted() {
        const allCompleted = this.currentExercises.every(ex => ex.correct !== null);
        
        if (allCompleted) {
            const allCorrect = this.currentExercises.every(ex => ex.correct === true);
            this.showResults(allCorrect);
        }
    }

    showResults(allCorrect) {
        const resultsContainer = document.getElementById('resultsContainer');
        const correctCount = this.currentExercises.filter(ex => ex.correct === true).length;
        
        let newKooklot = 0;
        if (allCorrect) {
            // Award Kooklot equal to the class level (Level 1 = 1, Level 2 = 2, etc.)
            newKooklot = this.currentClassLevel;
            this.kooklot += newKooklot;
            localStorage.setItem('humanCalcKooklot', this.kooklot.toString());
            this.updateKooklotDisplay();
            this.playCelebrationSound();
        }

        resultsContainer.innerHTML = `
            <div class="results-title">${allCorrect ? '🎉 Perfect Score! 🎉' : 'Exercise Set Complete!'}</div>
            <div class="results-score">You got ${correctCount} out of 10 correct!</div>
            ${allCorrect ? `
                <div class="new-stars">⭐ You earned ${newKooklot} Kooklot! ⭐</div>
                <div class="celebration">🌟✨🎊✨🌟</div>
            ` : '<div style="font-size: 1.2em; margin-top: 20px;">Keep practicing to earn Kooklot!</div>'}
        `;
        
        resultsContainer.classList.add('show');
    }

    showHint(index) {
        if (this.kooklot < 1) {
            alert('Not enough Kooklot! You need at least 1 Kooklot to get a hint.');
            return;
        }

        const exercise = this.currentExercises[index];
        const hintDiv = document.getElementById(`hint-${index}`);
        const answer = exercise.answer;

        // Deduct Kooklot
        this.kooklot -= 1;
        localStorage.setItem('humanCalcKooklot', this.kooklot.toString());
        this.updateKooklotDisplay();

        // Generate hint based on the answer
        let hint = '';
        if (Number.isInteger(answer)) {
            // For integer answers, show a range
            const range = Math.max(1, Math.floor(Math.abs(answer) * 0.2));
            hint = `The answer is between ${answer - range} and ${answer + range}`;
        } else {
            // For decimal answers, show first digit or approximation
            const rounded = Math.round(answer);
            hint = `The answer is approximately ${rounded} (or close to it)`;
        }

        hintDiv.textContent = `💡 Hint: ${hint}`;
        hintDiv.style.display = 'block';
        hintDiv.className = 'hint-display show';

        // Play a sound
        this.playSound(300, 0.2, 'sine');
    }

    openCalculator() {
        if (this.kooklot < 1) {
            alert('Not enough Kooklot! You need at least 1 Kooklot to use the calculator.');
            return;
        }

        // Deduct Kooklot
        this.kooklot -= 1;
        localStorage.setItem('humanCalcKooklot', this.kooklot.toString());
        this.updateKooklotDisplay();

        // Open calculator modal
        document.getElementById('calculatorModal').style.display = 'block';
        calcClear(); // Reset calculator

        // Play a sound
        this.playSound(400, 0.2, 'sine');
    }

    updateKooklotDisplay() {
        document.getElementById('starsCount').textContent = this.kooklot;
    }
}

// Calculator functionality
let calcValue = '0';
let calcPreviousValue = null;
window.calcOperation = null;
let calcWaitingForValue = false;

function calcNumber(num) {
    if (calcWaitingForValue) {
        calcValue = num;
        calcWaitingForValue = false;
    } else {
        calcValue = calcValue === '0' ? num : calcValue + num;
    }
    document.getElementById('calcDisplay').value = calcValue;
}

function calcOperation(op) {
    const inputValue = parseFloat(calcValue);
    
    if (calcPreviousValue === null) {
        calcPreviousValue = inputValue;
    } else if (window.calcOperation) {
        const currentValue = calcPreviousValue || 0;
        const newValue = calculate(currentValue, inputValue, window.calcOperation);
        
        calcValue = String(newValue);
        calcPreviousValue = newValue;
        document.getElementById('calcDisplay').value = calcValue;
    }
    
    calcWaitingForValue = true;
    window.calcOperation = op;
}

function calculate(firstValue, secondValue, operation) {
    if (operation === '+') {
        return firstValue + secondValue;
    } else if (operation === '-') {
        return firstValue - secondValue;
    } else if (operation === '*') {
        return firstValue * secondValue;
    } else if (operation === '/') {
        return firstValue / secondValue;
    }
    return secondValue;
}

function calcEquals() {
    if (calcPreviousValue !== null && window.calcOperation) {
        const inputValue = parseFloat(calcValue);
        const newValue = calculate(calcPreviousValue, inputValue, window.calcOperation);
        
        calcValue = String(newValue);
        document.getElementById('calcDisplay').value = calcValue;
        calcPreviousValue = null;
        window.calcOperation = null;
        calcWaitingForValue = true;
    }
}

function calcClear() {
    calcValue = '0';
    calcPreviousValue = null;
    window.calcOperation = null;
    calcWaitingForValue = false;
    document.getElementById('calcDisplay').value = calcValue;
}

function calcDelete() {
    if (calcValue.length > 1) {
        calcValue = calcValue.slice(0, -1);
    } else {
        calcValue = '0';
    }
    document.getElementById('calcDisplay').value = calcValue;
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('calculatorModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new HumanCalc();
});

