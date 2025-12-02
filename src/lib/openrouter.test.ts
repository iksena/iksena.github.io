import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { streamOpenRouterChat, type ChatMessage } from './openrouter'

describe('openrouter', () => {
  beforeEach(() => {
    // Mock environment variables
    vi.stubEnv('VITE_OPENROUTER_API_KEY', 'test-api-key')
    vi.stubEnv('VITE_OPENROUTER_MODEL', 'x-ai/grok-4.1-fast:free')
    vi.stubEnv('VITE_OPENROUTER_SITE_URL', 'https://test.com')
    vi.stubEnv('VITE_OPENROUTER_APP_NAME', 'test-app')
    
    // Reset fetch mock
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  describe('streamOpenRouterChat', () => {
    it('throws error when API key is missing', async () => {
      vi.stubEnv('VITE_OPENROUTER_API_KEY', '')
      
      const messages: ChatMessage[] = [
        { role: 'user', content: 'Hello' }
      ]

      await expect(streamOpenRouterChat(messages)).rejects.toThrow('Missing VITE_OPENROUTER_API_KEY')
    })

    it('makes fetch request with correct headers and body', async () => {
      const messages: ChatMessage[] = [
        { role: 'system', content: 'You are helpful' },
        { role: 'user', content: 'Hello' }
      ]

      // Mock successful streaming response
      const mockReader = {
        read: vi.fn()
          .mockResolvedValueOnce({
            done: false,
            value: new TextEncoder().encode('data: {"choices":[{"delta":{"content":"Hi"}}]}\n\n')
          })
          .mockResolvedValueOnce({ done: true, value: undefined })
      }

      const mockResponse = {
        ok: true,
        status: 200,
        body: {
          getReader: () => mockReader
        }
      }

      global.fetch = vi.fn().mockResolvedValue(mockResponse)

      await streamOpenRouterChat(messages)

      expect(global.fetch).toHaveBeenCalledWith(
        'https://openrouter.ai/api/v1/chat/completions',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Authorization': 'Bearer test-api-key',
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://test.com',
            'X-Title': 'test-app',
          },
          body: JSON.stringify({
            model: 'x-ai/grok-4.1-fast:free',
            messages,
            stream: true,
            max_tokens: 2048,
            temperature: 0.7,
          })
        })
      )
    })

    it('uses default model when not specified in env', async () => {
      vi.stubEnv('VITE_OPENROUTER_MODEL', '')
      
      const messages: ChatMessage[] = [{ role: 'user', content: 'Test' }]

      const mockReader = {
        read: vi.fn().mockResolvedValue({ done: true, value: undefined })
      }

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        body: { getReader: () => mockReader }
      })

      await streamOpenRouterChat(messages)

      const fetchCall = (global.fetch as ReturnType<typeof vi.fn>).mock.calls[0]
      const body = JSON.parse(fetchCall[1].body)
      expect(body.model).toBe('x-ai/grok-4.1-fast:free')
    })

    it('uses window.location.origin when SITE_URL not set', async () => {
      vi.stubEnv('VITE_OPENROUTER_SITE_URL', '')
      Object.defineProperty(window, 'location', {
        value: { origin: 'https://example.com' },
        writable: true
      })

      const messages: ChatMessage[] = [{ role: 'user', content: 'Test' }]

      const mockReader = {
        read: vi.fn().mockResolvedValue({ done: true, value: undefined })
      }

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        body: { getReader: () => mockReader }
      })

      await streamOpenRouterChat(messages)

      const fetchCall = (global.fetch as ReturnType<typeof vi.fn>).mock.calls[0]
      expect(fetchCall[1].headers['HTTP-Referer']).toBe('https://example.com')
    })

    it('streams content chunks and calls onChunk callback', async () => {
      const messages: ChatMessage[] = [{ role: 'user', content: 'Tell me a story' }]
      const chunks: string[] = []
      const onChunk = vi.fn((text: string) => chunks.push(text))

      const mockReader = {
        read: vi.fn()
          .mockResolvedValueOnce({
            done: false,
            value: new TextEncoder().encode('data: {"choices":[{"delta":{"content":"Once"}}]}\n\n')
          })
          .mockResolvedValueOnce({
            done: false,
            value: new TextEncoder().encode('data: {"choices":[{"delta":{"content":" upon"}}]}\n\n')
          })
          .mockResolvedValueOnce({
            done: false,
            value: new TextEncoder().encode('data: {"choices":[{"delta":{"content":" a time"}}]}\n\n')
          })
          .mockResolvedValueOnce({ done: true, value: undefined })
      }

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        body: { getReader: () => mockReader }
      })

      const result = await streamOpenRouterChat(messages, { onChunk })

      expect(onChunk).toHaveBeenCalledTimes(3)
      expect(chunks).toEqual(['Once', ' upon', ' a time'])
      expect(result).toBe('Once upon a time')
    })

    it('handles [DONE] message correctly', async () => {
      const messages: ChatMessage[] = [{ role: 'user', content: 'Hello' }]

      const mockReader = {
        read: vi.fn()
          .mockResolvedValueOnce({
            done: false,
            value: new TextEncoder().encode('data: {"choices":[{"delta":{"content":"Hi"}}]}\n\ndata: [DONE]\n\n')
          })
          .mockResolvedValueOnce({ done: true, value: undefined })
      }

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        body: { getReader: () => mockReader }
      })

      const result = await streamOpenRouterChat(messages)
      expect(result).toBe('Hi')
    })

    it('handles empty delta content gracefully', async () => {
      const messages: ChatMessage[] = [{ role: 'user', content: 'Test' }]
      const onChunk = vi.fn()

      const mockReader = {
        read: vi.fn()
          .mockResolvedValueOnce({
            done: false,
            value: new TextEncoder().encode('data: {"choices":[{"delta":{}}]}\n\n')
          })
          .mockResolvedValueOnce({
            done: false,
            value: new TextEncoder().encode('data: {"choices":[{"delta":{"content":"Text"}}]}\n\n')
          })
          .mockResolvedValueOnce({ done: true, value: undefined })
      }

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        body: { getReader: () => mockReader }
      })

      const result = await streamOpenRouterChat(messages, { onChunk })

      expect(onChunk).toHaveBeenCalledTimes(1)
      expect(onChunk).toHaveBeenCalledWith('Text')
      expect(result).toBe('Text')
    })

    it('ignores invalid JSON lines', async () => {
      const messages: ChatMessage[] = [{ role: 'user', content: 'Test' }]

      const mockReader = {
        read: vi.fn()
          .mockResolvedValueOnce({
            done: false,
            value: new TextEncoder().encode('data: invalid json\n\ndata: {"choices":[{"delta":{"content":"Valid"}}]}\n\n')
          })
          .mockResolvedValueOnce({ done: true, value: undefined })
      }

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        body: { getReader: () => mockReader }
      })

      const result = await streamOpenRouterChat(messages)
      expect(result).toBe('Valid')
    })

    it('ignores lines without data: prefix', async () => {
      const messages: ChatMessage[] = [{ role: 'user', content: 'Test' }]

      const mockReader = {
        read: vi.fn()
          .mockResolvedValueOnce({
            done: false,
            value: new TextEncoder().encode('random line\ndata: {"choices":[{"delta":{"content":"Content"}}]}\n\n')
          })
          .mockResolvedValueOnce({ done: true, value: undefined })
      }

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        body: { getReader: () => mockReader }
      })

      const result = await streamOpenRouterChat(messages)
      expect(result).toBe('Content')
    })

    it('throws error when response is not ok', async () => {
      const messages: ChatMessage[] = [{ role: 'user', content: 'Test' }]

      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        text: async () => 'Invalid API key'
      })

      await expect(streamOpenRouterChat(messages)).rejects.toThrow('OpenRouter error: 401 Unauthorized Invalid API key')
    })

    it('throws error when response body is null', async () => {
      const messages: ChatMessage[] = [{ role: 'user', content: 'Test' }]

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        statusText: 'OK',
        body: null,
        text: async () => 'No body'
      })

      await expect(streamOpenRouterChat(messages)).rejects.toThrow('OpenRouter error: 200 OK No body')
    })

    it('handles fetch error when getting response text', async () => {
      const messages: ChatMessage[] = [{ role: 'user', content: 'Test' }]

      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        text: async () => { throw new Error('Cannot read response') }
      })

      await expect(streamOpenRouterChat(messages)).rejects.toThrow('OpenRouter error: 500 Internal Server Error')
    })

    it('respects abort signal', async () => {
      const messages: ChatMessage[] = [{ role: 'user', content: 'Test' }]
      const controller = new AbortController()

      const mockReader = {
        read: vi.fn()
          .mockImplementationOnce(async () => {
            controller.abort()
            throw new DOMException('Aborted', 'AbortError')
          })
      }

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        body: { getReader: () => mockReader }
      })

      await expect(streamOpenRouterChat(messages, { signal: controller.signal }))
        .rejects.toThrow('Aborted')
    })

    it('passes signal to fetch request', async () => {
      const messages: ChatMessage[] = [{ role: 'user', content: 'Test' }]
      const controller = new AbortController()

      const mockReader = {
        read: vi.fn().mockResolvedValue({ done: true, value: undefined })
      }

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        body: { getReader: () => mockReader }
      })

      await streamOpenRouterChat(messages, { signal: controller.signal })

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          signal: controller.signal
        })
      )
    })

    it('handles multi-line chunks correctly', async () => {
      const messages: ChatMessage[] = [{ role: 'user', content: 'Test' }]

      const mockReader = {
        read: vi.fn()
          .mockResolvedValueOnce({
            done: false,
            value: new TextEncoder().encode(
              'data: {"choices":[{"delta":{"content":"Line1"}}]}\n' +
              'data: {"choices":[{"delta":{"content":"Line2"}}]}\n' +
              'data: {"choices":[{"delta":{"content":"Line3"}}]}\n'
            )
          })
          .mockResolvedValueOnce({ done: true, value: undefined })
      }

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        body: { getReader: () => mockReader }
      })

      const result = await streamOpenRouterChat(messages)
      expect(result).toBe('Line1Line2Line3')
    })

    it('allows custom model override via options', async () => {
      const messages: ChatMessage[] = [{ role: 'user', content: 'Test' }]
      const customModel = 'openai/gpt-4'

      const mockReader = {
        read: vi.fn().mockResolvedValue({ done: true, value: undefined })
      }

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        body: { getReader: () => mockReader }
      })

      await streamOpenRouterChat(messages, { model: customModel })

      const fetchCall = (global.fetch as ReturnType<typeof vi.fn>).mock.calls[0]
      const body = JSON.parse(fetchCall[1].body)
      expect(body.model).toBe(customModel)
    })

    it('returns empty string when no content is received', async () => {
      const messages: ChatMessage[] = [{ role: 'user', content: 'Test' }]

      const mockReader = {
        read: vi.fn()
          .mockResolvedValueOnce({
            done: false,
            value: new TextEncoder().encode('data: {"choices":[{"delta":{}}]}\n\n')
          })
          .mockResolvedValueOnce({ done: true, value: undefined })
      }

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        body: { getReader: () => mockReader }
      })

      const result = await streamOpenRouterChat(messages)
      expect(result).toBe('')
    })

    it('handles CRLF line endings', async () => {
      const messages: ChatMessage[] = [{ role: 'user', content: 'Test' }]

      const mockReader = {
        read: vi.fn()
          .mockResolvedValueOnce({
            done: false,
            value: new TextEncoder().encode('data: {"choices":[{"delta":{"content":"Test1"}}]}\r\ndata: {"choices":[{"delta":{"content":"Test2"}}]}\r\n')
          })
          .mockResolvedValueOnce({ done: true, value: undefined })
      }

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        body: { getReader: () => mockReader }
      })

      const result = await streamOpenRouterChat(messages)
      expect(result).toBe('Test1Test2')
    })

    it('handles empty lines and whitespace', async () => {
      const messages: ChatMessage[] = [{ role: 'user', content: 'Test' }]

      const mockReader = {
        read: vi.fn()
          .mockResolvedValueOnce({
            done: false,
            value: new TextEncoder().encode('\n\n  \ndata: {"choices":[{"delta":{"content":"Content"}}]}\n  \n\n')
          })
          .mockResolvedValueOnce({ done: true, value: undefined })
      }

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        body: { getReader: () => mockReader }
      })

      const result = await streamOpenRouterChat(messages)
      expect(result).toBe('Content')
    })
  })
})
