"use strict"
movies.splice(100)

// {
//     "title": "Patton Oswalt: Annihilation",
//     "year": 2017,
//     "categories": [
//       "Uncategorized"
//     ],
//     "imdbId": "tt7026230",
//     "imdbRating": 7.4,
//     "runtime": 66,
//     "language": "English",
//     "youtubeId": "4hZi5QaMBFc",
//     "summary": "Patton Oswald, despite a personal tragedy, produces his best standup yet. Focusing on the tribulations of the Trump era and life after the loss of a loved one, Patton Oswald continues his journey to contribute joy to the world.",
//     "smallThumbnail": "http://i3.ytimg.com/vi/4hZi5QaMBFc/hqdefault.jpg",
//     "bigThumbnail": "http://i3.ytimg.com/vi/4hZi5QaMBFc/maxresdefault.jpg"
//   },




// !!!!!!!!!!!!!!!!!!!!!!Normalizing!!!!!!!!!!!!!!!!!!!!!!
const Moovies = movies.map((movies) => {
    return {
        title: movies.title,
        year: movies.year,
        language: movies.language,
        category: movies.categories,
        id: movies.imdbId,
        time: `  Soat:${Math.floor(movies.runtime / 60)}, daqiqa:${movies.runtime % 60}`,
        summary: movies.summary,
        link: `https://www.youtube.com/embed/${movies.youtubeId}`,
        maxImg: movies.bigThumbnail,
        minImg: movies.smallThumbnail,
        rating: movies.imdbRating
    }
})
// console.log(Moovies);
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!Rendering!!!!!!!!!!!!!!!!!!!!!!!!!!!!


function renderMoovies() {
    Moovies.forEach((el) => {
        const card = createElement('div', 'card shadow-lg', `
        
        <div class="card">
        <img src="${el.minImg}" alt="img">
        <div class="card-body">
        <h4 class="card-title">
            ${el.title}
        </h4>
        <ul class="list-unstyled"> 
            <li>
                <strong>Year:${el.year}</strong>
            </li>
            <li>
                <strong>Language:${el.language}</strong>
            </li>
            <li>
                <strong>Rating:${el.rating}</strong>
            </li>
            <li>
                <strong>Category:${el.category}</strong>
            </li>
            <li>
                <strong>Runtime:${el.time}</strong>
            </li>
        </ul>

        <div class="social d-flex">
            <a href="${el.link}" target="blank_" class="btn btn-danger m-2">Trailers</a>
            <button class="btn btn-info m-2">Read more . . .</button>

            <button class="btn btn-dark m-2">Add Bookmark</button>
        </div>
        </div>
    </div>

`);
        $('.wrapper').appendChild(card)
    })
}
renderMoovies()


////////////////////////////////2-dars///////////////////////////////



////!!!!!!!!!!!!!!!!!!!!!!Finging!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!(func)!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const findFilm = (regexp, rating = 0, categories) => {

    // console.log(regexp);
    // console.log(rating);
    // console.log(categories);

    if (categories == 'All') {
        return Moovies.filter((film) => {
            return film.title.match(regexp) && film.rating >= rating
        })
    }else if (categories == 'all') {
        return Moovies.filter((film) => {
            return film.title.match(regexp) && film.rating >= rating
        })
    }
    return Moovies.filter((film) => {
        return film.title.match(regexp) && film.rating >= rating && film.category.includes(categories);
    })

}
//!!!!!!!!!!!!!!!!!!!!!!!!(func)!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!(By name)!!!!!!!!!!!!!!!!!!!!!!!!!!
// let setting = 'skfjdfop odjoadso  dsksdlkjfksdj  kdkjfkajkasd dsldjo'
// console.log(setting.match(/s/gi));    

$('.search').addEventListener('click', () => {

    $('.wrapper').innerHTML = `<span class="loader"></span>`;

    const searchValue = $('#filmName').value;
    const filmRating = $('#filmRating').value;
    const filmCategory = $('#category').value

    const regexp = new RegExp(searchValue, "gi")
    const searchResult = findFilm(regexp, filmRating, filmCategory)


    setTimeout(() => {
        if (searchResult.length > 0) {
            searchResultsRender(searchResult)
            $('.res').textContent = searchResult.length

        }
        else {
            $('.wrapper').innerHTML = '<h1 class="text-white">Malumot topilmadi!</h1>'
            $('.res').textContent = searchResult.length
        }
    }, 1000)
})




function searchResultsRender(data = []) {
    $('.wrapper').innerHTML = "";
    data.forEach((el) => {
        const card = createElement('div', 'card shadow-lg', `
        
        <div class="card">
        <img src="${el.minImg}" alt="img">
        <div class="card-body">
        <h4 class="card-title">
            ${el.title}
        </h4>
        <ul class="list-unstyled"> 
            <li>
                <strong>Year:${el.year}</strong>
            </li>
            <li>
                <strong>Language:${el.language}</strong>
            </li>
            <li>
                <strong>Rating:${el.rating}</strong>
            </li>
            <li>
                <strong>Category:${el.category}</strong>
            </li>
            <li>
                <strong>Runtime:${el.time}</strong>
            </li>
        </ul>

        <div class="social d-flex">
            <a href="${el.link}" target="blank_" class="btn btn-danger m-2">Trailers</a>
            <button class="btn btn-info r_more m-2">Read more . . .</button>

            <button class="btn btn-dark m-2">Add Bookmark</button>
        </div>
        </div>
    </div>

`);
        $('.wrapper').appendChild(card)
    })


}
//!!!!!!!!!!!!!!!!!!!!!!!!(By name)!!!!!!!!!!!!!!!!!!!!!!!!!!

////////////////////////////////2-dars///////////////////////////////

////////////////////////////////3-dars///////////////////////////////



////////////////////////////////3-dars///////////////////////////////
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!(Categories)!!!!!!!!!!!!!!!!!!!!!!!!!
const dynamicCategory = () => {
    let category = [];

    Moovies.forEach((e) => {
        e.category.forEach((el) => {
            if (!category.includes(el)) {
                category.push(el);
            }
        });
    });

    category.sort();
    category.unshift("All");
    category.forEach((el) => {
        const option = createElement("option", "item-option", el);
        $("#category").appendChild(option);
    });
};

dynamicCategory();
 //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!(Categories)!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!(Find Read More!)!!!!!!!!!!!!!!!!!!!!
console.log(film);
