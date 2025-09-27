import React, { useEffect, useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Train, Map, Bath, Users, CheckCircle2,
    ChevronLeft, ChevronRight, PartyPopper, Sparkles
} from "lucide-react";
import logo from "./assets/logo.webp"; // ou .png / .webp

// ------- helpers UI -------
const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(" ");

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "solid" | "outline" };
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "solid", ...props }, ref) => (
        <button
            ref={ref}
            className={cx(
                "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all",
                variant === "outline"
                    ? "bg-white/70 backdrop-blur border border-slate-200/70 text-slate-900 hover:bg-white focus-visible:ring-2 focus-visible:ring-teal-400/50"
                    : "bg-gradient-to-r from-teal-600 to-indigo-600 text-white hover:from-teal-500 hover:to-indigo-500 shadow-md focus-visible:ring-2 focus-visible:ring-teal-400/50",
                className
            )}
            {...props}
        />
    )
);
Button.displayName = "Button";

export type CardProps = React.HTMLAttributes<HTMLDivElement>;
export function Card({ className, ...props }: CardProps) {
    return (
        <div
            className={cx(
                "rounded-2xl bg-white/70 backdrop-blur-xl border border-slate-200/70 shadow-lg shadow-slate-900/5",
                className
            )}
            {...props}
        />
    );
}
export function CardContent({ className, ...props }: CardProps) {
    return <div className={cx("p-5", className)} {...props} />;
}

// Styles utilitaires
const paper = "bg-white/70 backdrop-blur-xl border border-slate-200/70 shadow-lg shadow-slate-900/5";
const ink = "text-slate-900";
const mute = "text-slate-600";
const head = "text-3xl md:text-5xl font-extrabold tracking-tight";
const sub = `text-base md:text-lg ${mute}`;

type Slide = { key: string; title?: React.ReactNode; body: React.ReactNode; accent?: React.ReactNode };

// === EmailJS ===
import emailjs from "@emailjs/browser";
const EMAILJS_SERVICE_ID = "service_TravelGCtest";
const EMAILJS_TEMPLATE_ID = "template_alrwijz";
const EMAILJS_PUBLIC_KEY = "ri3isFuSyk52QRB-o";

// ------- helpers testables -------
export function clampIndex(n: number, last: number) {
    return Math.max(0, Math.min(n, last));
}
export function progressPercent(index: number, length: number) {
    if (length <= 0) return 0;
    const i = Math.min(Math.max(index, 0), length - 1);
    return ((i + 1) / length) * 100;
}

