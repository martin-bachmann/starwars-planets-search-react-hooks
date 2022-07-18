import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import testData from './testData';
import userEvent from '@testing-library/user-event';

describe('Testes de ordenação', () => {
  it('Testa se a página é renderizada ordenada por nome', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(testData),
    });
    
    render(<App />);

    const planetsList = await screen.findAllByTestId('planet-name');

    expect(planetsList[0]).toHaveTextContent('Alderaan');
    expect(planetsList[1]).toHaveTextContent('Bespin');   
  });
  it('Testa se é possível ordenar a página de forma ascendente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(testData),
    });
    
    render(<App />);

    const columnInput = await screen.findByTestId('column-sort');
    const orderInput = screen.getByRole('radio', {name: /ascendente/i});

    userEvent.selectOptions(columnInput, 'surface_water');
    userEvent.click(orderInput);

    const orderButton = screen.getByRole('button', {name: /Ordenar/i})
    userEvent.click(orderButton);

    const planetsList = screen.getAllByTestId('planet-name');

    expect(planetsList[0]).toHaveTextContent('Bespin');
    expect(planetsList[1]).toHaveTextContent('Tatooine');   
  });
  it('Testa se é possível ordenar a página de forma descendente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(testData),
    });
    
    render(<App />);

    const columnInput = await screen.findByTestId('column-sort');
    const orderInput = screen.getByRole('radio', {name: /descendente/i});

    userEvent.selectOptions(columnInput, 'population');
    userEvent.click(orderInput);

    const orderButton = screen.getByRole('button', {name: /Ordenar/i})
    userEvent.click(orderButton);

    const planetsList = screen.getAllByTestId('planet-name');

    expect(planetsList[0]).toHaveTextContent('Coruscant');
    expect(planetsList[7]).toHaveTextContent('Yavin IV');   
  });
});