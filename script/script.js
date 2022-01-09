const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=";
const API_URL_desc =
  "https://api.themoviedb.org/3/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=";
const API_URL_asc =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.asc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = `https://image.tmdb.org/t/p/w1280`;
const SEARCH_URL =
  'http://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';
const API_KEY = "api_key=3fd2be6f0c70a2a598f084ddfb75487c&";
const BASE_URL = "https://api.themoviedb.org/3";
const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");
const todas = document.getElementById("todas");
const menosValoradas = document.getElementById("menos-valoradas");
const masValoradas = document.getElementById("mas-valoradas");
const btn_search = document.querySelector(".busqueda");

const getMovie = async (url) => {
  try {
    const peticion = await fetch(url);
    const pelicula = await peticion.json();
    const data = pelicula.results;
    // console.log(data);
    showMovie(data);
  } catch (error) {
    console.log(error);
  }
};

function showMovie(movie) {
  movie.forEach((movie) => {
    const { title, poster_path, vote_average, overview, id } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
             <img src="${IMG_PATH + poster_path}" alt="">
             <div class="movie-info">
                 <h3>${title}</h3>  
                 <span class="${getClassByRate(
                   vote_average
                 )}">${vote_average}</span>
             </div>
             <div class="overview">
                 <h3>overview</h3>
                 ${overview}
                 <div>
                 <button class="know-more" id="${id }"><h3>Trailers</h3></button>  
                 </div>
             </div>

        `;
    main.appendChild(movieEl);
    document.getElementById(id).addEventListener("click", () => {
      console.log(id);
      openNav(movie);
    });
  });
}
const overlayContent = document.getElementById('overlay-content')
/* Open when someone clicks on the span element */
function openNav(movie) {
  let id = movie.id;
  fetch(BASE_URL + "/movie/" + id + "/videos?" + API_KEY)
    .then((res) => res.json())
    .then((videoDAta) => {
      console.log(videoDAta);
      if (videoDAta) {
        document.getElementById("myNav").style.width = "100%";
        if (videoDAta.results.length > 0) {
          var embed = [];
          videoDAta.results.forEach((video) => {
            let {name, key, site} = video
            if(site == 'YouTube'){}
            embed.push(`
          <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

          `);
          });
            overlayContent.innerHTML = embed.join('');
        } else {
          overlayContent.innerHTML = `<h1> class="no-results">No results Found</h1>`
        }
      }
    });
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

todas.addEventListener("click", () => {
  main.innerHTML = "";
  getMovie(API_URL);
});
masValoradas.addEventListener("click", () => {
  main.innerHTML = "";
  getMovie(API_URL_desc);
});
menosValoradas.addEventListener("click", () => {
  main.innerHTML = "";
  getMovie(API_URL_asc);
});

function getClassByRate(vote) {
  if (vote >= 8.0) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

btn_search.addEventListener("click", (e) => {
  e.preventDefault();
  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    main.innerHTML = "";
    getMovie(SEARCH_URL + searchTerm);
  } else {
    window.location.reload();
  }
});
document.addEventListener("DOMContentLoaded", getMovie(API_URL));

/* Creando el scroll infinito */
let currentPage = 1;

const onScroll = async () => {
  if (document.body.scrollHeight - window.innerHeight === window.scrollY) {
    currentPage++;
    const response = await fetch(`${API_URL}${currentPage}`);
    let { results } = await response.json();
    showMovie(results);
  }
};

window.addEventListener("scroll", onScroll);
