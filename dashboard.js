
// ==========================================
// Student Burnout Detection System
// dashboard.js
// ==========================================

// ------------------------------
// Load Profile
// ------------------------------

const profile = JSON.parse(localStorage.getItem("studentProfile"));

if (profile) {

    document.getElementById("username").textContent = profile.name;

}



// ------------------------------
// Load Entries
// ------------------------------

const entries = JSON.parse(localStorage.getItem("entries")) || [];



// ------------------------------
// No Data
// ------------------------------

if (entries.length === 0) {

    alert("No Check-In Found!");

    window.location.href = "checkin.html";

}



// ------------------------------
// Latest Entry
// ------------------------------

const latest = entries[entries.length - 1];



// ------------------------------
// Display Data
// ------------------------------

document.getElementById("burnoutScore").innerText =
latest.burnoutScore + "%";


document.getElementById("riskLevel").innerText =
latest.risk;


document.getElementById("mood").innerText =
latest.mood;


document.getElementById("stress").innerText =
latest.stress + "/10";


document.getElementById("sleep").innerText =
latest.sleep + " Hours";


document.getElementById("study").innerText =
latest.study + " Hours";


document.getElementById("motivation").innerText =
latest.motivation + "/10";


document.getElementById("water").innerText =
latest.water + " Glasses";


document.getElementById("exercise").innerText =
latest.exercise + " Minutes";


document.getElementById("screen").innerText =
latest.screen + " Hours";


document.getElementById("goal").innerText =
latest.goal || "No Goal Added";


document.getElementById("notes").innerText =
latest.notes || "No Notes Added";



// ------------------------------
// Risk Color
// ------------------------------

const risk = document.getElementById("riskLevel");

if (latest.risk === "Healthy") {

    risk.style.color = "green";

}

else if (latest.risk === "Moderate") {

    risk.style.color = "orange";

}

else {

    risk.style.color = "red";

}



// ------------------------------
// Recommendations
// ------------------------------

const recommendationList =
document.getElementById("recommendationList");

recommendationList.innerHTML = "";

latest.recommendation.forEach(function(item){

    const li = document.createElement("li");

    li.innerText = item;

    recommendationList.appendChild(li);

});



// ------------------------------
// Greeting
// ------------------------------

const hour = new Date().getHours();

let greeting = "";

if(hour < 12){

    greeting = "Good Morning";

}

else if(hour < 17){

    greeting = "Good Afternoon";

}

else{

    greeting = "Good Evening";

}

document.querySelector(".welcome h1").innerHTML =

`${greeting},

<span id="username">

${profile ? profile.name : "Student"}

</span>

👋`;



// ------------------------------
// Today's Date
// ------------------------------

const today = new Date();

console.log(

"Today's Date :",

today.toLocaleDateString()

);



// ------------------------------
// Total Check-ins
// ------------------------------

console.log(

"Total Entries :",

entries.length

);



// ------------------------------
// Average Burnout Score
// ------------------------------

let total = 0;

entries.forEach(function(item){

    total += item.burnoutScore;

});

const average =

(total / entries.length).toFixed(1);

console.log(

"Average Burnout Score :",

average

);



// ------------------------------
// Healthy Days
// ------------------------------

const healthyDays = entries.filter(function(item){

    return item.risk === "Healthy";

});

console.log(

"Healthy Days :", healthyDays.length

);



// ------------------------------
// High Risk Days
// ------------------------------

const highRisk = entries.filter(function(item){

    return item.risk === "High";

});

console.log(

"High Risk Days :", highRisk.length

);



// ------------------------------
// Dashboard Loaded
// ------------------------------

console.log(

"Dashboard Loaded Successfully"

);

