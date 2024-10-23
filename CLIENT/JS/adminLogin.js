


let userName = document.getElementById('userName')
let password = document.getElementById('password')



async function adminLogin(){
    event.preventDefault()

    var email_address = document.getElementById('userName').value;
    var password = document.getElementById('password').value;

    fetch(`http://localhost:5220/api/admin/adminLogin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email_address, password })  
    })
    .then(async (response) => {
        const data = await response.json();  
        if (response.ok) {
            alert('Login successful!');
            const first_name = data.first_name;
            const id = data.id;
            window.location.href = `admin.html?id=${id}&first_name=${first_name}`;  
        } else {
            alert(data.message);  
        }
    })
    


}