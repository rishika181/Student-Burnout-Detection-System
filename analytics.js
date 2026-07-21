
// ======================================
// analytics.js (Part 1)
// ======================================

// ------------------------------
// Load Entries
// ------------------------------

const entries = JSON.parse(localStorage.getItem("entries")) || [];

// ------------------------------
// Summary Card Elements
// ------------------------------

const avgBurnout = document.getElementById("avgBurnout");
const avgSleep = document.getElementById("avgSleep");
const avgStudy = document.getElementById("avgStudy");
const totalCheckins = document.getElementById("totalCheckins");

// ------------------------------
// No Data
// ------------------------------

if(entries.length === 0){

    avgBurnout.innerText = "0%";
    avgSleep.innerText = "0 hrs";
    avgStudy.innerText = "0 hrs";
    totalCheckins.innerText = "0";

}else{

    let burnoutTotal = 0;
    let sleepTotal = 0;
    let studyTotal = 0;

    entries.forEach(function(item){

        burnoutTotal += item.burnoutScore;
        sleepTotal += Number(item.sleep);
        studyTotal += Number(item.study);

    });

    avgBurnout.innerText =
    (burnoutTotal/entries.length).toFixed(1) + "%";

    avgSleep.innerText =
    (sleepTotal/entries.length).toFixed(1) + " hrs";

    avgStudy.innerText =
    (studyTotal/entries.length).toFixed(1) + " hrs";

    totalCheckins.innerText = entries.length;

}

// ------------------------------
// Prepare Burnout Chart Data
// ------------------------------

const labels = entries.map(function(item){

    return item.date;

});

const burnoutScores = entries.map(function(item){

    return item.burnoutScore;

});

// ------------------------------
// Burnout Chart
// ------------------------------

const burnoutCtx =
document.getElementById("burnoutChart");

if(burnoutCtx){

new Chart(burnoutCtx,{

    type:"line",

    data:{

        labels:labels,

        datasets:[{

            label:"Burnout Score",

            data:burnoutScores,

            borderColor:"#6C63FF",

            backgroundColor:"rgba(108,99,255,0.2)",

            borderWidth:3,

            fill:true,

            tension:0.4

        }]

    },

    options:{

        responsive:true,

        plugins:{

            legend:{

                display:true

            }

        },

        scales:{

            y:{

                beginAtZero:true,

                max:100

            }

        }

    }

});

}

console.log("Analytics Part-1 Loaded");

// ======================================
// analytics.js (Part 2)
// Charts
// ======================================

// ------------------------------
// Stress Data
// ------------------------------

const stressData = entries.map(function(item){
    return Number(item.stress);
});

const stressCtx = document.getElementById("stressChart");

if(stressCtx){

    new Chart(stressCtx,{

        type:"bar",

        data:{
            labels:labels,
            datasets:[{
                label:"Stress Level",
                data:stressData,
                backgroundColor:"#ff6384"
            }]
        },

        options:{
            responsive:true,
            scales:{
                y:{
                    beginAtZero:true,
                    max:10
                }
            }
        }

    });

}



// ------------------------------
// Sleep Data
// ------------------------------

const sleepData = entries.map(function(item){
    return Number(item.sleep);
});

const sleepCtx = document.getElementById("sleepChart");

if(sleepCtx){

    new Chart(sleepCtx,{

        type:"line",

        data:{
            labels:labels,
            datasets:[{
                label:"Sleep Hours",
                data:sleepData,
                borderColor:"#36a2eb",
                backgroundColor:"rgba(54,162,235,.2)",
                fill:true,
                tension:0.4
            }]
        },

        options:{
            responsive:true,
            scales:{
                y:{
                    beginAtZero:true
                }
            }
        }

    });

}



// ------------------------------
// Study Data
// ------------------------------

const studyData = entries.map(function(item){
    return Number(item.study);
});

const studyCtx = document.getElementById("studyChart");

if(studyCtx){

    new Chart(studyCtx,{

        type:"bar",

        data:{
            labels:labels,
            datasets:[{
                label:"Study Hours",
                data:studyData,
                backgroundColor:"#4bc0c0"
            }]
        },

        options:{
            responsive:true,
            scales:{
                y:{
                    beginAtZero:true
                }
            }
        }

    });

}



// ------------------------------
// Motivation Data
// ------------------------------

const motivationData = entries.map(function(item){
    return Number(item.motivation);
});

const motivationCtx =
document.getElementById("motivationChart");

if(motivationCtx){

    new Chart(motivationCtx,{

        type:"line",

        data:{
            labels:labels,
            datasets:[{
                label:"Motivation",

                data:motivationData,

                borderColor:"#ff9f40",

                backgroundColor:"rgba(255,159,64,.2)",

                fill:true,

                tension:0.4
            }]
        },

        options:{
            responsive:true,

            scales:{
                y:{
                    beginAtZero:true,
                    max:10
                }
            }
        }

    });

}

console.log("Analytics Part-2 Loaded");

// ======================================
// analytics.js (Part 3)
// Insights & Statistics
// ======================================

// ------------------------------
// Insight List
// ------------------------------

const insightList = document.getElementById("insightList");

if (insightList) {

    insightList.innerHTML = "";

    if (entries.length === 0) {

        insightList.innerHTML =
        "<li>No analytics available. Complete your first check-in.</li>";

    } else {

        let healthy = 0;
        let moderate = 0;
        let high = 0;

        entries.forEach(function(item){

            if(item.risk === "Healthy"){

                healthy++;

            }

            else if(item.risk === "Moderate"){

                moderate++;

            }

            else{

                high++;

            }

        });

        // Risk Summary
        const riskSummary = document.createElement("li");
        riskSummary.innerText =
        `Healthy Days: ${healthy} | Moderate Days: ${moderate} | High Risk Days: ${high}`;
        insightList.appendChild(riskSummary);

        // Average Stress
        const avgStress =
        (
            entries.reduce((sum,item)=>sum + Number(item.stress),0)
            / entries.length
        ).toFixed(1);

        if(avgStress >= 7){

            const li=document.createElement("li");

            li.innerText =
            "⚠ Your average stress level is high. Try taking regular breaks and practicing relaxation techniques.";

            insightList.appendChild(li);

        }

        // Average Sleep
        const avgSleepHours =
        (
            entries.reduce((sum,item)=>sum + Number(item.sleep),0)
            / entries.length
        ).toFixed(1);

        if(avgSleepHours < 7){

            const li=document.createElement("li");

            li.innerText =
            "😴 You are sleeping less than the recommended 7–8 hours on average.";

            insightList.appendChild(li);

        }

        // Average Study
        const avgStudyHours =
        (
            entries.reduce((sum,item)=>sum + Number(item.study),0)
            / entries.length
        ).toFixed(1);

        if(avgStudyHours > 8){

            const li=document.createElement("li");

            li.innerText =
            "📚 Your study hours are quite high. Remember to include short breaks to avoid burnout.";

            insightList.appendChild(li);

        }

        // Motivation
        const avgMotivation =
        (
            entries.reduce((sum,item)=>sum + Number(item.motivation),0)
            / entries.length
        ).toFixed(1);

        if(avgMotivation < 5){

            const li=document.createElement("li");

            li.innerText =
            "💡 Your motivation level seems low. Set small daily goals and reward yourself after completing them.";

            insightList.appendChild(li);

        }

        // Positive Message
        if(high === 0){

            const li=document.createElement("li");

            li.innerText =
            "🎉 Great! You have no High Risk burnout records so far. Keep maintaining healthy habits.";

            insightList.appendChild(li);

        }

    }

}

console.log("Analytics Part-3 Loaded Successfully");


