// API Key and Base URL
const apiKey = '7715f149242c4473bfff17953d8cb1aa';  // Replace with your API key
const apiUrl = 'https://newsapi.org/v2/top-headlines';

// Global Variables
let currentPage = 1;
let totalPages = 1;

// Function to fetch news data from the API
async function fetchNews() {
    const searchQuery = document.getElementById('searchInput').value;
    const country = document.getElementById('countryFilter').value;
    const category = document.getElementById('categoryFilter').value;

    const url = new URL(apiUrl);
    const params = {
        apiKey: apiKey,
        q: searchQuery,
        country: country,
        category: category,
        page: currentPage,
        pageSize: 10,
    };

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.status === 'ok') {
            totalPages = Math.ceil(data.totalResults / 10);
            renderNews(data.articles);
            updatePagination();
        } else {
            alert('Error fetching data.');
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred.');
    }
}

// Function to render the fetched news articles
function renderNews(articles) {
    const newsList = document.getElementById('newsList');
    newsList.innerHTML = ''; // Clear previous news

    articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');
        newsItem.innerHTML = `
            <img src="${article.urlToImage}" alt="${article.title}">
            <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
            <p>${article.description}</p>
        `;
        newsList.appendChild(newsItem);
    });
}

// Function to update the pagination buttons
function updatePagination() {
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage === totalPages;
}

// Function to change the page
function changePage(direction) {
    currentPage += direction;
    fetchNews();
}

// Initial fetch on page load
fetchNews();
