import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Send, Trash2, Mail } from "lucide-react";
import { useData } from "@/store/dataStore";

export const Route = createFileRoute("/admin/messages")({
  component: AdminMessages,
});

function AdminMessages() {
  const { messages, markMessageRead, removeMessage, addMessage } = useData();
  const [activeId, setActiveId] = useState<string | null>(messages[0]?.id ?? null);
  const [reply, setReply] = useState("");

  useEffect(() => {
    if (!activeId && messages[0]) setActiveId(messages[0].id);
  }, [activeId, messages]);

  const active = messages.find((m) => m.id === activeId) ?? null;

  useEffect(() => {
    if (active && !active.read) markMessageRead(active.id);
  }, [active, markMessageRead]);

  return (
    <div className="flex flex-col gap-8">
      <AdminHeader
        title="Messages"
        subtitle={`${messages.filter((m) => !m.read).length} unread of ${messages.length}`}
      />

      <div className="grid h-[640px] grid-cols-1 overflow-hidden rounded-2xl border border-border bg-card shadow-card md:grid-cols-[300px_1fr]">
        <aside className="overflow-y-auto border-r border-border">
          <div className="border-b border-border px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground">
            Inbox
          </div>
          <ul>
            {messages.map((m) => (
              <li
                key={m.id}
                onClick={() => setActiveId(m.id)}
                className={`cursor-pointer border-b border-border/60 px-4 py-4 transition-colors ${
                  activeId === m.id ? "bg-muted/60" : "hover:bg-muted/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm font-medium">
                    {!m.read && <span className="h-2 w-2 rounded-full bg-primary" />}
                    {m.from}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{m.time}</span>
                </div>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {m.subject ? `${m.subject} — ` : ""}{m.text}
                </p>
              </li>
            ))}
            {messages.length === 0 && (
              <li className="px-4 py-10 text-center text-xs text-muted-foreground">
                No messages yet.
              </li>
            )}
          </ul>
        </aside>

        <section className="flex flex-col">
          {active ? (
            <>
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div>
                  <div className="font-display font-semibold">{active.from}</div>
                  <div className="text-xs text-muted-foreground">
                    {active.subject || "Direct message"} · {active.email}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {active.email && (
                    <a
                      href={`mailto:${active.email}`}
                      className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:border-primary hover:text-primary"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  )}
                  <button
                    onClick={() => {
                      if (confirm("Delete this message?")) {
                        removeMessage(active.id);
                        setActiveId(null);
                      }
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:border-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl border border-border bg-muted px-4 py-3 text-sm text-foreground">
                    {active.text}
                    <div className="mt-1 text-[10px] text-muted-foreground">{active.time}</div>
                  </div>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!reply.trim()) return;
                  // Append admin reply as a new message thread entry
                  addMessage({
                    from: "Admin (you)",
                    email: "admin@vcestates.co",
                    subject: `Re: ${active.subject ?? ""}`,
                    text: reply,
                  });
                  setReply("");
                }}
                className="flex items-center gap-3 border-t border-border px-4 py-3"
              >
                <input
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Type a reply…"
                  className="flex-1 rounded-full border border-border bg-background/60 px-4 py-2 text-sm outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-gold text-primary-foreground shadow-glow"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
              Select a conversation
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
