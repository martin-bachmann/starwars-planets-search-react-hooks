import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import testData from './testData';
import userEvent from '@testing-library/user-event';

describe('Testes de remoção de filtros', () => {
  it('Testa se é possível remover um filtro individualmente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(testData),
    });
    
    render(<App />);

    const numericInput = await screen.findByRole('spinbutton');
    const columnInput = screen.getByRole('combobox', {name: /coluna/i});
    const comparisonInput = screen.getByRole('combobox', {name: /operador/i})

    userEvent.clear(numericInput);
    userEvent.type(numericInput, '1');
    userEvent.selectOptions(columnInput, 'surface_water');
    userEvent.selectOptions(comparisonInput, 'igual a');

    const filterButton = screen.getByRole('button', {name: /Filtrar/i})
    userEvent.click(filterButton);

    expect(screen.getByText('surface_water | igual a | 1')).toBeInTheDocument();

    const filterRemover = screen.getByAltText(/Excluir filtro/i);
    userEvent.click(filterRemover);

    expect(screen.queryByText('surface_water | igual a | 1')).not.toBeInTheDocument();
  });
  it('Testa se existe um botão que remove todos os filtros', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(testData),
    });
    
    render(<App />);

    // Adiciona o primeiro filtro numérico
    const numericInput = await screen.findByRole('spinbutton');
    const columnInput = screen.getByRole('combobox', {name: /coluna/i});
    const comparisonInput = screen.getByRole('combobox', {name: /operador/i})

    userEvent.clear(numericInput);
    userEvent.type(numericInput, '1000');
    userEvent.selectOptions(columnInput, 'population');
    userEvent.selectOptions(comparisonInput, 'maior que');

    const filterButton = screen.getByRole('button', {name: /Filtrar/i})
    userEvent.click(filterButton);

    // Adiciona o segundo filtro numérico
    userEvent.clear(numericInput);
    userEvent.type(numericInput, '1');
    userEvent.selectOptions(columnInput, 'surface_water');
    userEvent.selectOptions(comparisonInput, 'igual a');

    userEvent.click(filterButton);

    expect(screen.getAllByRole('row')).toHaveLength(2);

    expect(screen.getByText(/population | maior que | 1000/)).toBeInTheDocument();
    expect(screen.getByText('surface_water | igual a | 1')).toBeInTheDocument();

    // Remove os filtros
    const removeButton = screen.getByRole('button', {name: /Remover/});
    userEvent.click(removeButton);

    expect(screen.queryByText(/population | maior que | 1000/)).not.toBeInTheDocument();
    expect(screen.queryByText('surface_water | igual a | 1')).not.toBeInTheDocument();
  });
});