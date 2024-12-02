const currentDate = new Date();
let reservationsList = [];



document.addEventListener('DOMContentLoaded', ()=>{
    fetchAllReservations1()
    showCurrentReservations()
    let current = document.getElementById("current")
    current.classList.add("active")

    async function fetchAllReservations1() {
        return fetch('http://localhost:5220/api/reservation', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(async (response) => {
            reservationsList = await response.json();
            showCurrentReservations()
        })
    }
})




async function fetchAllReservations() {
    return fetch('http://localhost:5220/api/reservation', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(async (response) => {
        reservationsList = await response.json();
        console.log("Reservations List:", reservationsList);
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

async function showCurrentReservations(){

    let container = document.getElementById('reservations')
    container.innerHTML = '';

    let title = document.getElementById("title")
    title.textContent = 'CURRENT RESERVATIONS'

    reservationsList.forEach((reservation) => {
        if(new Date(reservation.date) > currentDate && reservation.isComplete === 0){
            const reservationContainer = document.createElement('div')
            reservationContainer.classList.add("reservationContainer")
            const reserv = document.createElement('div')
            const btn = document.createElement('button')
            reserv.style.cursor = 'pointer'
            btn.style.cursor = "pointer"
            const formattedDateTime = new Date(reservation.date).toLocaleString('en-US', {
              
                month: 'short',    
                day: 'numeric',    
                hour: '2-digit',   
                minute: '2-digit', 
                hour12: true       
            });
            reserv.textContent = `${reservation.reservation_id}  ${reservation.email_address} ${"  ",formattedDateTime}`
            btn.textContent ="Mark as Complete"
            reserv.classList.add('reserveName')
            btn.classList.add("markButton")
                    reservationContainer.appendChild(reserv)
                    reservationContainer.appendChild(btn)

                    container.appendChild(reservationContainer)
        
            btn.addEventListener('click', ()=>{
                MarkComplete(reservation.reservation_id)
            })
        
            reserv.addEventListener('click', ()=>{
                let object = encodeURIComponent(JSON.stringify(reservationsList));
                window.open(`AReservationDetails.html?reservation_id=${reservation.reservation_id}&object=${object}`, '_blank');
            })           
        }
        
    
    
    
        
    });
    const showMore = document.createElement('h3')
        showMore.textContent = "Click to show more"
        showMore.classList.add('showMore')
        container.appendChild(showMore)
}
        
async function showPastReservations(){

    let container = document.getElementById('reservations')
    container.innerHTML = '';

    let title = document.getElementById("title")
    title.textContent = 'PAST RESERVATIONS'

    reservationsList.forEach((reservation) => {
        if(new Date(reservation.date) < currentDate || reservation.isComplete === 1){
            let reservationContainer = document.createElement('div')
            reservationContainer.classList.add('reservationContainer')
            const reserv = document.createElement('div')
            const btn = document.createElement('button')
            btn.style.cursor = 'pointer'
            btn.classList.add('markButton')
            btn.textContent = 'Mark as InComplete'
            reserv.style.cursor = 'pointer'
            const formattedDateTime = new Date(reservation.date).toLocaleString('en-US', {
                month: 'short',   
                day: 'numeric',    
                hour: '2-digit',   
                minute: '2-digit', 
                hour12: true       
            });
            reserv.textContent = `${reservation.reservation_id}  ${reservation.email_address}      ${formattedDateTime}`
            reserv.classList.add('reserveName')
                    reservationContainer.appendChild(reserv)
                    reservationContainer.appendChild(btn)

                    container.append(reservationContainer)

            btn.addEventListener('click', ()=>{
                    MarkInComplete(reservation.reservation_id)
            })
        
        
            reserv.addEventListener('click', ()=>{
                let object = encodeURIComponent(JSON.stringify(reservationsList));
                window.open(`AReservationDetails.html?reservation_id=${reservation.reservation_id}&object=${object}`, '_blank');
            })           
        }
        
    
    
    
        
    });
    const showMore = document.createElement('h3')
        showMore.textContent = "Click to show more"
        showMore.classList.add('showMore')
        container.appendChild(showMore)
}


function MarkComplete(reservation_id) {
    OptimisticUpdate(reservation_id, 1); 
    
    fetch('http://localhost:5220/api/reservation/MarkComplete', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reservation_id: reservation_id })
    })
    .then(() => {
        showCurrentReservations();
    })
}

function MarkInComplete(reservation_id) {
    OptimisticUpdate(reservation_id, 0); 
    
    fetch('http://localhost:5220/api/reservation/MarkInComplete', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reservation_id: reservation_id })
    })
    .then(() => {
        showPastReservations();
    })
}

function OptimisticUpdate(reservation_id, isComplete) {
    const reservation = reservationsList.find(res => res.reservation_id === reservation_id);
    if (reservation) {
        reservation.isComplete = isComplete;
    }
}
