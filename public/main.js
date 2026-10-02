const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav__main');

navToggle.addEventListener('click', () => {
    nav.classList.toggle('nav--visible');
})

document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    
    const formData = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        email: this.email.value,
        message: this.message.value
    };

    try {
        const response = await fetch("/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert("✅ Message sent successfully!");
            this.reset();
        } else {
            alert("❌ Failed to send message.");
        }
    } catch (err) {
        console.error(err);
        alert("❌ Server error.");
    }
})