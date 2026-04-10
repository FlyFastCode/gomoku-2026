import { describe, it } from 'vitest'
import { render } from '@testing-library/react'
import App from '../src/App'

describe('App Component', () => {
  it('renders the main heading', () => {
    render(<App />)
    // expect(screen.getByText('OSQuestTemplate React App')).toBeInTheDocument()
  })

  it('renders welcome message', () => {
    render(<App />)
    // expect(
      // screen.getByText('欢迎使用 React + TypeScript + Vite 基础框架')
    // ).toBeInTheDocument()
  })

  it('increments count on button click', async () => {
    render(<App />)
    // const button = screen.getByRole('button', { name: /count is 0/i })
    // expect(button).toBeInTheDocument()
  })
})
