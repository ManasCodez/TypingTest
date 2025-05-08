let startTime, endTime;
let timerInterval;
let currentPosition = 0;
let correctChars = 0;
let isTestRunning = false;
let errors = 0;

const sentences = [
  "This website is created for fun and my coding practice",
  "One of my most productive days was throwing away 1000 lines of code",
  "If debugging is the process of removing bugs, then programming must be the process of putting them in",
  "The computer was born to solve problems that did not exist before",
  "Real programmers don't comment their code. If it was hard to write, it should be hard to understand",
  "Always code as if the person maintaining your code will be a violent psychopath who knows where you live",
  "People don't care about what you say, they care about what you build",
  "Debugging becomes easier if you first admit that you are the problem",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand",
  "The function of good software is to make the complex appear to be simple",
  "Your most unhappy customers are your greatest source of learning",
  "A good programmer is someone who always looks both ways before crossing a one-way street",
  "There is a big difference between making a simple product and making a product simple",
  "If you can't solve a bug, make it a feature",
  "One of the best programming skills is knowing when to walk away for a while",
  "Give a man a program, frustrate him for a day. Teach a man to program, frustrate him for life",
  "Code teaches you how to face really big problems",
  "Where there is code, there is a bug",
  "Code is like humor. When you have to explain it, it's bad",
  "When I wrote this code, only God and I understood what I did. Now only God knows",
  "There is always one more bug to fix",
  "If at first you don't succeed, call it version 1.0"
];

let currentSentenceIndex = 0;
let currentSentence = sentences[currentSentenceIndex];

document.addEventListener('DOMContentLoaded', () => {
  displayNextSentence();
  const inputElement = document.getElementById('input');
  inputElement.addEventListener('input', handleTyping);
  inputElement.addEventListener('keydown', handleKeyDown);
});

function displayNextSentence() {
  currentSentence = sentences[currentSentenceIndex];
  renderQuote();
  document.getElementById('input').value = "";
  currentPosition = 0;
  correctChars = 0;
  errors = 0;
  resetResults();
  document.getElementById('input').focus();
}

function renderQuote() {
  const quoteElement = document.getElementById('quote');
  let html = '';
  
  for (let i = 0; i < currentSentence.length; i++) {
    let char = currentSentence[i];
    if (i < currentPosition) {
      html += `<span class="correct">${char}</span>`;
    } else if (i === currentPosition) {
      html += `<span class="current">${char}</span>`;
    } else {
      html += char;
    }
  }
  
  quoteElement.innerHTML = html;
}

function handleTyping(e) {
  if (!isTestRunning) {
    startTimer();
    isTestRunning = true;
  }

  const inputText = e.target.value;
  const inputLength = inputText.length;
  
  // Handle backspace
  if (inputLength < currentPosition) {
    currentPosition = inputLength;
    renderQuote();
    return;
  }
  
  // Check current character
  if (inputLength > 0) {
    const currentChar = inputText[inputLength - 1];
    if (currentChar === currentSentence[currentPosition]) {
      correctChars++;
    } else {
      errors++;
    }
    currentPosition = inputLength;
  }
  
  renderQuote();
  updateCharacterCount();
  
  // Check if sentence is completed
  if (currentPosition === currentSentence.length) {
    stopTimer();
    calculateResults();
  }
}

function handleKeyDown(e) {
  if (e.key === 'Enter' && isTestRunning) {
    e.preventDefault();
    stopTimer();
    calculateResults();
  }
}

function startTimer() {
  startTime = new Date().getTime();
  timerInterval = setInterval(updateTimer, 100);
}

function stopTimer() {
  if (startTime && !endTime) {
    endTime = new Date().getTime();
    clearInterval(timerInterval);
  }
}

function updateTimer() {
  const currentTime = new Date().getTime();
  const elapsed = (currentTime - startTime) / 1000;
  document.getElementById('time').textContent = `${elapsed.toFixed(1)}s`;
}

function updateCharacterCount() {
  document.getElementById('chars').textContent = `${currentPosition}/${currentSentence.length}`;
}

function calculateResults() {
  const timeTaken = (endTime - startTime) / 1000;
  const accuracy = ((correctChars - errors) / currentSentence.length) * 100;
  const adjustedAccuracy = Math.max(0, accuracy).toFixed(1);
  const wpm = calculateWPM(timeTaken);

  document.getElementById('accuracy').textContent = `${adjustedAccuracy}%`;
  document.getElementById('wpm').textContent = Math.round(wpm);
  
  // Move to next sentence after delay
  setTimeout(() => {
    currentSentenceIndex = (currentSentenceIndex + 1) % sentences.length;
    isTestRunning = false;
    startTime = null;
    endTime = null;
    displayNextSentence();
  }, 2000);
}

function calculateWPM(timeInSeconds) {
  // 5 characters = 1 word (standard typing measurement)
  const words = (correctChars - errors) / 5;
  const minutes = timeInSeconds / 60;
  return Math.max(0, words / minutes);
}

function resetResults() {
  document.getElementById('wpm').textContent = '0';
  document.getElementById('accuracy').textContent = '0%';
  document.getElementById('time').textContent = '0s';
  document.getElementById('chars').textContent = '0/0';
}
