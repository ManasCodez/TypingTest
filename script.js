let startTime, timerInterval;
let isStarted = false;

const sentences = [
  "This website is created for fun and my coding practice",
  "One of my most productive days was throwing away 1000 lines of code",
  "If debugging is the process of removing bugs, then programming must be the process of putting them in",
  "The computer was born to solve problems that did not exist before",
  "Real programmers don't comment their code. If it was hard to write, it should be hard to understand",
  "Always code as if the person maintaining your code will be a violent psychopath who knows where you live"
];

let currentSentenceIndex = 0;
let currentSentence = sentences[currentSentenceIndex];

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("input");
  displaySentence();

  input.addEventListener("input", () => {
    if (!isStarted) {
      isStarted = true;
      startTimer();
    }

    const typedText = input.value;
    highlightText(typedText);

    if (typedText === currentSentence) {
      stopTimer();
      calculateResults(typedText);
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (input.value === currentSentence) {
        loadNextSentence();
      }
    }
  });
});

function displaySentence() {
  const quote = document.getElementById("quote");
  quote.innerHTML = "";
  for (let char of currentSentence) {
    const span = document.createElement("span");
    span.textContent = char;
    quote.appendChild(span);
  }

  document.getElementById("input").value = "";
  document.getElementById("chars").textContent = `0/${currentSentence.length}`;
  document.getElementById("wpm").textContent = "0";
  document.getElementById("accuracy").textContent = "0%";
  document.getElementById("time").textContent = "0s";
}

function highlightText(input) {
  const quoteSpans = document.getElementById("quote").querySelectorAll("span");
  for (let i = 0; i < quoteSpans.length; i++) {
    const char = input[i];
    if (char == null) {
      quoteSpans[i].className = "";
    } else if (char === currentSentence[i]) {
      quoteSpans[i].className = "correct";
    } else {
      quoteSpans[i].className = "incorrect";
    }
  }

  document.getElementById("chars").textContent = `${input.length}/${currentSentence.length}`;
}

function startTimer() {
  startTime = new Date().getTime();
  timerInterval = setInterval(() => {
    const elapsed = (new Date().getTime() - startTime) / 1000;
    document.getElementById("time").textContent = `${elapsed.toFixed(1)}s`;
  }, 100);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function calculateResults(input) {
  const timeTaken = (new Date().getTime() - startTime) / 1000;
  const correctChars = [...input].filter((char, i) => char === currentSentence[i]).length;
  const accuracy = (correctChars / currentSentence.length) * 100;
  const wpm = (correctChars / 5) / (timeTaken / 60);

  document.getElementById("accuracy").textContent = `${accuracy.toFixed(1)}%`;
  document.getElementById("wpm").textContent = Math.round(wpm);
}

function loadNextSentence() {
  currentSentenceIndex = (currentSentenceIndex + 1) % sentences.length;
  currentSentence = sentences[currentSentenceIndex];
  isStarted = false;
  startTime = null;
  displaySentence();
}
