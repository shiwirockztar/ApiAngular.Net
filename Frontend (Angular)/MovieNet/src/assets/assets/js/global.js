"use strict";

/*
Add event on multiple elements
*/

const addEventOnElements = function (elements, eventType, callback) {
  for (const elem of elements) elem.addEventListener(eventType, callback);
};

/**
 * Toggle search box in mobile device || small screen
 */
const searchBox = document.querySelector("[search-box]");
const searchTogglers = document.querySelectorAll("[search-toggler]");

// cada vez que le damos click a la x o el icono de busqueda ("search-toggler")
// alternamos la vista de l barra de busqueda
addEventOnElements(searchTogglers, "click", function () {
  searchBox.classList.toggle("active");
});

const getMovieDetail = function (movieId) {
  window.localStorage.setItem("movieId", String(movieId));
};
