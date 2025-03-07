document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const responseMessage = document.getElementById("reponseMessage");

    const response = await fetch("http://localhost:3000/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message}),
    });

    const data = await response.json();
    responseMessage.innerText = data.success || data.error;
});