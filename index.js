const form = document.querySelector("#contact form");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector("textarea").value;

    const contact = {
        name,
        email,
        message,
        date: new Date().toLocaleString()
    };

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    contacts.push(contact);

    localStorage.setItem("contacts", JSON.stringify(contacts));

    alert("Message Sent Successfully!");

    form.reset();

});