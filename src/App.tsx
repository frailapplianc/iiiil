import { useState, useEffect, useRef } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

function App() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [showContent, setShowContent] = useState(false)
  const [greeting, setGreeting] = useState('')
  const [clickCount, setClickCount] = useState(0)
  const animationRef = useRef<number>()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const greetings = [
    'Привет! 👋',
    'Здравствуй! ✨',
    'Добро пожаловать! 🎉',
    'Рад видеть тебя! 😊',
    'Hola! 🌟',
    'Hello! 🚀',
    'Bonjour! 🎨',
    'こんにちは! 🌸',
  ]

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      setGreeting(greetings[index % greetings.length])
      index++
    }, 3000)
    setGreeting(greetings[0])
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const colors = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#818cf8', '#7c3aed', '#f472b6', '#fb923c']
    const particlesArray: Particle[] = []

    for (let i = 0; i < 60; i++) {
      particlesArray.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }
    setParticles(particlesArray)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesArray.forEach((p, i) => {
        p.x += p.speedX
        p.y += p.speedY

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1

        // Mouse interaction
        const dx = mousePos.x - p.x
        const dy = mousePos.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150) {
          p.x -= dx * 0.02
          p.y -= dy * 0.02
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, '0')
        ctx.fill()

        // Draw connections
        particlesArray.slice(i + 1).forEach((p2) => {
          const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2)
          if (d < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - d / 120)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [mousePos])

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  const handleClick = () => {
    setClickCount((c) => c + 1)
  }

  const clickMessages = [
    '',
    '🎈',
    '🎈🎈',
    '🎈🎈🎈',
    '🎊 Отлично!',
    '🌈 Магия!',
    '✨ Волшебство!',
    '🚀 В космос!',
    '💫 Супер!',
    '🎆 Фейерверк!',
    '🏆 Легенда!',
  ]

  return (
    <div
      className="min-h-screen w-full overflow-hidden relative cursor-pointer select-none"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      style={{
        background: 'linear-gradient(135deg, #0f0c29 0%, #1a1040 30%, #24243e 60%, #0f0c29 100%)',
      }}
    >
      {/* Canvas for particles */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Gradient orbs */}
      <div
        className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse"
        style={{
          background: 'radial-gradient(circle, #7c3aed, transparent)',
          top: '10%',
          left: '10%',
        }}
      />
      <div
        className="absolute w-80 h-80 rounded-full opacity-15 blur-3xl animate-pulse"
        style={{
          background: 'radial-gradient(circle, #f472b6, transparent)',
          bottom: '10%',
          right: '10%',
          animationDelay: '1s',
        }}
      />
      <div
        className="absolute w-64 h-64 rounded-full opacity-10 blur-3xl animate-pulse"
        style={{
          background: 'radial-gradient(circle, #06b6d4, transparent)',
          top: '50%',
          right: '30%',
          animationDelay: '2s',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Greeting text */}
        <div
          className={`transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent animate-gradient">
            {greeting}
          </h1>
        </div>

        <div
          className={`transition-all duration-1000 delay-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <p className="text-xl md:text-2xl text-purple-200/80 text-center max-w-2xl leading-relaxed">
            Я — AI-ассистент, готовый помочь тебе создать что-то невероятное.
          </p>
        </div>

        <div
          className={`transition-all duration-1000 delay-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <p className="text-lg text-purple-300/60 text-center mt-4">
            Нажми на экран или попроси меня создать что-нибудь 🎨
          </p>
        </div>

        {/* Click counter */}
        {clickCount > 0 && (
          <div className="mt-8 transition-all duration-300 animate-bounce">
            <div className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <span className="text-2xl">
                {clickMessages[Math.min(clickCount, clickMessages.length - 1)]}
              </span>
              <span className="text-purple-300 ml-2 text-sm">
                ({clickCount} {clickCount === 1 ? 'клик' : clickCount < 5 ? 'клика' : 'кликов'})
              </span>
            </div>
          </div>
        )}

        {/* Feature cards */}
        <div
          className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full transition-all duration-1000 delay-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <FeatureCard
            icon="🎨"
            title="Дизайн"
            description="Создаю красивые и современные интерфейсы"
            delay="0s"
          />
          <FeatureCard
            icon="⚡"
            title="Скорость"
            description="Быстрая разработка с использованием React и Vite"
            delay="0.2s"
          />
          <FeatureCard
            icon="🚀"
            title="Результат"
            description="Готовые проекты, которые можно запустить сразу"
            delay="0.4s"
          />
        </div>
      </div>

      {/* Mouse follower glow */}
      <div
        className="fixed w-4 h-4 rounded-full pointer-events-none z-50 transition-transform duration-75"
        style={{
          left: mousePos.x - 8,
          top: mousePos.y - 8,
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.8), transparent)',
          boxShadow: '0 0 20px 10px rgba(139, 92, 246, 0.3)',
        }}
      />
    </div>
  )
}

function FeatureCard({ icon, title, description, delay }: { icon: string; title: string; description: string; delay: string }) {
  return (
    <div
      className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10"
      style={{ animationDelay: delay }}
    >
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-purple-200/60 text-sm">{description}</p>
    </div>
  )
}

export default App
