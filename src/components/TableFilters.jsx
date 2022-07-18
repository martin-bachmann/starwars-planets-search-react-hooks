import React from 'react';
import NumberFilter from './NumberFilter';
import TableOrderer from './TableOrderer';
import TextFilter from './TextFilter';

function TableFilters() {
  return (
    <div>
      <TextFilter />
      <NumberFilter />
      <TableOrderer />
    </div>
  );
}

export default TableFilters;
