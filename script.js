// HumanCalc - Math Practice Application
// TgSofts +9725914007

class HumanCalc {
    constructor() {
        this.currentExercises = [];
        this.coins = parseInt(localStorage.getItem('humanCalcCoins') || '0');
        this.currentClassLevel = 1;
        this.audioContext = null;
        this.init();
    }

    init() {
        this.updateCoinsDisplay();
        this.setupEventListeners();
        this.initAudio();
    }

    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Resume audio context on first user interaction (required for mobile)
            const resumeAudio = async () => {
                if (this.audioContext && this.audioContext.state === 'suspended') {
                    try {
                        await this.audioContext.resume();
                    } catch (e) {
                        console.log('Could not resume audio context:', e);
                    }
                }
                // Remove listeners after first interaction
                document.removeEventListener('touchstart', resumeAudio);
                document.removeEventListener('click', resumeAudio);
            };
            
            // Listen for first user interaction
            document.addEventListener('touchstart', resumeAudio, { once: true });
            document.addEventListener('click', resumeAudio, { once: true });
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }

    async playSound(frequency, duration, type = 'sine') {
        if (!this.audioContext) return;

        // Resume audio context if suspended (required for mobile browsers)
        if (this.audioContext.state === 'suspended') {
            try {
                await this.audioContext.resume();
            } catch (e) {
                console.log('Could not resume audio context:', e);
                return;
            }
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

    playCandySound() {
        // Play a sweet, addicting melody for candy throwing
        // A playful, ascending melody that sounds like a reward
        const candyMelody = [
            { freq: 523.25, duration: 0.15, type: 'sine' },  // C
            { freq: 659.25, duration: 0.15, type: 'sine' },  // E
            { freq: 783.99, duration: 0.15, type: 'sine' },  // G
            { freq: 987.77, duration: 0.2, type: 'sine' },   // B
            { freq: 1046.50, duration: 0.25, type: 'sine' }, // C (high)
            { freq: 1318.51, duration: 0.3, type: 'sine' }   // E (high)
        ];
        
        candyMelody.forEach((note, index) => {
            setTimeout(() => {
                this.playSound(note.freq, note.duration, note.type);
            }, index * 80);
        });
        
        // Add some sparkle sounds with higher frequencies
        setTimeout(() => {
            this.playSound(1567.98, 0.2, 'triangle'); // G (high)
        }, 200);
        setTimeout(() => {
            this.playSound(1975.53, 0.2, 'triangle'); // B (high)
        }, 300);
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
            hintBtn.textContent = '💡 Hint';
            hintBtn.onclick = () => this.showHint(index, 2);

            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';
            buttonContainer.appendChild(checkBtn);
            buttonContainer.appendChild(hintBtn);

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
            
            // Throw candies if no hint was used
            if (!exercise.hintUsed) {
                this.playCandySound();
                this.throwCandies(exerciseDiv);
            }
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
        // An exercise is completed if it has been checked (correct is not null) or disqualified
        const allCompleted = this.currentExercises.every(ex => ex.correct !== null || ex.disqualified === true);
        
        if (allCompleted) {
            const allCorrect = this.currentExercises.every(ex => ex.correct === true);
            this.showResults(allCorrect);
        }
    }

    showResults(allCorrect) {
        const resultsContainer = document.getElementById('resultsContainer');
        const correctCount = this.currentExercises.filter(ex => ex.correct === true).length;
        
        let newCoins = 0;
        if (allCorrect) {
            // Award Coins equal to the class level (Level 1 = 1, Level 2 = 2, etc.)
            newCoins = this.currentClassLevel;
            this.coins += newCoins;
            localStorage.setItem('humanCalcCoins', this.coins.toString());
            this.updateCoinsDisplay();
            this.playCelebrationSound();
        }

        resultsContainer.innerHTML = `
            <div class="results-title">${allCorrect ? '🎉 Perfect Score! 🎉' : 'Exercise Set Complete!'}</div>
            <div class="results-score">You got ${correctCount} out of 10 correct!</div>
            ${allCorrect ? `
                <div class="new-stars">🪙 You earned ${newCoins} Coins! 🪙</div>
                <div class="celebration">🌟✨🎊✨🌟</div>
            ` : '<div style="font-size: 1.2em; margin-top: 20px;">Keep practicing to earn Coins!</div>'}
        `;
        
        resultsContainer.classList.add('show');
    }

    showHint(index, hintType) {
        const exercise = this.currentExercises[index];
        
        // Mark that hint was used for this exercise
        exercise.hintUsed = true;
        
        // Show multiple choice hint
        this.showMultipleChoiceHint(index, exercise);
    }

    showMultipleChoiceHint(index, exercise) {
        const answer = exercise.answer;
        const question = exercise.question;

        // Generate 3 wrong answers that are plausible
        const wrongAnswers = this.generateWrongAnswers(answer);
        
        // Create array with correct and wrong answers
        const allAnswers = [answer, ...wrongAnswers];
        
        // Shuffle the answers
        const shuffledAnswers = this.shuffleArray([...allAnswers]);

        // Display modal
        document.getElementById('modalQuestion').textContent = question + ' = ?';
        const container = document.getElementById('multipleChoiceContainer');
        container.innerHTML = '';
        document.getElementById('choiceFeedback').textContent = '';
        document.getElementById('choiceFeedback').className = 'choice-feedback';

        // Create answer buttons
        shuffledAnswers.forEach((option, i) => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            button.textContent = option;
            button.onclick = () => this.checkChoiceAnswer(option, answer, index);
            container.appendChild(button);
        });

        // Store the exercise index for reference
        document.getElementById('hintModal').dataset.exerciseIndex = index;

        // Show modal
        document.getElementById('hintModal').style.display = 'block';

        // Play a sound
        this.playSound(400, 0.2, 'sine');
    }

    generateWrongAnswers(correctAnswer) {
        const wrongAnswers = [];
        const tolerance = 0.01;
        const maxAttempts = 50;
        let attempts = 0;
        
        // Generate 3 wrong answers
        while (wrongAnswers.length < 3 && attempts < maxAttempts) {
            attempts++;
            let wrongAnswer;
            
            if (Number.isInteger(correctAnswer)) {
                // For integers, generate answers that are plausible but not exact
                const baseOffset = Math.max(1, Math.floor(Math.abs(correctAnswer) * 0.1) || 1);
                const offset = Math.floor(Math.random() * (baseOffset * 2 + 5)) + 1;
                const sign = Math.random() < 0.5 ? 1 : -1;
                wrongAnswer = correctAnswer + (offset * sign);
                
                // Make sure it's different from correct answer and other wrong answers
                if (wrongAnswer !== correctAnswer && !wrongAnswers.includes(wrongAnswer)) {
                    wrongAnswers.push(wrongAnswer);
                }
            } else {
                // For decimals, generate answers with different decimal values
                const absValue = Math.abs(correctAnswer);
                const multiplier = absValue < 1 ? 0.5 : Math.max(0.1, absValue * 0.15);
                const offset = (Math.random() * 2 - 1) * multiplier;
                wrongAnswer = parseFloat((correctAnswer + offset).toFixed(3));
                
                // Make sure it's different enough from correct and other wrong answers
                const isDifferent = Math.abs(wrongAnswer - correctAnswer) > tolerance;
                const isUnique = !wrongAnswers.some(wa => Math.abs(wa - wrongAnswer) < tolerance);
                
                if (isDifferent && isUnique) {
                    wrongAnswers.push(wrongAnswer);
                }
            }
        }
        
        // If we couldn't generate enough, add some fallback wrong answers
        while (wrongAnswers.length < 3) {
            const fallback = correctAnswer + (wrongAnswers.length + 1) * 10;
            if (!wrongAnswers.includes(fallback)) {
                wrongAnswers.push(fallback);
            }
        }
        
        return wrongAnswers;
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    checkChoiceAnswer(selectedAnswer, correctAnswer, exerciseIndex) {
        const feedback = document.getElementById('choiceFeedback');
        const tolerance = 0.01;
        const selectedNum = typeof selectedAnswer === 'string' ? parseFloat(selectedAnswer) : selectedAnswer;
        const isCorrect = Math.abs(selectedNum - correctAnswer) < tolerance;

        // Disable all buttons
        const buttons = document.querySelectorAll('.choice-btn');
        buttons.forEach(btn => {
            btn.disabled = true;
            const btnValue = parseFloat(btn.textContent);
            if (Math.abs(btnValue - correctAnswer) < tolerance) {
                btn.classList.add('correct-choice');
            } else if (Math.abs(btnValue - selectedNum) < tolerance) {
                btn.classList.add('wrong-choice');
            }
        });

        if (isCorrect) {
            feedback.textContent = '✓ Correct! Great job!';
            feedback.className = 'choice-feedback correct';
            this.playSuccessSound();
            
            // Auto-fill the answer in the exercise input field
            const exerciseDiv = document.getElementById(`exercise-${exerciseIndex}`);
            const input = exerciseDiv.querySelector('.answer-input');
            if (input && !input.disabled) {
                input.value = correctAnswer;
                // Optionally auto-check the answer
                // this.checkAnswer(exerciseIndex);
            }
        } else {
            feedback.textContent = `✗ Incorrect. The correct answer is ${correctAnswer}`;
            feedback.className = 'choice-feedback incorrect';
            this.playErrorSound();
            
            // Disqualify the exercise - mark it as incorrect
            this.disqualifyExercise(exerciseIndex, correctAnswer);
        }
    }

    disqualifyExercise(index, correctAnswer) {
        const exercise = this.currentExercises[index];
        const exerciseDiv = document.getElementById(`exercise-${index}`);
        const input = exerciseDiv.querySelector('.answer-input');
        const checkBtn = exerciseDiv.querySelector('.check-btn');
        const feedback = document.getElementById(`feedback-${index}`);
        const hintBtn = exerciseDiv.querySelector('.hint-btn');

        // Mark exercise as incorrect
        exercise.correct = false;
        exercise.userAnswer = null;
        exercise.disqualified = true;

        // Disable input and buttons
        input.disabled = true;
        checkBtn.disabled = true;
        if (hintBtn) {
            hintBtn.disabled = true;
        }

        // Update visual feedback
        exerciseDiv.classList.remove('correct', 'incorrect');
        exerciseDiv.classList.add('incorrect');
        feedback.textContent = `✗ Disqualified! You chose the wrong answer in the hint. Correct answer: ${correctAnswer}`;
        feedback.className = 'feedback incorrect';

        // Check if all exercises are completed
        setTimeout(() => {
            this.checkAllCompleted();
        }, 500);
    }

    updateCoinsDisplay() {
        document.getElementById('starsCount').textContent = this.coins;
    }

    throwCandies(element) {
        const candyEmojis = ['🍬', '🍭', '🍫', '🍪', '🍰', '🧁', '🍩', '🍯'];
        const numCandies = 8;
        
        // Use requestAnimationFrame to ensure element is rendered
        requestAnimationFrame(() => {
            const rect = element.getBoundingClientRect();
            const startX = rect.left + rect.width / 2;
            const startY = rect.top + rect.height / 2;
            
            // Check if element is visible (mobile viewport might be different)
            if (rect.width === 0 || rect.height === 0) {
                console.log('Element not visible, skipping candy animation');
                return;
            }
            
            for (let i = 0; i < numCandies; i++) {
                setTimeout(() => {
                    const candy = document.createElement('div');
                    candy.className = 'candy';
                    candy.textContent = candyEmojis[Math.floor(Math.random() * candyEmojis.length)];
                    
                    // Set initial position with better mobile support
                    candy.style.position = 'fixed';
                    candy.style.left = startX + 'px';
                    candy.style.top = startY + 'px';
                    candy.style.opacity = '1';
                    candy.style.transform = 'translate(0, 0) rotate(0deg)';
                    candy.style.willChange = 'transform, opacity'; // Optimize for mobile
                    
                    document.body.appendChild(candy);
                    
                    // Force reflow to ensure initial position is set
                    candy.offsetHeight;
                    
                    // Calculate random direction and distance
                    const angle = (Math.PI * 2 * i) / numCandies + (Math.random() - 0.5) * 0.5;
                    const distance = 150 + Math.random() * 100;
                    const endX = Math.cos(angle) * distance;
                    const endY = Math.sin(angle) * distance - 50; // Slight upward arc
                    
                    // Random rotation
                    const rotation = Math.random() * 720 - 360; // -360 to 360 degrees
                    
                    // Trigger animation with better mobile support
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            candy.style.transform = `translate(${endX}px, ${endY}px) rotate(${rotation}deg)`;
                            candy.style.opacity = '0';
                        });
                    });
                    
                    // Remove after animation
                    setTimeout(() => {
                        if (candy.parentNode) {
                            candy.parentNode.removeChild(candy);
                        }
                    }, 2000);
                }, i * 50); // Stagger the candies
            }
        });
    }
}


// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('hintModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new HumanCalc();
});

