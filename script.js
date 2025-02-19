const questions = [
    { 
        question: "When did we meet?",
        answers: [
            {text: "December 2", correct: false},
            {text: "November 5", correct: false},
            {text: "October 29", correct: true},
            {text: "Back when flip phones were a thing.", correct: false},
        ]
    },
    { 
        question: "What do I love most about you?",
        answers: [
            {text: "Your money, obviously.", correct: false},
            {text: "Your gentle spirit.Like and actual angel.", correct: true},
            {text: "umm nothing??", correct: false},
            {text: "Your fashion sense.", correct: false},
        ]
    }, 
    { 
        question: "What's my biggest fear in life?",
        answers: [
            {text: "Failing.", correct: false},
            {text: "Being alone and never finding my tribe.", correct: false},
            {text: "Having no life stories to tell my grandkids", correct:true},
            {text: "Being hated by the people i admire", correct: false},
        ]
    },
    { 
        question: "I think you are.....",
        answers: [
            {text: "My knight in shining armor, my saviour and soulmate who healed something in me.", correct: true},
            {text: "strange.", correct: false},
            {text: "Who says I think about you?", correct: false},
            {text: "a pastime", correct: false},
        ]
    },
    { 
        question: "If i could book a trip for us, Where would i take you?",
        answers: [
            {text: "Turkey, where you would taste your first shawarma.", correct: false},
            {text:"South of France; down by the French Riviera to live out my 'Tender is the Night' dreams.", correct: true},
            {text: "Rome, to eat pray and love.", correct: false},
            {text: "Thailand.", correct: false},
        ]
    },
    {
        question: "What haunted me and made me embarassed when we first talked?",
        answers: [
            {text: "Opening my mouth", correct: false},
            {text:"My phone ringing.", correct: false},
            {text: "The fact that we were in a dead silent taxi.", correct: false},
            {text: "The way i answered 'yes' smugly when you asked me if i was smart.", correct: true},
        ]
    },
    {question: "What was the name of my cat?",
        answers: [
            {text: "wuri.", correct: true},
            {text:"simba", correct: false},
            {text: "anchi.", correct: false},
            {text: "kiki", correct: false},
        ]
    },
    {question: "Which aesthetic do i want my future house to give?",
        answers: [
            {text: "Retro.", correct: false},
            {text:"Cozy whimsigoth with a tid of dark academia.", correct: true},
            {text: "sleek and minimalistic", correct: false},
            {text: "poor.", correct: false},
        ]
    },
    {question: "My fav part of ur body?",
        answers: [
            {text: "them washboard abs.", correct: false},
            {text:"them veiny arms", correct: false},
            {text: "your back.", correct: false},
            {text: "all and more.", correct: true},
        ]
    },

{question: "What made me realize i fell in love?",
        answers: [
            {text: "when we kissed.", correct: false},
            {text:"i dont know. what am i a loser?", correct: false},
            {text: "When i thought about u one random night and cried for a long time cuz i couldnt handle how much i felt for u.", correct: true},
            {text: "Seeing you take money out the ATM.", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    
    let message = '';
    const halfQuestions = Math.floor(questions.length / 2); // Calculate half of the total questions

    if (score <= halfQuestions) {
        message = "Unacceptable, Biruk. Better try again or I'll beat you up.";
    } else if (score > halfQuestions && score < questions.length) {
        message = "Good job. But could be better c'mon.";
    } else if (score === questions.length) {
        message = "perfect score! Dm me and you'll any get a reward.";
    }
    
    questionElement.innerHTML += `<br>${message}`;
    
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();