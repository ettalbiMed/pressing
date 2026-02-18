import { type FormEvent, type MouseEvent, useEffect, useMemo, useState } from 'react'

const navItems = [
  { id: 'hero', label: 'Accueil' },
  { id: 'about', label: 'À propos' },
  { id: 'services', label: 'Services' },
  { id: 'delivery', label: 'Delivery' },
  { id: 'gallery', label: 'Galerie' },
  { id: 'contact', label: 'Contact' },
] as const

const heroSlides = [
  {
    image: '/hero/hero-1.jpg',
    caption: 'Textiles délicats, traitement botanique',
  },
  {
    image: '/hero/hero-2.jpg',
    caption: 'Techniciens certifiés, contrôle pièce par pièce',
  },
  {
    image: '/hero/hero-3.jpg',
    caption: 'Logistique premium dans tout Témara',
  },
] as const

const heroChips = ['Delivery à Témara', 'Qualité premium', 'Box 24/7']

const pillars = [
  {
    title: 'Impact positif',
    description:
      'Lessives végétales, eau microfiltrée et emballages recyclables pour choyer la planète autant que vos pièces.',
    icon: 'leaf',
  },
  {
    title: 'Qualité Atelier',
    description:
      'Inspection à la lumière froide, détachage à la main et repassage vapeur press pour un tombé impeccable.',
    icon: 'sparkles',
  },
  {
    title: 'Rapidité soignée',
    description:
      "Collectes dans l’heure au centre de Témara et retours garantis sous 24 h sans compromis sur le soin.",
    icon: 'bolt',
  },
] as const

const services = [
  {
    title: 'Programme Aquaflow',
    description:
      'Cycle à basse température, biotechnologie enzymatique et séchage sur cintres pour préserver les fibres nobles.',
    icon: 'water',
  },
  {
    title: 'Finishing Studio',
    description:
      'Repassage vapeur vertical, détrompe plis et finitions couture pour silhouettes parfaitement alignées.',
    icon: 'sparkles',
  },
  {
    title: 'Garde-robe business',
    description:
      'Chemises, costumes et tenues d’hospitalité préparés avec traçabilité digitale et housses respirantes.',
    icon: 'shield',
  },
  {
    title: 'Maison & décor',
    description:
      'Linge de lit grand format, voilages et tapis fins lavés à l’eau structurée et séchés en flux laminaire.',
    icon: 'hand',
  },
] as const

const galleryImages = [
  { src: '/gallery/gallery-1.jpg', alt: 'Veste en laine sur cintre Atelier ITRI Clean' },
  { src: '/gallery/gallery-2.jpg', alt: 'Salle blanche de pressing écologique' },
  { src: '/gallery/gallery-3.jpg', alt: 'Coursier électrique ITRI Clean dans les rues de Témara' },
  { src: '/gallery/gallery-4.jpg', alt: 'Draps blancs repassés avec précision' },
  { src: '/gallery/gallery-5.jpg', alt: 'Textiles premium prêts à être livrés' },
  { src: '/gallery/gallery-6.jpg', alt: 'Espace lounge réception clients' },
] as const

type SectionId = (typeof navItems)[number]['id']
type IconName = 'leaf' | 'sparkles' | 'bolt' | 'water' | 'shield' | 'hand' | 'calendar' | 'box'
const Icon = ({ name, className }: { name: IconName; className?: string }) => {
  switch (name) {
    case 'leaf':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth={1.6}>
          <path d="M20 4c-4.5 0-10 1.5-13 6.8a8 8 0 0 0 5.6 11c5.3-1.2 9.4-6 7.4-17.8Z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 15c1.6 1.1 3.5 2 5.9 2.4" strokeLinecap="round" />
        </svg>
      )
    case 'sparkles':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth={1.6}>
          <path d="M12 3v4" strokeLinecap="round" />
          <path d="M12 17v4" strokeLinecap="round" />
          <path d="M3 12h4" strokeLinecap="round" />
          <path d="M17 12h4" strokeLinecap="round" />
          <circle cx="12" cy="12" r="4.5" />
        </svg>
      )
    case 'bolt':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth={1.6}>
          <path d="M13 2 5 13h5l-1 9 8-11h-5Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'water':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth={1.6}>
          <path d="M12 3S6 10 6 14a6 6 0 0 0 12 0c0-4-6-11-6-11Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth={1.6}>
          <path d="M12 3 5 6v6c0 5 3.5 8.5 7 9 3.5-.5 7-4 7-9V6Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'hand':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth={1.6}>
          <path d="M7 12V7a2 2 0 0 1 4 0v5" strokeLinecap="round" />
          <path d="M11 10V6a2 2 0 1 1 4 0v6" strokeLinecap="round" />
          <path d="M15 11V7.5a2 2 0 1 1 4 0V14c0 4-3 7-7 7H8c-2.2 0-4-1.8-4-4 0-1.5 1.1-2.7 2.5-3.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'calendar':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth={1.6}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M7 3v4M17 3v4M3 11h18" strokeLinecap="round" />
        </svg>
      )
    case 'box':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth={1.6}>
          <path d="M3 7 12 3l9 4-9 4Z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="m3 7 9 4v10L3 17Zm18 0-9 4v10l9-4Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    default:
      return null
  }
}

