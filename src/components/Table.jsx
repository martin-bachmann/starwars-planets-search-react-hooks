import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PlanetsContext from '../context/PlanetsContext';
import { TABLE_HEADER } from '../data';

function Table() {
  const { isFetching, setTable } = useContext(PlanetsContext);

  return ( // Repensar filtros presentes na tabela!!!
    <div>
      { !isFetching && (
        <table>
          <thead>
            <tr>
              {TABLE_HEADER.map((key) => <th key={ uuidv4() }>{key}</th>)}
            </tr>
          </thead>
          <tbody>
            { setTable().map((planet) => (
              <tr key={ planet.name }>
                { Object.values(planet).map((value) => (
                  <td
                    data-testid={ value === planet.name && 'planet-name' }
                    key={ uuidv4() }
                  >
                    {value}
                  </td>)) }
              </tr>))}
          </tbody>
        </table>)}
    </div>
  );
}

export default Table;
