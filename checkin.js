
// ================================
// Student Burnout Detection System
// checkin.js
// ================================

// -------------------------------
// Elements
// -------------------------------

const form = document.getElementById("checkinForm");

const stress = document.getElementById("stress");
const motivation = document.getElementById("motivation");

const stressValue = document.getElementById("stressValue");
const motivationValue = document.getElementById("motivationValue");

// -------------------------------
// Slider Values
// -------------------------------

stress.addEventListener("input", () => {

    stressValue.innerText = stress.value;

});

motivation.addEventListener("input", () => {

    motivationValue.innerText = motivation.value;

});

// -------------------------------
// Submit Form
// -------------------------------

form.addEventListener("submit", function(e){

    e.preventDefault();

    saveEntry();

});

// -------------------------------
// Save Entry
// -------------------------------

function saveEntry(){

    const mood = document.getElementById("mood").value;

    const sleep = Number(document.getElementById("sleep").value);

    const study = Number(document.getElementById("study").value);

    const water = Number(document.getElementById("water").value);

    const exercise = Number(document.getElementById("exercise").value);

    const screen = Number(document.getElementById("screen").value);

    const goal = document.getElementById("goal").value;

    const notes = document.getElementById("notes").value;

    // Validation

    if(

        mood==="" ||

        sleep==="" ||

        study===""

    ){

        alert("Please fill all required fields.");

        return;

    }

    // -------------------------------
    // Burnout Score
    // -------------------------------

    let score = calculateBurnout(

        Number(stress.value),

        sleep,

        study,

        Number(motivation.value)

    );

    // -------------------------------
    // Risk Level
    // -------------------------------

    let risk = "";

    if(score<=35){

        risk="Healthy";

    }

    else if(score<=65){

        risk="Moderate";

    }

    else{

        risk="High";

    }

    // -------------------------------
    // Recommendation
    // -------------------------------

    let recommendation = getRecommendation(

        Number(stress.value),

        sleep,

        study,

        Number(motivation.value)

    );

    // -------------------------------
    // Today's Date
    // -------------------------------

    const today = new Date();

    const date = today.toLocaleDateString();

    // -------------------------------
    // Entry Object
    // -------------------------------

    const entry = {
            id: Date.now(),


        date,

        mood,

        stress:Number(stress.value),

        sleep,

        study,

        motivation:Number(motivation.value),

        water,

        exercise,

        screen,

        goal,

        notes,

        burnoutScore:score,

        risk,

        recommendation

    };

    // -------------------------------
    // Local Storage
    // -------------------------------

    let entries = JSON.parse(

        localStorage.getItem("entries")

    ) || [];

    entries.push(entry);

    localStorage.setItem(

        "entries",

        JSON.stringify(entries)

    );

    alert("Today's Check-In Saved Successfully!");

    window.location.href="dashboard.html";

}

// -------------------------------
// Burnout Formula
// -------------------------------

function calculateBurnout(

    stress,

    sleep,

    study,

    motivation

){

    let score =

    (stress*4)

    +(study*2)

    +((8-sleep)*3)

    +((10-motivation)*2);

    if(score<0){

        score=0;

    }

    if(score>100){

        score=100;

    }

    return score;

}

// -------------------------------
// Recommendation
// -------------------------------

function getRecommendation(

    stress,

    sleep,

    study,

    motivation

){

    let tips=[];

    if(stress>=8){

        tips.push("Practice deep breathing.");

    }

    if(sleep<6){

        tips.push("Sleep at least 7-8 hours.");

    }

    if(study>8){

        tips.push("Take study breaks every hour.");

    }

    if(motivation<=3){

        tips.push("Talk to a friend or mentor.");

    }

    if(tips.length===0){

        tips.push("Great Job! Maintain your routine.");

    }

    return tips;

}

console.log("Check-In Page Loaded");

