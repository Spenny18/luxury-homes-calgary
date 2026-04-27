import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Bell, BellOff, Trash2, Search, Edit3 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { timeAgoShort, formatPriceCompact } from "@/lib/format";

interface SavedSearchFilters {
  q?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: string;
  baths?: string;
  propertyType?: string;
  neighbourhood?: string;
}

interface SavedSearch {
  id: number;
  name: string;
  filters: SavedSearchFilters;
  emailAlerts: boolean;
  matchCount: number;
  lastRunAt: string | null;
  createdAt: string;
}

const EMPTY_FILTERS: SavedSearchFilters = {
  q: "",
  minPrice: undefined,
  maxPrice: undefined,
  beds: "any",
  baths: "any",
  propertyType: "any",
  neighbourhood: "",
};

export default function AdminSavedSearchesPage() {
  const qc = useQueryClient();
  const { toast } = useToast();

  const { data: searches = [], isLoading } = useQuery<SavedSearch[]>({
    queryKey: ["/api/saved-searches"],
  });

  const [editing, setEditing] = useState<SavedSearch | null>(null);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState<{ name: string; emailAlerts: boolean; filters: SavedSearchFilters }>({
    name: "",
    emailAlerts: true,
    filters: EMPTY_FILTERS,
  });

  function openCreate() {
    setEditing(null);
    setDraft({ name: "", emailAlerts: true, filters: { ...EMPTY_FILTERS } });
    setCreating(true);
  }

  function openEdit(s: SavedSearch) {
    setEditing(s);
    setDraft({ name: s.name, emailAlerts: s.emailAlerts, filters: { ...EMPTY_FILTERS, ...s.filters } });
    setCreating(true);
  }

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (editing) {
        const res = await apiRequest("PATCH", `/api/saved-searches/${editing.id}`, draft);
        return res.json();
      }
      const res = await apiRequest("POST", "/api/saved-searches", draft);
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/saved-searches"] });
      setCreating(false);
      toast({
        title: editing ? "Search updated" : "Search saved",
        description: editing ? "Your saved search was updated." : "We'll alert you when new matches hit the MLS.",
      });
    },
    onError: (e: any) => {
      toast({ title: "Couldn't save", description: e?.message ?? "Try again.", variant: "destructive" });
    },
  });

  const toggleAlertsMutation = useMutation({
    mutationFn: async ({ id, emailAlerts }: { id: number; emailAlerts: boolean }) => {
      const res = await apiRequest("PATCH", `/api/saved-searches/${id}`, { emailAlerts });
      return res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/saved-searches"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/saved-searches/${id}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/saved-searches"] });
      toast({ title: "Search deleted" });
    },
  });

  return (
    <AppShell pageTitle="Saved searches">
      <div className="p-6 max-w-[1200px] mx-auto">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h1 className="font-serif text-3xl text-foreground" style={{ letterSpacing: "-0.01em" }}>
              Saved searches
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Buyer briefs that re-run against the Pillar 9 feed each sync. Email alerts go out when new
              matches land.
            </p>
          </div>
          <Button onClick={openCreate} className="rounded-sm font-display tracking-[0.14em] text-[11px] h-10">
            <Plus className="w-3.5 h-3.5 mr-1.5" /> NEW SEARCH
          </Button>
        </div>

        {isLoading ? (
          <div className="text-sm text-muted-foreground py-12 text-center">Loading saved searches…</div>
        ) : searches.length === 0 ? (
          <Card>
            <CardContent className="p-10 text-center">
              <Search className="w-10 h-10 mx-auto mb-3 text-muted-foreground" strokeWidth={1.4} />
              <div className="font-serif text-xl">No saved searches yet</div>
              <div className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
                Build a buyer brief once — name it, set the filters, and we'll surface new matches as the MLS
                refreshes hourly.
              </div>
              <Button onClick={openCreate} className="mt-5 rounded-sm font-display tracking-[0.14em] text-[11px]">
                <Plus className="w-3.5 h-3.5 mr-1.5" /> CREATE FIRST SEARCH
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {searches.map((s) => (
              <Card key={s.id} className="group">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-serif text-lg truncate" style={{ letterSpacing: "-0.01em" }}>
                        {s.name}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2 flex-wrap">
                        <span>{s.matchCount} matches</span>
                        <span>·</span>
                        <span>last run {timeAgoShort(s.lastRunAt)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-sm h-8 w-8"
                        title={s.emailAlerts ? "Alerts on" : "Alerts off"}
                        onClick={() => toggleAlertsMutation.mutate({ id: s.id, emailAlerts: !s.emailAlerts })}
                      >
                        {s.emailAlerts ? (
                          <Bell className="w-3.5 h-3.5" strokeWidth={1.6} />
                        ) : (
                          <BellOff className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.6} />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-sm h-8 w-8"
                        onClick={() => openEdit(s)}
                      >
                        <Edit3 className="w-3.5 h-3.5" strokeWidth={1.6} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-sm h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => {
                          if (confirm(`Delete "${s.name}"?`)) deleteMutation.mutate(s.id);
                        }}
                      >
                        <Trash2 className="w-3.5 h-3.5" strokeWidth={1.6} />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {s.filters.q && <FilterChip label={`"${s.filters.q}"`} />}
                    {s.filters.neighbourhood && <FilterChip label={s.filters.neighbourhood} />}
                    {s.filters.propertyType && s.filters.propertyType !== "any" && (
                      <FilterChip label={s.filters.propertyType} />
                    )}
                    {s.filters.beds && s.filters.beds !== "any" && <FilterChip label={`${s.filters.beds}+ bd`} />}
                    {s.filters.baths && s.filters.baths !== "any" && (
                      <FilterChip label={`${s.filters.baths}+ ba`} />
                    )}
                    {(s.filters.minPrice || s.filters.maxPrice) && (
                      <FilterChip
                        label={`${s.filters.minPrice ? formatPriceCompact(s.filters.minPrice) : "any"} – ${
                          s.filters.maxPrice ? formatPriceCompact(s.filters.maxPrice) : "any"
                        }`}
                      />
                    )}
                    {!s.filters.q &&
                      !s.filters.neighbourhood &&
                      (!s.filters.propertyType || s.filters.propertyType === "any") &&
                      (!s.filters.beds || s.filters.beds === "any") &&
                      (!s.filters.baths || s.filters.baths === "any") &&
                      !s.filters.minPrice &&
                      !s.filters.maxPrice && (
                        <span className="text-xs text-muted-foreground italic">No filters set</span>
                      )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Create / Edit dialog */}
      <Dialog open={creating} onOpenChange={setCreating}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl" style={{ letterSpacing: "-0.01em" }}>
              {editing ? "Edit saved search" : "New saved search"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="eyebrow text-muted-foreground">Name</Label>
              <Input
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                placeholder="Aspen Woods estates · 4+ bed"
                className="mt-1.5 rounded-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="eyebrow text-muted-foreground">Min price</Label>
                <Input
                  inputMode="numeric"
                  value={draft.filters.minPrice ?? ""}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      filters: { ...draft.filters, minPrice: e.target.value ? Number(e.target.value) : undefined },
                    })
                  }
                  placeholder="$"
                  className="mt-1.5 rounded-sm"
                />
              </div>
              <div>
                <Label className="eyebrow text-muted-foreground">Max price</Label>
                <Input
                  inputMode="numeric"
                  value={draft.filters.maxPrice ?? ""}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      filters: { ...draft.filters, maxPrice: e.target.value ? Number(e.target.value) : undefined },
                    })
                  }
                  placeholder="$"
                  className="mt-1.5 rounded-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="eyebrow text-muted-foreground">Beds (min)</Label>
                <Input
                  value={draft.filters.beds === "any" ? "" : draft.filters.beds ?? ""}
                  onChange={(e) =>
                    setDraft({ ...draft, filters: { ...draft.filters, beds: e.target.value || "any" } })
                  }
                  placeholder="any"
                  className="mt-1.5 rounded-sm"
                />
              </div>
              <div>
                <Label className="eyebrow text-muted-foreground">Baths (min)</Label>
                <Input
                  value={draft.filters.baths === "any" ? "" : draft.filters.baths ?? ""}
                  onChange={(e) =>
                    setDraft({ ...draft, filters: { ...draft.filters, baths: e.target.value || "any" } })
                  }
                  placeholder="any"
                  className="mt-1.5 rounded-sm"
                />
              </div>
            </div>

            <div>
              <Label className="eyebrow text-muted-foreground">Neighbourhood</Label>
              <Input
                value={draft.filters.neighbourhood ?? ""}
                onChange={(e) =>
                  setDraft({ ...draft, filters: { ...draft.filters, neighbourhood: e.target.value } })
                }
                placeholder="Aspen Woods, Upper Mount Royal…"
                className="mt-1.5 rounded-sm"
              />
            </div>

            <div>
              <Label className="eyebrow text-muted-foreground">Search text</Label>
              <Input
                value={draft.filters.q ?? ""}
                onChange={(e) => setDraft({ ...draft, filters: { ...draft.filters, q: e.target.value } })}
                placeholder="Address, MLS#, keyword…"
                className="mt-1.5 rounded-sm"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div>
                <div className="text-sm font-medium">Email alerts</div>
                <div className="text-xs text-muted-foreground">
                  Email Spencer when new MLS listings match this search.
                </div>
              </div>
              <Switch
                checked={draft.emailAlerts}
                onCheckedChange={(v) => setDraft({ ...draft, emailAlerts: v })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreating(false)} className="rounded-sm">
              Cancel
            </Button>
            <Button
              onClick={() => saveMutation.mutate()}
              disabled={!draft.name.trim() || saveMutation.isPending}
              className="rounded-sm font-display tracking-[0.14em] text-[11px]"
            >
              {editing ? "SAVE CHANGES" : "CREATE SEARCH"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}

function FilterChip({ label }: { label: string }) {
  return (
    <Badge variant="secondary" className="rounded-sm font-display tracking-[0.1em] text-[10px] uppercase">
      {label}
    </Badge>
  );
}
