document.addEventListener('DOMContentLoaded', ()=>{
    var first_name = getQueryParam("first_name");
    var email_address = getQueryParam("email_address");

    console.log(email_address);
    console.log(first_name);

   
    document.getElementById('signIn').textContent = first_name;

   fetchReservations(email_address)



})


function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
function GoToCalendar(email_address){
    var email_address = getQueryParam("email_address");
    window.location.href = `calendar.html?email_address=${email_address}`;
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
            displayReservations(data);  
        } else {
            console.error("Error message:", data.message); 
            alert(data.message);
        }
    })}



async function displayReservations(reservations){
    let email_address = getQueryParam("email_address")
    let container = document.getElementById('reservations')
    reservations.forEach((reservation) => {
        if(reservation.email_address === email_address)
        {
        const reserv = document.createElement('div')
        reserv.style.cursor = 'pointer'
        reserv.textContent = `${reservation.reservation_id}  ${reservation.email_address}  ${reservation.date}`
        reserv.classList.add('reserveName')
                container.appendChild(reserv)
    
    
        reserv.addEventListener('click', ()=>{
            let object = encodeURIComponent(JSON.stringify(reservations));
            window.location.href = `CReservationDetails.html?reservation_id=${reservation.reservation_id}&object=${object}`;
        })
        }
    
    
    
    
        
    });
    const showMore = document.createElement('h3')
        showMore.textContent = "Click to show more"
        showMore.classList.add('showMore')
        container.appendChild(showMore)
    }






