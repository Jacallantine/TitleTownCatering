let foodList = []
let reservations = []

document.addEventListener("DOMContentLoaded",()=>{
    const object = getQueryParam("object")
    let deserializedObject = JSON.parse(decodeURIComponent(object));
    const reservation_id = getQueryParam("reservation_id")
    console.log(deserializedObject)
    console.log(reservation_id)
    FetchFoods()
    FetchReservations(reservation_id);
})



function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}


async function FetchFoods(){ 
    fetch(`http://localhost:5220/api/reservation/food`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(async (response) => {
        let data = await response.json();
        
            console.log("Food List:", data);  
            foodList = data
        
    })
}

async function FetchReservations(reservation_id){
    fetch(`http://localhost:5220/api/reservation/reservationInfo`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(async (response) => {
        let data = await response.json();
        
            console.log("Reservation Info:", data);  
            reservations = data
            DisplayInfo(reservations, reservation_id)
    })
}

function DisplayInfo(reservations, reservation_id){
    console.log(reservations)
    let html = `<ul>`
    reservations.forEach((reservation) => {
        if(reservation.reservation_id == reservation_id){
            html += `<li>Includes ${reservation.quantity * 20} servings of ${reservation.foodName}</li>`
            document.getElementById("date").innerHTML = reservation.date
        }
    })
    html += `</ul>`
    document.getElementById("reservation_id").innerHTML = reservation_id
    document.getElementById("foodList").innerHTML = html
}
