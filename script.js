const welcomeSection = document.getElementById('welcome-section');
const topicsNav = document.getElementById('quiz-topics');
const quizSection = document.getElementById('quiz');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('scoreValue');
const submitButton = document.getElementById('submit');
const nextButton = document.getElementById('next');

// Define quiz data
const quizData = {
  "Geography": [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris"
    },
    // Add more questions for Geography
  ],
  "Science": [
    {
      question: "What is the largest planet in the solar system?",
      options: ["Jupiter", "Saturn", "Mars", "Earth"],
      answer: "Jupiter"
    },
    // Add more questions for Science
  ],
  "Literature": [
    {
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["William Shakespeare", "Jane Austen", "Charles Dickens", "Mark Twain"],
      answer: "William Shakespeare"
    },
    // Add more questions for Literature
  ]
};

let currentQuestion = 0;
let currentTopic = '';
let userAnswers = [];
let score = 0;
let totalScore = 0;

function showTopics() {
  welcomeSection.style.display = 'none';
  topicsNav.style.display = 'block';
}

function loadQuiz(topic) {
  currentTopic = topic;
  topicsNav.style.display = 'none';
  quizSection.style.display = 'block';

  // Check if quizData is defined
  if (typeof quizData === "undefined") {
    console.error("quizData is not defined.");
    return;
  }

  const quizQuestions = quizData[topic];
  if (quizQuestions && quizQuestions.length > 0) {
    currentQuestion = 0;
    userAnswers = [];
    loadQuestion(quizQuestions[currentQuestion]);
    scoreElement.textContent = "Score: " + score + " out of " + quizQuestions.length;
  }
}

function loadQuestion(questionData) {
  // Load the question and options into the quiz UI
  questionElement.textContent = questionData.question;
  optionsElement.innerHTML = '';
  questionData.options.forEach((option, index) => {
    const optionElement = document.createElement('div');
    optionElement.classList.add('option');
    optionElement.textContent = option;
    optionElement.dataset.index = index;
    optionElement.onclick = selectOption;
    optionsElement.appendChild(optionElement);
  });
}

function selectOption(event) {
  const selectedOption = event.target;
  const selectedOptionIndex = parseInt(selectedOption.dataset.index);
  userAnswers[currentQuestion] = selectedOptionIndex;

  optionsElement.childNodes.forEach(option => {
    if (option !== selectedOption) {
      option.style.backgroundColor = '';
    }
  });
  selectedOption.style.backgroundColor = '#2196F3';
}

function submitAnswer() {
  const currentQuizData = quizData[currentTopic][currentQuestion];
  const selectedAnswerIndex = userAnswers[currentQuestion];
  const selectedAnswer = currentQuizData.options[selectedAnswerIndex];

  if (selectedAnswer === currentQuizData.answer) {
    score++;
  }

  currentQuestion++;
  if (currentQuestion < quizData[currentTopic].length) {
    loadQuestion(quizData[currentTopic][currentQuestion]);
    feedbackElement.textContent = '';
    submitButton.style.display = 'none';
    nextButton.style.display = 'block';
  } else {
    endQuiz();
  }
}

function endQuiz() {
  totalScore += score;
  questionElement.textContent = "Quiz completed!";
  optionsElement.innerHTML = '';
  feedbackElement.textContent = '';
  submitButton.style.display = 'none';
  nextButton.style.display = 'none';
  scoreElement.textContent = "Total Score: " + totalScore;
}

function nextQuestion() {
  currentQuestion++;
  loadQuestion(quizData[currentTopic][currentQuestion]);
  feedbackElement.textContent = '';
  submitButton.style.display = 'block';
  nextButton.style.display = 'none';
}
