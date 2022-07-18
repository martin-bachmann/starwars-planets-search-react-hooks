import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/fetchPlanets';

const INITIAL_STATE = {
  filterByName: { name: '' },
  filterByNumericValues: [],
  order: { column: 'name', sort: 'ASC' },
};

const CHANGE = -1;
const NO_CHANGE = 1;

function Provider({ children }) {
  const [data, setData] = useState();
  const [isFetching, setIsFetching] = useState(true);
  const [filter, setFilter] = useState(INITIAL_STATE);

  useEffect(() => {
    const fetchPlanetsData = async () => {
      const planets = await fetchPlanets();
      setData(planets);
      setIsFetching(false);
    };
    fetchPlanetsData();
  }, []);

  const changeFilter = (type, value) => {
    setFilter({ ...filter, [type]: value });
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

  const orderTable = (planets) => {
    const { order: { column, sort } } = filter;
    if (column === 'name') {
      return planets.sort((a, b) => (a.name > b.name ? NO_CHANGE : CHANGE));
    }
    if (sort === 'DESC') {
      return planets.sort((planetB, planetA) => {
        if (planetA[column] === 'unknown') return CHANGE;
        if (planetB[column] === 'unknown') return NO_CHANGE;
        return (planetA[column]) - (planetB[column]);
      });
    }
    return planets.sort((planetA, planetB) => {
      if (planetA[column] === 'unknown') return NO_CHANGE;
      if (planetB[column] === 'unknown') return CHANGE;
      return (planetA[column]) - (planetB[column]);
    });
  };

  const testNumericFilter = (filterEl, planet) => {
    const { column, comparison, value } = filterEl;
    if (comparison === 'maior que') return Number(planet[column]) > value;
    if (comparison === 'menor que') return Number(planet[column]) < value;
    return planet[column] === value;
  };

  const filterTable = (planets) => planets.filter((planet) => {
    const { filterByNumericValues, filterByName } = filter;
    if (!filterByNumericValues.length) return planet.name.includes(filterByName.name);
    return (
      planet.name.includes(filterByName.name)
        && filterByNumericValues.every((filterEl) => testNumericFilter(filterEl, planet))
    );
  });

  const setTable = () => orderTable(filterTable(data));

  const context = {
    data,
    filter,
    isFetching,
    changeFilter,
    removeFilter,
    removeAllFilters,
    setTable,
  };

  return (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
