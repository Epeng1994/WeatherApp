import { render, screen } from '@testing-library/react';
import App from './App';


describe('General App Tests',()=>{
  test('App starts up',()=>{
    render(<App/>)
    const text = screen.getByText('What\'s the weather with you?')
    expect(text).toBeInTheDocument
  })
})
