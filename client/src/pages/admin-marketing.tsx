import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Send,
  Sparkles,
  Trash2,
  Image as ImageIcon,
  CalendarPlus,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
} from "lucide-react";
import { apiRequest, apiUrl } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { timeAgoShort } from "@/lib/format";
import type { PublicListing } from "@/lib/types";

const CHANNELS = [
  { id: "instagram", label: "Instagram", icon: Instagram },
  { id: "facebook", label: "Facebook", icon: Facebook },
  { id: "x", label: "X", icon: Twitter },
  { id: "linkedin", label: "LinkedIn", icon: Linkedin },
] as const;

interface SocialPost {
  id: number;
  caption: string;
  imageUrl: string | null;
  channels: string[];
  scheduledFor: string | null;
  status: "draft" | "scheduled" | "posted" | "failed";
  postedAt: string | null;
  createdAt: string;
  listingId: string | null;
}

// Deterministic placeholder caption generator (the live deploy can't reach
// external AI APIs, so we synthesize a brand-aligned suggestion from the
// listing data and let Spencer edit before posting).
function suggestCaption(listing: PublicListing | undefined) {
  if (!listing) {
    return "New on the market in Calgary. Reply for the brief.";
  }
  const lines = [
    `${listing.title} — ${listing.address.split(",")[0]}.`,
    `${listing.beds} bed · ${listing.baths} bath · ${(listing.sqft ?? 0).toLocaleString("en-CA")} sqft`,
    listing.features?.[0] ? `Highlight: ${listing.features[0].toLowerCase()}.` : "",
    "DM for the full brief.",
  ].filter(Boolean);
  return lines.join("\n");
}

