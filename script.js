// Fetch movie data from the API
fetch('db.json')
  .then(response => response.json())
  .then(data => {
    let films = data.films.map(film => {
      film.soldOut = film.capacity - film.tickets_sold === 0;
      return film;
    });

    // Populate the movie list
    const filmsList = document.getElementById('films');
    films.forEach(film => {
      const li = document.createElement('li');
      li.classList.add('film', 'item');

      const title = document.createElement('span');
      title.textContent = film.title;
      title.addEventListener('click', () => displayMovieDetails(film));
      li.appendChild(title);

      filmsList.appendChild(li);
    });

    // Display the details of the first movie
    if (films.length > 0) {
      displayMovieDetails(films[0]);
    }
  });

// Function to display movie details
function displayMovieDetails(movie) {
  // Clear the movie details container
  const movieDetails = document.getElementById('movieDetails');
  movieDetails.innerHTML = '';

  // Create the movie poster element
  const moviePoster = document.createElement('img');
  moviePoster.src = movie.poster;
  moviePoster.alt = movie.title + ' Poster';

  // Create the movie details elements
  const movieTitle = document.createElement('h2');
  movieTitle.textContent = movie.title;

  const movieRuntime = document.createElement('p');
  movieRuntime.textContent = 'Runtime: ' + movie.runtime + ' minutes';

  const movieShowtime = document.createElement('p');
  movieShowtime.textContent = 'Showtime: ' + movie.showtime;

  const movieTickets = document.createElement('p');
  movieTickets.textContent = 'Available Tickets: ' + (movie.capacity - movie.tickets_sold);

  const buyTicketBtn = document.createElement('button');
  buyTicketBtn.textContent = movie.capacity - movie.tickets_sold > 0 ? 'Buy Ticket' : 'SOLD OUT';
  buyTicketBtn.disabled = movie.capacity - movie.tickets_sold === 0;
  buyTicketBtn.addEventListener('click', () => buyTicket(movie));

  // Append the elements to the movie details container
  movieDetails.appendChild(moviePoster);
  movieDetails.appendChild(movieTitle);
  movieDetails.appendChild(movieRuntime);
  movieDetails.appendChild(movieShowtime);
  movieDetails.appendChild(movieTickets);
  movieDetails.appendChild(buyTicketBtn);
}

// Function to handle buying a ticket
function buyTicket(movie) {
  const movieTickets = document.querySelector('#movieDetails p:nth-child(4)');
  const buyTicketBtn = document.querySelector('#movieDetails button');

  // Get the current number of available tickets
  const availableTickets = parseInt(movieTickets.textContent.split(': ')[1]);

  // Check if tickets are available
  if (availableTickets > 0) {
    // Decrease the number of available tickets
    const updatedTickets = availableTickets - 1;

    // Update the available tickets display
    movieTickets.textContent = 'Available Tickets: ' + updatedTickets;

    // Disable the buy ticket button and display "SOLD OUT" if no tickets available
    if (updatedTickets === 0) {
      buyTicketBtn.disabled = true;
      buyTicketBtn.textContent = 'SOLD OUT';
    }
  }
}