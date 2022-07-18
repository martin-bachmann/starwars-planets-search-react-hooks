async function fetchPlanets() {
  const fetchURL = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const response = await fetch(fetchURL);
  const planetsData = await response.json();
  const filteredData = planetsData.results.map((planet) => {
    const planetDetails = Object.entries(planet);
    return planetDetails.reduce((acc, planetParam) => (
      planetParam[0] !== 'residents'
        ? ({ ...acc, [planetParam[0]]: planetParam[1] })
        : acc), {});
  });
  return filteredData;
}

export default fetchPlanets;