export default function AdminMarketingPage() {
  const qc = useQueryClient();
  const { toast } = useToast();

  const { data: posts = [], isLoading } = useQuery<SocialPost[]>({ queryKey: ["/api/social-posts"] });
  const { data: listings = [] } = useQuery<PublicListing[]>({ queryKey: ["/api/listings"] });

  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedChannels, setSelectedChannels] = useState<string[]>(["instagram"]);
  const [linkedListing, setLinkedListing] = useState<string>("none");
  const [scheduledFor, setScheduledFor] = useState("");

  function toggleChannel(id: string) {
    setSelectedChannels((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));
  }

  function applySuggestion() {
    const listing = listings.find((l) => l.id === linkedListing);
    setCaption(suggestCaption(listing));
    if (!imageUrl && listing?.heroImage) setImageUrl(listing.heroImage);
  }

  const saveAndPost = useMutation({
    mutationFn: async (mode: "draft" | "post-now" | "schedule") => {
      const created = await apiRequest("POST", "/api/social-posts", {
        caption,
        imageUrl: imageUrl || null,
        channels: selectedChannels,
        scheduledFor: mode === "schedule" && scheduledFor ? new Date(scheduledFor).toISOString() : null,
        status: mode === "schedule" ? "scheduled" : "draft",
        listingId: linkedListing === "none" ? null : linkedListing,
      });
      const post = await created.json();
      if (mode === "post-now") {
        await apiRequest("POST", `/api/social-posts/${post.id}/post`);
      }
      return post;
    },
    onSuccess: (_data, mode) => {
      qc.invalidateQueries({ queryKey: ["/api/social-posts"] });
      setCaption("");
      setImageUrl("");
      setScheduledFor("");
      toast({
        title: mode === "post-now" ? "Posted" : mode === "schedule" ? "Scheduled" : "Saved as draft",
        description:
          mode === "post-now"
            ? `Pushed to ${selectedChannels.join(", ") || "no channels"}.`
            : mode === "schedule"
              ? "We'll post when the time hits."
              : "Lives in drafts until you're ready.",
      });
    },
    onError: (e: any) => {
      toast({ title: "Couldn't save post", description: e?.message ?? "Try again.", variant: "destructive" });
    },
  });

  const postNow = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("POST", `/api/social-posts/${id}/post`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/social-posts"] });
      toast({ title: "Posted" });
    },
  });

  const deletePost = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/social-posts/${id}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/social-posts"] });
    },
  });

  const drafts = posts.filter((p) => p.status === "draft");
  const scheduled = posts.filter((p) => p.status === "scheduled");
  const posted = posts.filter((p) => p.status === "posted");

  return (
    <AppShell pageTitle="Marketing">
      <div className="p-6 max-w-[1400px] mx-auto">
        <div className="mb-6">
          <h1 className="font-serif text-3xl text-foreground" style={{ letterSpacing: "-0.01em" }}>
            Marketing
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5">
            One composer, all channels. Draft, schedule, or post a single piece of copy across your social
            accounts in one click.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
          {/* Composer */}
          <div className="space-y-5">
            <Card>
              <CardContent className="p-5 space-y-4">
                <div>
                  <Label className="eyebrow text-muted-foreground">Tied to listing</Label>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Select value={linkedListing} onValueChange={setLinkedListing}>
                      <SelectTrigger className="rounded-sm h-10">
                        <SelectValue placeholder="Optional · pick a listing" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">— No listing —</SelectItem>
                        {listings.map((l) => (
                          <SelectItem key={l.id} value={l.id}>
                            {l.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="rounded-sm h-10 font-display tracking-[0.14em] text-[11px] shrink-0"
                      onClick={applySuggestion}
                      disabled={linkedListing === "none"}
                    >
                      <Sparkles className="w-3.5 h-3.5 mr-1.5" /> SUGGEST CAPTION
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="eyebrow text-muted-foreground">Caption</Label>
                  <Textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="What you're posting…"
                    className="mt-1.5 rounded-sm min-h-[160px] font-serif text-base leading-relaxed"
                    style={{ letterSpacing: "-0.005em" }}
                  />
                  <div className="flex items-center justify-between mt-1.5 text-[11px] text-muted-foreground font-display tracking-[0.14em]">
                    <span>{caption.length} CHARS</span>
                    <span className="italic normal-case tracking-normal text-muted-foreground/70">
                      Avoid: stunning · nestled · must-see · dream home · boasts
                    </span>
                  </div>
                </div>

                <div>
                  <Label className="eyebrow text-muted-foreground">Image URL</Label>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Input
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://…"
                      className="rounded-sm h-10"
                    />
                    {imageUrl && (
                      <img
                        src={apiUrl(imageUrl)}
                        alt=""
                        className="w-10 h-10 rounded-sm object-cover border border-border shrink-0"
                        onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                      />
                    )}
                  </div>
                </div>

                <div>
                  <Label className="eyebrow text-muted-foreground">Channels</Label>
                  <div className="flex flex-wrap gap-2 mt-1.5">
                    {CHANNELS.map((c) => {
                      const Icon = c.icon;
                      const checked = selectedChannels.includes(c.id);
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => toggleChannel(c.id)}
                          className={`inline-flex items-center gap-2 px-3 h-9 rounded-sm border text-xs font-display tracking-[0.14em] transition-colors ${
                            checked
                              ? "bg-foreground text-background border-foreground"
                              : "bg-background text-foreground border-border hover:bg-secondary"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" strokeWidth={1.6} />
                          {c.label.toUpperCase()}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <Label className="eyebrow text-muted-foreground">Schedule (optional)</Label>
                  <Input
                    type="datetime-local"
                    value={scheduledFor}
                    onChange={(e) => setScheduledFor(e.target.value)}
                    className="mt-1.5 rounded-sm h-10"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-border">
                  <Button
                    variant="outline"
                    className="rounded-sm font-display tracking-[0.14em] text-[11px] h-10"
                    disabled={!caption.trim() || saveAndPost.isPending}
                    onClick={() => saveAndPost.mutate("draft")}
                  >
                    SAVE DRAFT
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-sm font-display tracking-[0.14em] text-[11px] h-10"
                    disabled={!caption.trim() || !scheduledFor || saveAndPost.isPending}
                    onClick={() => saveAndPost.mutate("schedule")}
                  >
                    <CalendarPlus className="w-3.5 h-3.5 mr-1.5" /> SCHEDULE
                  </Button>
                  <Button
                    className="rounded-sm font-display tracking-[0.14em] text-[11px] h-10 ml-auto"
                    disabled={
                      !caption.trim() || selectedChannels.length === 0 || saveAndPost.isPending
                    }
                    onClick={() => saveAndPost.mutate("post-now")}
                  >
                    <Send className="w-3.5 h-3.5 mr-1.5" />
                    POST TO {selectedChannels.length || 0}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* History */}
            <div>
              <div className="eyebrow text-muted-foreground mb-3">Recent activity</div>
              {isLoading ? (
                <div className="text-sm text-muted-foreground">Loading…</div>
              ) : posts.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center text-sm text-muted-foreground">
                    Nothing posted yet. Drafts and posted items will land here.
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {[...drafts, ...scheduled, ...posted]
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((p) => (
                      <PostRow
                        key={p.id}
                        post={p}
                        onPostNow={() => postNow.mutate(p.id)}
                        onDelete={() => deletePost.mutate(p.id)}
                      />
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* Right rail: stats */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-5">
                <div className="eyebrow text-muted-foreground mb-3">This month</div>
                <div className="grid grid-cols-3 gap-3">
                  <KpiCell label="Drafts" value={drafts.length} />
                  <KpiCell label="Scheduled" value={scheduled.length} />
                  <KpiCell label="Posted" value={posted.length} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="eyebrow text-muted-foreground mb-3">Voice notes</div>
                <ul className="text-xs text-foreground/80 space-y-2 leading-relaxed">
                  <li>· Lead with the address or neighbourhood, not adjectives.</li>
                  <li>· One concrete detail beats three superlatives.</li>
                  <li>· Sign off with "Chat soon, cheers!" on long posts.</li>
                  <li>· Skip: stunning, nestled, dream home, must-see, boasts.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function KpiCell({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="font-serif text-2xl text-foreground" style={{ letterSpacing: "-0.02em" }}>
        {value}
      </div>
      <div className="eyebrow text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}

function PostRow({
  post,
  onPostNow,
  onDelete,
}: {
  post: SocialPost;
  onPostNow: () => void;
  onDelete: () => void;
}) {
  const statusColor =
    post.status === "posted"
      ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100"
      : post.status === "scheduled"
        ? "bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-100"
        : post.status === "failed"
          ? "bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-100"
          : "bg-secondary text-secondary-foreground";

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {post.imageUrl ? (
            <img
              src={apiUrl(post.imageUrl)}
              alt=""
              className="w-14 h-14 rounded-sm object-cover border border-border shrink-0"
              onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
            />
          ) : (
            <div className="w-14 h-14 rounded-sm bg-secondary flex items-center justify-center shrink-0">
              <ImageIcon className="w-5 h-5 text-muted-foreground" strokeWidth={1.4} />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                className={`rounded-sm font-display tracking-[0.1em] text-[9px] uppercase ${statusColor}`}
              >
                {post.status}
              </Badge>
              {post.channels.map((c) => (
                <Badge key={c} variant="outline" className="rounded-sm font-display text-[9px] tracking-[0.1em] uppercase">
                  {c}
                </Badge>
              ))}
              <span className="text-[11px] text-muted-foreground ml-auto">
                {post.postedAt ? `Posted ${timeAgoShort(post.postedAt)}` : timeAgoShort(post.createdAt)}
              </span>
            </div>
            <div className="text-sm text-foreground/90 mt-2 line-clamp-3 whitespace-pre-line">
              {post.caption}
            </div>
            <div className="flex items-center gap-2 mt-2">
              {post.status !== "posted" && (
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-sm font-display tracking-[0.14em] text-[10px] h-7"
                  onClick={onPostNow}
                >
                  <Send className="w-3 h-3 mr-1.5" /> POST NOW
                </Button>
              )}
              <Button
                size="sm"
                variant="ghost"
                className="rounded-sm font-display tracking-[0.14em] text-[10px] h-7 text-destructive ml-auto"
                onClick={onDelete}
              >
                <Trash2 className="w-3 h-3 mr-1" /> DELETE
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
