const currentDate = new Date();
let reservationsList = [];

document.addEventListener('DOMContentLoaded', ()=>{
    fetchAllReservations()
    let current = document.getElementById("current")
    current.classList.add("active")
})




async function fetchAllReservations(){
    fetch('http://localhost:5220/api/reservation',{

    method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(async (response) => {
        reservationsList = await response.json();
        if (response.ok) {
            console.log("Reservations List:", reservationsList);
            showCurrentReservations(reservationsList)
        
        } else {
            alert(data.message);  
        }
    })
}

function CurrentButton(){
    let current = document.getElementById("current");
    
    document.getElementById('current').addEventListener('click', () => {
        timeButtonBackground(current);
        showCurrentReservations(reservationsList);
    });
}
function PastButton(){
    let past = document.getElementById("past");
    
    document.getElementById('past').addEventListener('click', () => {
        timeButtonBackground(past);
        showPastReservations(reservationsList);
    });
}

function timeButtonBackground(selectedButton) {
    const buttons = [current, past]; 

    buttons.forEach(button => {
        button.classList.remove("active"); 
    });

    selectedButton.classList.add("active"); 
}

async function showCurrentReservations(reservations){

    let container = document.getElementById('reservations')
    container.innerHTML = '';

    reservations.forEach((reservation) => {
        if(new Date(reservation.date) > currentDate){
            const reserv = document.createElement('div')
            reserv.style.cursor = 'pointer'
            reserv.textContent = `${reservation.reservation_id}  ${reservation.email_address}  ${reservation.date}`
            reserv.classList.add('reserveName')
                    container.appendChild(reserv)
        
        
            reserv.addEventListener('click', ()=>{
                let object = encodeURIComponent(JSON.stringify(reservations));
                window.location.href = `AReservationDetails.html?reservation_id=${reservation.reservation_id}&object=${object}`;
            })           
        }
        
    
    
    
        
    });
    const showMore = document.createElement('h3')
        showMore.textContent = "Click to show more"
        showMore.classList.add('showMore')
        container.appendChild(showMore)
}
        
async function showPastReservations(reservations){

    let container = document.getElementById('reservations')
    container.innerHTML = '';

    reservations.forEach((reservation) => {
        if(new Date(reservation.date) < currentDate){
            const reserv = document.createElement('div')
            reserv.style.cursor = 'pointer'
            reserv.textContent = `${reservation.reservation_id}  ${reservation.email_address}  ${reservation.date}`
            reserv.classList.add('reserveName')
                    container.appendChild(reserv)
        
        
            reserv.addEventListener('click', ()=>{
                let object = encodeURIComponent(JSON.stringify(reservations));
                window.location.href = `AReservationDetails.html?reservation_id=${reservation.reservation_id}&object=${object}`;
            })           
        }
        
    
    
    
        
    });
    const showMore = document.createElement('h3')
        showMore.textContent = "Click to show more"
        showMore.classList.add('showMore')
        container.appendChild(showMore)
}