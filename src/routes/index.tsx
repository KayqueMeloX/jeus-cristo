import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Heart,
  BookOpen,
  Sparkles,
  Copy,
  Check,
  Sun,
  HandHeart,
  MessageSquare,
  Send,
  Star,
  Quote,
  Flame,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Jesus Cristo - Luz, Esperança e Amor" },
      {
        name: "description",
        content:
          "Encontre paz, reflexões, versículos bíblicos diários e orações para fortalecer sua fé.",
      },
    ],
  }),
});

interface Verse {
  text: string;
  reference: string;
  theme: string;
}

const VERSES: Verse[] = [
  {
    text: "Eu sou o caminho, a verdade e a vida; ninguém vem ao Pai, a não ser por mim.",
    reference: "João 14:6",
    theme: "Esperança & Direção",
  },
  {
    text: "Venham a mim todos vocês que estão cansados e sobrecarregados, e eu lhes darei descanso.",
    reference: "Mateus 11:28",
    theme: "Paz & Alívio",
  },
  {
    text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
    reference: "João 3:16",
    theme: "Amor Divino",
  },
  {
    text: "Tudo posso naquele que me fortalece.",
    reference: "Filipenses 4:13",
    theme: "Fortaleza & Fé",
  },
  {
    text: "O Senhor é o meu pastor; de nada terei falta. Em verdes pastagens me faz repousar e me conduz a águas tranquilas.",
    reference: "Salmos 23:1-2",
    theme: "Provisão & Cuidado",
  },
  {
    text: "Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus; eu te fortaleço, e te ajudo, e te sustento com a destra da minha justiça.",
    reference: "Isaías 41:10",
    theme: "Coragem & Proteção",
  },
  {
    text: "O meu mandamento é este: amem-se uns aos outros como eu os amei.",
    reference: "João 15:12",
    theme: "Fraternidade & Amor",
  },
];

const TEACHINGS = [
  {
    title: "O Sermão do Monte",
    badge: "Mateus 5-7",
    summary:
      "A essência dos ensinamentos de Jesus: humildade, mansidão, busca pela justiça, misericórdia e pureza de coração.",
    highlight: "Vocês são a luz do mundo. Não se pode esconder uma cidade construída sobre um monte.",
    icon: Sparkles,
  },
  {
    title: "A Parábola do Bom Samaritano",
    badge: "Lucas 10:25-37",
    summary:
      "Uma lição eterna sobre empatia, compaixão ativa e estender a mão a quem precisa, superando barreiras e preconceitos.",
    highlight: "Vá e faça o mesmo: ame o seu próximo como a si mesmo.",
    icon: HandHeart,
  },
  {
    title: "O Filho Pródigo",
    badge: "Lucas 15:11-32",
    summary:
      "A demonstração suprema do perdão incondicional e dos braços abertos do Pai para cada um de nós que decide voltar.",
    highlight: "Este meu filho estava morto e reviveu; tinha se perdido e foi achado.",
    icon: Heart,
  },
  {
    title: "O Bom Pastor",
    badge: "João 10:11-18",
    summary:
      "Jesus se apresenta como o pastor zeloso que conhece cada ovelha pelo nome e dá a própria vida pelo seu rebanho.",
    highlight: "Eu conheço as minhas ovelhas, e elas me conhecem.",
    icon: ShieldCheck,
  },
];

const PRAYERS = [
  {
    title: "Oração do Pai Nosso",
    subtitle: "A oração ensinada por Jesus Cristo",
    content:
      "Pai nosso, que estás nos céus, santificado seja o teu nome. Venha o teu reino. Seja feita a tua vontade, assim na terra como no céu. O pão nosso de cada dia nos dá hoje. Perdoa-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido. E não nos deixes cair em tentação, mas livra-nos do mal. Pois teu é o reino, o poder e a glória para sempre. Amém.",
  },
  {
    title: "Oração pela Paz Interior",
    subtitle: "Para momentos de ansiedade e busca por serenidade",
    content:
      "Senhor Jesus, entrego em Tuas mãos todas as minhas preocupações, inquietações e fardos. Acalma as tempestades do meu coração e enche minha mente com a Tua paz que excede todo entendimento. Que a Tua presença seja o meu refúgio e minha segurança hoje e sempre. Amém.",
  },
  {
    title: "Oração de Agradecimento",
    subtitle: "Cultivando a gratidão pelo dom da vida",
    content:
      "Senhor, obrigado pelo dom da vida, pelo fôlego deste dia e pelas Tuas misericórdias que se renovam a cada manhã. Agradeço pelas bênçãos visíveis e pelas invisíveis que preparas para mim. Que meu coração seja sempre grato e fiel ao Teu amor. Amém.",
  },
];

interface PrayerRequest {
  id: number;
  name: string;
  request: string;
  prayersCount: number;
  hasPrayed: boolean;
  time: string;
}

