import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Mail,
  Phone,
  MoreHorizontal,
  CalendarPlus,
  ChevronRight,
  Inbox,
  CheckCircle2,
  Send,
  Filter,
} from "lucide-react";
import { timeAgo } from "@/lib/mock-data";
import { apiRequest } from "@/lib/queryClient";
import type { PublicListing } from "@/lib/types";
import type { Lead, Message } from "@shared/schema";

const STATUS_BADGE: Record<string, string> = {
  new: "bg-foreground text-background border-transparent",
  contacted: "bg-secondary text-foreground border-border",
  qualified: "bg-secondary text-foreground border-border",
  "tour-booked": "bg-secondary text-foreground border-border",
  lost: "bg-muted text-muted-foreground border-border",
};

export default function LeadsPage() {
  const qc = useQueryClient();
  const { data: leads = [], isLoading } = useQuery<Lead[]>({ queryKey: ["/api/leads"] });
  const { data: listings = [] } = useQuery<PublicListing[]>({ queryKey: ["/api/listings"] });

  const sorted = useMemo(
    () => [...leads].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [leads],
  );

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [reply, setReply] = useState("");

  // Default to first lead
  const effectiveSelectedId = selectedId ?? sorted[0]?.id ?? null;

  const filtered = sorted.filter((l) => {
    if (filter !== "all" && l.status !== filter) return false;
    if (
      query &&
      !`${l.name} ${l.email} ${l.message}`.toLowerCase().includes(query.toLowerCase())
    )
      return false;
    return true;
  });

  const selected = leads.find((l) => l.id === effectiveSelectedId);
  const selectedListing = selected
    ? listings.find((p) => p.id === selected.listingId)
    : null;

  const counts = {
    new: leads.filter((l) => l.status === "new").length,
    qualified: leads.filter((l) => l.status === "qualified").length,
    tour: leads.filter((l) => l.status === "tour-booked").length,
  };

  const messagesQuery = useQuery<Message[]>({
    queryKey: effectiveSelectedId ? ["/api/leads", effectiveSelectedId, "messages"] : ["__none__"],
    enabled: !!effectiveSelectedId,
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await apiRequest("PATCH", `/api/leads/${id}`, { status });
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/leads"] });
    },
  });

  const sendReply = useMutation({
    mutationFn: async ({ leadId, body }: { leadId: number; body: string }) => {
      const res = await apiRequest("POST", `/api/leads/${leadId}/messages`, { body });
      return res.json();
    },
    onSuccess: (_, { leadId }) => {
      setReply("");
      qc.invalidateQueries({ queryKey: ["/api/leads", leadId, "messages"] });
    },
  });

  return (
    <AppShell pageTitle="Enquiries" newLeadCount={counts.new}>
      <div className="px-8 py-7 space-y-5">
        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { count: counts.new, label: "New enquiries", icon: Inbox },
            { count: counts.qualified, label: "Qualified", icon: CheckCircle2 },
            { count: counts.tour, label: "Tours booked", icon: CalendarPlus },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.label}>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-sm bg-secondary flex items-center justify-center text-foreground">
                    <Icon className="w-5 h-5" strokeWidth={1.6} />
                  </div>
                  <div>
                    <div className="font-serif text-2xl tabular-nums" style={{ letterSpacing: "-0.01em" }}>{s.count}</div>
                    <div className="eyebrow text-muted-foreground mt-0.5">{s.label}</div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Two-pane inbox */}
        <Card className="overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] h-[calc(100dvh-280px)] min-h-[520px]">
            {/* List */}
            <div className="border-r border-border flex flex-col overflow-hidden">
              <div className="p-3 border-b border-border space-y-2.5">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.6} />
                  <Input
                    placeholder="Search enquiries…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-9 h-9 rounded-sm"
                    data-testid="input-search-leads"
                  />
                </div>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="h-9 rounded-sm" data-testid="select-lead-filter">
                    <Filter className="w-3.5 h-3.5 mr-1.5" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All enquiries</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="tour-booked">Tour booked</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 overflow-y-auto" style={{ overscrollBehavior: "contain" }}>
                {isLoading
                  ? [0, 1, 2, 3].map((i) => (
                      <div key={i} className="p-4 border-b border-border">
                        <Skeleton className="h-12 w-full" />
                      </div>
                    ))
                  : filtered.map((lead) => {
                      const listing = listings.find((p) => p.id === lead.listingId);
                      const active = lead.id === effectiveSelectedId;
                      return (
                        <button
                          key={lead.id}
                          onClick={() => setSelectedId(lead.id)}
                          className={`w-full text-left px-4 py-3 border-b border-border hover:bg-secondary/40 transition-colors ${
                            active ? "bg-secondary/60" : ""
                          }`}
                          data-testid={`lead-list-${lead.id}`}
                        >
                          <div className="flex items-start gap-3">
                            <Avatar className="w-9 h-9 shrink-0">
                              <AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-medium">
                                {lead.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-sm font-medium truncate text-foreground">{lead.name}</span>
                                <span className="text-[10px] text-muted-foreground/80 shrink-0 font-display tracking-[0.08em]">
                                  {timeAgo(lead.createdAt).toUpperCase()}
                                </span>
                              </div>
                              <div className="text-xs text-muted-foreground truncate mt-0.5">{listing?.title ?? "General enquiry"}</div>
                              <div className="text-xs text-foreground/80 truncate mt-1">{lead.message}</div>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge className={`capitalize text-[10px] px-1.5 py-0 rounded-sm font-display tracking-[0.1em] ${STATUS_BADGE[lead.status] ?? STATUS_BADGE.new}`}>
                                  {lead.status.replace("-", " ").toUpperCase()}
                                </Badge>
                                <span className="text-[10px] text-muted-foreground font-display tracking-[0.08em]">{lead.source.toUpperCase()}</span>
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
              </div>
            </div>

            {/* Detail */}
            {selected ? (
              <div className="flex flex-col overflow-hidden">
                <div className="p-5 border-b border-border flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-foreground text-background font-medium">
                        {selected.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="font-serif text-xl truncate text-foreground" style={{ letterSpacing: "-0.01em" }}>{selected.name}</div>
                      <div className="text-sm text-muted-foreground truncate flex items-center gap-2 flex-wrap">
                        <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" strokeWidth={1.6} /> {selected.email}</span>
                        {selected.phone && (
                          <>
                            <span>·</span>
                            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" strokeWidth={1.6} />{selected.phone}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Select
                      value={selected.status}
                      onValueChange={(v) => updateStatus.mutate({ id: selected.id, status: v })}
                    >
                      <SelectTrigger className="w-[160px] h-9 rounded-sm" data-testid="select-lead-status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="qualified">Qualified</SelectItem>
                        <SelectItem value="tour-booked">Tour booked</SelectItem>
                        <SelectItem value="lost">Lost</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="ghost" size="icon" className="rounded-sm" aria-label="More">
                      <MoreHorizontal className="w-4 h-4" strokeWidth={1.6} />
                    </Button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-5" style={{ overscrollBehavior: "contain" }}>
                  {/* Property reference */}
                  {selectedListing && (
                    <Card>
                      <CardContent className="p-3">
                        <div className="flex items-center gap-3">
                          <img src={selectedListing.heroImage} alt="" className="w-16 h-12 rounded-sm object-cover" />
                          <div className="flex-1 min-w-0">
                            <div className="eyebrow text-muted-foreground">Enquiry about</div>
                            <div className="font-serif text-[15px] truncate mt-0.5">{selectedListing.title}</div>
                            <div className="text-xs text-muted-foreground truncate">{selectedListing.address}</div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Conversation */}
                  <div>
                    <div className="eyebrow text-muted-foreground mb-3">Conversation</div>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <Avatar className="w-8 h-8 shrink-0">
                          <AvatarFallback className="bg-secondary text-xs">
                            {selected.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="bg-secondary/60 rounded-sm border border-border px-4 py-3 text-sm">
                            {selected.message}
                          </div>
                          <div className="text-[10px] text-muted-foreground mt-1.5 ml-1 font-display tracking-[0.1em]">
                            VIA {selected.source.toUpperCase()} · {timeAgo(selected.createdAt).toUpperCase()}
                          </div>
                        </div>
                      </div>

                      {(messagesQuery.data ?? []).map((m) => (
                        <div key={m.id} className={`flex gap-3 ${m.fromAgent ? "flex-row-reverse" : ""}`}>
                          <Avatar className="w-8 h-8 shrink-0">
                            <AvatarFallback className={m.fromAgent ? "bg-foreground text-background text-xs" : "bg-secondary text-xs"}>
                              {m.fromAgent ? "SR" : selected.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`flex-1 min-w-0 flex flex-col ${m.fromAgent ? "items-end" : ""}`}>
                            <div className={`rounded-sm px-4 py-3 text-sm max-w-md ${
                              m.fromAgent ? "bg-foreground text-background" : "bg-secondary/60 border border-border"
                            }`}>
                              {m.body}
                            </div>
                            <div className="text-[10px] text-muted-foreground mt-1.5 mx-1 font-display tracking-[0.1em]">
                              {m.fromAgent ? "SPENCER" : selected.name.toUpperCase()} · {timeAgo(m.createdAt).toUpperCase()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Reply composer */}
                <div className="p-4 border-t border-border bg-background">
                  <div className="flex items-end gap-2">
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Write a reply…"
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && reply.trim() && selected) {
                            sendReply.mutate({ leadId: selected.id, body: reply });
                          }
                        }}
                        className="h-11 pr-3 rounded-sm"
                        data-testid="input-reply"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-11 rounded-sm font-display tracking-[0.14em] text-[11px]"
                      data-testid="button-book-tour"
                    >
                      <CalendarPlus className="w-3.5 h-3.5 mr-1.5" /> BOOK TOUR
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="h-11 rounded-sm font-display tracking-[0.14em] text-[11px]"
                      title="Open in your email client"
                    >
                      <a
                        href={`mailto:${selected.email}?subject=${encodeURIComponent(
                          `Re: ${selectedListing?.title ?? "your enquiry"}`,
                        )}&body=${encodeURIComponent(
                          `Hi ${selected.name.split(" ")[0]},\n\n${reply || ""}\n\nChat soon, cheers!\nSpencer Rivers\nREALTOR® | Rivers Real Estate\n(403) 966-9237`,
                        )}`}
                      >
                        <Mail className="w-3.5 h-3.5 mr-1.5" /> EMAIL
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      className="h-11 rounded-sm font-display tracking-[0.14em] text-[11px]"
                      disabled={!reply.trim() || sendReply.isPending}
                      onClick={() => selected && sendReply.mutate({ leadId: selected.id, body: reply })}
                      data-testid="button-send-reply"
                    >
                      <Send className="w-3.5 h-3.5 mr-1.5" /> SEND
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center text-muted-foreground">
                {isLoading ? "Loading enquiries…" : "Select an enquiry to view details"}
              </div>
            )}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
