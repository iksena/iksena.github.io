import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState, type ReactElement, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { streamOpenRouterChat, type ChatMessage } from '../lib/openrouter'
import { DATA } from '../lib/data'

const MAX_INPUT_LENGTH = 500

export default function Chat(): ReactElement {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('Who are you?')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)
  const endRef = useRef<HTMLDivElement | null>(null)

  const systemPrompt = useMemo<ChatMessage>(() => {
    const portfolioContext = `You are answering as a person named "${DATA.profile.name}" and know about his portfolio. Help visitors learn about Sena.
    Profile: ${DATA.profile.roles.join(', ')} | ${DATA.profile.location} | ${DATA.profile.email} | ${DATA.profile.website}
    Bio: ${DATA.profile.objective}
    Experience:
    ${DATA.experience.map(exp => `- ${exp.role} at ${exp.company} (${exp.date}). Description: ${exp.desc}`).join('\n')}
    Education:
    ${DATA.education.map(edu => `- ${edu.degree}, ${edu.school} (${edu.date}). Description: ${edu.details}`).join('\n')}
    Key Projects:
    ${DATA.projects.map(proj => `- ${proj.title}: ${proj.role}. Stack: ${proj.stack.slice(0, 5).join(', ')}`).join('\n')}
    Skills: ${DATA.skills.categories.map(cat => cat.items.slice(0, 3).join(', ')).join(' | ')}
    Awards: ${DATA.awards.map(award => `- ${award}`).join('\n')}
    Certifications: ${DATA.certificates.map(cert => `- ${cert}`).join('\n')}
    Be concise, highlight achievements, provide details when asked.`;

    return {
      role: 'system',
      content: portfolioContext
    };
  }, [])

  useEffect(() => {
    try {
      endRef.current?.scrollIntoView({ behavior: 'smooth' })
    } catch {
      // ignore in test environments where scrollIntoView may be missing
    }
  }, [messages, loading])

  const sendMessage = async (): Promise<void> => {
    if (!input.trim() || loading) return
    setError(null)

    const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null
    const user: ChatMessage = { role: 'user', content: input.trim() }
    const next = !lastMessage ? [user] : [{...lastMessage, role: 'system'}, user]
    setMessages(next)
    setInput('')

    setLoading(true)
    const controller = new AbortController()
    abortRef.current = controller
    let assistantIndex: number | null = null
    try {
      await streamOpenRouterChat([systemPrompt, ...next], {
        onChunk: (text) => {
          setMessages(prev => {
            if (assistantIndex === null) {
              assistantIndex = prev.length
              return [...prev, { role: 'assistant', content: text }]
            }
            const updated = [...prev]
            const last = updated[assistantIndex]
            updated[assistantIndex] = { ...last, content: (last?.content || '') + text }
            return updated
          })
        },
        signal: controller.signal,
      })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to get response')
    } finally {
      setLoading(false)
      abortRef.current = null
    }
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await sendMessage()
  }

  const onStop = () => {
    abortRef.current?.abort()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.32 }}
      className="min-h-screen bg-[#F5F5DC] p-4 md:p-8 font-sans flex items-center justify-center"
    >
      <div className="max-w-4xl w-full h-[90vh] flex flex-col">
        {/* Header Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#E8DCCA] shadow-sm p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                aria-label="Back to Home"
                onClick={() => navigate('/')}
                className="px-3 py-1.5 rounded-lg border border-[#D2B48C] text-[#4B3832] hover:bg-[#FFF8F0] transition-colors font-medium"
              >
                ← Home
              </button>
              <h1 className="text-xl font-bold text-[#4B3832]">Ask me anything</h1>
            </div>
            {loading ? (
              <button onClick={onStop} className="text-sm px-3 py-1.5 rounded-lg bg-[#8A9A5B] text-white hover:bg-[#7A8A4B] transition-colors font-medium">Stop</button>
            ) : (
              <div className="text-xs text-[#8A9A5B] bg-[#8A9A5B]/10 px-2 py-1 rounded">Grok 4.1</div>
            )}
          </div>
        </div>

        {/* Messages Card */}
        <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-2xl border border-[#E8DCCA] shadow-sm overflow-hidden flex flex-col">
          <div className="flex-1 overflow-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="text-[#8A9A5B] text-lg font-semibold">👋 Hello!</div>
                  <div className="text-[#6F4E37] text-sm">Ask me anything about my portfolio.</div>
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                <div className={
                  'max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ' +
                  (m.role === 'user'
                    ? 'bg-[#8A9A5B] text-white rounded-br-sm'
                    : 'bg-white border border-[#E8DCCA] text-[#4B3832] rounded-bl-sm')
                }>
                  <ReactMarkdown className="prose prose-sm max-w-none">{m.content}</ReactMarkdown>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl px-4 py-3 border border-[#E8DCCA] bg-white text-[#4B3832]">
                  <span className="inline-block animate-pulse">✨ Thinking…</span>
                </div>
              </div>
            )}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-3 py-2">{error}</div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={onSubmit} className="p-4 border-t border-[#E8DCCA] bg-white/60">
            <div className="space-y-2">
              <div className="flex items-end gap-2">
                <textarea
                  value={input}
                  onChange={(e) => {
                    const value = e.target.value
                    if (value.length <= MAX_INPUT_LENGTH) {
                      setInput(value)
                    }
                  }}
                  onKeyDown={(e) => {
                    const isComposing = (e.nativeEvent as KeyboardEvent).isComposing
                    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
                      e.preventDefault()
                      void sendMessage()
                    }
                  }}
                  placeholder="Type your message... (max 500 characters)"
                  rows={2}
                  maxLength={MAX_INPUT_LENGTH}
                  className="flex-1 resize-none rounded-xl border border-[#D2B48C] px-4 py-3 outline-none focus:ring-2 focus:ring-[#8A9A5B]/40 focus:border-[#8A9A5B] text-[#4B3832] bg-white transition-all"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="px-5 py-3 rounded-xl bg-[#8A9A5B] text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#7A8A4B] transition-colors shadow-sm"
                >
                  Send
                </button>
              </div>
              <div className="flex justify-between items-center text-xs text-[#8A9A5B]">
                <span>Press Enter to send • Shift+Enter for new line</span>
                <span className={input.length > MAX_INPUT_LENGTH * 0.9 ? 'text-orange-500 font-medium' : ''}>
                  {input.length}/{MAX_INPUT_LENGTH}
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  )
}
