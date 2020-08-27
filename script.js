let questions = [{
    question: 'How is COVID-19 passed on?',
    choiceA: 'Through droplets that come from your mouth and nose when you cough or breathe out',
    choiceB: 'In sexual fluids, including semen, vaginal fluids or anal mucous',
    choiceC: 'By drinking unclean water',
    choiceD: 'All of the above',
    correct: 'A'
  },
  {
    question: 'What are the common symptoms of COVID-19?',
    choiceA: 'A new and continuous cough',
    choiceB: 'Fever',
    choiceC: 'Tiredness',
    choiceD: 'All of the above',
    correct: 'D'
  },
  {
    question: 'Can washing your hands protect you from COVID-19? ',
    choiceA: 'Yes – but only if you use a strong bleach',
    choiceB: 'Yes – normal soap and water or hand sanitizer is enough',
    choiceC: 'No – Washing your hands doesn’t stop COVID-19',
    choiceD: 'No Opinion',
    correct: 'B'
  },
  {
    question: 'Which of the following people is COVID-19 more dangerous for?',
    choiceA: 'Children',
    choiceB: 'Older people – especially those aged 70 and above',
    choiceC: 'People with certain well maintained health conditions',
    choiceD: 'European people',
    correct: 'B'
  },
  {
    question: 'Can you always tell if someone has COVID-19? ',
    choiceA: 'No – not everyone with COVID-19 has symptoms',
    choiceB: 'Yes – it will be obvious, a person with COVID-19 coughs a lot',
    choiceC: 'Yes – you can tell just by where a person comes from, their race and ethnicity',
    choiceD: 'None',
    correct: 'A'
  },
  {
    question: 'What other viruses belong to the coronavirus family?',
    choiceA: 'Dengue',
    choiceB: 'SARS and influenza',
    choiceC: 'SARS and MERS',
    choiceD: 'SARS and HIV',
    correct: 'C'
  },
  {
    question: 'When should fabric face masks be worn?',
    choiceA: 'On public transport',
    choiceB: 'In confined or crowded spaces',
    choiceC: 'In small shops',
    choiceD: 'All of the above',
    correct: 'D'
  },
  {
    question: 'Can COVID-19 be cured?',
    choiceA: 'Yes – Hot drinks can cure COVID-19',
    choiceB: 'No – COVID-19 is a death sentence',
    choiceC: 'No – but most people get better by themselves',
    choiceD: 'Don\'t know!',
    correct: 'C'
  },
  {
    question: 'Which of the following is an example of physical distancing?',
    choiceA: 'You stop going to crowded places and visiting other people’s houses',
    choiceB: 'You stop talking to the people you live with',
    choiceC: 'You stop speaking to your friends on the phone',
    choiceD: 'Don\'t know!',
    correct: 'A'
  },
  {
    question: 'How can people living with HIV protect themselves from COVID-19?',
    choiceA: 'Wash their hands regularly and follow the physical distancing advice',
    choiceB: 'Keep taking their antiretroviral treatment',
    choiceC: 'Exercise regularly, eat well and look after their mental health',
    choiceD: 'All of the above',
    correct: 'D'
  },


]


// select all elements

const start = document.getElementById("start");

const quiz = document.getElementById("quiz");

const question = document.getElementById("question");

const choiceA = document.getElementById("A");

const choiceB = document.getElementById("B");

const choiceC = document.getElementById("C");

const choiceD = document.getElementById("D");

const counter = document.getElementById("counter");

const timeGauge = document.getElementById("timeGauge");

const progress = document.getElementById("progress");

let navigate = document.getElementById("navigate");

const scoreDiv = document.getElementById("scoreContainer");

let prev = document.getElementById("prev");

let next = document.getElementById("next");

let qBar = document.getElementById("qBar");

let bnavbar = document.querySelector('.bnavbar');
let inputName;

let time = [];



let random = Math.floor(Math.random() * 10);


function goto(index) {

  renderCounter();

  let qnum = document.getElementById("q" + index);



  var qClicked = questions[index - Number(1)];


  question.innerHTML = "<p>" + qClicked.question + "</p>";


  choiceA.innerHTML = qClicked.choiceA;

  choiceB.innerHTML = qClicked.choiceB;

  choiceC.innerHTML = qClicked.choiceC;

  choiceD.innerHTML = qClicked.choiceD;

}








//constants

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 60; // 50s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;


// render a question

function renderQuestion() {

  let q = questions[runningQuestion];



  question.innerHTML = "<p>" + q.question + "</p>";


  choiceA.innerHTML = q.choiceA;

  choiceB.innerHTML = q.choiceB;

  choiceC.innerHTML = q.choiceC;

  choiceD.innerHTML = q.choiceD;

}


// start quiz
function startQuiz() {

  inputName = document.getElementById("userInput").value;
  qBar.style.visibility = 'visible';
  navigate.style.visibility = 'visible';
  bnavbar.style.visibility = 'hidden';
  start.style.display = "none";
  renderQuestion();
  quiz.style.display = "block";
  renderProgress();
  renderCounter();


  TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

// render progress
function renderProgress() {
  for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
    progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";

  }

}

function prevq() {
  if (runningQuestion != 0)
    runningQuestion--;
  renderQuestion();


  renderCounter();
}

function nextq() {
  if (runningQuestion != lastQuestion)
    runningQuestion++;
  renderQuestion();


  renderCounter();
}




// counter render

function renderCounter() {
  if (count <= questionTime) {
    counter.innerHTML = Number(60) - count + " seconds remaining";
    timeGauge.style.width = count * gaugeUnit + "px";

    count++;
    console.log(count);
  } else {

    answerIsWrong();

    if (runningQuestion < lastQuestion && count !== Number(6)) {

      runningQuestion++;
      renderQuestion();
    } else if (runningQuestion === lastQuestion || count === Number(61)) {
      // end the quiz and show the score
      console.log(count - Number(1));
      time.push(count - Number(1));
      count = 0;
      clearInterval(TIMER);
      scoreRender();
    }


  }


}

// checkAnwer

function checkAnswer(answer) {
  if (answer == questions[runningQuestion].correct) {
    // answer is correct
    score++;
    // change progress color to green
    answerIsCorrect();
  } else {
    // answer is wrong
    // change progress color to red
    answerIsWrong();
  }

  if (runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
  } else if (runningQuestion === lastQuestion || count === Number(61)) {
    // end the quiz and show the score
    console.log(count - Number(1));
    time.push(count - Number(1));
    count = 0;
    clearInterval(TIMER);
    scoreRender();
  }
}



// answer is correct
function answerIsCorrect() {
  document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong() {
  document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender() {
  navigate.style.visibility = 'hidden';
  quiz.style.display = 'None';
  scoreDiv.style.display = "block";
  bnavbar.style.visibility = 'hidden';


  let sum = time.reduce(function(a, b) {
    return a + b;
  }, 0);

  // calculate the score on the basis of time and correct questions
  const scorePerCent = Math.round(100 * score / questions.length);
  const timePercent = Math.round(100 * sum / 100);
  let scored;

  if (time === Number(60)) {

    scored = 0;
  } else {
    scored = (scorePerCent + timePercent) / 2;
  }


  scoreDiv.innerHTML += "<p>" + "Time taken: " + sum + " seconds</p>";
  scoreDiv.innerHTML += "<p>" + inputName + ", Your Score is</p>";

  scoreDiv.innerHTML += "<p>" + scored + "%</p>";
}
