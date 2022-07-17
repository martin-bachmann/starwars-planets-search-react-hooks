import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

// Declarar aqui o initial state

function Provider({ children }) {
  const [data, setData] = useState();
  const [isFetching, setIsFetching] = useState(true);
  const [filter, setFilter] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [],
    order: { column: 'name', sort: 'ASC' },
  });

  const fetchData = async () => { // Podia organizar melhor esse fetch e o useEffect abaixo.
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

  const changeFilterByText = ({ target }) => { // Cogitar se vale a pena mudar para ser apenas uma função
    const { value } = target;
    setFilter({ ...filter, filterByName: { name: value } });
  };

  const changeFilterByNumber = (newFilter) => {
    setFilter({
      ...filter, filterByNumericValues: [...filter.filterByNumericValues, newFilter],
    });
  };

  const changeOrder = (newOrder) => {
    setFilter({
      ...filter, order: newOrder,
    });
  };

  const testNumericFilter = (filterEl, planet) => {
    const { column, comparison, value } = filterEl;
    if (comparison === 'maior que') return Number(planet[column]) > value;
    if (comparison === 'menor que') return Number(planet[column]) < value;
    return planet[column] === value;
  };

  const filterTable = (planet) => { // Pensar como seria essa lógica com um useEffect
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

  const orderTable = (planets) => {
    const { order: { column, sort } } = filter;
    const aFirst = -1; // Mudar para 1 e NOT_CHANGE
    const bFirst = 1;
    if (column === 'name') { // Tentar retirar esse if. Tentar juntar lógica ASC e DESC
      return planets.sort((a, b) => (a.name > b.name ? bFirst : aFirst));
    }
    if (sort === 'DESC') {
      return planets.sort((b, a) => {
        if (a[column] === 'unknown') return aFirst;
        if (b[column] === 'unknown') return bFirst;
        return (a[column]) - (b[column]);
      });
    }
    return planets.sort((a, b) => {
      if (a[column] === 'unknown') return bFirst;
      if (b[column] === 'unknown') return aFirst;
      return (a[column]) - (b[column]);
    });
  };

  useEffect(() => fetchData(), []); // Será que vale a pena fazer um useEffect com filter?

  const context = {
    data,
    filter,
    isFetching,
    changeFilterByText,
    changeFilterByNumber,
    filterTable,
    removeFilter,
    removeAllFilters,
    changeOrder,
    orderTable,
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
