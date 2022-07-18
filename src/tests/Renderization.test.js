import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import testData from './testData';

describe('Testes de renderização', () => { // Organizar melhor os testes e criar arquivo próprio mara o mock
  it('Testa a renderização da página', () => {
    render(<App />);
    const titleElement = screen.getByText(/Planets Search/i);
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
 
    const headerElement = await screen.findByRole('columnheader', {name: /rotation/i});
    const planetElement = screen.getByRole('cell', {name: /Tatooine/i});

    expect(headerElement).toBeInTheDocument();
    expect(planetElement).toBeInTheDocument();
  });
});