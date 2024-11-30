document.addEventListener("DOMContentLoaded", () => {
    let combinedData = getQueryParam("combinedData");
    let deserializedData = JSON.parse(decodeURIComponent(combinedData));
    let email_address = getQueryParam("email_address")
    console.log(email_address)
    console.log(deserializedData)
});

function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}




async function createReservation(){
    let combinedData = getQueryParam("combinedData");
    let email_address = getQueryParam("email_address")
    let first_name = getQueryParam("first_name")
    let deserializedData = JSON.parse(decodeURIComponent(combinedData));
    let address = document.getElementById('address').value
    deserializedData.address = address

    const response = await fetch('http://localhost:5220/api/reservation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(deserializedData)
    })
    .then( window.location.href = `customerDash.html?email_address=${email_address}&first_name=${first_name}`)

   



}