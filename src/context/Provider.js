import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function Provider({ children }) {
  const [data, setData] = useState();
  const [isFetching, setIsFetching] = useState(true);
  const [filter, setFilter] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [],
  });

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
    setData(filteredData); // Verificar fetch e catch
    setIsFetching(false);
  };

  const changeFilterByText = ({ target }) => {
    const { value } = target;
    setFilter({ ...filter, filterByName: { name: value } });
  };

  const changeFilterByNumber = (newFilter) => {
    setFilter({
      ...filter, filterByNumericValues: [...filter.filterByNumericValues, newFilter],
    });
  };

  const testNumericFilter = (filterEl, planet) => {
    const { column, comparison, value } = filterEl;
    if (comparison === 'maior que') return Number(planet[column]) > value;
    if (comparison === 'menor que') return Number(planet[column]) < value;
    return planet[column] === value;
  };

  const filterTable = (planet) => {
    const { name } = planet;
    const { filterByNumericValues, filterByName } = filter;
    if (!filterByNumericValues.length) return name.includes(filterByName.name);
    return (
      name.includes(filterByName.name)
      && filterByNumericValues.every((filterEl) => testNumericFilter(filterEl, planet))
    );
  };

  const removeFilter = (column) => {
    setFilter({
      ...filter,
      filterByNumericValues: filter.filterByNumericValues
        .filter((filterEl) => filterEl.column !== column),
    });
  };

  const removeAllFilters = () => {
    setFilter({
      ...filter, filterByNumericValues: [],
    });
  };

  useEffect(() => fetchData(), []);

  const context = {
    data,
    filter,
    isFetching,
    changeFilterByText,
    changeFilterByNumber,
    filterTable,
    removeFilter,
    removeAllFilters,
  };

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
