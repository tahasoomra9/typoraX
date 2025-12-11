const items = document.querySelectorAll(".seconds");
const startBtn = document.querySelector(".start-btn");
const typingText = document.getElementById("typing-text");
const textInput = document.querySelector(".input-field");
const timeSelect = document.querySelectorAll(".seconds");

let paragraphs = [];
let keystrokes = [];
let lastIndex = -1;
let index;
let currentIndex = 0;
let initialTime = 60;
let time = 60;
let timerInterval;
let accuracyValue = 100;
let correctKeys = 0;
let typedKeys = 0;
let mistakeCount = 0;
let wpmcount = 0;


timeSelect.forEach((btn) =>
  btn.addEventListener("click", () => {
    btn.classList.add("selected");
    const timerDisplay = document.getElementById("time-left");
    initialTime = parseInt(btn.dataset.value);
    time = initialTime;
    timerDisplay.innerText = `${time}s`;
  })
);

//Timer counrtdown function

function updateTimerDisplay() {
  const timerDisplay = document.getElementById("time-left");
  if (timerInterval) clearInterval(timerInterval);
  timerDisplay.innerText = `${time}s`;
  timerInterval = setInterval(function () {
    timerDisplay.innerText = `${time}s`;
    time--;

    if (time < 0) {
      clearInterval(timerInterval);
      timerDisplay.innerText = "0s";
      wpmLogic();
      mistakesLogic();
      addRecentScore();
      return;
    }
  }, 1000);
}

//load paragraphs.json
fetch("./paragraphs.json")
  .then((response) => response.json())
  .then((data) => {
    paragraphs = data.paragraphs;
  });

//when start button is clicked
startBtn.addEventListener("click", () => {
  correctKeys = 0;
  wpmLogic();
  wpmcount = 0;
  typedKeys = 0;
  mistakeCount = 0;
  time = initialTime;
  mistakesLogic();
  updateTimerDisplay();
  if (paragraphs.length === 0) return; //no paragraphs loaded
  textInput.focus();
  currentIndex = 0;

  //avoid repeating the last paragraph
  do {
    index = Math.floor(Math.random() * paragraphs.length); //random index
  } while (index === lastIndex); //repeat if same as last

  lastIndex = index; //update last index
  let paragraph = paragraphs[index].text; //setting up paragraph letter we will split in char by char
  let char = paragraph.split(""); // char by char

  typingText.innerHTML = "";
  char.forEach((ch) => {
    let span = document.createElement("span");
    span.innerText = ch;
    typingText.append(span);
  });

  updateActiveBlinker();
});

//Blinker Feature
function updateActiveBlinker() {
  const spans = typingText.querySelectorAll("span");
  spans.forEach((span, i) => {
    if (i === currentIndex) {
      span.classList.add("active");
    } else {
      span.classList.remove("active");
    }
  });
}

updateActiveBlinker();

//Mistakes logic

function mistakesLogic() {
  const mistakeValue = document.getElementById("mistake-display");

  mistakeValue.innerText = mistakeCount;
}

//Accuracy logic

function accuracyLogic() {
  const accuracyDisplay = document.getElementById("accuracy-display");

  if (typedKeys === 0) {
    accuracyDisplay.innerText = "100%";
  } else {
    accuracyValue = (correctKeys / typedKeys) * 100;
    accuracyDisplay.innerText = `${Math.round(accuracyValue)}%`;
  }
}


//Recent SCore Feature

function addRecentScore() {
  let timePassed = initialTime - time

  if (typedKeys === 0) return;
  
  var existingScores = JSON.parse(localStorage.getItem("allScores")); // setting up existingSCore var where it will take allscores from localsotrage
  if (existingScores == null) existingScores = []; //if its null create existingscores
  var ScoreEntry = { //entries
    "wpm" : correctKeys / 5 / (timePassed / 60),
    "Accuracy" : (correctKeys / typedKeys) * 100,
    "timeStamp" : Date.now(),
  };

  existingScores.push(ScoreEntry); //push the entreis into exsitingscore var
  localStorage.setItem("allScores", JSON.stringify(existingScores)); //set or save into all scores with data of exsitingscore

  existingScores.forEach(score => {
    console.log("WPM: ",score.wpm);
    console.log("Accuracy: ",score.Accuracy);
    console.log("Timestamp: ",score.timeStamp);
  });

  renderRecentScore();

  renderTopScores();
}


function deleteHistory () {
const RecentclearHistoryBtn = document.querySelector('#recent-scores .clear-btn');

  RecentclearHistoryBtn.addEventListener('click', () => {

    localStorage.removeItem('allScores');
    renderRecentScore();
    renderTopScores();

  });

}



//Getting scores

function getScores () {
  let scores = JSON.parse(localStorage.getItem("allScores"));

  if (scores === null) {
    scores = [];
  } 
  
  return scores;

}

//TOP SCores

function topScores(limit) {

    const scores = getScores();
  
    const sortedScores = [...scores].sort((a,b) => b.wpm - a.wpm);

    return sortedScores.slice(0, limit);

}


