import { describe, it, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Chat from './Chat'
import App from '../App'

vi.mock('../lib/openrouter', () => ({
  streamOpenRouterChat: vi.fn(async (_messages: unknown, opts: { onChunk?: (t: string) => void } | undefined) => {
    // simulate streaming
    opts?.onChunk?.('Hello')
    opts?.onChunk?.('!')
    return 'Hello!'
  }),
}))

function renderWithRoutes(initialPath = '/chat') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('Chat page', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('shows back button and navigates to home', async () => {
    renderWithRoutes('/chat')
    const back = await screen.findByRole('button', { name: /back to home/i })
    fireEvent.click(back)
    // Selected Projects exists on home
    await screen.findByText(/Selected Projects/i)
  })

  it('sends a message and renders streamed assistant reply', async () => {
    renderWithRoutes('/chat')

    const input = screen.getByPlaceholderText(/type your message/i)
    fireEvent.change(input, { target: { value: 'Hi' } })

    const send = screen.getByRole('button', { name: /send/i })
    fireEvent.click(send)

    // User message appears
    await screen.findByText('Hi')

    // Assistant streamed content appears
    await screen.findByText('Hello!')
  })
})
