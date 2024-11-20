document.addEventListener("DOMContentLoaded", () => {
    let combinedData = getQueryParam("combinedData");
    let deserializedData = JSON.parse(decodeURIComponent(combinedData));
    console.log(deserializedData)
});

function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}




async function createReservation(){
    let combinedData = getQueryParam("combinedData");
    let deserializedData = JSON.parse(decodeURIComponent(combinedData));



    const response = await fetch('http://localhost:5220/api/reservation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(deserializedData)
    });

    if (response.ok) {
        const response = await response.json();
        alert(response.message); 
    } else {
        const errorResponse = await response.json();
        console.error('Error details:', errorResponse);
        alert('Error creating user: ' + errorResponse.message);
    }


}