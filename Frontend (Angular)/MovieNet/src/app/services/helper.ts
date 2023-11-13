// Service api rout from Visual studio code 2022
export const baseNetUrl = 'https://localhost:7275';
// Service api rout from executable
// export const baseNetUrl = 'https://localhost:5001';
export const api_key = '192e0b9821564f26f52949758ea3c473';
export const language = 'language=es-MX';
export const imageBaseUrl = 'https://image.tmdb.org/t/p/';

// Popular
export const ApiMovieDbUrl = 'https://api.themoviedb.org/3/movie/popular?';
// Rating
export const ApiMovieDbPopularUrl =
  'https://api.themoviedb.org/3/movie/top_rated?';

// Configuración de la API de Visual Studio Code 2022
export const apiConfigVSCode = {
  baseUrl: 'https://localhost:7275',
  apiKey: '192e0b9821564f26f52949758ea3c473',
  language: 'es-MX',
  imageBaseUrl: 'https://image.tmdb.org/t/p/',
};

// Configuración de la API para ejecutables
export const apiConfigExecutable = {
  baseUrl: 'https://localhost:5001',
  apiKey: '192e0b9821564f26f52949758ea3c473',
  language: 'es-MX',
  imageBaseUrl: 'https://image.tmdb.org/t/p/',
};

// Rutas de la API de themoviedb.org
export const apiEndpoints = {
  popularMovies: 'https://api.themoviedb.org/3/movie/popular?',
  topRatedMovies: 'https://api.themoviedb.org/3/movie/top_rated?',
};
