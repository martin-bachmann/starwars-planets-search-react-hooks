import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function Provider({ children }) {
  const [data, setData] = useState();
  const [isFetching, setIsFetching] = useState(true);

  const fetchData = async () => {
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
    console.log(filteredData);
    setData(filteredData); // Verificar fetch e catch
    setIsFetching(false);
  };

  useEffect(() => fetchData(), []);

  const context = { data, isFetching };
  return (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Provider;
