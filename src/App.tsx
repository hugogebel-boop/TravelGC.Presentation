import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Train, Map, Bath, Users, CheckCircle2,
    ChevronLeft, ChevronRight, PartyPopper, Sparkles, Route as RouteIcon
} from "lucide-react";
import { Button, Card, CardContent } from "./ui";

// Styles utilitaires
const paper = "bg-white border border-stone-200 shadow-md";
const ink = "text-stone-900";
const mute = "text-stone-700";
const head = "text-3xl md:text-5xl font-extrabold tracking-tight";
const sub = `text-base md:text-lg ${mute}`;

type Slide = { key: string; title?: React.ReactNode; body: React.ReactNode; accent?: React.ReactNode };

export default function TravelGCDeck() {
    const [index, setIndex] = useState(0);

    const slides: Slide[] = useMemo(() => [
        {
            key: "intro",
            title: (
                <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold">GC</span>
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
                                className="px-3 py-1.5 rounded-full text-sm bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-900 border border-emerald-200"
                                variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}
                            >
                                <span className="inline-flex items-center gap-2">{c.icon}{c.label}</span>
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>
            ),
            accent: <ColorBlock caption="Logo TRAVEL GC" />,
        },
        {
            key: "why",
            title: "Pourquoi ce voyage ?",
            body: (
                <StaggerGrid>
                    <PunchCard
                        title="Un seul voyage, 3 capitales"
                        color="from-emerald-100 to-emerald-200"
                        icon={<RouteIcon className="w-5 h-5" />}
                        lines={["Budapest (HU) → Bratislava (SK) → Vienne (AT)", "Trajets courts, plus de temps sur place"]}
                    />
                    <PunchCard
                        title="Budget étudiant"
                        color="from-amber-100 to-amber-200"
                        icon={<CheckCircle2 className="w-5 h-5" />}
                        lines={["Hébergements simples & bien situés", "Activités et restos abordables"]}
                    />
                    <PunchCard
                        title="Transport facile"
                        color="from-blue-100 to-blue-200"
                        icon={<Train className="w-5 h-5" />}
                        lines={["Lausanne→Zurich ≈ 2h", "Zurich→Budapest ≈ 12h (nuit)"]}
                    />
                    <PunchCard
                        title="Rythme équilibré"
                        color="from-pink-100 to-pink-200"
                        icon={<Bath className="w-5 h-5" />}
                        lines={["Culture le jour, détente en fin d'aprèm", "Soirées conviviales (safe & groupées)"]}
                    />
                </StaggerGrid>
            ),
            accent: <ColorBlock caption="Schéma rapide du parcours" color="bg-emerald-100 text-emerald-900" />,
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
            accent: <ColorBlock caption="Train de nuit – couchettes" color="bg-blue-100 text-blue-800" />,
        },
        {
            key: "itinerary",
            title: "Notre itinéraire",
            body: <ItineraryInteractive />,
            accent: <ColorBlock caption="Carte stylisée" color="bg-emerald-100 text-emerald-800" />,
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
                        Rejoignez TRAVEL GC <PartyPopper className="w-7 h-7 text-pink-500" />
                    </p>
                    <p className={`${sub}`}>Places limitées · priorité aux étudiant·e·s EPFL (ou équivalent).</p>
                    <div className="flex flex-wrap items-center gap-3">
                        <Button className="rounded-xl px-6 text-base bg-pink-600 hover:bg-pink-500 text-white">Je m’inscris</Button>
                        <Button variant="outline" className="rounded-xl px-6 text-base border-emerald-400 text-emerald-700">
                            Recevoir le programme détaillé
                        </Button>
                    </div>
                </div>
            ),
            accent: <ColorBlock caption="QR code inscription (à insérer)" color="bg-pink-100 text-pink-700" />,
        },
    ], []);

    const next = () => setIndex(i => Math.min(i + 1, slides.length - 1));
    const prev = () => setIndex(i => Math.max(i - 1, 0));

    const progress = ((index + 1) / slides.length) * 100;

    return (
        <div className="relative min-h-[80vh] w-full font-sans bg-gradient-to-b from-stone-50 via-emerald-50 to-amber-50">
            <div className="relative max-w-6xl mx-auto p-4 md:p-8">
                {/* Header */}
                <div className="mb-3 rounded-xl p-3 md:p-4 flex items-center justify-between bg-gradient-to-r from-emerald-100 to-blue-100 border border-stone-200">
                    <div className="flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold">GC</span>
                        <div>
                            <div className={`font-semibold ${ink}`}>TRAVEL GC</div>
                            <div className={`text-xs ${mute}`}>Voyage étudiant organisé · 30 sept. 2025</div>
                        </div>
                    </div>
                    <div className={`hidden md:flex items-center gap-2 text-xs ${mute}`}>
                        <span>←/→ pour naviguer</span>
                    </div>
                </div>

                {/* Progression */}
                <div className="mb-6 h-2 rounded-full bg-stone-200 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-pink-500" style={{ width: `${progress}%` }} />
                </div>

                {/* Slide */}
                <div className={`rounded-2xl p-6 md:p-10 ${paper}`}>
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
                                <Button variant="outline" onClick={prev} className="rounded-xl border-emerald-400 text-emerald-700">
                                    <ChevronLeft className="w-4 h-4 mr-2" /> Précédent
                                </Button>
                                <Button onClick={next} className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white">
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
                                className="rounded-xl h-full p-4 text-center text-sm bg-gradient-to-br from-amber-50 to-pink-50 border border-stone-200"
                            >
                                {slides[index].accent}
                            </motion.div>
                        </div>
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
        <Card className={`${paper} p-0 overflow-hidden`}>
            <div className={`h-1.5 w-full bg-gradient-to-r ${color}`} />
            <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2 text-emerald-700">
                    {icon}<span className={`font-semibold ${ink}`}>{title}</span>
                </div>
                <ul className={`text-sm ${mute} space-y-1 list-disc pl-5`}>
                    {lines.map((l, i) => <li key={i}>{l}</li>)}
                </ul>
            </CardContent>
        </Card>
    );
}

