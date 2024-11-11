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
    calendarBody.innerHTML = ''; // Clear calendar body
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const today = new Date();

    monthYearDisplay.textContent = firstDay.toLocaleDateString('default', { month: 'long', year: 'numeric' });

    // Fill in the empty days at the start of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyCell = document.createElement('div');
        calendarBody.appendChild(emptyCell);
    }

    // Fill in the days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const date = new Date(year, month, day);
        const dateElement = document.createElement('div');
        dateElement.className = 'date';
        dateElement.textContent = day;

        // Mark past dates
        if (date < today.setHours(0, 0, 0, 0)) {
            dateElement.classList.add('past');
        } else {
            dateElement.onclick = () => selectDate(date, dateElement);
        }

        // Highlight today
        if (date.toDateString() === new Date().toDateString()) {
            dateElement.classList.add('today');
        }

        calendarBody.appendChild(dateElement);
    }
}

function selectDate(date, dateElement) {
    // Remove background from previously selected date
    if (selectedDateElement) {
        selectedDateElement.classList.remove('selected-date');
    }

    // Set the new selected date
    selectedDate = date;
    selectedDateElement = dateElement;
    selectedDateElement.classList.add('selected-date');

    // Display hours for the selected date
    showAvailableHours(date);
}

function showAvailableHours(date) {
    selectedDateTime = date; // Set the selected date
    timeSelection.style.display = 'block';
    hoursList.innerHTML = ''; // Clear previous hours
    saveButton.style.display = 'none'; // Hide save button initially

    // Generate available hours for the selected day (8 AM to 6 PM)
    for (let hour = 8; hour <= 18; hour++) {
        const timeSlot = document.createElement('div');
        timeSlot.className = 'time-slot';
        timeSlot.textContent = `${hour}:00`;
        
        timeSlot.onclick = () => selectHour(hour);

        hoursList.appendChild(timeSlot);
    }
}

function selectHour(hour) {
    // Save the selected hour in selectedDateTime
    selectedDateTime.setHours(hour, 0, 0, 0);

    // Display selected hour
    const allSlots = document.querySelectorAll('.time-slot');
    allSlots.forEach(slot => slot.classList.remove('selected'));
    
    event.target.classList.add('selected');
    
    // Show the save button when an hour is selected
    saveButton.style.display = 'block';
}

function saveReservation() {
    console.log('Reservation saved:', selectedDateTime);
    // Hide the save button after saving
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

// Initial calendar render
updateCalendar();

saveButton.addEventListener("click", ()=>{
saveReservation()
})


