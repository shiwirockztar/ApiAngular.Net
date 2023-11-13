<p align="center">
  <img src="./assets/home.PNG " width="600" />
</p>
<p align="center">
  <img src="./assets/search.PNG" width="600" />
</p>
<p align="center">
  <img src="./assets/login.PNG" width="600" />
</p>
<p align="center">
  <img src="./assets/sigin.PNG" width="600" />
</p>
<p align="center">
  <img src="./assets/sigin2.PNG" width="600" />
</p>
<h1 align="center"> Angular</h1>

<p align="center">
  <a title="Twitter: Jose_leonardo" href="https://www.linkedin.com/in/jose-leonardo-poveda/">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white">
  </a>  
  <a title="Github: Sponsors" href="https://github.com/shiwirockztar">
    <img src="https://img.shields.io/twitter/url?color=032f62&label=Github%20%40Shiwirockztar&logo=github&logoColor=FFFFFF&style=flat-square&url=https%3A%2F%2Fgithub.com%2Fsponsors%2FShiwirockztar">
  </a>
  <br />
  <br />
</p>

## 🔖 Description

- Implement an authentication system that allows users to register, log in and log out.
  log in and log out.
- Create a home page that displays a list of popular movies.
- Allow users to search for movies by title.
- Display details of a selected movie when clicked on.
- Allow users to save movies to their profile when authenticated.\*\*
- Create a page in the user's profile where movies saved by the user are displayed.
  user.
- Use routing to navigate between pages.
- Implement an Angular service to connect to the .NET Core backend.

MovieNet is a web application developed in Angular that provides users with an interactive experience to discover and explore information about movies. The application uses the Movie API "ApiRestMovies" from folder Backend (.Net Core) to get up-to-date data on popular movies, upcoming releases and movie-specific details.

Official Documentation: [Angular | Front](https://docs.angular.lat/docs)

## 📌 Methodologies and Guidelines

List of methodologies and tools used in this project for compliance with Quality Assurance Code (QAC)

- ESTlint, tool for identifying and reporting on patterns found in ECMAScript/JavaScript code. \
  [NPM ESLint](https://www.npmjs.com/package/eslint) \
  [NPM ESLint | Airbnb](https://www.npmjs.com/package/eslint-config-airbnb)

## ✅ Prerequisites

In order to work with this project, your local environment must have at least the following versions:

- Nodejs Version: 18.18.0
- NPM Version: 9.8.1
- Angular Cli 16.2.3

## 📐 How to work with this project

You have to do the following steps to be able to work with this project.

### 1️⃣ Install Nodejs Dependencies

To work with this project locally it is necessary to install the NPM dependencies.

```bash
# Install npm dependencies
$npm i
```

### 2️⃣ Run

To run the frontend application, it is essential to ensure that the path used for service consumption, defined in the helper.ts file (global variable configuration), is synchronized with the path selected by the backend service we are deploying.

Select -> MovieNet -> src -> app src -> services -> helper.ts.

```
  // Service api rout from Visual studio code 2022
  export const baseNetUrl = 'https://localhost:7275';

  // Service api rout from executable
  // export const baseNetUrl = 'https://localhost:5001';

  export const api_key = '192e0b9821564f26f52949758ea3c473';
  export const language = 'language=es-MX';
  export const imageBaseUrl = 'https://image.tmdb.org/t/p/';
```

#### To run need:

```bash
# Run Server for start project in mode developer
$ng serve -o
```

# Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

# Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

# Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## 📂 Code scaffolding

```any
/
├── MovieNet 📁             # Frontend aplication folder.
|   └── src 🌐              # Main app client.
|       ├── assets          # Project image resources.
|       └── app             # Source code.
|           ├── components  # components.
|           ├── pages       # pages.
|           └── services    # services.
|               └── helper  # global variables file.
|
├── assets 🌈               # Images sources.
├── Readme  📝              # Project information and instructions.
└── ...
```

## ⛽️ Review and Update Dependences

For review and update all npm dependences of this project you need install in global npm package "npm-check-updates" npm module.

```bash
# Install and Run
$npm i -g npm-check-updates
$ncu
```

## Happy Code

Created with JavaScript, lot of ❤️ and a few ☕️

## This README.md file has been written keeping in mind

- [GitHub Markdown](https://guides.github.com/features/mastering-markdown/)
- [Emoji Cheat Sheet](https://www.webfx.com/tools/emoji-cheat-sheet/)