const brandName = 'ITRI Clean'

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('hero')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [navSolid, setNavSolid] = useState(false)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId)
          }
        })
      },
      { rootMargin: '-30% 0px -40% 0px', threshold: 0.3 },
    )

    navItems.forEach((item) => {
      const section = document.getElementById(item.id)
      if (section) {
        observer.observe(section)
      }
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const listener = () => {
      setNavSolid(window.scrollY > 12)
    }
    listener()
    window.addEventListener('scroll', listener)
    return () => window.removeEventListener('scroll', listener)
  }, [])

  useEffect(() => {
    const animatedNodes = document.querySelectorAll<HTMLElement>('[data-animate]')
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
    )

    animatedNodes.forEach((node) => revealObserver.observe(node))
    return () => revealObserver.disconnect()
  }, [])

  useEffect(() => {
    document.title = `${brandName} | Pressing éco-responsable à Témara`
  }, [])

  const whatsappLink = useMemo(() => {
    const message = encodeURIComponent('Bonjour ITRI Clean, je souhaite programmer une collecte à Témara.')
    return `https://wa.me/212612345678?text=${message}`
  }, [])

  const scrollToSection = (id: SectionId) => {
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    event.preventDefault()
    scrollToSection(id)
    setMobileOpen(false)
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const body = `Nom: ${formData.get('name') || ''}\nTéléphone: ${formData.get('phone') || ''}\nMessage: ${
      formData.get('message') || ''
    }`
    window.location.href = `mailto:bonjour@atlassense.ma?subject=Demande%20collecte%20Témara&body=${encodeURIComponent(body)}`
    event.currentTarget.reset()
  }
  return (
    <div className="bg-ivory text-text">
      <header
        className={`sticky top-0 z-50 transition-colors ${
          navSolid ? 'bg-ivory/95 shadow-soft border-b border-muted/20 backdrop-blur' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <a href="#hero" onClick={(event) => handleNavClick(event, 'hero')} className="flex items-center gap-3">
            <div className="rounded-2xl bg-brand/10 p-2 text-brand">
              <Icon name="leaf" className="h-6 w-6" />
            </div>
            <div>
              <p className="font-display text-lg text-brand">{brandName}</p>
              <p className="text-xs text-muted">Pure care pour Témara</p>
            </div>
          </a>

          <nav aria-label="Navigation principale" className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(event) => handleNavClick(event, item.id)}
                aria-current={activeSection === item.id ? 'page' : undefined}
                className={`text-sm font-semibold transition-colors ${
                  activeSection === item.id ? 'text-brand' : 'text-muted hover:text-text'
                }`}
              >
                {item.label}
              </a>
            ))}
            <span className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              Témara
            </span>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="tel:+212612345678"
              className="hidden rounded-full border border-brand/30 px-4 py-2 text-sm font-semibold text-brand transition-colors hover:bg-brand/10 md:inline-flex"
            >
              +212 6 12 34 56 78
            </a>
            <button
              type="button"
              className="rounded-full border border-brand/40 p-2 text-brand md:hidden"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="menu-mobile"
              aria-label="Basculer le menu"
            >
              {mobileOpen ? (
                <svg viewBox="0 0 24 24" className="h-6 w-6" stroke="currentColor" strokeWidth={1.7} fill="none">
                  <path d="m6 6 12 12M6 18 18 6" strokeLinecap="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-6 w-6" stroke="currentColor" strokeWidth={1.7} fill="none">
                  <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          id="menu-mobile"
          className={`md:hidden ${mobileOpen ? 'max-h-96' : 'max-h-0'} overflow-hidden border-t border-muted/10 bg-ivory/95 px-6 transition-[max-height] duration-300`}
        >
          <div className="flex flex-col gap-3 py-4">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(event) => handleNavClick(event, item.id)}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
                  activeSection === item.id ? 'bg-brand/10 text-brand' : 'text-muted hover:text-text'
                }`}
              >
                {item.label}
              </a>
            ))}
            <span className="rounded-2xl border border-brand/30 px-4 py-3 text-sm font-semibold text-brand">Témara, Maroc</span>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-24 px-6 pb-24 pt-10">
        <section id="hero" className="section-offset" aria-label="Accueil ITRI Clean">
          <div className="relative min-h-[80vh] overflow-hidden rounded-[36px] bg-brand/60 text-ivory">
            <div className="absolute inset-0" aria-live="polite">
              {heroSlides.map((slide, index) => (
                <div
                  key={slide.image}
                  className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                  style={{
                    backgroundImage: `linear-gradient(120deg, rgba(10, 42, 24, 0.8), rgba(10, 42, 24, 0.3)), url(${slide.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  role={index === currentSlide ? 'img' : undefined}
                  aria-label={index === currentSlide ? slide.caption : undefined}
                />
              ))}
            </div>
            <div className="relative z-10 flex min-h-[80vh] flex-col justify-between p-8 md:p-14">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-ivory/80">Pressing éco-responsable à Témara</p>
                <h1 className="font-display text-4xl leading-tight text-ivory md:text-5xl lg:text-6xl">
                  {brandName}, la référence premium pour vos garde-robes et linges de maison
                </h1>
                <p className="mt-6 max-w-2xl text-lg text-ivory/90">
                  Procédés aquatech sans odeur, énergie solaire et logistique intelligente pour servir les quartiers Wifaq, El Menzeh, Harhoura et toute la côte de Témara.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => scrollToSection('delivery')}
                    className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-ivory shadow-soft transition hover:translate-y-0.5"
                  >
                    Réserver une collecte
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection('contact')}
                    className="rounded-full border border-ivory/60 px-6 py-3 text-sm font-semibold text-ivory transition hover:bg-ivory/10"
                  >
                    Nous contacter
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 text-xs font-medium uppercase tracking-widest text-ivory/70">
                <span>{heroSlides[currentSlide].caption}</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="rounded-full border border-ivory/40 p-2"
                    onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
                    aria-label="Slide précédent"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" stroke="currentColor" strokeWidth={1.7} fill="none">
                      <path d="m14 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-ivory/40 p-2"
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
                    aria-label="Slide suivant"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" stroke="currentColor" strokeWidth={1.7} fill="none">
                      <path d="m10 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div className="flex gap-1">
                    {heroSlides.map((slide, index) => (
                      <button
                        key={slide.image}
                        type="button"
                        className={`h-1.5 w-6 rounded-full transition ${index === currentSlide ? 'bg-ivory' : 'bg-ivory/40'}`}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Aller au visuel ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative z-20 -mt-6 grid gap-4 sm:grid-cols-3">
            {heroChips.map((chip) => (
              <div key={chip} className="rounded-3xl border border-ivory/80 bg-ivory px-4 py-3 text-center text-sm font-semibold text-brand shadow-soft/20">
                {chip}
              </div>
            ))}
          </div>
        </section>
        <section id="about" className="section-offset relative left-1/2 right-1/2 w-screen -translate-x-1/2 bg-white py-16 md:py-20" aria-labelledby="about-title">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 md:grid-cols-2">
            <div data-animate className="fade-in-up">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted">À propos</p>
              <h2 id="about-title" className="font-display text-3xl text-brand md:text-4xl">L’expérience textile durable made in Témara</h2>
              <p className="mt-6 text-lg text-muted">
                Situé à deux minutes de la corniche, {brandName} combine laboratoires d’analyse de l’eau, tunnels UV et équipes couture pour prolonger la durée de vie de vos pièces. Nous privilégions des tensioactifs biosourcés, récupérons 82 % de l’énergie thermique et valorisons l’eau grise pour arroser les espaces verts voisins.
              </p>
              <ul className="mt-6 space-y-3 text-muted">
                <li>• Traçabilité de chaque article via QR code et historique de soins</li>
                <li>• Conseils personnalisés pour les résidences premium de Témara et Rabat</li>
                <li>• Partenariats hôtels-boutiques & villas avec protocole hygiène hôtelier</li>
              </ul>
            </div>
            <div className="grid gap-4 sm:grid-cols-2" data-animate>
              {pillars.map((pillar) => (
                <div key={pillar.title} className="fade-in-up rounded-3xl border border-muted/20 bg-white/70 p-5 shadow-soft/30">
                  <div className="flex items-center gap-3 text-brand">
                    <Icon name={pillar.icon} className="h-6 w-6" />
                    <p className="font-semibold">{pillar.title}</p>
                  </div>
                  <p className="mt-3 text-sm text-muted">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
          </div>
        </section>

        <section id="services" className="section-offset" aria-labelledby="services-title">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4" data-animate>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted">Services</p>
              <h2 id="services-title" className="font-display text-3xl text-brand md:text-4xl">Des rituels taillés pour vos pièces iconiques</h2>
              <p className="text-muted md:text-lg">
                Chaque prestation est calibrée sur mesure : température, dosage et pression sont adaptés à la fibre, puis validés par un second opérateur. Nous couvrons les dressings privés, conciergeries d’immeubles et yachts amarrés à Harhoura.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {services.map((service) => (
                <article key={service.title} className="fade-in-up rounded-[30px] border border-muted/15 bg-white/80 p-6 shadow-soft/20" data-animate>
                  <div className="flex items-center gap-4 text-brand">
                    <span className="rounded-2xl bg-brand/10 p-3">
                      <Icon name={service.icon as IconName} className="h-6 w-6" />
                    </span>
                    <h3 className="text-lg font-semibold">{service.title}</h3>
                  </div>
                  <p className="mt-4 text-sm text-muted">{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="delivery" className="section-offset relative left-1/2 right-1/2 w-screen -translate-x-1/2 bg-white py-16 md:py-20" aria-labelledby="delivery-title">
          <div className="mx-auto max-w-[1080px] text-center" data-animate>
            <h2 id="delivery-title" className="font-display text-2xl font-semibold uppercase tracking-[0.08em] text-brand md:text-4xl">
              ITRI CLEAN
            </h2>
            <p className="mt-7 text-sm uppercase italic tracking-[0.24em] text-muted md:text-base">
              VOTRE PRESSING ÉCO-RESPONSABLE À DOMICILE
            </p>
            <p className="mt-4 text-xs italic text-muted">* à partir de 79Dh de commande</p>

            <h3 className="mt-16 font-display text-3xl text-brand md:text-4xl">La propreté chez vous en 3 étapes...</h3>
            <p className="mt-5 text-base text-muted md:text-lg">3 étapes simples pour nettoyer vos articles</p>

            <div className="mt-14 grid grid-cols-1 gap-y-10 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-start md:gap-x-4">
              <article className="mx-auto flex max-w-[16rem] flex-col items-center">
                <div className="flex h-[6.8rem] w-[6.8rem] items-center justify-center rounded-full bg-brand text-white shadow-soft/40">
                  <svg viewBox="0 0 48 48" className="h-[3.05rem] w-[3.05rem]" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                    <path d="M16.2 11.8c-1.6-1.8-4.2-2.1-6.1-.7l-2.3 1.8c-1.9 1.5-2.6 4.1-1.6 6.3 4.1 9.8 12 17.7 21.8 21.8 2.2 1 4.8.3 6.3-1.6l1.8-2.3c1.4-1.9 1.1-4.5-.7-6.1l-4.8-4.2c-1.5-1.3-3.6-1.5-5.3-.4l-2.4 1.5a30.6 30.6 0 0 1-7.6-7.6l1.5-2.4c1.1-1.7.9-3.8-.4-5.3z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M30.5 13.2c3.2 1.3 5.8 3.9 7.1 7.1" strokeLinecap="round" />
                    <path d="M28.4 18.7a9.5 9.5 0 0 1 4.9 4.9" strokeLinecap="round" />
                  </svg>
                </div>
                <h4 className="mt-6 whitespace-nowrap text-2xl font-semibold text-brand md:text-3xl">1-Commande</h4>
                <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">
                  Réservez votre collecte par<br />
                  téléphone au{' '}
                  <a href="tel:+212522993922" className="font-medium text-brand">
                    0522993922
                  </a>{' '}
                  ou<br />
                  sur WhatsApp au{' '}
                  <a href="https://wa.me/212667638300" target="_blank" rel="noreferrer" className="font-medium text-brand">
                    0667638300
                  </a>
                  <br />
                  en suivant les instructions indiquées
                </p>
              </article>

              <span className="hidden self-start md:mt-[8.9rem] md:block" aria-hidden="true">
                <svg viewBox="0 0 112 18" className="h-6 w-20 text-brand/65" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M1 9h100" strokeLinecap="round" />
                  <path d="m92 1 9 8-9 8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>

              <article className="mx-auto flex max-w-[16rem] flex-col items-center">
                <div className="flex h-[6.8rem] w-[6.8rem] items-center justify-center rounded-full bg-brand text-white shadow-soft/40">
                  <svg viewBox="0 0 48 48" className="h-[3.05rem] w-[3.05rem]" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <path d="M4 29h4m-4-8h8" strokeLinecap="round" />
                    <path d="M10 15h20l9 9v11h-3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 15v25h8" strokeLinecap="round" />
                    <path d="M28 22h8v5h-8z" strokeLinejoin="round" />
                    <circle cx="15" cy="35" r="3.4" />
                    <circle cx="33" cy="35" r="3.4" />
                    <path d="M22 20.2c1.6 1 2.6 2.7 2.6 4.7 0 3.2-2.6 5.8-5.8 5.8" strokeLinecap="round" />
                    <path d="M19.8 17.4v4.2" strokeLinecap="round" />
                  </svg>
                </div>
                <h4 className="mt-6 whitespace-nowrap text-2xl font-semibold text-brand md:text-3xl">2-Collecte</h4>
                <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">
                  Notre livreur vient chez vous
                  <br />
                  à la date et horaire convenus
                  <br />
                  pour récupérer vos articles
                </p>
              </article>

              <span className="hidden self-start md:mt-[8.9rem] md:block" aria-hidden="true">
                <svg viewBox="0 0 112 18" className="h-6 w-20 text-brand/65" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M1 9h100" strokeLinecap="round" />
                  <path d="m92 1 9 8-9 8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>

              <article className="mx-auto flex max-w-[16rem] flex-col items-center">
                <div className="flex h-[6.8rem] w-[6.8rem] items-center justify-center rounded-full bg-brand text-white shadow-soft/40">
                  <svg viewBox="0 0 48 48" className="h-[3.05rem] w-[3.05rem]" fill="none" stroke="currentColor" strokeWidth="2.1" aria-hidden="true">
                    <path d="M8 17.8c10-5.1 22-5.1 32 0" strokeLinecap="round" />
                    <path d="M24 8.8v7.1" strokeLinecap="round" />
                    <path d="M19 8.8c.9 2.7 3.2 4.2 5 4.2s4.1-1.5 5-4.2" strokeLinecap="round" />
                    <path d="M13.3 20.8 16.2 43h15.6l2.9-22.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M17 22.5 24 18l7 4.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M24 18v22" strokeLinecap="round" />
                    <path d="M20.7 25.2h.1m6.4 0h.1m-6.4 4.9h.1m6.4 0h.1" strokeLinecap="round" />
                  </svg>
                </div>
                <h4 className="mt-6 whitespace-nowrap text-2xl font-semibold text-brand md:text-3xl">3-Livraison</h4>
                <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">
                  Nous prenons soin de vos articles
                  <br />
                  puis nous vous les livrons à
                  <br />
                  domicile selon vos préférences
                </p>
              </article>
            </div>
          </div>
        </section>
        <section id="gallery" className="section-offset" aria-labelledby="gallery-title">
          <div className="flex flex-col gap-6" data-animate>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted">Galerie</p>
            <h2 id="gallery-title" className="font-display text-3xl text-brand md:text-4xl">Ambiances ITRI Clean</h2>
            <p className="text-muted md:text-lg">
              Aperçu de nos cabines vapeur, de notre box autonome et de la logistique qui dessert les villas de Val d’Or, Bahia Golf Beach et les sièges d’entreprise du pôle technologique de Témara.
            </p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((image) => (
              <figure key={image.src} className="fade-in-up overflow-hidden rounded-[28px] border border-muted/15 bg-white/60" data-animate>
                <img src={image.src} alt={image.alt} className="h-56 w-full object-cover transition duration-500 hover:scale-105" loading="lazy" />
                <figcaption className="px-4 py-3 text-sm font-semibold text-brand">{image.alt}</figcaption>
              </figure>
            ))}
          </div>
        </section>
        <section id="contact" className="section-offset relative left-1/2 right-1/2 w-screen -translate-x-1/2 bg-white py-16 md:py-20" aria-labelledby="contact-title">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-6" data-animate>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted">Contact</p>
              <h2 id="contact-title" className="font-display text-3xl text-brand md:text-4xl">Parlez à notre concierge textile</h2>
              <p className="text-muted">
                Atelier & box : Boulevard Hassan II, Quartier Wifaq – Témara. Zones desservies : Harhoura, Rabat Ouest, Sidi Boughaba.
              </p>
              <div className="rounded-[30px] border border-muted/20 bg-white/80 p-6 shadow-soft/30">
                <p className="font-semibold text-brand">Horaires</p>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  <li>Lundi – Samedi : 7h30 - 21h30</li>
                  <li>Dimanche : 10h - 18h (box 24/7 accessible en continu)</li>
                </ul>
                <div className="mt-4 space-y-1 text-sm text-brand">
                  <a href="tel:+212612345678" className="block font-semibold">+212 6 12 34 56 78</a>
                  <a href="mailto:bonjour@atlassense.ma" className="block">bonjour@atlassense.ma</a>
                </div>
              </div>
              <iframe
                title="Carte ITRI Clean Témara"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.67993211816!2d-6.92665!3d33.927722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76c968d5d48c3%3A0x83e5cf0aa8e1b0f7!2sTemara!5e0!3m2!1sfr!2sma!4v1633012345678"
                loading="lazy"
                className="h-64 w-full rounded-[30px] border-0 shadow-soft"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="rounded-[32px] border border-muted/25 bg-white/90 p-6 shadow-soft/40" data-animate>
              <h3 className="text-xl font-semibold text-brand">Brief express</h3>
              <p className="mt-2 text-sm text-muted">
                Détaillez vos besoins, nous répondons en moins de 15 minutes pendant les horaires d’ouverture.
              </p>
              <form className="mt-6 space-y-4" onSubmit={handleFormSubmit}>
                <div>
                  <label className="text-sm font-semibold text-brand" htmlFor="name">
                    Nom & prénom
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="mt-2 w-full rounded-2xl border border-muted/30 bg-ivory/60 px-4 py-3 text-sm focus:border-brand focus:outline-none"
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-brand" htmlFor="phone">
                    Téléphone ou WhatsApp
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="mt-2 w-full rounded-2xl border border-muted/30 bg-ivory/60 px-4 py-3 text-sm focus:border-brand focus:outline-none"
                    placeholder="Ex: +212 6 .."
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-brand" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-2 w-full rounded-2xl border border-muted/30 bg-ivory/60 px-4 py-3 text-sm focus:border-brand focus:outline-none"
                    placeholder="Type de pièces, adresse, délais..."
                    required
                  />
                </div>
                <button type="submit" className="w-full rounded-full bg-brand px-6 py-3 text-sm font-semibold text-ivory">
                  Envoyer le briefing
                </button>
                <p className="text-center text-xs text-muted">
                  Vos données restent au Maroc et servent uniquement à organiser votre collecte.
                </p>
              </form>
            </div>
          </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-muted/20 bg-white/70 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 text-center text-sm text-muted md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {brandName} – Pressing éco-responsable à Témara, Maroc.</p>
          <p>Optimisé SEO local pour Rabat-Salé-Kénitra.</p>
        </div>
      </footer>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-ivory shadow-soft transition hover:scale-105"
        aria-label="Contacter ITRI Clean via WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.7 15l-1.2 4.4 4.5-1.2A10 10 0 1 0 12 2Zm5.4 14.3c-.2.5-1 1-1.6 1.1-.4 0-.9.1-1.4-.1s-1.1-.4-1.9-.8a10.6 10.6 0 0 1-3.1-2.8c-.4-.6-.8-1.3-1-2-.2-.7 0-1.3.2-1.7.2-.3.4-.5.7-.6h.5c.2 0 .4 0 .5.4.2.5.6 1.6.7 1.7.1.2.1.4 0 .6l-.3.4c-.1.2-.2.3-.1.5s.7 1.3 1.6 2c1.1 1 2 .8 2.3.7.2 0 .3-.2.4-.3l.3-.4c.2-.2.3-.2.5-.1l1.6.8c.2.1.4.2.4.4 0 .2.1.4 0 .6Z" />
        </svg>
      </a>
    </div>
  )
}

export default App
