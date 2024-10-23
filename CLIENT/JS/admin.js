document.addEventListener('DOMContentLoaded', ()=>{
    fetchAllReservations()
})



async function fetchAllReservations(){
    fetch('http://localhost:5220/api/reservation',{

    method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(async (response) => {
        const reservationsList = await response.json();
        if (response.ok) {
            console.log("Reservations List:", reservationsList);
            displayReservations(reservationsList)
        
        } else {
            alert(data.message);  
        }
    })
}


async function displayReservations(reservations){
        let container = document.getElementById('reservations')
        reservations.forEach((reservation) => {
            const reserv = document.createElement('div')
            reserv.style.cursor = 'pointer'
            reserv.textContent = `${reservation.id}  ${reservation.email_address}  ${reservation.price}`
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
        