export function TravelGCDeck() {
    const [index, setIndex] = useState(0);
    const [showInscription, setShowInscription] = useState(false);

    // Slides du deck (l'inscription N'EST PAS dans ce tableau)
    const slides: Slide[] = [
        {
            key: "intro",
            title: (
                <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-white font-bold ring-1 ring-white/40 shadow-sm bg-gradient-to-br from-teal-600 to-indigo-700">GC</span>
                    <span>TRAVEL GC</span>
                </div>
            ),
            body: (
                <div className="space-y-6">
                    <h1 className={`${head} ${ink}`}>Un voyage à la découverte de l’Europe de l’Est</h1>
                    <p className={`${sub}`}>Présenté par Lucas, Ludo et Hugo · 30 septembre 2025</p>

                    <motion.ul
                        className="flex flex-wrap gap-2"
                        initial="hidden"
                        animate="show"
                        variants={{ hidden: { opacity: 1 }, show: { transition: { staggerChildren: 0.08 } } }}
                    >
                        {[
                            { icon: <Map className="w-4 h-4" />, label: "3 capitales, 1 voyage" },
                            { icon: <Train className="w-4 h-4" />, label: "Train de nuit direct" },
                            { icon: <Users className="w-4 h-4" />, label: "Pensé pour étudiant·e·s" },
                            { icon: <CheckCircle2 className="w-4 h-4" />, label: "Budget maîtrisé" },
                            { icon: <Sparkles className="w-4 h-4" />, label: "Ambiance conviviale" },
                        ].map((c, i) => (
                            <motion.li
                                key={i}
                                className="px-3 py-1.5 rounded-full text-sm bg-white/70 backdrop-blur border border-slate-200/70 text-slate-800"
                                variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}
                            >
                                <span className="inline-flex items-center gap-2">{c.icon}{c.label}</span>
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>
            ),
            accent: <img src={logo} alt="Logo Travel GC" className="w-full h-full object-cover rounded-xl" />,
        },
        {
            key: "why",
            title: "Pourquoi ce voyage ?",
            body: (
                <StaggerGrid>
                    <PunchCard
                        title="Un seul voyage, 3 capitales"
                        color="from-teal-200 to-teal-300"
                        icon={<Train className="w-5 h-5" />}
                        lines={["Budapest (HU) → Bratislava (SK) → Vienne (AT)", "Trajets courts, plus de temps sur place"]}
                    />
                    <PunchCard
                        title="Budget étudiant"
                        color="from-amber-200 to-amber-300"
                        icon={<CheckCircle2 className="w-5 h-5" />}
                        lines={["Hébergements simples & bien situés", "Activités et restos abordables"]}
                    />
                    <PunchCard
                        title="Transport facile"
                        color="from-indigo-200 to-indigo-300"
                        icon={<Train className="w-5 h-5" />}
                        lines={["Lausanne→Zurich ≈ 2h", "Zurich→Budapest ≈ 12h (nuit)"]}
                    />
                    <PunchCard
                        title="Rythme équilibré"
                        color="from-rose-200 to-rose-300"
                        icon={<Bath className="w-5 h-5" />}
                        lines={["Culture le jour, détente en fin d'aprèm", "Soirées conviviales (safe & groupées)"]}
                    />
                </StaggerGrid>
            ),
            accent: <ColorBlock caption="Schéma rapide du parcours" color="bg-slate-100 text-slate-800" />,
        },
        {
            key: "transport",
            title: "Comment on s’y rend ?",
            body: (
                <div className="space-y-5">
                    <AnimatedRoute />
                    <p className={`${sub}`}>Tout en train. Convivial, simple, faible empreinte. On voyage ensemble dès le départ.</p>
                </div>
            ),
            accent: <ColorBlock caption="Train de nuit – couchettes" color="bg-indigo-100 text-indigo-800" />,
        },
        {
            key: "itinerary",
            title: "Itinéraire — Budapest · Bratislava · Vienne",
            body: <ItinerarySlideV4 />,
            accent: <ColorBlock caption="Carte stylisée" color="bg-teal-100 text-teal-800" />,
        },
        {
            key: "highlights",
            title: "Moments forts — ce qu’on va vivre",
            body: <HighlightsGrid />,
            accent: <ColorBlock caption="Astuce: garder du temps libre" color="bg-amber-100 text-amber-900" />,
        },
        {
            key: "cta",
            title: "On y va ensemble ?",
            body: (
                <div className="space-y-5">
                    <p className={`${head} ${ink} flex flex-wrap items-center gap-2`}>
                        Rejoignez TRAVEL GC <PartyPopper className="w-7 h-7 text-rose-500" />
                    </p>
                    <p className={`${sub}`}>Places limitées · priorité aux étudiant·e·s EPFL (ou équivalent).</p>
                    <div className="flex flex-wrap items-center gap-3">
                        <Button className="rounded-xl px-6 text-base" onClick={() => setShowInscription(true)}>
                            Je m’inscris
                        </Button>
                        <Button variant="outline" className="rounded-xl px-6 text-base">
                            Recevoir le programme détaillé
                        </Button>
                    </div>
                </div>
            ),
            accent: <ColorBlock caption="QR code inscription (à insérer)" color="bg-rose-100 text-rose-700" />,
        },
    ];

    const next = () => setIndex(i => clampIndex(i + 1, slides.length - 1));
    const prev = () => setIndex(i => clampIndex(i - 1, slides.length - 1));
    const progress = progressPercent(index, slides.length);

    // Empêcher la navigation clavier pendant l'overlay
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (showInscription) return;
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [showInscription]);

    return (
        <div className="relative min-h-[80vh] w-full font-sans bg-gradient-to-b from-slate-50 via-teal-50 to-indigo-50">
            <div className="relative max-w-6xl mx-auto p-4 md:p-8">
                {/* Header */}
                <div className="mb-3 rounded-xl p-3 md:p-4 flex items-center justify-between bg-white/60 backdrop-blur border border-slate-200/70">
                    <div className="flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-white font-bold ring-1 ring-white/40 shadow-sm bg-gradient-to-br from-teal-600 to-indigo-700">GC</span>
                        <div>
                            <div className={`font-semibold ${ink}`}>TRAVEL GC</div>
                            <div className={`text-xs ${mute}`}>Voyage étudiant organisé · 30 sept. 2025</div>
                        </div>
                    </div>
                    <div className={`hidden md:flex items-center gap-2 text-xs ${mute}`}>
                        <span>←/→ pour naviguer</span>
                    </div>
                </div>

                {/* Progression (masquée si overlay inscription) */}
                {!showInscription && (
                    <div className="mb-6 h-1.5 rounded-full bg-slate-200/80 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-teal-500 to-indigo-500 relative" style={{ width: `${progress}%` }}>
                            <div className="absolute inset-0 animate-pulse opacity-30 bg-white/30" />
                        </div>
                    </div>
                )}

                {/* Contenu principal */}
                <div className={`rounded-2xl p-6 md:p-10 ${paper}`}>
                    {showInscription ? (
                        <InscriptionOverlay
                            onClose={() => setShowInscription(false)}
                            onSent={() => {
                                setShowInscription(false);
                                setIndex(0);
                            }}
                        />
                    ) : (
                        <div className="grid md:grid-cols-[1fr,240px] gap-6">
                            <div>
                                {slides[index].title && (<h2 className={`text-2xl md:text-3xl font-bold mb-4 ${ink}`}>{slides[index].title}</h2>)}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={slides[index].key}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -12 }}
                                        transition={{ duration: 0.25 }}
                                        className="min-h-[260px]"
                                    >
                                        {slides[index].body}
                                    </motion.div>
                                </AnimatePresence>
                                <div className="mt-8 flex items-center gap-3">
                                    <Button variant="outline" onClick={prev} className="rounded-xl">
                                        <ChevronLeft className="w-4 h-4 mr-2" /> Précédent
                                    </Button>
                                    <Button onClick={next} className="rounded-xl">
                                        Suivant <ChevronRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <motion.div
                                    key={`accent-${slides[index].key}`}
                                    initial={{ opacity: 0, scale: 0.995 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                    className="rounded-xl h-full p-4 text-center text-sm bg-white/50 backdrop-blur border border-slate-200/70"
                                >
                                    {slides[index].accent}
                                </motion.div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ---------- Overlay d'inscription ---------- */
function InscriptionOverlay({ onClose, onSent }: { onClose: () => void; onSent: () => void }) {
    return (
        <div className="relative">
            <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl md:text-3xl font-bold ${ink}`}>Inscription — Travel GC</h2>
                <Button variant="outline" onClick={onClose} className="rounded-xl">Retour</Button>
            </div>

            <div className="grid md:grid-cols-[1fr,240px] gap-6">
                <div>
                    <InscriptionForm onSent={onSent} />
                </div>
                <div className="hidden md:block">
                    <div className="rounded-xl h-full p-4 text-center text-sm bg-white/60 backdrop-blur border border-slate-200/70">
                        <ColorBlock caption="Vos infos restent privées" color="bg-teal-100 text-teal-800" />
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ---------- composants utilitaires ---------- */

function StaggerGrid({ children, cols = "md:grid-cols-2" }: { children: React.ReactNode; cols?: string }) {
    return (
        <motion.div
            className={`grid ${cols} gap-4`}
            initial="hidden"
            animate="show"
            variants={{ hidden: { opacity: 1 }, show: { transition: { staggerChildren: 0.06 } } }}
        >
            {React.Children.map(children, (child, i) => (
                <motion.div key={i} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
                    {child}
                </motion.div>
            ))}
        </motion.div>
    );
}

function PunchCard({ title, lines, icon, color }: { title: string; lines: string[]; icon?: React.ReactNode; color: string }) {
    return (
        <Card className="p-0 overflow-hidden">
            <div className={`h-1.5 w-full bg-gradient-to-r ${color}`} />
            <CardContent>
                <div className="flex items-center gap-2 mb-2 text-teal-700">
                    {icon}<span className={`font-semibold ${ink}`}>{title}</span>
                </div>
                <ul className={`text-sm ${mute} space-y-1 list-disc pl-5`}>
                    {lines.map((l, i) => <li key={i}>{l}</li>)}
                </ul>
            </CardContent>
        </Card>
    );
}

function ColorBlock({ caption, color = "bg-slate-100 text-slate-800" }: { caption: string; color?: string }) {
    return <div className={`w-full h-full flex items-center justify-center text-xs font-semibold rounded ${color}`}>{caption}</div>;
}

/* ---------- Transport animé ---------- */

function AnimatedRoute() {
    return (
        <div className={`rounded-xl p-5 ${paper}`}>
            <KawaiiRail />
            <div className="mt-4 grid sm:grid-cols-3 gap-3 text-sm">
                {[
                    { t: "Lausanne → Zurich", s: "≈ 2h (intercity)", c: "from-sky-200 to-teal-200" },
                    { t: "Zurich → Budapest", s: "≈ 12h (nuit)", c: "from-teal-200 to-rose-200" },
                    { t: "Arrivée Budapest", s: "Thermes & chill", c: "from-rose-200 to-amber-200" },
                ].map((i, k) => (
                    <div key={k} className="rounded-lg border border-slate-200/70 bg-white/70 backdrop-blur p-3">
                        <div className="flex items-center justify-between">
                            <div className="font-semibold text-slate-800">{i.t}</div>
                            <div className={`h-1.5 w-16 rounded bg-gradient-to-r ${i.c}`} />
                        </div>
                        <div className="text-xs text-slate-600 mt-1">{i.s}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function KawaiiRail() {
    const d = "M30,150 C120,90 280,90 430,150";
    const pathRef = React.useRef<SVGPathElement | null>(null);
    const lenRef = React.useRef(0);
    const [ready, setReady] = useState(false);
    const [t, setT] = useState(0);

    React.useLayoutEffect(() => {
        if (pathRef.current) {
            lenRef.current = pathRef.current.getTotalLength();
            setReady(lenRef.current > 0);
        }
    }, []);

    useEffect(() => {
        let raf: number; let last: number | undefined;
        const speed = 0.18; // boucle douce
        const tick = (ts: number) => {
            if (!ready) { raf = requestAnimationFrame(tick); return; }
            if (!last) last = ts;
            const dt = (ts - last) / 1000; last = ts;
            setT(prev => {
                let next = prev + dt * speed;
                if (next > 1) next -= 1; // boucle
                return next;
            });
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [ready]);

    const L = t * (lenRef.current || 1);
    const pt = (pathRef.current && lenRef.current > 0)
        ? pathRef.current.getPointAtLength(L)
        : ({ x: 30, y: 150 } as DOMPoint);

    return (
        <div className="relative">
            <svg viewBox="0 0 460 180" className="w-full h-[250px]">
                <defs>
                    <linearGradient id="railGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#bae6fd" />
                        <stop offset="50%" stopColor="#99f6e4" />
                        <stop offset="100%" stopColor="#c7d2fe" />
                    </linearGradient>
                    <filter id="softGlow">
                        <feGaussianBlur stdDeviation="3" result="b" />
                        <feMerge>
                            <feMergeNode in="b" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Nuages */}
                <g opacity="0.25">
                    <Cloud x={90} y={40} scale={1} />
                    <Cloud x={300} y={30} scale={0.8} />
                    <Cloud x={200} y={60} scale={1.2} />
                </g>

                {/* Rail */}
                <path ref={pathRef} d={d} fill="none" stroke="url(#railGrad)" strokeWidth="7" strokeLinecap="round" filter="url(#softGlow)" />

                {/* Gares */}
                {[{ f: 0, label: "Lausanne" }, { f: 0.45, label: "Zurich" }, { f: 1, label: "Budapest" }].map((g, i) => {
                    const P = (pathRef.current && lenRef.current)
                        ? pathRef.current.getPointAtLength(g.f * lenRef.current)
                        : ({ x: 30, y: 150 } as DOMPoint);
                    return (
                        <g key={i} transform={`translate(${P.x} ${P.y})`}>
                            <circle r="8" fill="#0f172a" />
                            <circle r="4.5" fill="#f472b6" />
                            <text x={0} y={18} textAnchor="middle" fontSize="11" fill="#475569">{g.label}</text>
                        </g>
                    );
                })}

                {/* Locomotive animée */}
                {ready && (
                    <motion.g
                        transform={`translate(${pt.x} ${pt.y})`}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <g transform="translate(22 -22) scale(-1,1)">
                            <svg width="44" height="36" viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg">
                                <g fill="none" stroke="#1f2a44" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
                                    <rect x="25" y="40" width="40" height="20" rx="4" fill="#60a5fa" />
                                    <rect x="28" y="46" width="34" height="6" rx="2" fill="#93c5fd" stroke="none" />
                                    <rect x="70" y="32" width="28" height="20" rx="3" fill="#34d399" />
                                    <rect x="75" y="36" width="18" height="10" rx="2" fill="#bae6fd" />
                                    <rect x="35" y="20" width="12" height="14" rx="2" fill="#f59e0b" />
                                    <rect x="32" y="14" width="18" height="6" rx="3" fill="#fb923c" />
                                    <circle cx="38" cy="10" r="4" fill="#e5e7eb" stroke="none" />
                                    <circle cx="46" cy="8" r="6" fill="#f3f4f6" stroke="none" />
                                    <circle cx="54" cy="11" r="5" fill="#e5e7eb" stroke="none" />
                                    <g transform="translate(120 0) scale(-1,1)">
                                        <path d="M10 75 H110" stroke="#1f2a44" />
                                        <rect x="15" y="60" width="80" height="12" rx="4" fill="#ff6b6b" />
                                        <polygon points="95,60 112,60 106,72 95,72" fill="#fb923c" />
                                        <circle cx="30" cy="72" r="9" fill="#1f2937" />
                                        <circle cx="55" cy="72" r="9" fill="#1f2937" />
                                        <circle cx="80" cy="72" r="7" fill="#1f2937" />
                                        <circle cx="30" cy="72" r="3.5" fill="#fde047" stroke="none" />
                                        <circle cx="55" cy="72" r="3.5" fill="#fde047" stroke="none" />
                                        <circle cx="80" cy="72" r="3" fill="#fde047" stroke="none" />
                                        <path d="M30 72 L55 72 L80 72" />
                                    </g>
                                </g>
                            </svg>
                        </g>
                    </motion.g>
                )}
            </svg>
        </div>
    );
}

function Cloud({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
    return (
        <g transform={`translate(${x} ${y}) scale(${scale})`}>
            <circle cx={0} cy={10} r={10} fill="#ffffff" />
            <circle cx={12} cy={8} r={12} fill="#ffffff" />
            <circle cx={24} cy={12} r={9} fill="#ffffff" />
        </g>
    );
}

/* ---------- Slide Itinéraire — V4 (ratio ajusté) ---------- */

function ItinerarySlideV4() {
    type CityKey = "budapest" | "bratislava" | "vienna";
    type City = {
        key: CityKey;
        name: string;
        flag: string;
        grad: string;
        vibe: string[];
        facts: { label: string; value: string }[];
        essentials: string[];
        civil: string[];
        chill: string[];
    };

    const cities: City[] = [
        {
            key: "budapest",
            name: "Budapest",
            flag: "🇭🇺",
            grad: "from-teal-400 to-teal-600",
            vibe: ["Bains", "Vues", "Nuit"],
            facts: [
                { label: "Arrivée", value: "Train de nuit" },
                { label: "Ambiance", value: "Thermes & Danube" },
                { label: "Budget", value: "€€" },
            ],
            essentials: ["Parlement & Pont des Chaînes", "Bains Széchenyi / Gellért", "Citadelle (vue nocturne)"],
            civil: ["Ponts du Danube (structures & phasage)", "Métro M1 (patrimoine technique)"],
            chill: ["Ruin bars (en groupe)", "Thermes le soir (option)"],
        },
        {
            key: "bratislava",
            name: "Bratislava",
            flag: "🇸🇰",
            grad: "from-amber-400 to-amber-600",
            vibe: ["Vieille ville", "Photo", "Cafés"],
            facts: [
                { label: "Depuis", value: "Budapest ~2h30" },
                { label: "Ambiance", value: "Cosy & compact" },
                { label: "Budget", value: "€" },
            ],
            essentials: ["Château & ruelles", "Rives du Danube", "Street art & cafés"],
            civil: ["Pont SNP (haubané, histoire & réno)", "Aménagements fluviaux"],
            chill: ["Cafés étudiants", "Golden hour au bord du Danube"],
        },
        {
            key: "vienna",
            name: "Vienne",
            flag: "🇦🇹",
            grad: "from-indigo-400 to-indigo-600",
            vibe: ["Musées", "Parcs", "Cafés"],
            facts: [
                { label: "Depuis", value: "Bratislava ~1h" },
                { label: "Ambiance", value: "Culture & grands axes" },
                { label: "Budget", value: "€€€" },
            ],
            essentials: ["Ring & musées", "Prater / parcs", "Cafés viennois"],
            civil: ["Donau City (urbanisme)", "U-Bahn & hubs multimodaux"],
            chill: ["Parcs fin d’aprèm", "Option concert"],
        },
    ];

    const [sel, setSel] = useState<0 | 1 | 2>(0);
    const active = cities[sel];

    return (
        <div className="space-y-6">
            {/* Sélecteur de capitale */}
            <div className="grid md:grid-cols-3 gap-3">
                {cities.map((c, i) => (
                    <button
                        key={c.key}
                        onClick={() => setSel(i as 0 | 1 | 2)}
                        className={cx(
                            "group rounded-2xl bg-white/70 backdrop-blur border border-slate-200/70 p-4 text-left transition-all",
                            i === sel ? "ring-2 ring-teal-500" : "hover:border-teal-300"
                        )}
                    >
                        <div className="flex items-center justify-between">
                            <div className="font-semibold text-slate-900 flex items-center gap-2">
                                <span>{c.name}</span><span className="text-xl">{c.flag}</span>
                            </div>
                            <div className={`h-1.5 w-16 rounded bg-gradient-to-r ${c.grad}`} />
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {c.vibe.map((v, k) => (
                                <span key={k} className="px-2 py-0.5 rounded-full text-xs bg-white/70 border border-slate-200/70 text-slate-700">
                                    {v}
                                </span>
                            ))}
                        </div>
                    </button>
                ))}
            </div>

            {/* Ruban trajet */}
            <div className="rounded-xl bg-white/60 backdrop-blur border border-slate-200/70 p-3">
                <div className="flex items-center justify-center gap-3 text-sm text-slate-700">
                    <span className="font-medium">Budapest</span>
                    <Train className="w-4 h-4 opacity-60" />
                    <span className="font-medium">Bratislava</span>
                    <Train className="w-4 h-4 opacity-60" />
                    <span className="font-medium">Vienne</span>
                </div>
            </div>

            {/* Contenu principal : gauche réduit, droite augmentée */}
            <div className="grid lg:grid-cols-[0.85fr,1.15fr] xl:grid-cols-[0.78fr,1.22fr] gap-4">
                {/* Colonne gauche (compact) */}
                <div className="rounded-2xl overflow-hidden bg-white/70 backdrop-blur border border-slate-200/70 shadow-lg shadow-slate-900/5">
                    <div className={`h-20 w-full bg-gradient-to-r ${active.grad}`} />
                    <div className="p-3 sm:p-4 space-y-4">
                        <section>
                            <h3 className="text-slate-900 font-semibold mb-2">Incontournables</h3>
                            <ul className="text-sm text-slate-700 space-y-1 list-disc pl-5 break-words">
                                {active.essentials.map((p, k) => <li key={k}>{p}</li>)}
                            </ul>
                        </section>
                        <section>
                            <h3 className="text-slate-900 font-semibold mb-2">Angle génie civil</h3>
                            <ul className="text-sm text-slate-700 space-y-1 list-disc pl-5 break-words">
                                {active.civil.map((p, k) => <li key={k}>{p}</li>)}
                            </ul>
                        </section>
                        <section>
                            <h3 className="text-slate-900 font-semibold mb-2">Moments chill</h3>
                            <ul className="text-sm text-slate-700 space-y-1 list-disc pl-5 break-words">
                                {active.chill.map((p, k) => <li key={k}>{p}</li>)}
                            </ul>
                        </section>
                    </div>
                </div>

                {/* Colonne droite (plus large, wrap propre) */}
                <div className="space-y-4 min-w-0">
                    <div className="rounded-2xl bg-white/70 backdrop-blur border border-slate-200/70 p-5 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div className="font-semibold text-slate-900 flex items-center gap-2 min-w-0">
                                <span className="truncate">{active.name}</span> <span className="shrink-0">{active.flag}</span>
                            </div>
                            <div className={`h-1.5 w-16 rounded bg-gradient-to-r ${active.grad}`} />
                        </div>
                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {active.facts.map((f, i) => (
                                <div key={i} className="rounded-lg bg-white/70 border border-slate-200/70 px-3 py-2 min-w-0">
                                    <div className="text-[11px] uppercase tracking-wide text-slate-500 break-words">{f.label}</div>
                                    <div className="text-sm text-slate-800 font-medium break-words">{f.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-2xl bg-white/60 backdrop-blur border border-slate-200/70 p-4 sm:p-5">
                        <div className="text-sm text-slate-700 break-words">
                            Astuce : garder un créneau libre en fin d’après-midi pour se poser et profiter de l’ambiance locale.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ---------- Itinéraire & moments forts (anciens composants conservés) ---------- */

function ItineraryInteractive() {
    const cities = [
        { key: "budapest", name: "Budapest", flag: "🇭🇺", color: "from-teal-400 to-teal-600", notes: ["Thermes Széchenyi/Gellért", "Parlement & Danube", "Ruin bars conviviaux"], tags: ["Bains", "Vues", "Nuit"] },
        { key: "bratislava", name: "Bratislava", flag: "🇸🇰", color: "from-amber-400 to-amber-600", notes: ["Vieille ville", "Château & ruelles", "Cafés étudiants"], tags: ["Chill", "Photos", "Cafés"] },
        { key: "vienna", name: "Vienne", flag: "🇦🇹", color: "from-indigo-400 to-indigo-600", notes: ["Musées & palais", "Parcs", "Cafés viennois"], tags: ["Culture", "Parcs", "Cafés"] },
    ];
    const [sel, setSel] = useState(0);

    return (
        <div className="space-y-5">
            <div className="grid md:grid-cols-3 gap-4">
                {cities.map((c, i) => (
                    <motion.button key={c.key} onClick={() => setSel(i)} whileHover={{ y: -2 }}
                        className={`text-left rounded-xl border border-slate-200/70 p-4 bg-white/70 backdrop-blur ${i === sel ? "ring-2 ring-teal-500" : "hover:border-teal-300"}`}>
                        <div className="flex items-center justify-between">
                            <div className="font-semibold text-slate-900 flex items-center gap-2">
                                <span>{c.name}</span><span className="text-xl">{c.flag}</span>
                            </div>
                            <div className={`h-2 w-16 rounded bg-gradient-to-r ${c.color}`} />
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {c.tags.map((t, k) => (
                                <span key={k} className="px-2 py-0.5 rounded-full text-xs bg-white/70 border border-slate-200/70 text-slate-700">{t}</span>
                            ))}
                        </div>
                    </motion.button>
                ))}
            </div>

            <div className="px-2">
                <div className="h-1 rounded bg-slate-200/80">
                    <div className="h-full rounded bg-gradient-to-r from-teal-500 to-indigo-500" style={{ width: `${((sel + 1) / cities.length) * 100}%` }} />
                </div>
                <div className="mt-1 text-xs text-slate-500">Étape {sel + 1} sur {cities.length}</div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div key={cities[sel].key} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}
                    className="rounded-xl border border-slate-200/70 p-5 bg-white/70 backdrop-blur">
                    <div className="flex items-start gap-4">
                        <div className={`h-10 w-10 rounded-md bg-gradient-to-br ${cities[sel].color} text-white grid place-items-center`}>
                            <Map className="w-4 h-4" />
                        </div>
                        <div>
                            <div className="font-semibold text-slate-900 text-lg">{cities[sel].name}</div>
                            <ul className="mt-2 text-sm text-slate-700 space-y-1 list-disc pl-5">
                                {cities[sel].notes.map((n, i) => <li key={i}>{n}</li>)}
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

function HighlightsGrid() {
    const items = [
        { title: "Bains sous les étoiles", desc: "Soirée aux thermes, ambiance unique (safe & chill)", color: "from-rose-300 to-rose-500", icon: <Bath className="w-5 h-5" /> },
        { title: "Couché de soleil sur le Danube", desc: "Point de vue à couper le souffle", color: "from-amber-300 to-orange-500", icon: <Sparkles className="w-5 h-5" /> },
        { title: "Vieux quartiers & cafés", desc: "Ruelles de Bratislava, cafés cosy", color: "from-teal-300 to-teal-500", icon: <Map className="w-5 h-5" /> },
        { title: "Museums & chill à Vienne", desc: "Culture la journée, parc en fin d’aprèm", color: "from-indigo-300 to-indigo-500", icon: <Train className="w-5 h-5" /> },
    ];
    return (
        <StaggerGrid cols="md:grid-cols-2">
            {items.map((it, i) => (
                <motion.div key={i} whileHover={{ y: -2 }} className="rounded-2xl border border-slate-200/70 overflow-hidden bg-white/70 backdrop-blur">
                    <div className={`h-1.5 w-full bg-gradient-to-r ${it.color}`} />
                    <div className="p-5">
                        <div className="flex items-center gap-2 text-slate-800 font-semibold">{it.icon}{it.title}</div>
                        <p className="mt-1 text-sm text-slate-700">{it.desc}</p>
                    </div>
                </motion.div>
            ))}
        </StaggerGrid>
    );
}

/* ---------- Formulaire d'inscription ---------- */

function InscriptionForm({ onSent }: { onSent?: () => void }) {
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [sciper, setSciper] = useState("");
    const [engage, setEngage] = useState(false);
    const [sending, setSending] = useState(false);
    const [ok, setOk] = useState<string | null>(null);
    const [err, setErr] = useState<string | null>(null);
    const [website, setWebsite] = useState(""); // honeypot anti-spam

    const validEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());
    const validSciper = (s: string) => /^\d{6,7}$/.test(s.trim());

    const canSend =
        prenom.trim().length > 1 &&
        nom.trim().length > 1 &&
        validEmail(email) &&
        validSciper(sciper) &&
        engage &&
        !sending;

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setOk(null); setErr(null);
        if (!canSend) return;
        if (website) return; // bot détecté

        try {
            setSending(true);
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    prenom: prenom.trim(),
                    nom: nom.trim(),
                    email: email.trim(),
                    sciper: sciper.trim(),
                    engage: engage ? "Oui, je m’engage" : "Non",
                    reply_to: email.trim(),
                },
                { publicKey: EMAILJS_PUBLIC_KEY }
            );
            setOk("Inscription envoyée ✅ Vérifie ta boîte mail.");
            setPrenom(""); setNom(""); setEmail(""); setSciper(""); setEngage(false);
            onSent?.();
        } catch (e) {
            console.error(e);
            setErr("Oups, l’envoi a échoué. Réessaie dans un instant.");
        } finally {
            setSending(false);
        }
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            {/* Honeypot caché */}
            <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
            />

            <div className="grid md:grid-cols-2 gap-4">
                <label className="text-sm">
                    <div className="mb-1 text-slate-700">Prénom *</div>
                    <input
                        className="w-full px-4 py-2 rounded-lg bg-white/70 border border-slate-200/70 focus:outline-none focus:border-teal-500"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        placeholder="Alex"
                        required
                    />
                </label>
                <label className="text-sm">
                    <div className="mb-1 text-slate-700">Nom *</div>
                    <input
                        className="w-full px-4 py-2 rounded-lg bg-white/70 border border-slate-200/70 focus:outline-none focus:border-teal-500"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        placeholder="Martin"
                        required
                    />
                </label>
            </div>

            <label className="text-sm">
                <div className="mb-1 text-slate-700">Email *</div>
                <input
                    type="email"
                    className={`w-full px-4 py-2 rounded-lg bg-white/70 border ${email && !validEmail(email) ? "border-rose-400" : "border-slate-200/70"} focus:outline-none focus:border-teal-500`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="prenom.nom@epfl.ch"
                    required
                />
                {email && !validEmail(email) && <div className="text-rose-600 text-xs mt-1">Email invalide</div>}
            </label>

            <label className="text-sm">
                <div className="mb-1 text-slate-700">SCIPER *</div>
                <input
                    inputMode="numeric"
                    className={`w-full px-4 py-2 rounded-lg bg-white/70 border ${sciper && !validSciper(sciper) ? "border-rose-400" : "border-slate-200/70"} focus:outline-none focus:border-teal-500`}
                    value={sciper}
                    onChange={(e) => setSciper(e.target.value)}
                    placeholder="123456"
                    required
                />
                {sciper && !validSciper(sciper) && <div className="text-rose-600 text-xs mt-1">6–7 chiffres attendus</div>}
            </label>

            <label className="flex items-start gap-3 text-sm">
                <input type="checkbox" className="mt-1" checked={engage} onChange={(e) => setEngage(e.target.checked)} required />
                <span>
                    Je m’engage à respecter le règlement du Travel GC et à participer aux activités prévues
                    (assurances, comportement, horaires, etc.).
                </span>
            </label>

            <div className="flex gap-3">
                <Button type="submit" disabled={!canSend} className="rounded-xl px-6">
                    {sending ? "Envoi en cours…" : "Envoyer mon inscription"}
                </Button>
            </div>

            {ok && <p className="text-green-600 text-sm">{ok}</p>}
            {err && <p className="text-rose-600 text-sm">{err}</p>}
        </form>
    );
}

// ---- App wrapper ----
export default function App() {
    return <TravelGCDeck />;
}
