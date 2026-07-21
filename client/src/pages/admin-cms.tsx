// Admin CMS — one screen, three tabs (Condos / Neighbourhoods / Blog).
// Left column: list of entities with search + "New" button.
// Right column: edit form for the selected entity.
//
// All operations hit /api/admin/cms/* (see server/admin-cms.ts) which are
// session-auth-gated. Markdown body for blog posts gets a live preview using
// the same renderBody helper the public site uses.
import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, uploadImage } from "@/lib/queryClient";

// Downscale + JPEG-compress an image in the browser before upload so heroes
// stay small (~1600px wide). Returns a Blob.
async function resizeImage(file: File, maxW = 1600): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxW / bitmap.width);
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;
  ctx.drawImage(bitmap, 0, 0, w, h);
  return await new Promise<Blob>((resolve) =>
    canvas.toBlob(
      (b) => resolve(b ?? file),
      "image/jpeg",
      0.82,
    ),
  );
}
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, Search, Trash2, ExternalLink, RefreshCw, Eye } from "lucide-react";

type EntityKind = "condos" | "neighbourhoods" | "blog";

interface BaseRow {
  slug: string;
}

// ---------- Markdown preview (matches blog-detail.tsx renderBody) -----------

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {p.slice(2, -2)}
        </strong>
      );
    }
    const italicParts = p.split(/(\*[^*]+\*)/g);
    return italicParts.map((q, j) => {
      if (q.startsWith("*") && q.endsWith("*")) {
        return <em key={`${i}-${j}`} className="italic">{q.slice(1, -1)}</em>;
      }
      return <span key={`${i}-${j}`}>{q}</span>;
    });
  });
}

function renderMarkdownBody(body: string): React.ReactNode[] {
  const blocks = body.split(/\n\s*\n/);
  return blocks.map((raw, i) => {
    const block = raw.trim();
    if (!block) return null;
    if (block.startsWith("## ")) {
      return (
        <h2 key={i} className="mt-8 mb-3 font-serif text-2xl">
          {renderInline(block.slice(3))}
        </h2>
      );
    }
    if (block.startsWith("### ")) {
      return (
        <h3 key={i} className="mt-6 mb-2 font-serif text-xl">
          {renderInline(block.slice(4))}
        </h3>
      );
    }
    if (block.startsWith("> ")) {
      return (
        <blockquote key={i} className="my-4 pl-4 border-l-2 italic text-foreground/80">
          {renderInline(block.slice(2))}
        </blockquote>
      );
    }
    if (block.split("\n").every((l) => /^[-•]\s/.test(l.trim()))) {
      return (
        <ul key={i} className="my-3 list-disc pl-6 space-y-1 text-[14px]">
          {block.split("\n").map((line, j) => (
            <li key={j}>{renderInline(line.replace(/^[-•]\s/, ""))}</li>
          ))}
        </ul>
      );
    }
    return (
      <p key={i} className="my-3 text-[15px] leading-relaxed text-foreground/85">
        {renderInline(block)}
      </p>
    );
  });
}

// ---------- Helpers ---------------------------------------------------------

function parseJsonArrayField(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(String);
  if (typeof v !== "string") return [];
  const t = v.trim();
  if (!t) return [];
  if (t.startsWith("[")) {
    try {
      const p = JSON.parse(t);
      return Array.isArray(p) ? p.map(String) : [];
    } catch {
      return [];
    }
  }
  return t.split(/\n+/).filter(Boolean);
}

function arrayToTextarea(v: unknown): string {
  return parseJsonArrayField(v).join("\n\n");
}

function safeStr(v: unknown): string {
  if (v === null || v === undefined) return "";
  return String(v);
}

// ---------- Reusable form pieces -------------------------------------------

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[11px] tracking-[0.18em] font-display text-muted-foreground uppercase">
        {label}
      </Label>
      {children}
      {hint && (
        <p className="text-[11px] text-muted-foreground">{hint}</p>
      )}
    </div>
  );
}

