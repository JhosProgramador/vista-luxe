import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Send } from "lucide-react";

export const Route = createFileRoute("/admin/messages")({
  component: AdminMessages,
});

const threads = [
  { id: "1", name: "Sofía Mejía", last: "Interested in scheduling a private tour…", time: "10:24" },
  { id: "2", name: "James Carter", last: "Could you send the floor plans?", time: "09:15" },
  { id: "3", name: "Camila Rivera", last: "Thank you — talk tomorrow.", time: "Yesterday" },
  { id: "4", name: "Lucas Bernal", last: "Closing process confirmed.", time: "May 18" },
];

const messages = [
  { id: "m1", from: "Sofía", text: "Hi, I saw the Oceanfront Villa. Is it still available?", time: "10:18" },
  { id: "m2", from: "me", text: "Hello Sofía! Yes, it is. Would you like a private viewing this week?", time: "10:21" },
  { id: "m3", from: "Sofía", text: "Interested in scheduling a private tour for Friday afternoon.", time: "10:24" },
];

function AdminMessages() {
  const [active, setActive] = useState("1");
  const [draft, setDraft] = useState("");

  return (
    <div className="flex flex-col gap-8">
      <AdminHeader title="Messages" subtitle="Direct conversations with clients" />

      <div className="grid h-[640px] grid-cols-1 overflow-hidden rounded-2xl border border-border bg-card shadow-card md:grid-cols-[280px_1fr]">
        <aside className="border-r border-border">
          <div className="border-b border-border px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground">
            Conversations
          </div>
          <ul>
            {threads.map((t) => (
              <li
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`cursor-pointer border-b border-border/60 px-4 py-4 transition-colors ${
                  active === t.id ? "bg-muted/60" : "hover:bg-muted/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{t.name}</span>
                  <span className="text-[10px] text-muted-foreground">{t.time}</span>
                </div>
                <p className="mt-1 truncate text-xs text-muted-foreground">{t.last}</p>
              </li>
            ))}
          </ul>
        </aside>

        <section className="flex flex-col">
          <div className="border-b border-border px-6 py-4">
            <div className="font-display font-semibold">
              {threads.find((t) => t.id === active)?.name}
            </div>
            <div className="text-xs text-muted-foreground">Oceanfront Villa · Cartagena</div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
            {messages.map((m) => {
              const mine = m.from === "me";
              return (
                <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm ${
                      mine
                        ? "bg-gradient-gold text-primary-foreground"
                        : "border border-border bg-muted text-foreground"
                    }`}
                  >
                    {m.text}
                    <div className={`mt-1 text-[10px] ${mine ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                      {m.time}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDraft("");
            }}
            className="flex items-center gap-3 border-t border-border px-4 py-3"
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message…"
              className="flex-1 rounded-full border border-border bg-background/60 px-4 py-2 text-sm outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-gold text-primary-foreground shadow-glow"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
