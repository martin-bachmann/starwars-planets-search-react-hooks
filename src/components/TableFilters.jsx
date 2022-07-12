import React from 'react';
import NumberFilter from './NumberFilter';
import TableOrderer from './TableOrderer';
import TextFilter from './TextFilter';

function TableFilters() {
  return (
    <div>
      <h2>TableFilters</h2>
      <TextFilter />
      <NumberFilter />
      <TableOrderer />
    </div>
  );
}

export default TableFilters;
