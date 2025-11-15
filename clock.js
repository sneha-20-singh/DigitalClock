const hour = document.getElementById("hour");
const minutes = document.getElementById("minute");
const seconds = document.getElementById("second");
const day = document.getElementById("day");
const midday = document.getElementById("midday");
const format12 = document.getElementById("format12");
const format24 = document.getElementById("format24");
const bgInput = document.getElementById("bg-input");
const bgBtn = document.getElementById("bg-btn");
const resetBgBtn = document.getElementById("reset-bg-btn");
const dateVar = document.getElementById("date");
//default background
const defaultbg = "url('./src/bgImages.jpg')";
//default format choice
let is24Hour = false;
const clock = setInterval(function time() {
  let dateToday = new Date();
  //adding date
  let date = dateToday.getDate().toString().padStart(2, "0");
  let month = (dateToday.getMonth() + 1).toString().padStart(2, "0");
  let year = dateToday.getFullYear();
  dateVar.innerText = `${date}/${month}/${year}`;
  //getting hour , minutes, seconds
  let hr = dateToday.getHours();
  let min = dateToday.getMinutes();
  let sec = dateToday.getSeconds();

  let middayVal = "";
  //display day
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  day.textContent = days[dateToday.getDay()];
  if (!is24Hour) {
    middayVal = hr >= 12 ? "PM" : "AM";
    hr = hr % 12 || 12; //conver 0 to 12 for 12 hour format
  }
  if (is24Hour) {
    midday.style.display = "none";
  } else {
    midday.style.display = "flex";
  }
  //adding zeroes for better presentation
  if (hr < 10) {
    hr = "0" + hr;
  }
  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  //update display

  hour.textContent = hr;
  minutes.textContent = min;
  seconds.textContent = sec;
  midday.textContent = is24Hour ? "" : middayVal;
}, 1000);
// format switcher
format12.addEventListener("click", () => {
  is24Hour = false;
  format12.style.color = "#060e41ff";
  format24.style.color = "#fff";
});
format24.addEventListener("click", () => {
  is24Hour = true;
  format24.style.color = "#060e41ff";
  format12.style.color = "#fff";
});
//open file picker
bgBtn.addEventListener("click", () => {
  bgInput.click();
});
// when user selects image
bgInput.addEventListener("change", () => {
  const file = bgInput.files[0];
  if (!file) {
    return;
  }
  //assigning url to the selected picture
  const imageURL = URL.createObjectURL(file);
  //set body background
  document.body.style.backgroundImage = `url(${imageURL})`;
  //save to local storage
  localStorage.setItem("bodyBackground", imageURL);
});
//restore background on refresh
window.addEventListener("load", () => {
  const savedBG = localStorage.getItem("bodyBackground");
  if (savedBG) {
    document.body.style.backgroundImage = `url(${savedBG})`;
  } else {
    document.body.style.backgroundImage = defaultbg;
  }
});
//reset background
resetBgBtn.addEventListener("click", () => {
  localStorage.removeItem("bodyBackground");
  document.body.style.backgroundImage = defaultbg;
});
