import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';

describe('Testes de renderização', () => {
  it('Testa a renderização da página', () => {
    render(<App />);
    const titleElement = screen.getByText(/Star Wars Planets Search/i);
    const textInput = screen.getByRole('textbox');
    const numericInput = screen.getByRole('spinbutton')

    expect(titleElement).toBeInTheDocument();
    expect(textInput).toBeInTheDocument();
    expect(numericInput).toBeInTheDocument();
  });
  it('Testa o fetch dos planetas e sua renderização na tela', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(testData),
    });
    
    render(<App />);

    const headerElement = await screen.findByRole('columnheader', {name: /rotation/});
    const planetElement = screen.getByRole('cell', {name: /Tatooine/});

    expect(headerElement).toBeInTheDocument();
    expect(planetElement).toBeInTheDocument();
  });
});

describe('Testes de filtragem', () => {
  it('Testa o funcionamento do input de texto', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(testData),
    });
    
    render(<App />);

    const textInput = await screen.findByRole('textbox');
    userEvent.type(textInput, 'oo');
    
    const filteredResults = screen.getAllByRole('row');
    expect(filteredResults).toHaveLength(3);
  });
  it('Testa o input de texto no modo maior que', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(testData),
    });
    
    render(<App />);

    const numericInput = await screen.findByRole('spinbutton');
    const columnInput = screen.getByRole('combobox', {name: /column/});
    const comparisonInput = screen.getByRole('combobox', {name: /comparison/})

    userEvent.clear(numericInput);
    userEvent.type(numericInput, '1000');
    userEvent.selectOptions(columnInput, 'orbital_period');
    userEvent.selectOptions(comparisonInput, 'maior que');

    const filterButton = screen.getByRole('button', {name: /Filtrar/})
    userEvent.click(filterButton);

    const filteredResults = screen.getAllByRole('row');
    expect(filteredResults).toHaveLength(3);
  });
  it('Testa o input de texto no modo menor que', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(testData),
    });
    
    render(<App />);

    const numericInput = await screen.findByRole('spinbutton');
    const columnInput = screen.getByRole('combobox', {name: /column/});
    const comparisonInput = screen.getByRole('combobox', {name: /comparison/})

    userEvent.clear(numericInput);
    userEvent.type(numericInput, '5000');
    userEvent.selectOptions(columnInput, 'diameter');
    userEvent.selectOptions(comparisonInput, 'menor que');

    const filterButton = screen.getByRole('button', {name: /Filtrar/})
    userEvent.click(filterButton);

    const filteredResults = screen.getAllByRole('row');
    expect(filteredResults).toHaveLength(2);
  });
  it('Testa o input de texto no modo igual a', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(testData),
    });
    
    render(<App />);

    const numericInput = await screen.findByRole('spinbutton');
    const columnInput = screen.getByRole('combobox', {name: /column/});
    const comparisonInput = screen.getByRole('combobox', {name: /comparison/})

    userEvent.clear(numericInput);
    userEvent.type(numericInput, '1');
    userEvent.selectOptions(columnInput, 'surface_water');
    userEvent.selectOptions(comparisonInput, 'igual a');

    const filterButton = screen.getByRole('button', {name: /Filtrar/})
    userEvent.click(filterButton);

    const filteredResults = screen.getAllByRole('row');
    expect(filteredResults).toHaveLength(2);
  });
  it('Testa a página com diversos inputs', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(testData),
    });
    
    render(<App />);

    // Adiciona o valor de texto
    const textInput = await screen.findByRole('textbox');
    userEvent.type(textInput, 't');
    
    expect(screen.getAllByRole('row')).toHaveLength(4);

    // Adiciona o primeiro filtro numérico
    const numericInput = screen.getByRole('spinbutton');
    const columnInput = screen.getByRole('combobox', {name: /column/});
    const comparisonInput = screen.getByRole('combobox', {name: /comparison/})

    userEvent.clear(numericInput);
    userEvent.type(numericInput, '1000');
    userEvent.selectOptions(columnInput, 'population');
    userEvent.selectOptions(comparisonInput, 'maior que');

    const filterButton = screen.getByRole('button', {name: /Filtrar/})
    userEvent.click(filterButton);

    expect(screen.getAllByRole('row')).toHaveLength(3);

    // Adiciona o segundo filtro numérico
    userEvent.clear(numericInput);
    userEvent.type(numericInput, '1');
    userEvent.selectOptions(columnInput, 'surface_water');
    userEvent.selectOptions(comparisonInput, 'igual a');

    userEvent.click(filterButton);

    expect(screen.getAllByRole('row')).toHaveLength(2);

  });
  it('Testa se a página aceita inputs repetidos', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(testData),
    });
    
    render(<App />);

    const numericInput = await screen.findByRole('spinbutton');
    const columnInput = screen.getByRole('combobox', {name: /column/});
    const comparisonInput = screen.getByRole('combobox', {name: /comparison/})

    userEvent.clear(numericInput);
    userEvent.type(numericInput, '1');
    userEvent.selectOptions(columnInput, 'surface_water');
    userEvent.selectOptions(comparisonInput, 'igual a');

    const filterButton = screen.getByRole('button', {name: /Filtrar/})
    userEvent.click(filterButton);

    const columnFilter = screen.queryByRole('option', {name: /surface_water/});
    expect(columnFilter).not.toBeInTheDocument();
  });
  it('Testa se é possível remover um filtro individualmente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(testData),
    });
    
    render(<App />);

    const numericInput = await screen.findByRole('spinbutton');
    const columnInput = screen.getByRole('combobox', {name: /column/});
    const comparisonInput = screen.getByRole('combobox', {name: /comparison/})

    userEvent.clear(numericInput);
    userEvent.type(numericInput, '1');
    userEvent.selectOptions(columnInput, 'surface_water');
    userEvent.selectOptions(comparisonInput, 'igual a');

    const filterButton = screen.getByRole('button', {name: /Filtrar/})
    userEvent.click(filterButton);

    expect(screen.getByText('surface_water | igual a | 1')).toBeInTheDocument();

    const filterRemover = screen.getByRole('button', {name: 'x'});
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
    const columnInput = screen.getByRole('combobox', {name: /column/});
    const comparisonInput = screen.getByRole('combobox', {name: /comparison/})

    userEvent.clear(numericInput);
    userEvent.type(numericInput, '1000');
    userEvent.selectOptions(columnInput, 'population');
    userEvent.selectOptions(comparisonInput, 'maior que');

    const filterButton = screen.getByRole('button', {name: /Filtrar/})
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

describe('Testes de ordenação', () => {
  it('Testa se é possível ordenar a página de forma ascendente', () => {

  });
  it('Testa se é possível ordenar a página de forma descendente', () => {

  });
});