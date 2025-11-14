const hour = document.getElementById("hour");
const minutes = document.getElementById("minute");
const seconds = document.getElementById("second");
const day = document.getElementById("day");
const midday = document.getElementById("midday");
const format12 = document.getElementById("format12");
const format24 = document.getElementById("format24");
let is24Hour = false;
const clock = setInterval(function time() {
  let dateToday = new Date();
  let hr = dateToday.getHours();
  let min = dateToday.getMinutes();
  let sec = dateToday.getSeconds();
  let middayVal = "";
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
format12.addEventListener("click", () => {
  is24Hour = false;
  format12.style.color = "#00bfff";
  format24.style.color = "#fff";
});
format24.addEventListener("click", () => {
  is24Hour = true;
  format24.style.color = "#00bfff";
  format12.style.color = "#fff";
});