interface EntityListProps<T extends BaseRow> {
  kind: EntityKind;
  rows: T[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
  onNew: () => void;
  labelFn: (r: T) => string;
  subtitleFn?: (r: T) => string;
  publicPath: string;
}

function EntityList<T extends BaseRow>({
  kind,
  rows,
  selectedSlug,
  onSelect,
  onNew,
  labelFn,
  subtitleFn,
  publicPath,
}: EntityListProps<T>) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter((r) => {
      const hay = `${labelFn(r)} ${r.slug} ${subtitleFn?.(r) ?? ""}`.toLowerCase();
      return hay.includes(needle);
    });
  }, [rows, q, labelFn, subtitleFn]);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">
            {rows.length} {rows.length === 1 ? "entry" : "entries"}
          </CardTitle>
          <Button size="sm" onClick={onNew} data-testid={`cms-new-${kind}`}>
            <Plus className="h-4 w-4 mr-1.5" /> New
          </Button>
        </div>
        <div className="relative mt-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search…"
            className="pl-8 h-9 text-sm"
          />
        </div>
      </CardHeader>
      <CardContent className="px-0 pt-0 pb-2 max-h-[calc(100vh-260px)] overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground">
            {q ? "No matches." : "No entries yet."}
          </div>
        ) : (
          <div>
            {filtered.map((r) => {
              const sel = r.slug === selectedSlug;
              return (
                <button
                  key={r.slug}
                  onClick={() => onSelect(r.slug)}
                  className={`w-full text-left px-4 py-3 border-b border-border transition-colors flex items-center gap-3 ${
                    sel ? "bg-secondary" : "hover:bg-secondary/60"
                  }`}
                  data-testid={`cms-row-${kind}-${r.slug}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {labelFn(r)}
                    </div>
                    {subtitleFn && (
                      <div className="text-xs text-muted-foreground truncate mt-0.5">
                        {subtitleFn(r)}
                      </div>
                    )}
                  </div>
                  <a
                    href={`${publicPath}/${r.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-muted-foreground hover:text-foreground"
                    title="Open public page"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </button>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ---------- Per-entity edit forms ------------------------------------------

interface CondoFormState {
  slug: string;
  name: string;
  tagline: string;
  intro: string;
  residencesCopy: string;
  architecturalCopy: string;
  amenities: string;
  address: string;
  neighbourhood: string;
  neighbourhoodSlug: string;
  quadrant: string;
  units: string;
  stories: string;
  builtIn: string;
  developer: string;
  architect: string;
  lat: string;
  lng: string;
  heroImage: string;
  gallery: string;
  featured: boolean;
  sortOrder: string;
  additionalAddresses: string;
  faqs: Array<{ q: string; a: string }>;
}

const EMPTY_CONDO: CondoFormState = {
  slug: "",
  name: "",
  tagline: "",
  intro: "",
  residencesCopy: "",
  architecturalCopy: "",
  amenities: "",
  address: "",
  neighbourhood: "",
  neighbourhoodSlug: "",
  quadrant: "city-centre",
  units: "",
  stories: "",
  builtIn: "",
  developer: "",
  architect: "",
  lat: "",
  lng: "",
  heroImage: "",
  gallery: "",
  featured: false,
  sortOrder: "99",
  additionalAddresses: "",
  faqs: [],
};

function condoToForm(c: any): CondoFormState {
  if (!c) return EMPTY_CONDO;
  return {
    slug: safeStr(c.slug),
    name: safeStr(c.name),
    tagline: safeStr(c.tagline),
    intro: arrayToTextarea(c.intro),
    residencesCopy: arrayToTextarea(c.residencesCopy),
    architecturalCopy: arrayToTextarea(c.architecturalCopy),
    amenities: arrayToTextarea(c.amenities),
    address: safeStr(c.address),
    neighbourhood: safeStr(c.neighbourhood),
    neighbourhoodSlug: safeStr(c.neighbourhoodSlug),
    quadrant: safeStr(c.quadrant) || "city-centre",
    units: safeStr(c.units),
    stories: safeStr(c.stories),
    builtIn: safeStr(c.builtIn),
    developer: safeStr(c.developer),
    architect: safeStr(c.architect),
    lat: safeStr(c.lat),
    lng: safeStr(c.lng),
    heroImage: safeStr(c.heroImage),
    gallery: arrayToTextarea(c.gallery),
    featured: !!c.featured,
    sortOrder: safeStr(c.sortOrder ?? 99),
    additionalAddresses: safeStr(c.additionalAddresses),
    faqs: Array.isArray(c.faqs)
      ? (c.faqs as any[]).map((f) => ({
          q: safeStr(f?.q),
          a: safeStr(f?.a),
        }))
      : [],
  };
}

function CondoForm({
  initial,
  isNew,
  onSaved,
  onDeleted,
}: {
  initial: any;
  isNew: boolean;
  onSaved: (slug: string) => void;
  onDeleted: () => void;
}) {
  const [form, setForm] = useState<CondoFormState>(() => condoToForm(initial));
  const { toast } = useToast();
  useEffect(() => setForm(condoToForm(initial)), [initial?.slug]);

  const save = useMutation({
    mutationFn: async (payload: CondoFormState) => {
      const url = isNew
        ? "/api/admin/cms/condos"
        : `/api/admin/cms/condos/${initial.slug}`;
      const method = isNew ? "POST" : "PUT";
      const body = {
        ...payload,
        intro: payload.intro.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean),
        residencesCopy: payload.residencesCopy.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean),
        architecturalCopy: payload.architecturalCopy.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean),
        amenities: payload.amenities.split(/\n+/).map((s) => s.trim()).filter(Boolean),
        gallery: payload.gallery.split(/\n+/).map((s) => s.trim()).filter(Boolean),
      };
      const res = await apiRequest(method, url, body);
      return res.json();
    },
    onSuccess: (saved) => {
      toast({ title: isNew ? "Created" : "Saved", description: saved.name });
      onSaved(saved.slug);
    },
    onError: (err: any) => {
      toast({ title: "Save failed", description: String(err?.message ?? err), variant: "destructive" });
    },
  });

  const del = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", `/api/admin/cms/condos/${initial.slug}`);
    },
    onSuccess: () => {
      toast({ title: "Deleted", description: initial.name });
      onDeleted();
    },
  });

  const set = <K extends keyof CondoFormState>(k: K, v: CondoFormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save.mutate(form);
      }}
      className="space-y-5"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl">
          {isNew ? "New condo building" : form.name || initial?.name}
        </h2>
        <div className="flex items-center gap-2">
          {!isNew && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" variant="outline" size="sm">
                  <Trash2 className="h-4 w-4 mr-1.5" /> Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete {initial.name}?</AlertDialogTitle>
                  <AlertDialogDescription>
                    The building disappears from the public /condos page immediately. This cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => del.mutate()}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          <Button type="submit" disabled={save.isPending} size="sm">
            {save.isPending ? "Saving…" : isNew ? "Create" : "Save"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Name">
          <Input value={form.name} onChange={(e) => set("name", e.target.value)} />
        </Field>
        <Field label="Slug" hint={isNew ? "Auto-derived from name if blank" : "URL ID — leave alone unless rebranding"}>
          <Input value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder={isNew ? "auto" : ""} />
        </Field>
      </div>

      <Field label="Tagline">
        <Input value={form.tagline} onChange={(e) => set("tagline", e.target.value)} />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Address">
          <Input value={form.address} onChange={(e) => set("address", e.target.value)} />
        </Field>
        <Field
          label="Additional addresses"
          hint="Comma-separated. For buildings that occupy more than one street number (e.g. The River is at both 135 and 137 26 Ave SW — set this to '137 26 Avenue SW')."
        >
          <Input
            value={form.additionalAddresses}
            onChange={(e) => set("additionalAddresses", e.target.value)}
            placeholder="137 26 Avenue SW, 139 26 Avenue SW"
          />
        </Field>
        <Field label="Neighbourhood (display name)">
          <Input value={form.neighbourhood} onChange={(e) => set("neighbourhood", e.target.value)} />
        </Field>
        <Field label="Neighbourhood slug" hint="Should match a neighbourhood URL (e.g. 'beltline')">
          <Input value={form.neighbourhoodSlug} onChange={(e) => set("neighbourhoodSlug", e.target.value)} />
        </Field>
        <Field label="Quadrant">
          <Input value={form.quadrant} onChange={(e) => set("quadrant", e.target.value)} />
        </Field>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Field label="Units"><Input value={form.units} onChange={(e) => set("units", e.target.value)} /></Field>
        <Field label="Stories"><Input value={form.stories} onChange={(e) => set("stories", e.target.value)} /></Field>
        <Field label="Built in"><Input value={form.builtIn} onChange={(e) => set("builtIn", e.target.value)} /></Field>
        <Field label="Sort order"><Input value={form.sortOrder} onChange={(e) => set("sortOrder", e.target.value)} /></Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Developer"><Input value={form.developer} onChange={(e) => set("developer", e.target.value)} /></Field>
        <Field label="Architect"><Input value={form.architect} onChange={(e) => set("architect", e.target.value)} /></Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Latitude"><Input value={form.lat} onChange={(e) => set("lat", e.target.value)} /></Field>
        <Field label="Longitude"><Input value={form.lng} onChange={(e) => set("lng", e.target.value)} /></Field>
      </div>

      <Field label="Hero image URL">
        <Input value={form.heroImage} onChange={(e) => set("heroImage", e.target.value)} placeholder="https://…" />
      </Field>

      <Field label="Intro paragraphs" hint="Blank line between paragraphs">
        <Textarea rows={5} value={form.intro} onChange={(e) => set("intro", e.target.value)} />
      </Field>
      <Field label="Residences copy" hint="Blank line between paragraphs">
        <Textarea rows={5} value={form.residencesCopy} onChange={(e) => set("residencesCopy", e.target.value)} />
      </Field>
      <Field label="Architectural copy" hint="Blank line between paragraphs">
        <Textarea rows={5} value={form.architecturalCopy} onChange={(e) => set("architecturalCopy", e.target.value)} />
      </Field>
      <Field label="Amenities" hint="One per line">
        <Textarea rows={5} value={form.amenities} onChange={(e) => set("amenities", e.target.value)} />
      </Field>
      <Field label="Gallery image URLs" hint="One URL per line">
        <Textarea rows={4} value={form.gallery} onChange={(e) => set("gallery", e.target.value)} />
      </Field>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-[11px] tracking-[0.18em] font-display text-muted-foreground uppercase">
            FAQ
          </Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              set("faqs", [...(form.faqs ?? []), { q: "", a: "" }])
            }
          >
            <Plus className="h-3.5 w-3.5 mr-1" /> Add question
          </Button>
        </div>
        <p className="text-[11px] text-muted-foreground mb-3">
          Leave empty to auto-generate from the building's structured data. Any
          entries here override the auto-generated FAQ for both the visible
          accordion AND the FAQPage schema (Google rich result).
        </p>
        {(form.faqs ?? []).length === 0 ? (
          <div className="border border-dashed border-border rounded-sm p-6 text-center text-sm text-muted-foreground">
            No custom FAQ — using auto-generated. Click "Add question" to override.
          </div>
        ) : (
          <div className="space-y-3">
            {(form.faqs ?? []).map((row, i) => (
              <div
                key={i}
                className="border border-border rounded-sm p-3 space-y-2 bg-secondary/30"
              >
                <div className="flex items-start gap-2">
                  <div className="text-[10px] tracking-[0.18em] font-display text-muted-foreground pt-2 w-4">
                    Q{i + 1}
                  </div>
                  <Input
                    value={row.q}
                    onChange={(e) => {
                      const next = [...form.faqs];
                      next[i] = { ...next[i], q: e.target.value };
                      set("faqs", next);
                    }}
                    placeholder="What's the question?"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const next = form.faqs.filter((_, j) => j !== i);
                      set("faqs", next);
                    }}
                    aria-label="Remove question"
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
                <div className="flex items-start gap-2">
                  <div className="text-[10px] tracking-[0.18em] font-display text-muted-foreground pt-2 w-4">
                    A
                  </div>
                  <Textarea
                    rows={3}
                    value={row.a}
                    onChange={(e) => {
                      const next = [...form.faqs];
                      next[i] = { ...next[i], a: e.target.value };
                      set("faqs", next);
                    }}
                    placeholder="Plain-text answer. Keep it tight — 1–3 sentences works best for rich results."
                    className="flex-1"
                  />
                  <div className="w-9" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Switch checked={form.featured} onCheckedChange={(v) => set("featured", v)} />
        <Label>Featured</Label>
      </div>
    </form>
  );
}

// --- Neighbourhood form ---

interface NeighbourhoodFormState {
  slug: string;
  name: string;
  tagline: string;
  heroImage: string;
  creditAuthor: string;
  creditAuthorUrl: string;
  creditLicense: string;
  creditLicenseUrl: string;
  creditSourceUrl: string;
  story: string;
  outsideCopy: string;
  amenitiesCopy: string;
  shopDineCopy: string;
  realEstateCopy: string;
  lifeCopy: string;
  schools: string;
  gallery: string;
  centerLat: string;
  centerLng: string;
  avgPrice: string;
  activeCount: string;
  sortOrder: string;
  quadrant: string;
  borders: string;
}

const EMPTY_NEIGHBOURHOOD: NeighbourhoodFormState = {
  slug: "", name: "", tagline: "", heroImage: "",
  creditAuthor: "", creditAuthorUrl: "", creditLicense: "", creditLicenseUrl: "", creditSourceUrl: "",
  story: "",
  outsideCopy: "", amenitiesCopy: "", shopDineCopy: "",
  realEstateCopy: "", lifeCopy: "", schools: "", gallery: "",
  centerLat: "", centerLng: "", avgPrice: "0", activeCount: "0",
  sortOrder: "99", quadrant: "city-centre", borders: "{}",
};

function neighbourhoodToForm(n: any): NeighbourhoodFormState {
  if (!n) return EMPTY_NEIGHBOURHOOD;
  let bordersStr = "{}";
  try {
    const b = typeof n.borders === "string" ? JSON.parse(n.borders) : n.borders;
    bordersStr = JSON.stringify(b ?? {}, null, 2);
  } catch {
    bordersStr = safeStr(n.borders) || "{}";
  }
  let credit: any = {};
  try {
    credit = typeof n.heroCredit === "string" ? JSON.parse(n.heroCredit || "{}") : (n.heroCredit ?? {});
    if (!credit || typeof credit !== "object") credit = {};
  } catch {
    credit = {};
  }
  return {
    slug: safeStr(n.slug),
    name: safeStr(n.name),
    tagline: safeStr(n.tagline),
    heroImage: safeStr(n.heroImage),
    creditAuthor: safeStr(credit.author),
    creditAuthorUrl: safeStr(credit.authorUrl),
    creditLicense: safeStr(credit.license),
    creditLicenseUrl: safeStr(credit.licenseUrl),
    creditSourceUrl: safeStr(credit.sourceUrl),
    story: arrayToTextarea(n.story),
    outsideCopy: arrayToTextarea(n.outsideCopy),
    amenitiesCopy: arrayToTextarea(n.amenitiesCopy),
    shopDineCopy: arrayToTextarea(n.shopDineCopy),
    realEstateCopy: arrayToTextarea(n.realEstateCopy),
    lifeCopy: arrayToTextarea(n.lifeCopy),
    schools: typeof n.schools === "string" ? n.schools : JSON.stringify(n.schools ?? [], null, 2),
    gallery: arrayToTextarea(n.gallery),
    centerLat: safeStr(n.centerLat),
    centerLng: safeStr(n.centerLng),
    avgPrice: safeStr(n.avgPrice ?? 0),
    activeCount: safeStr(n.activeCount ?? 0),
    sortOrder: safeStr(n.sortOrder ?? 99),
    quadrant: safeStr(n.quadrant) || "city-centre",
    borders: bordersStr,
  };
}

function NeighbourhoodForm({
  initial,
  isNew,
  onSaved,
  onDeleted,
}: {
  initial: any;
  isNew: boolean;
  onSaved: (slug: string) => void;
  onDeleted: () => void;
}) {
  const [form, setForm] = useState<NeighbourhoodFormState>(() => neighbourhoodToForm(initial));
  const { toast } = useToast();
  useEffect(() => setForm(neighbourhoodToForm(initial)), [initial?.slug]);

  const save = useMutation({
    mutationFn: async (payload: NeighbourhoodFormState) => {
      const url = isNew
        ? "/api/admin/cms/neighbourhoods"
        : `/api/admin/cms/neighbourhoods/${initial.slug}`;
      const method = isNew ? "POST" : "PUT";
      let schoolsParsed: any = [];
      try { schoolsParsed = JSON.parse(payload.schools); if (!Array.isArray(schoolsParsed)) schoolsParsed = []; } catch { schoolsParsed = []; }
      const body = {
        ...payload,
        story: payload.story.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean),
        outsideCopy: payload.outsideCopy.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean),
        amenitiesCopy: payload.amenitiesCopy.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean),
        shopDineCopy: payload.shopDineCopy.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean),
        realEstateCopy: payload.realEstateCopy.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean),
        lifeCopy: payload.lifeCopy.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean),
        schools: schoolsParsed,
        gallery: payload.gallery.split(/\n+/).map((s) => s.trim()).filter(Boolean),
        borders: payload.borders,
        heroCredit:
          payload.creditAuthor || payload.creditLicense || payload.creditSourceUrl
            ? {
                author: payload.creditAuthor,
                authorUrl: payload.creditAuthorUrl,
                license: payload.creditLicense,
                licenseUrl: payload.creditLicenseUrl,
                sourceUrl: payload.creditSourceUrl,
              }
            : "",
      };
      const res = await apiRequest(method, url, body);
      return res.json();
    },
    onSuccess: (saved) => {
      toast({ title: isNew ? "Created" : "Saved", description: saved.name });
      onSaved(saved.slug);
    },
    onError: (err: any) => {
      toast({ title: "Save failed", description: String(err?.message ?? err), variant: "destructive" });
    },
  });

  const del = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", `/api/admin/cms/neighbourhoods/${initial.slug}`);
    },
    onSuccess: () => { toast({ title: "Deleted", description: initial.name }); onDeleted(); },
  });

  const refetchPolygon = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", `/api/admin/cms/neighbourhoods/${initial.slug}/polygon/refresh`);
    },
    onSuccess: () => {
      toast({ title: "Polygon cleared", description: "Next visit refetches from OSM." });
    },
  });

  const set = <K extends keyof NeighbourhoodFormState>(k: K, v: NeighbourhoodFormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); save.mutate(form); }}
      className="space-y-5"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl">
          {isNew ? "New neighbourhood" : form.name || initial?.name}
        </h2>
        <div className="flex items-center gap-2">
          {!isNew && (
            <>
              <Button type="button" variant="outline" size="sm" onClick={() => refetchPolygon.mutate()} disabled={refetchPolygon.isPending}>
                <RefreshCw className="h-4 w-4 mr-1.5" /> Refetch polygon
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button type="button" variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 mr-1.5" /> Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete {initial.name}?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Removes the neighbourhood from the public site and from the sitemap. Cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => del.mutate()}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
          <Button type="submit" disabled={save.isPending} size="sm">
            {save.isPending ? "Saving…" : isNew ? "Create" : "Save"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Name"><Input value={form.name} onChange={(e) => set("name", e.target.value)} /></Field>
        <Field label="Slug" hint={isNew ? "Auto from name if blank" : "URL ID"}>
          <Input value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder={isNew ? "auto" : ""} />
        </Field>
      </div>
      <Field label="Tagline"><Input value={form.tagline} onChange={(e) => set("tagline", e.target.value)} /></Field>
      <Field label="Hero image" hint="Paste a URL, or upload a photo (auto-resized to ~1600px). Relative /img or /uploads paths are fine.">
        <div className="flex gap-2 items-center">
          <Input value={form.heroImage} onChange={(e) => set("heroImage", e.target.value)} placeholder="/uploads/… or https://…" />
          <label className="shrink-0 inline-flex items-center px-3 h-9 rounded-md border border-input text-sm cursor-pointer hover:bg-accent whitespace-nowrap">
            Upload…
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                try {
                  const blob = await resizeImage(file, 1600);
                  const url = await uploadImage(blob, form.slug || form.name);
                  set("heroImage", url);
                  // Uploaded photos are Spencer's own — clear any CC credit.
                  set("creditAuthor", ""); set("creditAuthorUrl", ""); set("creditLicense", ""); set("creditLicenseUrl", ""); set("creditSourceUrl", "");
                  toast({ title: "Uploaded", description: url });
                } catch (err: any) {
                  toast({ title: "Upload failed", description: String(err?.message ?? err), variant: "destructive" });
                }
                e.target.value = "";
              }}
            />
          </label>
        </div>
        {form.heroImage ? <img src={form.heroImage} alt="" className="mt-2 h-24 rounded object-cover border" /> : null}
      </Field>
      <Field label="Photo credit (optional)" hint="Only for CC-licensed photos — shows a small caption on the hero. Leave blank for your own photos.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Input value={form.creditAuthor} onChange={(e) => set("creditAuthor", e.target.value)} placeholder="Author / photographer" />
          <Input value={form.creditLicense} onChange={(e) => set("creditLicense", e.target.value)} placeholder="License (e.g. CC BY 2.0)" />
          <Input value={form.creditSourceUrl} onChange={(e) => set("creditSourceUrl", e.target.value)} placeholder="Source page URL" />
          <Input value={form.creditLicenseUrl} onChange={(e) => set("creditLicenseUrl", e.target.value)} placeholder="License URL (optional)" />
        </div>
      </Field>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Field label="Center lat"><Input value={form.centerLat} onChange={(e) => set("centerLat", e.target.value)} /></Field>
        <Field label="Center lng"><Input value={form.centerLng} onChange={(e) => set("centerLng", e.target.value)} /></Field>
        <Field label="Avg price"><Input value={form.avgPrice} onChange={(e) => set("avgPrice", e.target.value)} /></Field>
        <Field label="Sort order"><Input value={form.sortOrder} onChange={(e) => set("sortOrder", e.target.value)} /></Field>
      </div>
      <Field label="Quadrant"><Input value={form.quadrant} onChange={(e) => set("quadrant", e.target.value)} /></Field>

      <Field label="Story" hint="Blank line between paragraphs"><Textarea rows={6} value={form.story} onChange={(e) => set("story", e.target.value)} /></Field>
      <Field label="Outside copy"><Textarea rows={4} value={form.outsideCopy} onChange={(e) => set("outsideCopy", e.target.value)} /></Field>
      <Field label="Amenities copy"><Textarea rows={4} value={form.amenitiesCopy} onChange={(e) => set("amenitiesCopy", e.target.value)} /></Field>
      <Field label="Shop &amp; dine copy"><Textarea rows={4} value={form.shopDineCopy} onChange={(e) => set("shopDineCopy", e.target.value)} /></Field>
      <Field label="Real estate copy"><Textarea rows={4} value={form.realEstateCopy} onChange={(e) => set("realEstateCopy", e.target.value)} /></Field>
      <Field label="Life copy"><Textarea rows={4} value={form.lifeCopy} onChange={(e) => set("lifeCopy", e.target.value)} /></Field>
      <Field label="Gallery image URLs" hint="One URL per line"><Textarea rows={4} value={form.gallery} onChange={(e) => set("gallery", e.target.value)} /></Field>
      <Field label="Schools (JSON array)" hint='[{"name":"…","level":"K-6","area":"…","url":"…"}, …]'>
        <Textarea rows={5} value={form.schools} onChange={(e) => set("schools", e.target.value)} className="font-mono text-xs" />
      </Field>
      <Field label="Borders (JSON object)" hint='{"north":"…","south":"…","east":"…","west":"…"}'>
        <Textarea rows={4} value={form.borders} onChange={(e) => set("borders", e.target.value)} className="font-mono text-xs" />
      </Field>
    </form>
  );
}

