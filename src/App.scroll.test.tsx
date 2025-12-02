import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

function renderHome() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  )
}

describe('Home floating Pages menu', () => {
  it('toggles menu on button click', async () => {
    renderHome()

    const menuButton = screen.getByRole('button', { name: /Pages Menu/i })
    expect(menuButton).toBeInTheDocument()

    // Menu hidden initially
    expect(screen.queryByRole('link', { name: /News/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /Chat/i })).not.toBeInTheDocument()

    // Click to open menu
    fireEvent.click(menuButton)
    expect(screen.getByRole('link', { name: /News/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Chat/i })).toBeInTheDocument()

    // Click again to close
    fireEvent.click(menuButton)
    expect(screen.queryByRole('link', { name: /News/i })).not.toBeInTheDocument()
  })

  it('closes menu when a link is clicked', async () => {
    renderHome()

    const menuButton = screen.getByRole('button', { name: /Pages Menu/i })
    fireEvent.click(menuButton)

    const newsLink = screen.getByRole('link', { name: /News/i })
    fireEvent.click(newsLink)

    // Menu should close after clicking link
    expect(screen.queryByRole('link', { name: /Chat/i })).not.toBeInTheDocument()
  })
})
