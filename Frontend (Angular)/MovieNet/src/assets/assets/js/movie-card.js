"use strict"; // ♠️

import { imageBaseUrl } from "./api.js";

export function createMovieCard(movie) {
  const { poster_path, title, vote_average, release_date, id } = movie;

  const card = document.createElement("div");
  card.classList.add("movie-card");

  card.innerHTML = `
   <figure class="poster-box card-banner">
                <img
                  src="${imageBaseUrl}w342${poster_path}"
                  alt="${title}"
                 "
                  class="img-cover"
                  loading="lazy">
              </figure>
              <h4 class="${title}"</h4>
              <div class="meta-list">
                <div class="meta-item">
                  <img
                    src="./assets/images/star.png"
                    loading="lazy"
                    alt="rating"
                  />
                  <span class="span">${vote_average.toFixed(1)}</span>
                </div>
                <div class="card-bage">"${release_date.split("-")[0]}</div>
              </div>
              <a
              onclick="getMovieDetail(${id})"
                href="detail.html"
                class="card-btn"
                title="${title}"
              ></a>`;

  return card;
}