// --- Blog form ---

interface BlogFormState {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  heroImage: string;
  authorName: string;
  authorAvatar: string;
  readMinutes: string;
  publishedAt: string;
}

const EMPTY_BLOG: BlogFormState = {
  slug: "", title: "", excerpt: "", body: "", category: "Market",
  heroImage: "", authorName: "Spencer Rivers", authorAvatar: "",
  readMinutes: "5",
  publishedAt: new Date().toISOString().slice(0, 10),
};

function blogToForm(b: any): BlogFormState {
  if (!b) return EMPTY_BLOG;
  return {
    slug: safeStr(b.slug),
    title: safeStr(b.title),
    excerpt: safeStr(b.excerpt),
    body: safeStr(b.body),
    category: safeStr(b.category) || "Market",
    heroImage: safeStr(b.heroImage),
    authorName: safeStr(b.authorName) || "Spencer Rivers",
    authorAvatar: safeStr(b.authorAvatar),
    readMinutes: safeStr(b.readMinutes ?? 5),
    publishedAt: safeStr(b.publishedAt).slice(0, 10) || new Date().toISOString().slice(0, 10),
  };
}

function BlogForm({
  initial,
  isNew,
  onSaved,
  onDeleted,
}: {
  initial: any;
  isNew: boolean;
  onSaved: (slug: string) => void;
  onDeleted: () => void;
}) {
  const [form, setForm] = useState<BlogFormState>(() => blogToForm(initial));
  const [showPreview, setShowPreview] = useState(true);
  const { toast } = useToast();
  useEffect(() => setForm(blogToForm(initial)), [initial?.slug]);

  const save = useMutation({
    mutationFn: async (payload: BlogFormState) => {
      const url = isNew
        ? "/api/admin/cms/blog"
        : `/api/admin/cms/blog/${initial.slug}`;
      const method = isNew ? "POST" : "PUT";
      const res = await apiRequest(method, url, payload);
      return res.json();
    },
    onSuccess: (saved) => {
      toast({ title: isNew ? "Created" : "Saved", description: saved.title });
      onSaved(saved.slug);
    },
    onError: (err: any) => {
      toast({ title: "Save failed", description: String(err?.message ?? err), variant: "destructive" });
    },
  });

  const del = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", `/api/admin/cms/blog/${initial.slug}`);
    },
    onSuccess: () => { toast({ title: "Deleted", description: initial.title }); onDeleted(); },
  });

  const set = <K extends keyof BlogFormState>(k: K, v: BlogFormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); save.mutate(form); }}
      className="space-y-5"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl">
          {isNew ? "New blog post" : form.title || initial?.title}
        </h2>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" size="sm" onClick={() => setShowPreview((p) => !p)}>
            <Eye className="h-4 w-4 mr-1.5" /> {showPreview ? "Hide preview" : "Show preview"}
          </Button>
          {!isNew && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" variant="outline" size="sm">
                  <Trash2 className="h-4 w-4 mr-1.5" /> Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this post?</AlertDialogTitle>
                  <AlertDialogDescription>
                    The post disappears from /blog and the sitemap. Cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => del.mutate()}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          <Button type="submit" disabled={save.isPending} size="sm">
            {save.isPending ? "Saving…" : isNew ? "Create" : "Save"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Title">
          <Input value={form.title} onChange={(e) => set("title", e.target.value)} />
        </Field>
        <Field label="Slug" hint={isNew ? "Auto from title" : "URL ID"}>
          <Input value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder={isNew ? "auto" : ""} />
        </Field>
        <Field label="Category">
          <Input value={form.category} onChange={(e) => set("category", e.target.value)} />
        </Field>
        <Field label="Read time (minutes)">
          <Input type="number" value={form.readMinutes} onChange={(e) => set("readMinutes", e.target.value)} />
        </Field>
        <Field label="Published at" hint="ISO date (YYYY-MM-DD)">
          <Input type="date" value={form.publishedAt.slice(0, 10)} onChange={(e) => set("publishedAt", e.target.value)} />
        </Field>
        <Field label="Author name">
          <Input value={form.authorName} onChange={(e) => set("authorName", e.target.value)} />
        </Field>
      </div>

      <Field label="Hero image URL"><Input value={form.heroImage} onChange={(e) => set("heroImage", e.target.value)} /></Field>
      <Field label="Author avatar URL (optional)"><Input value={form.authorAvatar} onChange={(e) => set("authorAvatar", e.target.value)} /></Field>
      <Field label="Excerpt" hint="One-sentence summary; shown on /blog and as the meta description"><Textarea rows={3} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} /></Field>

      <Field label="Body" hint="Markdown: ## heading · ### subheading · > blockquote · - bullet · **bold** · *italic*. Blank line between paragraphs.">
        <div className={`grid gap-4 ${showPreview ? "lg:grid-cols-2" : ""}`}>
          <Textarea
            rows={22}
            value={form.body}
            onChange={(e) => set("body", e.target.value)}
            className="font-mono text-[13px]"
          />
          {showPreview && (
            <div className="border border-border rounded-sm p-4 bg-secondary/30 overflow-y-auto" style={{ maxHeight: 520 }}>
              <div className="font-display text-[10px] tracking-[0.22em] text-muted-foreground mb-2">PREVIEW</div>
              {renderMarkdownBody(form.body)}
            </div>
          )}
        </div>
      </Field>
    </form>
  );
}

