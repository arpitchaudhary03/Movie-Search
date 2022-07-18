const api_key = "7b434973d92278edace061be79dfbe7d";
let url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}`;
let img_url = "https://image.tmdb.org/t/p/w500";

popular_movies();
async function popular_movies() {
    let res = await fetch(url);
    let data = await res.json();
    display_data(data.results);
}


function display_data(data) {
    document.querySelector(".trending").innerHTML = "";
    data.map(function (elem) {
        let mainDiv = document.createElement("div");

        let img = document.createElement("img");
        img.src = `${img_url}${elem.poster_path}`;

        let div = document.createElement("div");

        let name = document.createElement("h4");
        name.innerText = elem.title;

        let date = document.createElement("p");
        date.innerText = elem.release_date;

        let rating = document.createElement("p");
        rating.innerText = elem.vote_average;

        div.append(name, date, rating);

        mainDiv.append(img, div);

        document.querySelector(".trending").append(mainDiv);
    });
}