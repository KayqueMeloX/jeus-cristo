import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listSupportMessages, replySupportMessage } from "@/lib/api/support-admin.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/supportemail")({
  component: SupportInbox,
  head: () => ({
    meta: [
      { title: "Support Inbox — My Faith Sanctuary" },
      { name: "description", content: "Private inbox for customer support messages." },
      { property: "og:title", content: "Support Inbox — My Faith Sanctuary" },
      { property: "og:description", content: "Private inbox for customer support messages." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

type Msg = Awaited<ReturnType<typeof listSupportMessages>>[number];

function SupportInbox() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState<string | null>(null);

  if (!unlocked) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background p-4">
        <form
          className="w-full max-w-sm space-y-4 rounded-xl border bg-card p-6"
          onSubmit={(e) => { e.preventDefault(); if (password) setUnlocked(password); }}
        >
          <h1 className="text-xl font-semibold text-foreground">Mensagens do suporte</h1>
          <Input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} aria-label="Senha" />
          <Button type="submit" className="w-full">Entrar</Button>
        </form>
      </main>
    );
  }
  return <Inbox password={unlocked} onLock={() => { setUnlocked(null); setPassword(""); }} />;
}

function Inbox({ password, onLock }: { password: string; onLock: () => void }) {
  const q = useQuery({ queryKey: ["support", password], queryFn: () => listSupportMessages({ data: { password } }), retry: false, refetchInterval: 30000 });

  if (q.isLoading) return <main className="p-6 text-muted-foreground">Carregando…</main>;
  if (q.isError) {
    return (
      <main className="space-y-3 p-6">
        <p className="text-destructive">{(q.error as Error).message}</p>
        <Button variant="outline" onClick={onLock}>Tentar de novo</Button>
      </main>
    );
  }
  const rows = q.data ?? [];
  const pending = rows.filter((r) => r.status === "new").length;
  return (
    <main className="mx-auto max-w-3xl space-y-4 bg-background p-4 sm:p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Suporte <span className="text-base text-muted-foreground">({pending} sem resposta)</span></h1>
        <Button variant="outline" size="sm" onClick={onLock}>Sair</Button>
      </header>
      {rows.length === 0 && <p className="text-muted-foreground">Nenhuma mensagem ainda.</p>}
      {rows.map((m) => <MessageCard key={m.id} m={m} password={password} />)}
    </main>
  );
}

function MessageCard({ m, password }: { m: Msg; password: string }) {
  const [reply, setReply] = useState("");
  const qc = useQueryClient();
  const send = useMutation({
    mutationFn: () => replySupportMessage({ data: { password, id: m.id, reply } }),
    onSuccess: () => { setReply(""); qc.invalidateQueries({ queryKey: ["support"] }); },
  });
  return (
    <article className="space-y-3 rounded-xl border bg-card p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-medium text-foreground">{m.name || m.email}</p>
          <a href={`mailto:${m.email}`} className="text-sm text-primary underline">{m.email}</a>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={m.status === "new" ? "default" : "secondary"}>{m.status === "new" ? "Nova" : "Respondida"}</Badge>
          <span className="text-xs text-muted-foreground">{new Date(m.created_at).toLocaleString("pt-PT")}</span>
        </div>
      </div>
      <p className="whitespace-pre-wrap text-foreground">{m.message}</p>
      {m.page && <p className="truncate text-xs text-muted-foreground">Página: {m.page}</p>}
      <Textarea placeholder="Escreva a resposta (vai para o e-mail do cliente)" value={reply} onChange={(e) => setReply(e.target.value)} />
      <div className="flex items-center gap-3">
        <Button size="sm" disabled={!reply.trim() || send.isPending} onClick={() => send.mutate()}>
          {send.isPending ? "Enviando…" : "Responder por e-mail"}
        </Button>
        {send.isError && <span className="text-sm text-destructive">{(send.error as Error).message}</span>}
        {send.isSuccess && <span className="text-sm text-muted-foreground">Resposta enviada.</span>}
      </div>
    </article>
  );
}