// ---------- Container -------------------------------------------------------

export default function AdminCmsPage() {
  const [kind, setKind] = useState<EntityKind>("condos");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(false);
  const qc = useQueryClient();

  const listKey = ["/api/admin/cms", kind] as const;
  const list = useQuery<any[]>({
    queryKey: listKey,
    queryFn: async () => {
      const res = await apiRequest("GET", `/api/admin/cms/${kind}`);
      return res.json();
    },
  });

  const detailKey =
    selectedSlug && !isNew
      ? (["/api/admin/cms", kind, selectedSlug] as const)
      : null;
  const detail = useQuery<any>({
    queryKey: detailKey ?? ["noop"],
    enabled: !!detailKey,
    queryFn: async () => {
      const res = await apiRequest("GET", `/api/admin/cms/${kind}/${selectedSlug}`);
      return res.json();
    },
  });

  // When tabs switch, reset selection.
  useEffect(() => {
    setSelectedSlug(null);
    setIsNew(false);
  }, [kind]);

  const onSaved = (slug: string) => {
    qc.invalidateQueries({ queryKey: ["/api/admin/cms", kind] });
    setSelectedSlug(slug);
    setIsNew(false);
  };
  const onDeleted = () => {
    qc.invalidateQueries({ queryKey: ["/api/admin/cms", kind] });
    setSelectedSlug(null);
    setIsNew(false);
  };

  const labelFn: Record<EntityKind, (r: any) => string> = {
    condos: (r) => r.name,
    neighbourhoods: (r) => r.name,
    blog: (r) => r.title,
  };
  const subtitleFn: Record<EntityKind, (r: any) => string> = {
    condos: (r) => `${r.neighbourhood ?? "—"} · ${r.address ?? ""}`,
    neighbourhoods: (r) => `${r.quadrant ?? ""}`,
    blog: (r) => `${r.category ?? ""} · ${safeStr(r.publishedAt).slice(0, 10)}`,
  };
  const publicPath: Record<EntityKind, string> = {
    condos: "/condos",
    neighbourhoods: "/neighbourhoods",
    blog: "/blog",
  };

  return (
    <AppShell pageTitle="CMS">
      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
        <div className="mb-6">
          <h1 className="font-serif text-3xl">Content</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Edit the condo buildings, neighbourhoods, and blog posts the public site renders.
          </p>
        </div>

        <Tabs value={kind} onValueChange={(v) => setKind(v as EntityKind)}>
          <TabsList className="mb-6">
            <TabsTrigger value="condos" data-testid="cms-tab-condos">
              Condos
              {list.data && kind === "condos" && (
                <Badge variant="secondary" className="ml-2">{list.data.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="neighbourhoods" data-testid="cms-tab-neighbourhoods">
              Neighbourhoods
              {list.data && kind === "neighbourhoods" && (
                <Badge variant="secondary" className="ml-2">{list.data.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="blog" data-testid="cms-tab-blog">
              Blog
              {list.data && kind === "blog" && (
                <Badge variant="secondary" className="ml-2">{list.data.length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value={kind} className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6">
              <EntityList
                kind={kind}
                rows={list.data ?? []}
                selectedSlug={isNew ? null : selectedSlug}
                onSelect={(s) => { setSelectedSlug(s); setIsNew(false); }}
                onNew={() => { setSelectedSlug(null); setIsNew(true); }}
                labelFn={labelFn[kind]}
                subtitleFn={subtitleFn[kind]}
                publicPath={publicPath[kind]}
              />

              <Card>
                <CardContent className="p-6">
                  {!selectedSlug && !isNew ? (
                    <div className="text-sm text-muted-foreground text-center py-12">
                      Pick an entry on the left to edit, or click <strong>New</strong> to create one.
                    </div>
                  ) : isNew ? (
                    kind === "condos" ? (
                      <CondoForm initial={null} isNew onSaved={onSaved} onDeleted={onDeleted} />
                    ) : kind === "neighbourhoods" ? (
                      <NeighbourhoodForm initial={null} isNew onSaved={onSaved} onDeleted={onDeleted} />
                    ) : (
                      <BlogForm initial={null} isNew onSaved={onSaved} onDeleted={onDeleted} />
                    )
                  ) : detail.isLoading ? (
                    <div className="text-sm text-muted-foreground">Loading…</div>
                  ) : !detail.data ? (
                    <div className="text-sm text-muted-foreground">Couldn't load.</div>
                  ) : kind === "condos" ? (
                    <CondoForm initial={detail.data} isNew={false} onSaved={onSaved} onDeleted={onDeleted} />
                  ) : kind === "neighbourhoods" ? (
                    <NeighbourhoodForm initial={detail.data} isNew={false} onSaved={onSaved} onDeleted={onDeleted} />
                  ) : (
                    <BlogForm initial={detail.data} isNew={false} onSaved={onSaved} onDeleted={onDeleted} />
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
