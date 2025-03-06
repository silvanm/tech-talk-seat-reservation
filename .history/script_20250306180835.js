document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    const rows = 3;
    const seatsPerRow = 15;
    
    // DOM elements
    const rowElements = document.querySelectorAll('.row');
    const selectedSeatsElement = document.getElementById('selected-seats');
    const reserveButton = document.getElementById('reserve-btn');
    
    // State
    let selectedSeats = [];
    let reservedSeats = [];
    
    // Initialize seats
    initializeSeats();
    
    // Add event listener to reserve button
    reserveButton.addEventListener('click', reserveSelectedSeats);
    
    // Function to initialize seats
    function initializeSeats() {
        rowElements.forEach((rowElement, rowIndex) => {
            const seatsContainer = rowElement.querySelector('.seats');
            
            for (let i = 1; i <= seatsPerRow; i++) {
                const seat = document.createElement('div');
                seat.className = 'seat available';
                seat.dataset.row = rowIndex + 1;
                seat.dataset.seat = i;
                seat.textContent = i;
                
                seat.addEventListener('click', () => toggleSeatSelection(seat));
                
                seatsContainer.appendChild(seat);
            }
        });
    }
    
    // Function to toggle seat selection
    function toggleSeatSelection(seat) {
        // If seat is reserved, do nothing
        if (seat.classList.contains('reserved')) {
            return;
        }
        
        const seatId = `R${seat.dataset.row}S${seat.dataset.seat}`;
        
        if (seat.classList.contains('selected')) {
            // Deselect seat
            seat.classList.remove('selected');
            seat.classList.add('available');
            selectedSeats = selectedSeats.filter(id => id !== seatId);
        } else {
            // Select seat
            seat.classList.remove('available');
            seat.classList.add('selected');
            selectedSeats.push(seatId);
        }
        
        // Update selected seats display
        updateSelectedSeatsDisplay();
        
        // Enable/disable reserve button
        reserveButton.disabled = selectedSeats.length === 0;
    }
    
    // Function to update selected seats display
    function updateSelectedSeatsDisplay() {
        if (selectedSeats.length === 0) {
            selectedSeatsElement.textContent = 'None';
        } else {
            const formattedSeats = selectedSeats.map(seatId => {
                const row = seatId.substring(1, seatId.indexOf('S'));
                const seat = seatId.substring(seatId.indexOf('S') + 1);
                return `Row ${row}, Seat ${seat}`;
            });
            selectedSeatsElement.textContent = formattedSeats.join('; ');
        }
    }
    
    // Function to reserve selected seats
    function reserveSelectedSeats() {
        // Add selected seats to reserved seats
        reservedSeats = [...reservedSeats, ...selectedSeats];
        
        // Mark selected seats as reserved
        selectedSeats.forEach(seatId => {
            const row = seatId.substring(1, seatId.indexOf('S'));
            const seat = seatId.substring(seatId.indexOf('S') + 1);
            
            const seatElement = document.querySelector(`.seat[data-row="${row}"][data-seat="${seat}"]`);
            seatElement.classList.remove('selected');
            seatElement.classList.add('reserved');
        });
        
        // Clear selected seats
        selectedSeats = [];
        
        // Update selected seats display
        updateSelectedSeatsDisplay();
        
        // Disable reserve button
        reserveButton.disabled = true;
        
        // Show confirmation message
        alert('Seats reserved successfully!');
    }
});