function ColorBlock({ caption, color = "bg-emerald-100 text-emerald-800" }: { caption: string; color?: string }) {
    return <div className={`w-full h-full flex items-center justify-center text-xs font-semibold rounded ${color}`}>{caption}</div>;
}

/* ---------- Transport animé kawaii ---------- */

function AnimatedRoute() {
    return (
        <div className={`rounded-xl p-5 ${paper}`}>
            <KawaiiRail />
            <div className="mt-4 grid sm:grid-cols-3 gap-3 text-sm">
                {[
                    { t: "Lausanne → Zurich", s: "≈ 2h (intercity)", c: "from-sky-200 to-emerald-200" },
                    { t: "Zurich → Budapest", s: "≈ 12h (nuit)", c: "from-emerald-200 to-pink-200" },
                    { t: "Arrivée Budapest", s: "Thermes & chill", c: "from-pink-200 to-amber-200" },
                ].map((i, k) => (
                    <div key={k} className="rounded-lg border border-stone-200 p-3 bg-white/90">
                        <div className="flex items-center justify-between">
                            <div className="font-semibold text-stone-800">{i.t}</div>
                            <div className={`h-1.5 w-16 rounded bg-gradient-to-r ${i.c}`} />
                        </div>
                        <div className="text-xs text-stone-600 mt-1">{i.s}</div>
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
                        <stop offset="50%" stopColor="#bbf7d0" />
                        <stop offset="100%" stopColor="#fecdd3" />
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

                {/* Train chibi */}
                {ready && (
                    <motion.g transform={`translate(${pt.x} ${pt.y})`} animate={{ scale: 1 }} transition={{ duration: 0.2 }}>
                        <rect x={-11} y={-9} rx={6} ry={6} width={22} height={18} fill="#0f172a" />
                        <rect x={-9} y={-7} rx={4} ry={4} width={18} height={14} fill="#ffffff" />
                        <circle cx={-3.5} cy={-1.5} r={1.2} fill="#0f172a" />
                        <circle cx={3.5} cy={-1.5} r={1.2} fill="#0f172a" />
                        <path d="M-4,2 Q0,5 4,2" stroke="#f472b6" strokeWidth="1.5" fill="none" strokeLinecap="round" />
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

/* ---------- Itinéraire & moments forts ---------- */

function ItineraryInteractive() {
    const cities = [
        { key: "budapest", name: "Budapest", flag: "🇭🇺", color: "from-emerald-400 to-emerald-600", notes: ["Thermes Széchenyi/Gellért", "Parlement & Danube", "Ruin bars conviviaux"], tags: ["Bains", "Vues", "Nuit"] },
        { key: "bratislava", name: "Bratislava", flag: "🇸🇰", color: "from-amber-400 to-amber-600", notes: ["Vieille ville compacte", "Château & ruelles", "Cafés étudiants"], tags: ["Chill", "Photos", "Cafés"] },
        { key: "vienna", name: "Vienne", flag: "🇦🇹", color: "from-blue-400 to-blue-600", notes: ["Musées & palais", "Parcs", "Cafés viennois"], tags: ["Culture", "Parcs", "Cafés"] },
    ];
    const [sel, setSel] = useState(0);

    return (
        <div className="space-y-5">
            <div className="grid md:grid-cols-3 gap-4">
                {cities.map((c, i) => (
                    <motion.button key={c.key} onClick={() => setSel(i)} whileHover={{ y: -2 }}
                        className={`text-left rounded-xl border border-stone-200 p-4 bg-white ${i === sel ? "ring-2 ring-emerald-500" : "hover:border-emerald-300"}`}>
                        <div className="flex items-center justify-between">
                            <div className="font-semibold text-stone-900 flex items-center gap-2">
                                <span>{c.name}</span><span className="text-xl">{c.flag}</span>
                            </div>
                            <div className={`h-2 w-16 rounded bg-gradient-to-r ${c.color}`} />
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {c.tags.map((t, k) => (
                                <span key={k} className="px-2 py-0.5 rounded-full text-xs bg-stone-100 text-stone-700 border border-stone-200">{t}</span>
                            ))}
                        </div>
                    </motion.button>
                ))}
            </div>

            <div className="px-2">
                <div className="h-1 rounded bg-stone-200">
                    <div className="h-full rounded bg-gradient-to-r from-emerald-500 to-pink-500" style={{ width: `${((sel + 1) / cities.length) * 100}%` }} />
                </div>
                <div className="mt-1 text-xs text-stone-500">Étape {sel + 1} sur {cities.length}</div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div key={cities[sel].key} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}
                    className="rounded-xl border border-stone-200 p-5 bg-white">
                    <div className="flex items-start gap-4">
                        <div className={`h-10 w-10 rounded-md bg-gradient-to-br ${cities[sel].color} text-white grid place-items-center`}>
                            <Map className="w-4 h-4" />
                        </div>
                        <div>
                            <div className="font-semibold text-stone-900 text-lg">{cities[sel].name}</div>
                            <ul className="mt-2 text-sm text-stone-700 space-y-1 list-disc pl-5">
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
        { title: "Bains sous les étoiles", desc: "Soirée aux thermes, ambiance unique (safe & chill)", color: "from-pink-400 to-rose-500", icon: <Bath className="w-5 h-5" /> },
        { title: "Couché de soleil sur le Danube", desc: "Point de vue à couper le souffle", color: "from-amber-400 to-orange-500", icon: <Sparkles className="w-5 h-5" /> },
        { title: "Vieux quartiers & cafés", desc: "Ruelles de Bratislava, cafés cosy", color: "from-emerald-400 to-teal-500", icon: <Map className="w-5 h-5" /> },
        { title: "Museums & chill à Vienne", desc: "Culture la journée, parc en fin d’aprèm", color: "from-blue-400 to-indigo-500", icon: <RouteIcon className="w-5 h-5" /> },
    ];
    return (
        <StaggerGrid cols="md:grid-cols-2">
            {items.map((it, i) => (
                <motion.div key={i} whileHover={{ y: -2 }} className="rounded-xl border border-stone-200 overflow-hidden bg-white">
                    <div className={`h-1.5 w-full bg-gradient-to-r ${it.color}`} />
                    <div className="p-5">
                        <div className="flex items-center gap-2 text-stone-800 font-semibold">{it.icon}{it.title}</div>
                        <p className="mt-1 text-sm text-stone-700">{it.desc}</p>
                    </div>
                </motion.div>
            ))}
        </StaggerGrid>
    );
}
