const questions = [
    {
        question: 'Which language runs in a web browser?',
        answers: [
            {text: "Java", correct: false},
            {text: "C", correct: false},
            {text: "Python", correct: false},
            {text: "JavaScript", correct: true}
        ]
    },
    {
        question: 'What does CSS stand for?',
        answers: [
            {text: "Central Style Sheets", correct: false},
            {text: "Cascading Style Sheets", correct: true},
            {text: "Cascading Simple Sheets", correct: false},
            {text: "Cars SUVs Style Sheets", correct: false}
        ]
    },
    {
        question: 'What does HTML stand for?',
        answers: [
            {text: "Hypertext Markup Language", correct: true},
            {text: "Hypertext Markdown Language", correct: false},
            {text: "Hyperloop Machine Language", correct: false},
            {text: "Helicopters Terminals Motorboats Lamborginis", correct: false}
        ]
    },
    {
        question: 'What year was JavaScript launched?',
        answers: [
            {text: "1996", correct: true},
            {text: "1995", correct: false},
            {text: "1994", correct: false},
            {text: "none of the above", correct: false}
        ]
    },
    {
        question: 'What does DOM stand for?',
        answers: [
            {text: "Document Object Model", correct: true},
            {text: "Document Object Model", correct: false},
            {text: "Document Object Model", correct: false},
            {text: "Document Object Model", correct: false}
        ]
    },
];

const questionelement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.querySelector('.next-btn'); // Changed to querySelector to match class name

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = 'Next';
    showQuestion();
}

function showQuestion(){
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionelement.innerHTML = `${questionNo}. ${currentQuestion.question}`;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = 'none';
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect){  
        selectedBtn.classList.add('correct');
        score++;
    } else {   
        selectedBtn.classList.add('wrong');
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}

function showScore(){
    resetState();
    questionelement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = 'block';
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener('click', () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
