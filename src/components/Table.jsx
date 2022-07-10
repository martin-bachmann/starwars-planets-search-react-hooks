import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { data, isFetching } = useContext(PlanetsContext);

  return ( // Ver key creator
    <div>
      <h1>Table</h1>
      { !isFetching && (
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => <th key={ key }>{key}</th>)}
            </tr>
          </thead>
          <tbody>
            { data.map((planet) => (
              <tr key={ planet.name }>
                { Object.values(planet).map((value) => <td key={ value }>{value}</td>) }
              </tr>))}
          </tbody>
        </table>)}
    </div>
  );
}

export default Table;
