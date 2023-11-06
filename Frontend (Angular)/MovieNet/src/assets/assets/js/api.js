"use strict";

const api_key = "192e0b9821564f26f52949758ea3c473";
const imageBaseUrl = "https://image.tmdb.org/t/p/";

const fetchDataFromServer = function (url, callback, optionalParam) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => callback(data, optionalParam));
};

export { imageBaseUrl, api_key, fetchDataFromServer };
