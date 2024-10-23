document.getElementById('signInForm').addEventListener('submit', function (e) {
    e.preventDefault();  // Prevent form from submitting normally

    const email_address = document.getElementById('userName').value;
    const password = document.getElementById('password').value;

    // Send a POST request to the backend with email and password
    fetch(`http://localhost:5220/api/customer/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email_address, password })  // Properly stringify email and password into a JSON object
    })
    .then(async (response) => {
        const data = await response.json();  
        if (response.ok) {
            alert('Login successful!');
            const first_name = data.first_name;
            const email_address = data.email_address;
            window.location.href = `customerDash.html?email_address=${email_address}&first_name=${first_name}`;  
        } else {
            alert(data.message);  
        }
    })
    .catch(error => console.error('Error:', error));
});
