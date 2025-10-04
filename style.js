const divBoard = document.querySelector(".div-board");
const btn = document.querySelector(".btn");
const wrong = document.querySelector(".wrong");
const container = document.querySelector(".container-content");

let index = 0;
let score = 0;
const TOTAL_QUESTIONS = 10;

const database = {
    data: [
        {
            question: "What does 'var' keyword do in JavaScript?",
            options: {
                a: "Declares a variable",
                b: "Creates a function",
                c: "Defines a class",
                d: "Imports a module"
            },
            correctAnswer: "Declares a variable"
        },
        {
            question: "Which method is used to add elements to the end of an array?",
            options: {
                a: "shift()",
                b: "unshift()",
                c: "push()",
                d: "pop()"
            },
            correctAnswer: "push()"
        },
        {
            question: "What is the output of 'typeof null' in JavaScript?",
            options: {
                a: "null",
                b: "undefined",
                c: "object",
                d: "number"
            },
            correctAnswer: "object"
        },
        {
            question: "Which symbol is used for single-line comments in JavaScript?",
            options: {
                a: "//",
                b: "/* */",
                c: "#",
                d: "--"
            },
            correctAnswer: "//"
        },
        {
            question: "What does JSON stand for?",
            options: {
                a: "JavaScript Object Notation",
                b: "Java Standard Object Name",
                c: "JavaScript Oriented Network",
                d: "Java Simple Object Notation"
            },
            correctAnswer: "JavaScript Object Notation"
        },
        {
            question: "Which keyword is used to declare a constant in JavaScript?",
            options: {
                a: "var",
                b: "let",
                c: "const",
                d: "constant"
            },
            correctAnswer: "const"
        },
        {
            question: "What is the correct way to write an arrow function?",
            options: {
                a: "function => {}",
                b: "() => {}",
                c: "=> function()",
                d: "function() =>"
            },
            correctAnswer: "() => {}"
        },
        {
            question: "Which method converts a string to lowercase?",
            options: {
                a: "toLowerCase()",
                b: "toLower()",
                c: "lower()",
                d: "lowerCase()"
            },
            correctAnswer: "toLowerCase()"
        },
        {
            question: "What does NaN stand for?",
            options: {
                a: "Not a Number",
                b: "Null and Null",
                c: "New Array Name",
                d: "Negative Array Number"
            },
            correctAnswer: "Not a Number"
        },
        {
            question: "Which operator is used to check both value and type?",
            options: {
                a: "==",
                b: "===",
                c: "=",
                d: "!="
            },
            correctAnswer: "==="
        },
        {
            question: "What is the purpose of 'use strict' in JavaScript?",
            options: {
                a: "Enables strict mode",
                b: "Speeds up code execution",
                c: "Imports libraries",
                d: "Defines functions"
            },
            correctAnswer: "Enables strict mode"
        },
        {
            question: "Which method is used to remove the last element from an array?",
            options: {
                a: "shift()",
                b: "pop()",
                c: "slice()",
                d: "splice()"
            },
            correctAnswer: "pop()"
        },
        {
            question: "What is a closure in JavaScript?",
            options: {
                a: "A function inside another function",
                b: "A way to close the browser",
                c: "A type of loop",
                d: "A CSS property"
            },
            correctAnswer: "A function inside another function"
        },
        {
            question: "Which keyword is used to define a class in JavaScript?",
            options: {
                a: "class",
                b: "function",
                c: "object",
                d: "define"
            },
            correctAnswer: "class"
        },
        {
            question: "What does 'async' keyword do in JavaScript?",
            options: {
                a: "Makes function asynchronous",
                b: "Synchronizes code",
                c: "Creates arrays",
                d: "Defines variables"
            },
            correctAnswer: "Makes function asynchronous"
        }
    ]
};

// Shuffle and select 10 random questions
let questions = database.data.sort(() => Math.random() - 0.5).slice(0, TOTAL_QUESTIONS);

const showQuestion = () => {
    if (index >= TOTAL_QUESTIONS) {
        const percentage = ((score / TOTAL_QUESTIONS) * 100).toFixed(0);
        let emoji = '🎉';
        let message = 'Great Job!';
        
        if (percentage === 100) {
            emoji = '🏆';
            message = 'Perfect Score!';
        } else if (percentage >= 70) {
            emoji = '🌟';
            message = 'Excellent!';
        } else if (percentage >= 50) {
            emoji = '👍';
            message = 'Good Effort!';
        } else {
            emoji = '💪';
            message = 'Keep Practicing!';
        }
        
        divBoard.innerHTML = `
            <div class="completion-message">${emoji} ${message} ${emoji}</div>
            <div class="score-display">
                Your Score: ${score} out of ${TOTAL_QUESTIONS}<br>
                <span style="font-size: 28px; color: #667eea; font-weight: 700;">${percentage}%</span>
            </div>
            <div style="text-align: center; margin-top: 30px;">
                <button class="restart-btn" onclick="location.reload()">Start Again</button>
            </div>
        `;
        btn.style.display = 'none';
        return;
    }

    const block = questions[index];
    const question = block.question;
    const { a, b, c, d } = block.options;

    divBoard.innerHTML = `
        <div style="text-align: right; color: #667eea; font-weight: 600; margin-bottom: 10px;">
            Question ${index + 1} of ${TOTAL_QUESTIONS}
        </div>
        <div class="question">${question}</div>
        <div class="options">
            <label class="option-label">
                <input value="${a}" name="option" type="radio">
                ${a}
            </label>
            <label class="option-label">
                <input value="${b}" name="option" type="radio">
                ${b}
            </label>
            <label class="option-label">
                <input value="${c}" name="option" type="radio">
                ${c}
            </label>
            <label class="option-label">
                <input value="${d}" name="option" type="radio">
                ${d}
            </label>
        </div>
    `;
};

const restartQuiz = () => {
    index = 0;
    score = 0;
    wrong.innerHTML = "";
    questions = database.data.sort(() => Math.random() - 0.5).slice(0, TOTAL_QUESTIONS);
    btn.textContent = "Check";
    btn.onclick = checkAnswer;
    showQuestion();
};

const checkAnswer = () => {
    const selected = document.querySelector('input[name="option"]:checked');
    const block = questions[index];
    const correctAnswer = block.correctAnswer;
    const allLabels = document.querySelectorAll('.option-label');

    if (!selected) {
        wrong.innerHTML = "⚠️ Please select an option!";
        return;
    }

    // Disable all options after selection
    allLabels.forEach(label => {
        label.classList.add('disabled');
        const input = label.querySelector('input');
        input.disabled = true;
    });

    const selectedLabel = selected.parentElement;

    if (selected.value === correctAnswer) {
        // Correct answer
        selectedLabel.classList.add('correct');
        wrong.innerHTML = "✅ Correct!";
        wrong.style.color = "#48bb78";
        score++;
        
        setTimeout(() => {
            wrong.innerHTML = "";
            index++;
            showQuestion();
        }, 1000);
    } else {
        // Wrong answer - show both wrong and correct
        selectedLabel.classList.add('wrong');
        
        // Highlight the correct answer
        allLabels.forEach(label => {
            const input = label.querySelector('input');
            if (input.value === correctAnswer) {
                label.classList.add('correct');
            }
        });
        
        wrong.innerHTML = "❌ Wrong Answer!";
        wrong.style.color = "#e53e3e";
        
        setTimeout(() => {
            wrong.innerHTML = "";
            index++;
            showQuestion();
        }, 2000);
    }
};

// Initialize
btn.addEventListener("click", checkAnswer);
showQuestion();