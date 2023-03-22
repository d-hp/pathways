<!-- # pathways -->

<!-- A web application that utilizes GTFS-RT to provide real-time arrival times for all NYC subway lines -->

<a name="readme-top"></a>

[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/d-hp/pathways">
    <img src="./public/pathways-logo-1.png" alt="Logo" width="325" height="auto">
  </a>
   <br /> 
   <br /> 
  <p align="center">
  A web application that utilizes GTFS-RT to provide real-time arrival times for all NYC subway lines
  <br />
   <br /> 
    <a href="https://github.com/d-hp/pathways"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/d-hp/pathways">View Demo</a>
    ·
    <a href="https://github.com/d-hp/pathways/issues">Report Bug</a>
    ·
    <a href="https://github.com/d-hp/pathways/issues">Request Feature</a>
  </p>
</div>

<br />

<!-- ABOUT THE PROJECT -->
<br />

## About The Project

<br />
  <div align="center">
    <img src="./public/pathways-readme-about.jpg" alt="Logo" width="fit" height="auto">
  </div>
<br />

pathways is a simple web application that allows New Yorkers access to real-time subway data to take control of their daily commute. This application retrieves data on each train in the NYC subway system through GTFS-RT (General Transit Feed Specification - Real Time).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

[![React][React.js]][React-url][![Redux][Redux]][Redux-url][![TailwindCSS][Tailwind]][Tailwind-url][![Node][Node.js]][Node-url][![Express][Express]][Express-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This project is still in development. If you'd like to check it out, please follow the instructions below.

<br />

#### STEP 1 — Clone the repository

```sh
git clone https://github.com/d-hp/pathways
```

<br />

#### STEP 2 — Start the application! The `npm start` script should be run in both `client` and `server` directories due to distinct `package.json` files for management of client-side & server-side dependencies, respectively.

```sh
npm start
```

<br />

#### STEP 4 — Navigate to localhost:3000 to try out the storytime application!

```sh
http://localhost:3000/
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [ ] Integrate a map of NYC subway lines and superimpose real-time dots representative of each train
- [ ] Devise a more efficient algorithm within backend logic for parsing real-time data feed
- [ ] Create testing suites to ensure functionality during development
  - [ ] Unit tests
  - [ ] Integration tests
  - [ ] End-to-end tests

See the [open issues](https://github.com/d-hp/pathways/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Show your support

Give a ⭐️ if this project helped you!

[forks-shield]: https://img.shields.io/github/forks/d-hp/pathways.svg?style=for-the-badge
[forks-url]: https://github.com/d-hp/pathways/network/members
[stars-shield]: https://img.shields.io/github/stars/d-hp/pathways.svg?style=for-the-badge
[stars-url]: https://github.com/d-hp/pathways/stargazers
[issues-shield]: https://img.shields.io/github/issues/d-hp/pathways.svg?style=for-the-badge
[issues-url]: https://github.com/d-hp/pathways/issues
[license-shield]: https://img.shields.io/github/license/d-hp/pathways.svg?style=for-the-badge
[license-url]: https://github.com/d-hp/pathways/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Tailwind]: https://img.shields.io/badge/TailwindCSS-DD0031?style=for-the-badge&logo=tailwindcss&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Node.js]: https://img.shields.io/badge/Node-4A4A55?style=for-the-badge&logo=nodedotjs&logoColor=FF3E00
[Node-url]: https://nodejs.org/en/
[Express]: https://img.shields.io/badge/Express-FF2D20?style=for-the-badge&logo=express&logoColor=FF3E00
[Express-url]: https://expressjs.com/
[Redux]: https://img.shields.io/badge/RTK-563D7C?style=for-the-badge&logo=redux&logoColor=white
[Redux-url]: https://redux.js.org/
