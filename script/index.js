const container = document.querySelector(".container");
const list = document.querySelector(".movie_list");

let id;

async function search_movie() {

    let input = document.querySelector("#movie").value;
    let url = `https://omdbapi.com/?s=${input}&apikey=afac39bd`;

    try {
        let res = await fetch(url);
        let data = await res.json();
        return data.Search;
    } catch (error) {
        console.log(error);
    }
}

function movie_list(data) {
    list.innerHTML = null;
    list.style.height = "400px";
    data.forEach(function (elem) {
        let poster;
        (elem.Poster == "N/A") ? poster = "https://t3.ftcdn.net/jpg/00/36/94/26/360_F_36942622_9SUXpSuE5JlfxLFKB1jHu5Z07eVIWQ2W.jpg" : poster = elem.Poster;
        let div = document.createElement("div")
        div.className = "movie_name";
        div.addEventListener("click", function () {
            get_movie(elem.imdbID);
        })
        let img = document.createElement("img");
        img.src = poster;

        let p = document.createElement("p");
        p.innerText = elem.Title;

        div.append(img, p);
        list.append(div);
    });
}

async function main() {
    try {
        let data = await search_movie();
        // optimization
        if (data === undefined) {
            return false;
        }
        movie_list(data);
    } catch (error) {
        console.log(error);
    }
}


function debounce(func, delay) {
    if (id) {
        clearTimeout(id); //just like innerHTML = null;
    }
    id = setTimeout(function () {
        func(); //main();
    }, delay);
}

async function get_movie(elem) {
    list.style.height = "0px";
    let url = `https://omdbapi.com/?i=${elem}&apikey=afac39bd`;

    try {
        let res = await fetch(url);
        let data = await res.json();
        let data_arr = [];
        data_arr.push(data);
        display_data(data_arr);
    } catch (error) {
        console.log(error);
    }
}


function display_data(data) {
    container.innerHTML = "";
    container.style.transform = "scale(1)";
    data.map(function (elem) {
        let div = document.createElement("div");

        let img = document.createElement("img");
        let poster;
        if (elem.Poster == "N/A") {
            poster = "https://t3.ftcdn.net/jpg/00/36/94/26/360_F_36942622_9SUXpSuE5JlfxLFKB1jHu5Z07eVIWQ2W.jpg";
        } else {
            poster = elem.Poster;
        }
        img.src = poster;

        let div2 = document.createElement("div");
        let title = document.createElement("h3");
        title.innerText = elem.Title;
        let type = document.createElement("h5");
        type.innerHTML = `<span>Type:</span> ${elem.Type}`;
        let actor = document.createElement("h5");
        actor.innerHTML = `<span>Actors:</span> ${elem.Actors}`;
        let director = document.createElement("h5");
        director.innerHTML = `<span>Director:</span> ${elem.Director}`;
        let country = document.createElement("h5");
        country.innerHTML = `<span>Country:</span> ${elem.Country}`;
        let year = document.createElement("h5");
        year.innerHTML = `<span>Released:</span> ${elem.Released}`;
        let rating = document.createElement("h5");
        rating.className = "rating";
        rating.innerHTML = `<span>Rating:</span> ${elem.imdbRating}`;
        let recommend = document.createElement("h3");
        if (elem.imdbRating > 8.5) {
            recommend.innerHTML = "Recommended";
        } else {
            recommend.style.display = "none";
        }
        let boxoffice = document.createElement("h5");
        let BO = elem.BoxOffice || "Not Known!";
        boxoffice.innerHTML = `<span>BoxOffice:</span> ${BO}`;

        let Runtime = document.createElement("h5");
        Runtime.innerHTML = `<span>Runtime:</span> ${elem.Runtime}`;


        div2.append(title, type, actor, director, country, year, rating, boxoffice, Runtime, recommend);
        div.append(img, div2);

        container.append(div);
    })
}

document.onclick = function (e) {
    if (e.target.className !== "movie_name") {
        list.style.height = "0px";
    }
}