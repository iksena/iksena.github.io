export type ChatMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

export async function streamOpenRouterChat(
  messages: ChatMessage[],
  opts: {
    model?: string
    onChunk?: (text: string) => void
    signal?: AbortSignal
  } = {}
): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY
  if (!apiKey) throw new Error('Missing VITE_OPENROUTER_API_KEY')

  const model = opts.model || import.meta.env.VITE_OPENROUTER_MODEL || 'x-ai/grok-4.1-fast:free'
  const referer = import.meta.env.VITE_OPENROUTER_SITE_URL || window.location.origin
  const title = import.meta.env.VITE_OPENROUTER_APP_NAME || 'iksena-portfolio-chat'

  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': referer,
      'X-Title': title,
    },
    body: JSON.stringify({
      model,
      messages,
      stream: true,
      max_tokens: 2048,
      temperature: 0.7,
    }),
    signal: opts.signal,
  })

  if (!res.ok || !res.body) {
    const text = await res.text().catch(() => '')
    throw new Error(`OpenRouter error: ${res.status} ${res.statusText} ${text}`)
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let full = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    const chunk = decoder.decode(value, { stream: true })
    // Stream is in SSE format: lines starting with "data: ..."
    const lines = chunk.split(/\r?\n/)
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || !trimmed.startsWith('data:')) continue
      const payload = trimmed.slice(5).trim()
      if (payload === '[DONE]') continue
      try {
        const json = JSON.parse(payload)
        // OpenAI-style deltas
        const delta = json?.choices?.[0]?.delta
        const content = typeof delta?.content === 'string' ? delta.content : ''
        if (content) {
          full += content
          opts.onChunk?.(content)
        }
      } catch {
        // ignore partial JSON
      }
    }
  }

  return full
}
