const divo = document.createElement("div");
divo.setAttribute("id", "background");
document.body.appendChild(divo);

const form = document.querySelector("form");
const search = document.getElementById("search");
const pagination = document.createElement("div");

async function getArt(url, classNameRemove, classNameAdd, clearInnHTML, title) {
  const div = document.createElement("div");
  div.classList.add("flex");
  if (clearInnHTML) {
    div.classList.remove("flex");
    clearInnerHTML();
  }
  if (title) {
    console.log("entered");
    var header = document.createElement("div");
    header.innerHTML = `<h1 style="display:block;">${title}</h1>`;
    document.body.appendChild(header);
    header.classList.add("header");
  }
  document.body.appendChild(div);
  divo.innerHTML = "";
  div.classList.add(classNameAdd);
  div.classList.remove(classNameRemove);
  const resp = await fetch(url);
  const respData = await resp.json();
  respData.results.forEach((element) => {
    const divs = document.createElement("div");
    divs.classList.add("cards");
    divs.innerHTML = `
            <img src=https://image.tmdb.org/t/p/original${element.poster_path} onclick="getMovie(${element.id})">
            <h2 style="cursor:pointer;" onclick="getMovie(${element.id})">${element.title}</h2>
        `;
    div.appendChild(divs);
  });
  const newurl = url.substring(0, url.length - 1);
  if (div.classList.value == "flexWrap") {
    pagination.innerHTML = `
        <div class='pagination' style="display:inline-flex;">
            <div class='item' onclick= "getArt('${newurl}1','flex','flexWrap',true,'${title}');">1</div>
            <div class='item' onclick= "getArt('${newurl}2','flex','flexWrap',true,'${title}');">2</div>
            <div class='item' onclick= "getArt('${newurl}3','flex','flexWrap',true,'${title}');">3</div>
            <div class='item' onclick= "getArt('${newurl}4','flex','flexWrap',true,'${title}');">4</div>
            <div class='item' onclick= "getArt('${newurl}5','flex','flexWrap',true,'${title}');">5</div>
        </div>`;
    document.body.appendChild(pagination);
  }
}

getArt(
  "https://api.themoviedb.org/3/movie/popular?api_key=43a03fe0aeabd1f1c19a3175e23843e7&language=en-US&page=1",
  "flexwrap",
  "flex",
  false,
  "Popular"
);
getArt(
  "https://api.themoviedb.org/3/movie/top_rated?api_key=43a03fe0aeabd1f1c19a3175e23843e7&language=en-US&page=1",
  "flexwrap",
  "flex",
  false,
  "Top Rated"
);
getArt(
  "https://api.themoviedb.org/3/movie/upcoming?api_key=43a03fe0aeabd1f1c19a3175e23843e7&language=en-US&page=1",
  "flexwrap",
  "flex",
  false,
  "Upcoming"
);

async function getMovie(id) {
  const trailerid =
    "https://api.themoviedb.org/3/movie/" +
    id +
    "/videos?api_key=43a03fe0aeabd1f1c19a3175e23843e7&language=en-US";
  const urlid =
    "https://api.themoviedb.org/3/movie/" +
    id +
    "?api_key=43a03fe0aeabd1f1c19a3175e23843e7&language=en-US";
  const respo = await fetch(urlid);
  const respoData = await respo.json();
  const response = await fetch(trailerid);
  const trailerData = await response.json();
  var key;
  trailerData.results.forEach((trailer) => {
    if (trailer.type == "Trailer") {
      key = trailer.key;
    }
  });
  const trailerLink = "https://www.youtube.com/watch?v=" + key;
  const date = respoData.release_date;
  const release_date = date.substring(0, 4);
  let genres = "";
  respoData.genres.forEach((element) => {
    genres = genres + element.name + "&nbsp&nbsp&nbsp";
  });
  clearInnerHTML();
  divo.innerHTML = "";
  divo.innerHTML = `
        <div class="backgroundImg" style="background-image:linear-gradient(rgba(0,0,0, 0.7),rgba(0, 0, 00, 0.7)),url('https://image.tmdb.org/t/p/original${respoData.poster_path}');"></div>
        <div class="bigBox">
            <div class="imageBox">
                <img src="https://image.tmdb.org/t/p/original${respoData.poster_path}">
                <a href=${trailerLink} target="_blank"><h1>WATCH TRAILER</h1></a>
            </div>
            <div class="desc">
                <h1>${respoData.title}</h1>
                <h3>${release_date} | ${respoData.runtime} min | ${genres}</h3>
                <br>
                <h3>Vote Average: ${respoData.vote_average}</h3>
                <h4>THE STORY</h4><hr>
                <p>${respoData.overview}</p>
            </div>
        </div>
    `;
  document.body.removeChild(pagination);
}

function showMenu() {
  var box = document.getElementById("opening-box");
  var boxCS = window.getComputedStyle(box);
  height = boxCS.height;
  opacity = boxCS.opacity;
  if (height == "0px" && opacity == 0) {
    box.style.height = "100px";
    box.style.opacity = 1;
    box.style.pointerEvents = "auto";
  } else {
    box.style.height = "0px";
    box.style.opacity = 0;
    box.style.pointerEvents = "none";
  }
}
function hideMenu() {
  var box = document.getElementById("opening-box");
  box.style.height = "0px";
  box.style.opacity = 0;
  box.style.pointerEvents = "none";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  var searchLink =
    "https://api.themoviedb.org/3/search/movie?api_key=43a03fe0aeabd1f1c19a3175e23843e7&language=en-US&query=" +
    searchTerm +
    "&include_adult=false&page=1";
  if (searchTerm) {
    getArt(searchLink, "flex", "flexWrap", true, search.value);
    search.value = "";
  }
});

function clearInnerHTML() {
  document.body.querySelectorAll(".flex").forEach((name) => {
    document.body.removeChild(name);
  });
  document.body.querySelectorAll(".header").forEach((name) => {
    document.body.removeChild(name);
  });
  document.body.querySelectorAll(".flexWrap").forEach((name) => {
    document.body.removeChild(name);
  });
}
