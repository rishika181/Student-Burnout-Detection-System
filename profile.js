
// ===============================
// Student Burnout Detection System
// profile.js
// ===============================

// Select Elements

const profileForm = document.getElementById("profileForm");
const profilePic = document.getElementById("profilePic");
const previewImage = document.getElementById("previewImage");


// ===============================
// Profile Image Preview
// ===============================

profilePic.addEventListener("change", function () {

    const file = this.files[0];

    if (file) {

        const reader = new FileReader();

        reader.onload = function (e) {

            previewImage.src = e.target.result;

            localStorage.setItem("profileImage", e.target.result);

        };

        reader.readAsDataURL(file);

    }

});


// ===============================
// Save Profile
// ===============================

profileForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const genderElement = document.querySelector(
        "input[name='gender']:checked"
    );

    const profile = {

        name: document.getElementById("name").value.trim(),

        email: document.getElementById("email").value.trim(),

        college: document.getElementById("college").value.trim(),

        course: document.getElementById("course").value,

        year: document.getElementById("year").value,

        age: document.getElementById("age").value,

        gender: genderElement ? genderElement.value : "",

        goal: document.getElementById("goal").value,

        bio: document.getElementById("bio").value.trim(),

        image: previewImage.src

    };



    // Validation

    if (

        profile.name === "" ||

        profile.email === "" ||

        profile.college === "" ||

        profile.course === "Select Course" ||

        profile.year === "Select Year"

    ) {

        alert("Please fill all required fields.");

        return;

    }



    // Save into LocalStorage

    localStorage.setItem(

        "studentProfile",

        JSON.stringify(profile)

    );



    alert("Profile Saved Successfully!");



    // Redirect

    window.location.href = "checkin.html";

});



// ===============================
// Load Saved Profile
// ===============================

window.onload = function () {

    const savedProfile = JSON.parse(

        localStorage.getItem("studentProfile")

    );



    if (savedProfile) {

        document.getElementById("name").value = savedProfile.name;

        document.getElementById("email").value = savedProfile.email;

        document.getElementById("college").value = savedProfile.college;

        document.getElementById("course").value = savedProfile.course;

        document.getElementById("year").value = savedProfile.year;

        document.getElementById("age").value = savedProfile.age;

        document.getElementById("goal").value = savedProfile.goal;

        document.getElementById("bio").value = savedProfile.bio;



        if (savedProfile.image) {

            previewImage.src = savedProfile.image;

        }



        const genderRadio = document.querySelector(

            `input[name="gender"][value="${savedProfile.gender}"]`

        );



        if (genderRadio) {

            genderRadio.checked = true;

        }

    }



    // Load saved image separately

    const img = localStorage.getItem("profileImage");



    if (img) {

        previewImage.src = img;

    }

};



// ===============================
// Email Validation
// ===============================

const emailInput = document.getElementById("email");

emailInput.addEventListener("blur", function () {

    const emailPattern =

        /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;



    if (

        this.value !== "" &&

        !emailPattern.test(this.value)

    ) {

        alert("Please enter a valid email address.");

        this.focus();

    }

});



// ===============================
// Reset Form
// ===============================

function resetProfile() {

    if (

        confirm("Do you want to clear the profile?")

    ) {

        localStorage.removeItem("studentProfile");

        localStorage.removeItem("profileImage");

        location.reload();

    }

}



// ===============================
// Console
// ===============================

console.log(

    "Profile Page Loaded Successfully"

);
