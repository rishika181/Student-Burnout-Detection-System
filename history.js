
// ========================================
// Student Burnout Detection System
// history.js (Part 1)
// ========================================

// Get Elements
const historyTable = document.getElementById("historyTable");
const totalEntries = document.getElementById("totalEntries");
const healthyDays = document.getElementById("healthyDays");
const moderateDays = document.getElementById("moderateDays");
const highRiskDays = document.getElementById("highRiskDays");

// Load Entries
let entries = JSON.parse(localStorage.getItem("entries")) || [];

// ===============================
// Display History
// ===============================

displayHistory(entries);

function displayHistory(data) {

    historyTable.innerHTML = "";

    // No Data Found
    if (data.length === 0) {

        historyTable.innerHTML =

        `<tr>

            <td colspan="9" style="text-align:center; padding:20px;">

                No History Found

            </td>

        </tr>`;

        updateSummary([]);

        return;
    }

    // Loop through all entries
    data.forEach(function (entry, index) {

        let row = `

        <tr>

            <td>${entry.date}</td>

            <td>${entry.mood}</td>

            <td>${entry.stress}</td>

            <td>${entry.sleep} hrs</td>

            <td>${entry.study} hrs</td>

            <td>${entry.motivation}</td>

            <td>${entry.burnoutScore}%</td>

            <td>${entry.risk}</td>

            <td>
<button
class="deleteBtn"
data-id="${entry.id}">
Delete
</button>

            </td>

        </tr>

        `;

        historyTable.innerHTML += row;

    });

    updateSummary(data);

}

// ===============================
// Summary Cards
// ===============================

function updateSummary(data) {

    totalEntries.innerText = data.length;

    let healthy = 0;
    let moderate = 0;
    let high = 0;

    data.forEach(function (item) {

        if (item.risk === "Healthy") {

            healthy++;

        }

        else if (item.risk === "Moderate") {

            moderate++;

        }

        else if (item.risk === "High") {

            high++;

        }

    });

    healthyDays.innerText = healthy;

    moderateDays.innerText = moderate;

    highRiskDays.innerText = high;

}

console.log("History Page Loaded Successfully");


// ========================================
// history.js (Part 2)
// Search, Filter & Delete
// ========================================

// ---------------------------
// Search
// ---------------------------

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    const filtered = entries.filter(function (item) {

        return (

            item.mood.toLowerCase().includes(value) ||

            item.risk.toLowerCase().includes(value)

        );

    });

    displayHistory(filtered);

});



// ---------------------------
// Filter
// ---------------------------

const riskFilter = document.getElementById("riskFilter");

riskFilter.addEventListener("change", function () {

    const selected = this.value;

    if (selected === "All") {

        displayHistory(entries);

        return;

    }

    const filtered = entries.filter(function (item) {

        return item.risk === selected;

    });

    displayHistory(filtered);

});



// ---------------------------
// Delete Single Entry
// ---------------------------

historyTable.addEventListener("click", function (e) {

    if (e.target.classList.contains("deleteBtn")) {

       

        const confirmDelete = confirm("Delete this record?");

        if (!confirmDelete) return;

       const id = Number(e.target.dataset.id);

entries = entries.filter(function(item){

    return item.id !== id;

});

        localStorage.setItem(

            "entries",

            JSON.stringify(entries)

        );

        displayHistory(entries);

    }

});



// ---------------------------
// Delete All
// ---------------------------

const deleteAllBtn = document.getElementById("deleteAll");

deleteAllBtn.addEventListener("click", function () {

    const ok = confirm(

        "Are you sure you want to delete all history?"

    );

    if (!ok) return;

    entries = [];

    localStorage.setItem(

        "entries",

        JSON.stringify(entries)

    );

    displayHistory(entries);

});



// ---------------------------
// Reload Table
// ---------------------------

displayHistory(entries);

console.log("History Functions Loaded");

