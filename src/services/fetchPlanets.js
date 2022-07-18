const FILM_URL = [
  'https://swapi-trybe.herokuapp.com/api/films/1/',
  'https://swapi-trybe.herokuapp.com/api/films/2/',
  'https://swapi-trybe.herokuapp.com/api/films/3/',
  'https://swapi-trybe.herokuapp.com/api/films/4/',
  'https://swapi-trybe.herokuapp.com/api/films/5/',
  'https://swapi-trybe.herokuapp.com/api/films/6/',
];

const FILM_NAME = [
  'Star Wars: A New Hope',
  'Star Wars: The Empire Strikes Back',
  'Star Wars: Return of the Jedi',
  'Star Wars: The Phantom Menace',
  'Star Wars: Attack of the Clones',
  'Star Wars: Revenge of the Sith',
];

const getFilms = (film) => {
  switch (film) {
  case FILM_URL[0]:
    return FILM_NAME[0];
  case FILM_URL[1]:
    return FILM_NAME[1];
  case FILM_URL[2]:
    return FILM_NAME[2];
  case FILM_URL[3]:
    return FILM_NAME[3];
  case FILM_URL[4]:
    return FILM_NAME[4];
  default:
    return FILM_NAME[5];
  }
};

async function fetchPlanets() {
  const fetchURL = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const response = await fetch(fetchURL);
  const planetsData = await response.json();
  const filteredData = planetsData.results.map((planet) => {
    const planetDetails = Object.entries(planet);
    return planetDetails.reduce((acc, planetParam) => {
      if (
        planetParam[0] === 'residents'
      || planetParam[0] === 'created'
      || planetParam[0] === 'edited'
      || planetParam[0] === 'url'
      ) return acc;
      if (planetParam[0] === 'films') {
        const filmsData = planetParam[1].map((film) => getFilms(film));
        return { ...acc, [planetParam[0]]: filmsData };
      }
      return { ...acc, [planetParam[0]]: planetParam[1] };
    }, {});
  });
  return filteredData;
}

export default fetchPlanets;
