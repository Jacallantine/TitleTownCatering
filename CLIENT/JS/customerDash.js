document.addEventListener('DOMContentLoaded', ()=>{
    var first_name = getQueryParam("first_name");
    var email_address = getQueryParam("email_address");
    
    console.log(email_address);
    console.log(first_name);

   
    document.getElementById('signIn').textContent = first_name;

   fetchReservations(email_address)



})

async function fetchReservations(email_address){
    console.log(`Fetching reservations for: ${email_address}`); 
    fetch(`http://localhost:5220/api/reservation/${email_address}`, {
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
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });}



async function displayReservations(reservations){
    let container = document.getElementById('reservations')
    reservations.forEach((reservation) => {
        const reserv = document.createElement('div')
        reserv.style.cursor = 'pointer'
        reserv.textContent = `${reservation.reservation_id}  ${reservation.email_address}  ${reservation.date}`
        reserv.classList.add('reserveName')
                container.appendChild(reserv)
    
    
        reserv.addEventListener('click', ()=>{
            window.location.href = `customerReservation.html?id=${reservation.id}`;
        })
    
    
    
    
        
    });
    const showMore = document.createElement('h3')
        showMore.textContent = "Click to show more"
        showMore.classList.add('showMore')
        container.appendChild(showMore)
    }

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}





