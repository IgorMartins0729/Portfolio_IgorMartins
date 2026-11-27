import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent
} from 'react';
import styles from './Navbar.module.css';

interface NavLinkItem {
  label: string;
  href: string;
}

interface NavCardItem {
  label: string;
  description: string;
  links: NavLinkItem[];
}

interface NavbarProps {
  theme?: 'dark' | 'light';
  openOn?: 'click' | 'hover';
  cardEffect?: 'rise' | 'unfold' | 'fade';
  stagger?: number;
  bounce?: number;
  speed?: number;
  cardHeight?: number;
  maxWidth?: number;
  intro?: boolean;
}

interface AnimationEngine {
  wake: () => void;
  refresh: () => void;
}

const CENTER_LINKS: NavLinkItem[] = [
  { label: 'Sobre mim', href: '#sobre-mim' },
  { label: 'Formação Acadêmica', href: '#academico' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Hard & Soft Skills', href: '#skills' },
  { label: 'Certificados', href: '#certificados' }
];

const NAV_ITEMS: NavCardItem[] = [
  {
    label: 'Perfil',
    description: 'Trajetória profissional e base acadêmica.',
    links: [
      { label: 'Sobre mim', href: '#sobre-mim' },
      { label: 'Formação Acadêmica', href: '#academico' }
    ]
  },
  {
    label: 'Portfólio',
    description: 'Trabalhos desenvolvidos, tecnologias e conquistas.',
    links: [
      { label: 'Projetos', href: '#projetos' },
      { label: 'Hard & Soft Skills', href: '#skills' },
      { label: 'Certificados', href: '#certificados' }
    ]
  },
  {
    label: 'Contato',
    description: 'Vamos conversar sobre oportunidades e projetos.',
    links: [{ label: 'Ir para Contato', href: '#contato' }]
  }
];

const NARROW = 780;
const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)';
const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));
const easeOut = (t: number): number => 1 - (1 - t) ** 3;

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function ContactIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function Navbar({
  theme = 'dark',
  openOn = 'click',
  cardEffect = 'rise',
  stagger = 0.12,
  bounce = 0.2,
  speed = 1,
  cardHeight = 176,
  maxWidth = 980,
  intro = true
}: NavbarProps) {
  const contentId = useId();
  const rootRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const engineRef = useRef<AnimationEngine | null>(null);
  const leaveRef = useRef<number>(0);
  const introRef = useRef<boolean>(intro);

  const [open, setOpen] = useState<boolean>(false);
  const [narrow, setNarrow] = useState<boolean>(false);
  const [shown, setShown] = useState<boolean>(false);

  const settingsRef = useRef({
    open,
    cardEffect,
    stagger: clamp(stagger, 0, 0.3),
    bounce: clamp(bounce, 0, 1),
    speed: clamp(speed, 0.2, 3)
  });

  settingsRef.current = {
    open,
    cardEffect,
    stagger: clamp(stagger, 0, 0.3),
    bounce: clamp(bounce, 0, 1),
    speed: clamp(speed, 0.2, 3)
  };

  useEffect(() => {
    const panel = panelRef.current;
    const content = contentRef.current;
    if (!panel || !content) return undefined;

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const state = { p: settingsRef.current.open ? 1 : 0, v: 0, height: content.offsetHeight, bar: 60 };
    let raf = 0;
    let last = 0;

    const render = () => {
      const s = settingsRef.current;
      state.bar = parseFloat(getComputedStyle(panel).getPropertyValue('--cn-bar')) || 60;
      panel.style.height = `${state.bar + Math.max(0, state.p) * state.height}px`;

      const cards = cardRefs.current.filter((card): card is HTMLDivElement => card !== null);
      const count = cards.length;
      const lag = count > 1 ? Math.min(s.stagger, 0.7 / (count - 1)) : 0;
      const span = 1 - lag * (count - 1);

      cards.forEach((card, index) => {
        const local = clamp((state.p - index * lag) / Math.max(span, 0.05), 0, 1);
        const e = easeOut(local);

        if (s.cardEffect === 'unfold') {
          card.style.transform = `translateY(${(1 - e) * -10}px) rotateX(${(1 - e) * -72}deg)`;
          card.style.opacity = `${clamp(local * 1.8, 0, 1)}`;
          card.style.filter = '';
        } else if (s.cardEffect === 'fade') {
          card.style.transform = `translateY(${(1 - e) * 6}px)`;
          card.style.opacity = `${e}`;
          card.style.filter = e < 0.999 ? `blur(${(1 - e) * 6}px)` : '';
        } else {
          card.style.transform = `translateY(${(1 - e) * 26}px) scale(${0.97 + 0.03 * e})`;
          card.style.opacity = `${e}`;
          card.style.filter = '';
        }
      });
    };

    const tick = (now: number) => {
      raf = 0;
      const s = settingsRef.current;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;
      const target = s.open ? 1 : 0;

      if (reduce) {
        state.p = target;
        state.v = 0;
      } else {
        const k = 160 * s.speed * s.speed;
        const zeta = s.open ? 1 - 0.68 * s.bounce : 1;
        const steps = Math.ceil(dt / (1 / 240));
        const h = dt / steps;
        for (let i = 0; i < steps; i++) {
          state.v += (-k * (state.p - target) - 2 * zeta * Math.sqrt(k) * state.v) * h;
          state.p += state.v * h;
        }
      }

      const done = Math.abs(state.p - target) < 0.0005 && Math.abs(state.v) < 0.002;
      if (done) {
        state.p = target;
        state.v = 0;
      }

      render();
      if (done && target === 0) setShown(false);
      if (!done) raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!raf) {
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    engineRef.current = {
      wake,
      refresh: () => {
        state.height = content.offsetHeight;
        render();
      }
    };

    render();
    const observer = new ResizeObserver(() => {
      state.height = content.offsetHeight;
      render();
    });
    observer.observe(content);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      engineRef.current = null;
    };
  }, [narrow]);

  useLayoutEffect(() => {
    if (open) setShown(true);
    engineRef.current?.refresh();
    engineRef.current?.wake();
  }, [open]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const measure = () => setNarrow(root.offsetWidth < NARROW);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event: globalThis.PointerEvent) => {
      if (event.target instanceof Node && rootRef.current?.contains(event.target)) return;
      setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(leaveRef.current), []);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const bar = barRef.current;
    if (!panel || !bar || !introRef.current) return;
    introRef.current = false;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const width = panel.offsetWidth;
    const height = panel.offsetHeight;
    const radius = parseFloat(getComputedStyle(panel).borderTopLeftRadius) || 18;

    panel.animate(
      [
        { clipPath: `inset(0px ${Math.max(0, (width - height) / 2)}px round ${height / 2}px)`, opacity: 0 },
        { clipPath: `inset(0px 0px round ${radius}px)`, opacity: 1 }
      ],
      { duration: 820, easing: EASE_OUT, fill: 'backwards' }
    );

    Array.from(bar.children).forEach((child, index) => {
      child.animate(
        [
          { opacity: 0, transform: 'translateY(8px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ],
        { duration: 560, delay: 220 + index * 70, easing: EASE_OUT, fill: 'backwards' }
      );
    });
  }, []);

  const hover = openOn === 'hover';

  const onPointerEnter = (event: PointerEvent<HTMLElement>) => {
    if (!hover || event.pointerType === 'touch') return;
    window.clearTimeout(leaveRef.current);
    setOpen(true);
  };

  const onPointerLeave = (event: PointerEvent<HTMLElement>) => {
    if (!hover || event.pointerType === 'touch') return;
    window.clearTimeout(leaveRef.current);
    leaveRef.current = window.setTimeout(() => setOpen(false), 160);
  };

  const wrapperStyle = {
    '--cn-max': `${maxWidth}px`,
    '--cn-card': `${cardHeight}px`
  } as CSSProperties;

  return (
    <header
      ref={rootRef}
      className={styles.wrapper}
      data-theme={theme}
      data-open={open ? '' : undefined}
      data-shown={shown || open ? '' : undefined}
      data-narrow={narrow ? '' : undefined}
      style={wrapperStyle}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <nav ref={panelRef} className={styles.nav} aria-label="Navegação principal">
        <div ref={barRef} className={styles.bar}>
          <a href="#" className={styles.brandLink} onClick={() => setOpen(false)}>
            <h1 className={styles.h1}>Portfólio</h1>
          </a>

          {!narrow ? (
            <ul className={styles.centerUl}>
              {CENTER_LINKS.map(link => (
                <li key={link.href}>
                  <a className={styles.centerA} href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <button
              type="button"
              className={styles.expandBtn}
              aria-expanded={open}
              aria-controls={contentId}
              onClick={() => setOpen(prev => !prev)}
            >
              {open ? 'Fechar seções' : 'Seções'}
            </button>
          )}

          <a href="#contato" className={styles.cta} onClick={() => setOpen(false)}>
            <ContactIcon className={styles.ctaIcon} />
            <span>Contato</span>
          </a>
        </div>

        <div ref={contentRef} id={contentId} className={styles.content} aria-hidden={!open}>
          <div className={styles.cards}>
            {NAV_ITEMS.map((item, index) => (
              <div
                key={item.label}
                ref={el => {
                  cardRefs.current[index] = el;
                }}
                className={styles.card}
              >
                <div className={styles.cardHead}>
                  <span className={styles.label}>{item.label}</span>
                  <p className={styles.description}>{item.description}</p>
                </div>

                <ul className={styles.ul}>
                  {item.links.map(link => (
                    <li key={link.href}>
                      <a
                        className={styles.a}
                        href={link.href}
                        tabIndex={open ? undefined : -1}
                        onClick={() => setOpen(false)}
                      >
                        <span className={styles.arrow} aria-hidden="true">
                          <ArrowIcon className={`${styles.arrowIcon} ${styles.arrowOut}`} />
                          <ArrowIcon className={`${styles.arrowIcon} ${styles.arrowIn}`} />
                        </span>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <span className={styles.rim} />
      </nav>
    </header>
  );
}

export default Navbar;