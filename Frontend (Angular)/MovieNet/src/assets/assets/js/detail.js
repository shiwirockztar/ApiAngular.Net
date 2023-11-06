"use strict";

import { sidebar } from "./sidebar.js";
import { imageBaseUrl, api_key, fetchDataFromServer } from "./api.js";
import { createMovieCard } from "./movie-card.js";

sidebar();

const movieId = window.localStorage.getItem("movieId");
const pageContent = document.querySelector("[page-content]");

const getGenres = function (genreList) {
  const newGenreList = [];
  for (const { name } of genreList) newGenreList.push(name);
  return newGenreList.join(", ");
};

const getCasts = function (castList) {
  const newCastList = [];
  // for (const { name } of castList) newCastList.push(name);
  for (let i = 0, len = castList.length; i < len && i > 10; i++) {
    const { name } = castList[i];
    newCastList.push(name);
  }
  return newCastList.join(", ");
};

const getDirector = function (crewList) {
  const directors = crewList.filter(({ job }) => job == "Director");
  const directorList = [];
  for (const { name } of directors) directorList.push(name);
  return directorList.join(", ");
};

// Retornamos un array de videos
const filterVideos = function (videoList) {
  return videoList.filter(
    ({ type, site }) =>
      (type == "Trailer" || type == "Teaser") && site == "YouTube"
  );
};

fetchDataFromServer(
  `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&append_to_response=casts,videos,images,releases,translations`,
  function (movie) {
    const {
      backdrop_path,
      poster_path,
      title,
      vote_average,
      runtime,
      releases: {
        countries: [{ certification }],
      },
      release_date,
      casts: { cast, crew },
      videos: { results: videos },
      genres,
      overview,
      id,
    } = movie;

    document.title = `${title} - Tvflix `;

    const movieDetail = document.createElement("div");
    movieDetail.classList.add("movie-detail");

    movieDetail.innerHTML = `
      <div
        class="backdrop-image"
        style="background-image: url('${imageBaseUrl}${"w1280" || "original"}${
      backdrop_path || poster_path
    }')"
      ></div>
      <figure class="poster-box movie-poster">
        <img
          src="${imageBaseUrl}w342${poster_path}"
          alt="${title}"
          class="img-cover"
        />
      </figure>

      <div class="detail-box">
        <div class="detail-content">
          <h1 class="heading">${title}</h1>
          <div class="meta-list">
            <div class="meta-item">
              <img
                src="assets/images/star.png"
                alt="rating"
                height="20"
                width="20"
              />
              <span class="span">${vote_average.toFixed(1)}</span>
            </div>
            <div class="separator"></div>
            <div class="meta-item">${runtime} min</div>
            <div class="separator"></div>
            <div class="meta-item">${release_date.split("-")[0]}</div>
            <div class="meta-item cad-bage">${certification}</div>
          </div>

          <p class="genre">${getGenres(genres)}</p>
          <p class="overview">
            ${overview}
          </p>

          <ul class="detail-list">
            <div class="list-item">
              <p class="list-name">Starring</p>

              <p>
                ${getCasts(cast)}
              </p>
            </div>

            <div class="list-item">
              <p class="list-name">Directed By</p>

              <p>${getDirector(crew)}</p>
            </div>
          </ul>
        </div>

        <div class="title-wrapper">
          <h3 class="title-large">Trailers and Clips</h3>
        </div>

        <div class="slider-list">
          <div class="slider-inner">

          </div>
        </div>
      </div>
    `;

    for (const { key, name } of filterVideos(videos)) {
      console.log("ejecutando for : ");

      console.log("key : ", key);
      console.log("name : ", name);

      const videoCard = document.createElement("div");
      videoCard.classList.add("video-card");

      videoCard.innerHTML = `
      <iframe
      width="500"
      height="294"
      src="https://www.youtube.com/embed/${key}?&theme=dark&color=white&rel=0"
      frameborder="0"
      allowfullscreen="1"
      title="${name}"
      class="img-cover"
      loading="lazy"> 
      </iframe>
      `;

      movieDetail.querySelector(".slider-inner").appendChild(videoCard);
    }

    pageContent.appendChild(movieDetail);

    fetchDataFromServer(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${api_key}`,
      addSuggestedMovies
    );
  }
);

/**
 * createMovieList
 *
 * De los datos obtenidos en el fetch escojemos su atributo results que es una lista de peliculas (20) en forma de array
 * y se lo asignamos a movieList, de tal forma que movieList es un array de 20 peliculas como objeto
 */
const addSuggestedMovies = function ({ results: movieList }, title) {
  const movieListElem = document.createElement("section");
  movieListElem.classList.add("movie-list");
  movieListElem.ariaLabel = `You May Also Like`;

  movieListElem.innerHTML = `
       <div class="title-wrapper">
            <h3 class="title-large">You May Also Like</h3>
          </div>
          <div class="slider-list">
            <div class="slider-inner">  </div>
          </div>
    `;

  for (const movie of movieList) {
    const movieCard = createMovieCard(movie);
    movieListElem.querySelector(".slider-inner").appendChild(movieCard);
  }

  pageContent.appendChild(movieListElem);
};
