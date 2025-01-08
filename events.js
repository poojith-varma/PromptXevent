// Check authentication
if (!localStorage.getItem('currentUser')) {
    window.location.href = 'index.html';
}

// Display user name
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
document.getElementById('userName').textContent = currentUser.name;

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Your existing event handling code here
const events = [
    {
        title: "Music Festival",
        date: "2023-10-15",
        time: "18:00",
        location: "City Park",
        description: "Join us for a night of music and fun!",
        timings: "6 PM - 11 PM",
        ticketPrice: "$20",
        organizer: "City Events Team"
    },
    {
        title: "Art Exhibition",
        date: "2023-10-20",
        time: "10:00",
        location: "Art Gallery",
        description: "Explore the latest art from local artists.",
        timings: "10 AM - 5 PM",
        ticketPrice: "Free",
        organizer: "Local Art Society"
    },
    {
        title: "Movie Pre-Release Event",
        date: "2023-11-01",
        time: "19:00",
        location: "Downtown Cinema",
        description: "Be the first to watch the latest blockbuster before its official release!",
        timings: "7 PM - 10 PM",
        ticketPrice: "$15",
        organizer: "Film Enthusiasts Club"
    },
    {
        title: "Music Festival",
        date: "2023-11-10",
        time: "14:00",
        location: "Riverfront Park",
        description: "A day filled with live music from various artists and bands.",
        timings: "2 PM - 10 PM",
        ticketPrice: "$30",
        organizer: "Music Lovers Association"
    },
    {
        title: "Book Fair",
        date: "2023-11-15",
        time: "09:00",
        location: "Convention Center",
        description: "Discover new books and meet your favorite authors at the annual book fair.",
        timings: "9 AM - 5 PM",
        ticketPrice: "Free",
        organizer: "Local Bookstore Network"
    },
    {
        title: "Charity Event",
        date: "2023-11-25",
        time: "18:00",
        location: "Community Hall",
        description: "Join us for a charity dinner to support local families in need.",
        timings: "6 PM - 9 PM",
        ticketPrice: "$50",
        organizer: "Helping Hands Organization"
    }
];

function displayEvents(filter = '', location = '') {
    const eventList = document.getElementById('event-list');
    eventList.innerHTML = ''; // Clear the existing list

    const filteredEvents = events.filter(event => {
        const matchesFilter = event.title.toLowerCase().includes(filter.toLowerCase()) || 
                              event.description.toLowerCase().includes(filter.toLowerCase());
        const matchesLocation = location === '' || event.location === location;
        return matchesFilter && matchesLocation;
    });

    filteredEvents.forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'event';
        eventDiv.innerHTML = `
            <h2>${event.title}</h2>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Time:</strong> ${event.time} (${event.timings})</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p><strong>Description:</strong> ${event.description}</p>
            <p><strong>Ticket Price:</strong> ${event.ticketPrice}</p>
            <p><strong>Organizer:</strong> ${event.organizer}</p>
            <button onclick="addToCalendar('${event.title}', '${event.date}', '${event.time}')">Add to Calendar</button>
        `;
        eventList.appendChild(eventDiv);
    });
}

function addToCalendar(title, date, time) {
    const eventStart = new Date(`${date}T${time}`);
    const eventEnd = new Date(eventStart);
    eventEnd.setHours(eventEnd.getHours() + 2); // Assuming a 2-hour event

    const calendarUrl = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(title)}&dates=${eventStart.toISOString().replace(/-|:|\.\d+/g, '')}/${eventEnd.toISOString().replace(/-|:|\.\d+/g, '')}`;
    window.open(calendarUrl, '_blank');
}

function updateProfile() {
    const name = document.getElementById('profile-name').value;
    const mobile = document.getElementById('profile-mobile').value;
    const email = document.getElementById('profile-email').value;

    alert(`Profile Updated:\nName: ${name}\nMobile: ${mobile}\nEmail: ${email}`);
}

document.getElementById('search-box').addEventListener('input', (e) => {
    displayEvents(e.target.value, document.getElementById('location-filter').value);
});

document.getElementById('location-filter').addEventListener('change', (e) => {
    displayEvents(document.getElementById('search-box').value, e.target.value);
});

document.getElementById('update-profile-btn').addEventListener('click', updateProfile);

document.addEventListener('DOMContentLoaded', () => {
    displayEvents(); // Display all events initially
});