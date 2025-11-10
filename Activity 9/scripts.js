
const form = document.getElementById("contactForm");
console.log("Form:", form);
console.log("Form Elements:", form.elements);

console.log("Name field initial value:", document.getElementById("name").value);

function validateName() 
{
    const name = document.getElementById("name");
    const error = document.getElementById("nameError");
    if (name.value.trim() === "") 
    {
        error.textContent = "Name is required.";
        name.classList.add("invalid");
        return false;
    }
    error.textContent = "";
    name.classList.remove("invalid");
    name.classList.add("valid");
    return true;
}

function validateEmail() 
{
    const email = document.getElementById("email");
    const error = document.getElementById("emailError");
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(email.value.trim())) 
    {
        error.textContent = "Invalid email format.";
        email.classList.add("invalid");
        return false;
    }
    error.textContent = "";
    email.classList.remove("invalid");
    email.classList.add("valid");
    return true;
}

function validateSubject() 
{
    const subject = document.getElementById("subject");
    const error = document.getElementById("subjectError");
    if (subject.value === "") 
    {
        error.textContent = "Please select a subject.";
        subject.classList.add("invalid");
        return false;
    }
    error.textContent = "";
    subject.classList.remove("invalid");
    subject.classList.add("valid");
    return true;
}

function validateMessage()
{
    const message = document.getElementById("message");
    const error = document.getElementById("messageError");
    if (message.value.trim().length < 10)
    {
        error.textContent = "Message must be at least 10 characters.";
        message.classList.add("invalid");
        return false;
    }
    error.textContent = "";
    message.classList.remove("invalid");
    message.classList.add("valid");
    return true;
}

document.getElementById("name").addEventListener("input", validateName);
document.getElementById("email").addEventListener("input", validateEmail);
document.getElementById("subject").addEventListener("change", validateSubject);
document.getElementById("message").addEventListener("input", validateMessage);

form.addEventListener("submit", function(event) {
    event.preventDefault();
    console.log("Form Submit Triggered");

    const valid =
        validateName() &
        validateEmail() &
        validateSubject() &
        validateMessage();

    if (valid) 
    {
        document.getElementById("formStatus").textContent = "Form submitted successfully!";
        console.log("Form Data:", 
        {
            name: name.value,
            email: email.value,
            subject: subject.value,
            message: message.value
        });
        form.reset();
        document.querySelectorAll(".valid").forEach(el => el.classList.remove("valid"));
    } else 
    {
        document.getElementById("formStatus").textContent = "Please fix errors before submitting.";
    }
});
