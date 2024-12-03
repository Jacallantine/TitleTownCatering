async function createUser(){
    let first_name = document.getElementById('fName').value;
    let last_name = document.getElementById('lName').value;
    let password = document.getElementById('password').value;
    let email_address = document.getElementById('email').value;
    let address = document.getElementById('address').value;
    let zipcode = document.getElementById('zip').value;
    let state = document.getElementById('state').value;
    

    const response = await fetch('http://localhost:5220/api/customer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            first_name: first_name,
            last_name: last_name,
            password : password,
            email_address: email_address,
            address: address,
            zip: zipcode,
            state: state

        })
})
.then(window.open("signIn.html", "_self"));

    
   

}