function renderTopScores (limit = 3) {

  const top = topScores(limit);
  const list = document.querySelector('#top-scores .scores-list');
  
  list.innerHTML = ""; 

   const fragment = document.createDocumentFragment();

   if (top.length === 0) {

    const emptyLi = document.createElement('li');

    emptyLi.className = "empty";
    emptyLi.innerText = 'No entries yet';
    list.append(emptyLi);
    return;

   }

   top.forEach(score => {

    const li = document.createElement('li');

    const left = document.createElement('div');
    const right = document.createElement('div');

    left.className = 'score-left';
    right.className = 'score-right';

  const wpm = document.createElement('span');
  wpm.className = 'wpm-value';
  wpm.innerText = Math.round(score.wpm);
  
  const wpmLabel = document.createElement('span');
    wpmLabel.className = "wpm-label";
    wpmLabel.innerText = "WPM";

    
    const acc = document.createElement('span');
    acc.className = "acc-value";
    acc.innerText = `${Math.round(score.Accuracy)}%`;

    // TIME
    const time = document.createElement('span');
    time.className = "time-value";
    time.innerText = formatTime(score.timeStamp);

        left.appendChild(wpm);
        left.appendChild(wpmLabel);
        right.appendChild(acc);
        right.appendChild(time);

        li.appendChild(left);
        li.appendChild(right);

        fragment.appendChild(li);
  
  }); 

   list.appendChild(fragment);

}


//Time format 
const formatTime = (timestamp) => {
    if (!timestamp) return '--:--';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};


//Delete Top score History


// Render Recent Score function

function renderRecentScore() {

 
  
  const recentScoresPanel = document.querySelector('#recent-scores');
    const recentScoresTitle = document.querySelector('#recent-scores h3');
    const scoresList = document.querySelector('#recent-scores .scores-list');
    const emptyMessage = document.querySelector('#recent-scores .scores-list .empty');
    const clearHistoryBtn = document.querySelector('#recent-scores .clear-btn');

    let scores = JSON.parse(localStorage.getItem("allScores"));
    scoresList.innerHTML = ""; // Clear current list

    if (scores === null) {
      scores = [];
    }

    if (scores.length === 0) {

      const emptyLi = document.createElement('li');

    emptyLi.className = "empty";
    emptyLi.innerText = 'No entries yet';
    scoresList.append(emptyLi);
    return;

      
    }

scores.slice().reverse().forEach(score => {
    
    
    const li = document.createElement('li');

    
    const leftDiv = document.createElement('div');
    leftDiv.className = 'score-left';

    
    const dotSpan = document.createElement('span');
    dotSpan.className = 'status-dot';

   
    const wpmValSpan = document.createElement('span');
    wpmValSpan.className = 'wpm-value';
    wpmValSpan.innerText = Math.round(score.wpm);

   
    const wpmLabelSpan = document.createElement('span');
    wpmLabelSpan.className = 'wpm-label';
    wpmLabelSpan.innerText = 'WPM';

  
    leftDiv.appendChild(dotSpan);
    leftDiv.appendChild(wpmValSpan);
    leftDiv.appendChild(wpmLabelSpan);


   
    const rightDiv = document.createElement('div');
    rightDiv.className = 'score-right';

    
    const accSpan = document.createElement('span');
    accSpan.className = 'acc-value';
    accSpan.innerText = `${Math.round(score.Accuracy)}%`;

   
    const timeSpan = document.createElement('span');
    timeSpan.className = 'time-value';
    timeSpan.innerText = formatTime(score.timeStamp || Date.now());

    
    rightDiv.appendChild(accSpan);
    rightDiv.appendChild(timeSpan);


    
    li.appendChild(leftDiv);
    li.appendChild(rightDiv);
    
    scoresList.appendChild(li);

    
});


}


//WPM logic
function wpmLogic() {
  let timePassed = initialTime - time;
  const wpmDisplay = document.getElementById("wpm-display");

  if (timePassed <= 0) {
    wpmDisplay.innerText = 0;
    return;
  }

  const wpmFormula = correctKeys / 5 / (timePassed / 60);
  wpmcount = wpmFormula;
  wpmDisplay.innerText = Math.floor(wpmcount);
}

window.addEventListener("keydown", (e) => {
  const spans = typingText.querySelectorAll("span");
  const key = e.key;

  if (time <= 0) return;

  //Backspace feature
  if (key == "Backspace") {
    if (currentIndex > 0) {
      currentIndex--;
      typedKeys--;

      if (spans[currentIndex].classList.contains("correct")) {
        // if spans contian correct when backspaced

        correctKeys--; //minus the corrected keys too
      }

      if (spans[currentIndex].classList.contains("incorrect")) {
        // if current index or span is incorrect and backspace is clicked
        mistakeCount--; //cut the mistake
      }

      spans[currentIndex].classList.remove("correct", "incorrect"); //remove tags
    }
    updateActiveBlinker();
    return;
  }

  //avoiding special characters
  if (key.length !== 1) return;

  //finishing paras
  if (currentIndex >= spans.length) return;

  //color logic

  if (key === spans[currentIndex].innerText) {
    spans[currentIndex].classList.add("correct");
    correctKeys++;
  } else {
    spans[currentIndex].classList.add("incorrect");

    mistakeCount++;
  }

  currentIndex++;
  typedKeys++;
  updateActiveBlinker();
  mistakesLogic();
  wpmLogic();
  accuracyLogic();
});

// Select item function
function selectItem(el) {
  items.forEach((i) => i.classList.remove("selected"));
  el.classList.add("selected");
}

items.forEach((el) => {
  el.addEventListener("click", () => selectItem(el));

  // keyboard support
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); // avoid page scrolling on Space
      selectItem(el);
    }
  });
});


renderRecentScore();
renderTopScores();
deleteHistory();
