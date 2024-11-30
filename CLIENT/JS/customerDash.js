document.addEventListener('DOMContentLoaded', ()=>{
    var first_name = getQueryParam("first_name");
    var email_address = getQueryParam("email_address");

    console.log(email_address);
    console.log(first_name);

   
    document.getElementById('signIn').textContent = first_name;

   fetchReservations(email_address)
    let current = document.getElementById("current")
    current.classList.add("active")
   



})

function customerDash(){
    window.location.href = `customerDash.html?email_address=${email_address}&first_name=${first_name}`
}
const currentDate = new Date();
let reservationsData = []


function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
function GoToCalendar(email_address){
    let first_name = getQueryParam("first_name")
    var email_address = getQueryParam("email_address");
    window.location.href = `calendar.html?email_address=${email_address}&first_name=${first_name}`;
}

async function fetchReservations(){ 
    fetch(`http://localhost:5220/api/reservation`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(async (response) => {
        const data = await response.json();
        
        if (response.ok) {
            console.log("Reservations List:", data);  
            reservationsData = data
            showCurrentReservations(data)
        } else {
            console.error("Error message:", data.message); 
            alert(data.message);
        }
    })}

    



    let current = document.getElementById("current");
    let past = document.getElementById("past");
    
    document.getElementById('current').addEventListener('click', () => {
        timeButtonBackground(current);
        showCurrentReservations();
    });
    
    document.getElementById('past').addEventListener('click', () => {
        timeButtonBackground(past);
        showPastReservations();
    });
    
    function timeButtonBackground(selectedButton) {
        const buttons = [current, past]; 
    
        buttons.forEach(button => {
            button.classList.remove("active"); 
        });
    
        selectedButton.classList.add("active"); 
    }

    async function showCurrentReservations(reservations){
        let title = document.getElementById('title')
        title.textContent = "CURRENT RESERVATIONS"
        let email_address = getQueryParam("email_address")
        let container = document.getElementById('reservations')
        container.innerHTML = '';

        reservationsData.forEach(reservation =>{
            if(new Date(reservation.date) > currentDate && reservation.email_address === email_address)
                {
                    const reserv = document.createElement('div')
                    reserv.style.cursor = 'pointer'
                    reserv.textContent = `${reservation.reservation_id}  ${reservation.email_address}`
                    reserv.classList.add('reserveName')
                            container.appendChild(reserv)
                
                
                    reserv.addEventListener('click', ()=>{
                        let object = encodeURIComponent(JSON.stringify(reservations));
                        window.open(`CReservationDetails.html?reservation_id=${reservation.reservation_id}&object=${object}`, '_blank');
                    })
                }
        })
        const showMore = document.createElement('h3')
        showMore.textContent = "Click to show more"
        showMore.classList.add('showMore')
        container.appendChild(showMore)
    
    }

    async function showPastReservations(reservations){
        let title = document.getElementById('title')
        title.textContent = "PAST RESERVATIONS"
        let email_address = getQueryParam("email_address")
        let container = document.getElementById('reservations')
        container.innerHTML = '';
        reservationsData.forEach(reservation =>{
            if(new Date(reservation.date) < currentDate && reservation.email_address === email_address)
                {
                    const reserv = document.createElement('div')
                    reserv.style.cursor = 'pointer'
                    reserv.textContent = `${reservation.reservation_id}  ${reservation.email_address}`
                    reserv.classList.add('reserveName')
                            container.appendChild(reserv)
                
                
                    reserv.addEventListener('click', ()=>{
                        let object = encodeURIComponent(JSON.stringify(reservations));
                        window.open(`CReservationDetails.html?reservation_id=${reservation.reservation_id}&object=${object}`, '_blank');
                    })
                }
        })
        const showMore = document.createElement('h3')
        showMore.textContent = "Click to show more"
        showMore.classList.add('showMore')
        container.appendChild(showMore)
    }
    


