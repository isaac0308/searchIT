const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('resultsContainer');
const modalContainer = document.getElementById('modalContainer');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.getElementsByClassName('close')[0];

let citiesData = [];

// Fetch data from the provided URL
fetch('https://tinyurl.com/5bzzvh6u')
  .then(response => response.json())
  .then(data => {
    citiesData = data;
  })
  .catch(error => {
    console.log('Error fetching data:', error);
  });

// Function to filter cities based on search query
function filterCities(query) {
  const filteredCities = citiesData.filter(city => {
    const cityName = city.city.toLowerCase();
    const stateName = city.state.toLowerCase();
    return cityName.includes(query) || stateName.includes(query);
  });

  displayResults(filteredCities);
}

// Function to display the filtered results
function displayResults(filteredCities) {
  resultsContainer.innerHTML = '';

  if (filteredCities.length === 0) {
    resultsContainer.innerText = 'No results found.';
    return;
  }

  filteredCities.forEach(city => {
    const resultElement = document.createElement('div');
    resultElement.classList.add('result');
    resultElement.innerHTML = `<span>${city.city}, ${city.state}</span>
                               <span>👫Population: ${city.population}</span>
                               <span>♐Growth %: <span class="${city.growth_from_2000_to_2013 >= 0 ? 'positive-growth' : 'negative-growth'}">${city.growth_from_2000_to_2013}%</span></span>`;
    resultElement.addEventListener('click', () => showModal(city));
    resultsContainer.appendChild(resultElement);
  });
}

// Function to show the modal with city details
function showModal(city) {
  modalContent.innerHTML = `<h2>${city.city}, ${city.state}</h2>
                            <p>Population: ${city.population}</p>
                            <p>Growth %: ${city.growth_from_2000_to_2013}%</p>`;
  modalContainer.style.display = 'block';
}

// Function to close the modal
function closeModal() {
  modalContainer.style.display = 'none';
}

// Event listener for search input
searchInput.addEventListener('input', event => {
  const query = event.target.value.toLowerCase();
  filterCities(query);
});

// Event listener for close button
closeBtn.addEventListener('click', closeModal);

// Event listener to close the modal when clicking outside the modal content
window.addEventListener('click', event => {
  if (event.target === modalContainer) {
    closeModal();
  }
});
