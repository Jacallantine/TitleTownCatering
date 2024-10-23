const currentDate = new Date();
let displayedYear = currentDate.getFullYear(); 
let displayedMonth = currentDate.getMonth(); 

const blockedHours = {}; 
let selectedDay = null;
let selectedHour = null;

const calendarElement = document.getElementById('calendar');
const hourPicker = document.getElementById('hourPicker');
const hoursContainer = document.getElementById('hours');
const selectedDatesElement = document.getElementById('selectedDates');
const monthLabel = document.getElementById('monthLabel');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const selectedDates = [];


const availableHoursByWeekday = {
    0: [10, 11, 12, 13, 14, 15, 16], // Sunday (10 AM to 4 PM)
    1: [9, 10, 11, 12, 13, 14, 15, 16, 17], // Monday (9 AM to 5 PM)
    2: [9, 10, 11, 12, 13, 14, 15, 16, 17], // Tuesday (9 AM to 5 PM)
    3: [9, 10, 11, 12, 13, 14, 15, 16, 17], // Wednesday (9 AM to 5 PM)
    4: [9, 10, 11, 12, 13, 14, 15, 16, 17], // Thursday (9 AM to 5 PM)
    5: [9, 10, 11, 12, 13, 14, 15, 16, 17], // Friday (9 AM to 5 PM)
    6: [10, 11, 12, 13, 14, 15, 16] // Saturday (10 AM to 4 PM)
};


updateCalendar();


prevMonthBtn.addEventListener('click', () => changeMonth(-1));
nextMonthBtn.addEventListener('click', () => changeMonth(1));

function changeMonth(direction) {
    displayedMonth += direction;

    if (displayedMonth < currentDate.getMonth() && displayedYear === currentDate.getFullYear()) {
        displayedMonth = currentDate.getMonth();
    } else if (displayedMonth > 11) {
        displayedMonth = 0;
        displayedYear++;
    } else if (displayedMonth < 0) {
        displayedMonth = 11;
        displayedYear--;
    }

    updateCalendar();
}

function updateCalendar() {
  
    monthLabel.textContent = `${monthNames[displayedMonth]} ${displayedYear}`;

  
    if (displayedYear === currentDate.getFullYear() && displayedMonth <= currentDate.getMonth()) {
        prevMonthBtn.disabled = true;
    } else {
        prevMonthBtn.disabled = false;
    }

   
    calendarElement.innerHTML = '';

    const daysInMonth = new Date(displayedYear, displayedMonth + 1, 0).getDate();

  
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');

       
        const date = new Date(displayedYear, displayedMonth, day);
        const dayOfWeek = date.getDay();
        const dayOfWeekNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

       
        dayElement.innerHTML = `<div>${day}</div><div>${dayOfWeekNames[dayOfWeek]}</div>`;

        if (displayedYear === currentDate.getFullYear() && displayedMonth === currentDate.getMonth() && day < currentDate.getDate()) {
            dayElement.style.backgroundColor = '#1f1f1f';
            dayElement.style.border = '1px solid #808080'
            dayElement.style.cursor = 'not-allowed';
        } else {
            dayElement.addEventListener('click', () => {
                selectDay(day);
            });
        }

        calendarElement.appendChild(dayElement);
    }
}

function selectDay(day) {
    selectedDay = day;

    
    const allDays = document.querySelectorAll('.day');
    allDays.forEach(d => d.classList.remove('selected'));

  
    const dayElements = calendarElement.getElementsByClassName('day');
    dayElements[day - 1].classList.add('selected');

   
    hourPicker.style.display = 'block';

  
    selectedHour = null;

   
    updateHourPicker(day);
}

function updateHourPicker(day) {
    hoursContainer.innerHTML = ''; 

    const selectedDate = new Date(displayedYear, displayedMonth, day);
    const dayOfWeek = selectedDate.getDay(); 
    const availableHours = availableHoursByWeekday[dayOfWeek]; 

    const hours = blockedHours[`${displayedYear}-${displayedMonth}-${day}`] || [];

 
    availableHours.forEach(hour => {
        const hourElement = document.createElement('div');
        hourElement.classList.add('hour');
        hourElement.textContent = `${hour}:00`;

        if (hours.includes(hour)) {
            hourElement.classList.add('disabled');
        } else {
            hourElement.addEventListener('click', () => {
                selectHour(hour, hourElement);
            });
        }

        hoursContainer.appendChild(hourElement);
    });
}

function selectHour(hour, hourElement) {
    selectedHour = hour;

   
    const allHours = document.querySelectorAll('.hour');
    allHours.forEach(h => h.classList.remove('selected'));


    hourElement.classList.add('selected');
}

document.getElementById('submitTime').addEventListener('click', function () {
    if (selectedDay && selectedHour !== null) {
        const key = `${displayedYear}-${displayedMonth}-${selectedDay}`;
        blockedHours[key] = blockedHours[key] || [];
        blockedHours[key].push(selectedHour);

       
        const selectedDateTime = {
            date: `${displayedMonth + 1}.${selectedDay}.${displayedYear.toString().slice(-2)}`,
            hour: selectedHour
        };

        selectedDates.push(selectedDateTime);

       
        const li = document.createElement('li');
        li.textContent = `Selected Date & Time: ${selectedDateTime.date} at ${selectedHour}:00`;
        selectedDatesElement.appendChild(li);

       
        hourPicker.style.display = 'none';

      
        selectedDay = null;
        selectedHour = null;

       
        updateHourPicker(selectedDay);
    }
});