const INITIAL_REQUESTS: PrayerRequest[] = [
  {
    id: 1,
    name: "Maria Silva",
    request: "Peço orações pela saúde da minha mãe e restauração de toda a nossa família.",
    prayersCount: 24,
    hasPrayed: false,
    time: "Hoje às 09:30",
  },
  {
    id: 2,
    name: "Lucas Mendes",
    request: "Agradeço a Deus por uma nova oportunidade de emprego alcançada nesta semana!",
    prayersCount: 42,
    hasPrayed: false,
    time: "Hoje às 08:15",
  },
  {
    id: 3,
    name: "Ana Beatriz",
    request: "Oração por paz e discernimento nas decisões importantes da minha vida.",
    prayersCount: 19,
    hasPrayed: false,
    time: "Ontem às 21:00",
  },
];

function Index() {
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"ensinamentos" | "oracoes" | "mural">("ensinamentos");
  
  // Mural de orações
  const [requests, setRequests] = useState<PrayerRequest[]>(INITIAL_REQUESTS);
  const [newName, setNewName] = useState("");
  const [newRequest, setNewRequest] = useState("");

  const activeVerse = VERSES[currentVerseIndex];

  const handleNextVerse = () => {
    setCurrentVerseIndex((prev) => (prev + 1) % VERSES.length);
    setCopied(false);
  };

  const handleCopyVerse = () => {
    const textToCopy = `"${activeVerse.text}" — ${activeVerse.reference}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrayFor = (id: number) => {
    setRequests((prev) =>
      prev.map((req) => {
        if (req.id === id) {
          const hasPrayed = !req.hasPrayed;
          return {
            ...req,
            hasPrayed,
            prayersCount: hasPrayed ? req.prayersCount + 1 : req.prayersCount - 1,
          };
        }
        return req;
      })
    );
  };

  const handleAddRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRequest.trim()) return;

    const newItem: PrayerRequest = {
      id: Date.now(),
      name: newName.trim() || "Irmão em Fé",
      request: newRequest.trim(),
      prayersCount: 1,
      hasPrayed: true,
      time: "Agora mesmo",
    };

    setRequests([newItem, ...requests]);
    setNewName("");
    setNewRequest("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/40 via-background to-amber-50/20 text-foreground">
      {/* Top Header / Navigation */}
      <header className="sticky top-0 z-40 border-b border-amber-100/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500/10 text-amber-600">
              <Sun className="h-5 w-5" />
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-tight text-amber-950 dark:text-amber-100">
                Jesus Cristo
              </span>
              <span className="hidden text-xs text-muted-foreground sm:inline-block sm:ml-2">
                Caminho, Verdade e Vida
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setActiveTab("ensinamentos")}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition sm:text-sm ${
                activeTab === "ensinamentos"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-muted-foreground hover:bg-amber-100/50 hover:text-foreground"
              }`}
            >
              Ensinamentos
            </button>
            <button
              onClick={() => setActiveTab("oracoes")}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition sm:text-sm ${
                activeTab === "oracoes"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-muted-foreground hover:bg-amber-100/50 hover:text-foreground"
              }`}
            >
              Orações
            </button>
            <button
              onClick={() => setActiveTab("mural")}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition sm:text-sm ${
                activeTab === "mural"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-muted-foreground hover:bg-amber-100/50 hover:text-foreground"
              }`}
            >
              Mural de Fé
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl border border-amber-200/60 bg-gradient-to-br from-amber-100/70 via-amber-50/50 to-white p-8 text-center shadow-sm sm:p-14">
          <div className="mx-auto inline-flex items-center gap-1.5 rounded-full border border-amber-300/60 bg-amber-200/40 px-3.5 py-1 text-xs font-semibold text-amber-900">
            <Flame className="h-3.5 w-3.5 text-amber-600" />
            Palavra de Esperança e Paz
          </div>

          <h1 className="mt-5 font-serif text-3xl font-bold tracking-tight text-amber-950 sm:text-5xl">
            "Eu sou o caminho, a verdade e a vida"
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-amber-900/80 sm:text-lg">
            Um espaço sagrado para alimentar seu espírito, encontrar consolo em momentos difíceis e
            se conectar com o amor transformador de Cristo.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                setActiveTab("oracoes");
                window.scrollTo({ top: 600, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700"
            >
              <Heart className="h-4 w-4" />
              Momentos de Oração
            </button>
            <button
              onClick={() => {
                setActiveTab("mural");
                window.scrollTo({ top: 600, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-full border border-amber-300/80 bg-white/80 px-6 py-2.5 text-sm font-semibold text-amber-950 shadow-sm transition hover:bg-white"
            >
              <MessageSquare className="h-4 w-4 text-amber-600" />
              Pedir Oração
            </button>
          </div>
        </div>

        {/* Versículo Inspirador Diário */}
        <section className="mt-10">
          <div className="relative overflow-hidden rounded-2xl border border-amber-200/80 bg-card p-6 shadow-sm transition hover:shadow-md sm:p-8">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <Quote className="h-5 w-5 text-amber-600" />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Versículo em Destaque
                </span>
                <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                  {activeVerse.theme}
                </span>
              </div>
              <button
                onClick={handleCopyVerse}
                className="inline-flex items-center gap-1.5 rounded-lg border border-input bg-background px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-accent"
                title="Copiar versículo"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-green-600" />
                    <span className="text-green-600">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>

            <div className="py-6 text-center">
              <p className="font-serif text-xl font-medium leading-relaxed text-foreground sm:text-2xl sm:leading-loose">
                "{activeVerse.text}"
              </p>
              <p className="mt-3 text-sm font-semibold text-amber-600 sm:text-base">
                — {activeVerse.reference}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-border pt-4">
              <span className="text-xs text-muted-foreground">
                Versículo {currentVerseIndex + 1} de {VERSES.length}
              </span>
              <button
                onClick={handleNextVerse}
                className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-4 py-1.5 text-xs font-medium text-amber-700 transition hover:bg-amber-500/20"
              >
                <span>Próximo Versículo</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* Dynamic Content Based on Active Tab */}
        <div className="mt-12">
          {activeTab === "ensinamentos" && (
            <section className="space-y-6">
              <div className="text-center">
                <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
                  Ensinamentos e Parábolas
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Lições eternas de amor, perdão e serviço que transformam vidas há mais de dois mil anos.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {TEACHINGS.map((teaching) => {
                  const Icon = teaching.icon;
                  return (
                    <div
                      key={teaching.title}
                      className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:border-amber-300 hover:shadow-md"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 group-hover:bg-amber-500/20">
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground">
                            {teaching.badge}
                          </span>
                        </div>

                        <h3 className="mt-4 font-serif text-xl font-bold text-foreground">
                          {teaching.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {teaching.summary}
                        </p>
                      </div>

                      <div className="mt-5 rounded-xl border-l-2 border-amber-500 bg-amber-50/50 p-3 text-xs italic text-amber-900">
                        "{teaching.highlight}"
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {activeTab === "oracoes" && (
            <section className="space-y-6">
              <div className="text-center">
                <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
                  Orações para o seu Dia
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Reserve um momento em silêncio para falar com Deus e renovar suas forças.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {PRAYERS.map((prayer) => (
                  <div
                    key={prayer.title}
                    className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm"
                  >
                    <div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                        <Star className="h-4 w-4" />
                      </div>
                      <h3 className="mt-4 font-serif text-lg font-bold text-foreground">
                        {prayer.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">{prayer.subtitle}</p>

                      <p className="mt-4 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        {prayer.content}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-border pt-3 text-right">
                      <span className="text-xs font-serif font-semibold text-amber-700">Amém</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === "mural" && (
            <section className="space-y-8">
              <div className="text-center">
                <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
                  Mural de Fé e Intercessão
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Compartilhe seu pedido de oração ou motivo de gratidão e oremos uns pelos outros.
                </p>
              </div>

              {/* Form de novo pedido */}
              <form
                onSubmit={handleAddRequest}
                className="mx-auto max-w-xl rounded-2xl border border-amber-200/80 bg-card p-6 shadow-sm"
              >
                <h3 className="text-base font-semibold text-foreground">Escrever no Mural</h3>
                <div className="mt-4 space-y-3">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Seu nome (opcional)"
                    className="w-full rounded-lg border border-input bg-background px-3.5 py-2 text-sm outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                  <textarea
                    rows={3}
                    value={newRequest}
                    onChange={(e) => setNewRequest(e.target.value)}
                    placeholder="Escreva seu pedido de oração ou gratidão..."
                    required
                    className="w-full rounded-lg border border-input bg-background px-3.5 py-2 text-sm outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700"
                  >
                    <Send className="h-4 w-4" />
                    Publicar Pedido de Oração
                  </button>
                </div>
              </form>

              {/* Lista de pedidos */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {requests.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground">{item.name}</span>
                        <span>{item.time}</span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        "{item.request}"
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                      <span className="text-xs text-muted-foreground">
                        {item.prayersCount} {item.prayersCount === 1 ? "oração" : "orações"}
                      </span>
                      <button
                        onClick={() => handlePrayFor(item.id)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition ${
                          item.hasPrayed
                            ? "bg-amber-100 text-amber-800"
                            : "border border-input hover:bg-accent"
                        }`}
                      >
                        <Heart
                          className={`h-3.5 w-3.5 ${
                            item.hasPrayed ? "fill-amber-600 text-amber-600" : "text-muted-foreground"
                          }`}
                        />
                        <span>{item.hasPrayed ? "Orando" : "Orar por isto"}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-border bg-amber-50/20 py-8 text-center text-xs text-muted-foreground">
        <p className="font-serif text-sm font-medium text-amber-950 dark:text-amber-100">
          "A paz vos deixo, a minha paz vos dou." — João 14:27
        </p>
        <p className="mt-1">Construído com fé e dedicação no Antigravity & Lovable.</p>
      </footer>
    </div>
  );
}
