document.addEventListener("DOMContentLoaded", ()=>{
var email_address = getQueryParam("email_address");
console.log(email_address)

})

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const calendarBody = document.getElementById("calendar-body");
const monthYearDisplay = document.getElementById("month-year");
const timeSelection = document.getElementById("time-selection");
const hoursList = document.getElementById("hours-list");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");
const saveButton = document.getElementById("save-button"); // Button for saving

let currentDate = new Date();
let selectedDate = null;
let selectedDateElement = null;
let selectedDateTime = null;

function updateCalendar() {
    calendarBody.innerHTML = ''; 
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const today = new Date();

    monthYearDisplay.textContent = firstDay.toLocaleDateString('default', { month: 'long', year: 'numeric' });

    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyCell = document.createElement('div');
        calendarBody.appendChild(emptyCell);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
        const date = new Date(year, month, day);
        const dateElement = document.createElement('div');
        dateElement.className = 'date';
        dateElement.textContent = day;

        
        if (date < today.setHours(0, 0, 0, 0)) {
            dateElement.classList.add('past');
        } else {
            dateElement.onclick = () => selectDate(date, dateElement);
        }

       
        if (date.toDateString() === new Date().toDateString()) {
            dateElement.classList.add('today');
        }

        calendarBody.appendChild(dateElement);
    }
}

function selectDate(date, dateElement) {
    
    if (selectedDateElement) {
        selectedDateElement.classList.remove('selected-date');
    }

    
    selectedDate = date;
    selectedDateElement = dateElement;
    selectedDateElement.classList.add('selected-date');

    
    showAvailableHours(date);
}

function showAvailableHours(date) {
    selectedDateTime = date;
    timeSelection.style.display = 'block';
    hoursList.innerHTML = ''; 
    saveButton.style.display = 'none';

  
    for (let hour = 8; hour <= 18; hour++) {
        const timeSlot = document.createElement('div');
        timeSlot.className = 'time-slot';
        timeSlot.textContent = `${hour}:00`;
        
        timeSlot.onclick = () => selectHour(hour);

        hoursList.appendChild(timeSlot);
    }
}

function selectHour(hour) {
   
    selectedDateTime.setHours(hour, 0, 0, 0);

  
    const allSlots = document.querySelectorAll('.time-slot');
    allSlots.forEach(slot => slot.classList.remove('selected'));
    
    event.target.classList.add('selected');
    
    
    saveButton.style.display = 'block';
}

function saveReservation(email_address) {
    console.log('Reservation saved:', selectedDateTime);
    var email_address = getQueryParam("email_address");
    window.location.href = `reservation.html?DateTime=${selectedDateTime}&email_address=${email_address}`;
    saveButton.style.display = 'none';
}

prevMonthBtn.onclick = () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
};

nextMonthBtn.onclick = () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
};


updateCalendar();

saveButton.addEventListener("click", ()=>{
saveReservation()
})


