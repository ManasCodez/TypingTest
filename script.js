let startTime, endTime;

const sentences = [
  "hello",
  "Manas",
  "I am fine",
  "This website is created for fun and my coding practise" ,
  " One of my most productive days was throwing away 1000 lines of code that i coded",
  "If debudding is the process of removing software bugs, then programming must be the process of putting them in",
  "The computer was born to solve problems that did not exist before.",
  "Real programmers don't comment their code. If it was hard to write, it should be hard to understand",
  "Always code as if the guy who ends up maintaning your code will be a violent psychopath who knows where you live",
  "People don't care about what you say, they care about what you build. ",
  "Debugging becomes significantly easier if you first admit that you are the problem",
  " Any fool can write code that a computer can understand. Good programmers write code that humans can understand",
  " The function of a good software is to make the complex appear to be simple",
  "Your most unhappy customers are your greatest source of learning",
  " A good programmer is someone who always looks both ways before crossing a one-way street",
  "There is a big difference between making a simple product & making a product simple",
  ];

let currentSentenceIndex = 0;
let currentSentence = sentences[currentSentenceIndex];

function displayNextSentence() {
  currentSentenceIndex = (currentSentenceIndex + 1) % sentences.length;
  currentSentence = sentences[currentSentenceIndex];
  document.getElementById('quote').textContent = currentSentence;
  document.getElementById('input').value = "";
}

function startTimer() {
  if (!startTime) {
    startTime = new Date().getTime();
  }
}

function stopTimer() {
  if (!endTime) {
    endTime = new Date().getTime();
  }
}

function checkAccuracy() {
  const quote = currentSentence;
  const input = document.getElementById('input').value;

  stopTimer();

  const accuracy = calculateAccuracy(quote, input);
  const timeTaken = (endTime - startTime) / 1000; // in seconds

  const wpm = calculateWPM(input, timeTaken);

  document.getElementById('accuracy').textContent = `Accuracy: ${accuracy}%`;
  document.getElementById('wpm').textContent = `WPM: ${wpm}`;
  document.getElementById('time').textContent = `Time: ${timeTaken.toFixed(2)}s`;

  startTime = null;
  endTime = null;

  displayNextSentence();
}

function calculateAccuracy(quote, input) {
  const quoteWords = quote.trim().split(' ');
  const inputWords = input.trim().split(' ');

  let correctCount = 0;
  for (let i = 0; i < inputWords.length; i++) {
    if (quoteWords[i] === inputWords[i]) {
      correctCount++;
    }
  }

  const accuracy = (correctCount / quoteWords.length) * 100;
  return accuracy.toFixed(2);
}

function calculateWPM(input, timeTaken) {
  const words = input.trim().split(/\s+/);
  const wordCount = words.length;
  const minutes = timeTaken / 60;
  const wpm = Math.round(wordCount / minutes);
  return wpm;
}

window.addEventListener('load', displayNextSentence);

// Add event listener for Enter key press
document.getElementById('input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault(); // Prevent form submission

    // Call the checkAccuracy() function
    checkAccuracy();
  }
});








































































































