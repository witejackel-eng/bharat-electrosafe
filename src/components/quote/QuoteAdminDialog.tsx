'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import {
  LayoutDashboard,
  RefreshCw,
  Search,
  Eye,
  Copy,
  Mail,
  Phone,
  MapPin,
  FileText,
  ChevronDown,
  Inbox,
  AlertCircle,
} from 'lucide-react';
import { productSystems } from '@/data/products';

interface QuoteAdminDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface QuoteRecord {
  id: string;
  submittedAt: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  productSystem: string;
  productClass?: string;
  operatingVoltage?: string;
  dimensions?: string;
  quantity?: string;
  deliveryLocation?: string;
  message?: string;
}

const manropeStyle = { fontFamily: "'Manrope', sans-serif" } as const;

type FilterValue = 'all' | 'class-A' | 'class-B' | 'class-C' | 'other';

const FILTER_OPTIONS: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'All systems' },
  { value: 'class-A', label: 'Class A' },
  { value: 'class-B', label: 'Class B' },
  { value: 'class-C', label: 'Class C' },
  { value: 'other', label: 'Other systems' },
];

/* ---------- Helpers ---------- */

function formatRelativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '—';
  const diffSec = Math.max(0, Math.floor((Date.now() - then) / 1000));
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay}d ago`;
}

function formatAbsoluteTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function resolveProductSystemName(id: string): string {
  const match = productSystems.find((p) => p.id === id);
  return match?.name ?? id;
}

function classLabel(cls?: string): string {
  if (!cls) return '—';
  return `Class ${cls}`;
}

/* ---------- Stat card ---------- */

function StatCard({
  label,
  value,
  accent = 'navy',
}: {
  label: string;
  value: number;
  accent?: 'navy' | 'orange';
}) {
  return (
    <div
      className="rounded-xl border border-border/60 bg-white px-4 py-3 dark:bg-card"
      style={manropeStyle}
    >
      <div className="flex items-center justify-between">
        <span className="text-[0.65rem] font-medium uppercase tracking-wider text-steel">
          {label}
        </span>
        <span
          className={`inline-block size-1.5 rounded-full ${
            accent === 'orange' ? 'bg-orange' : 'bg-navy/40'
          }`}
          aria-hidden="true"
        />
      </div>
      <div
        className="mt-1 text-2xl font-bold text-navy tabular-nums"
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {value}
      </div>
    </div>
  );
}

/* ---------- Main dialog ---------- */

export function QuoteAdminDialog({ open, onOpenChange }: QuoteAdminDialogProps) {
  const { toast } = useToast();
  const [quotes, setQuotes] = useState<QuoteRecord[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const [filter, setFilter] = useState<FilterValue>('all');
  const [query, setQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchQuotes = useCallback(async () => {
    setStatus('loading');
    try {
      const res = await fetch('/api/quote', { cache: 'no-store' });
      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();
      const list: QuoteRecord[] = Array.isArray(data?.quotes) ? data.quotes : [];
      // Newest first
      list.sort(
        (a, b) =>
          new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      );
      setQuotes(list);
      setLastRefresh(new Date());
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }, []);

  // Fetch on open
  useEffect(() => {
    if (open) {
      void fetchQuotes();
    }
  }, [open, fetchQuotes]);

  const filteredQuotes = useMemo(() => {
    const q = query.trim().toLowerCase();
    return quotes.filter((rec) => {
      // Filter by class
      if (filter === 'class-A' && rec.productClass !== 'A') return false;
      if (filter === 'class-B' && rec.productClass !== 'B') return false;
      if (filter === 'class-C' && rec.productClass !== 'C') return false;
      if (
        filter === 'other' &&
        (rec.productClass === 'A' ||
          rec.productClass === 'B' ||
          rec.productClass === 'C')
      ) {
        return false;
      }

      if (!q) return true;
      const haystack = [
        rec.id,
        rec.name,
        rec.company ?? '',
        rec.email,
        rec.phone,
        resolveProductSystemName(rec.productSystem),
        rec.deliveryLocation ?? '',
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [quotes, filter, query]);

  const counts = useMemo(() => {
    const classA = quotes.filter((q) => q.productClass === 'A').length;
    const classB = quotes.filter((q) => q.productClass === 'B').length;
    const classC = quotes.filter((q) => q.productClass === 'C').length;
    return { total: quotes.length, classA, classB, classC };
  }, [quotes]);

  const handleCopyEmail = useCallback(
    async (email: string) => {
      try {
        await navigator.clipboard.writeText(email);
        toast({
          title: 'Email copied',
          description: email,
        });
      } catch {
        toast({
          title: 'Could not copy',
          description: 'Clipboard access was denied by the browser.',
        });
      }
    },
    [toast]
  );

  const toggleExpand = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (!next) {
        // Reset transient UI state on close
        setExpandedId(null);
        setQuery('');
        setFilter('all');
      }
      onOpenChange(next);
    },
    [onOpenChange]
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:max-w-5xl max-h-[85vh] overflow-hidden flex flex-col bg-ivory-light p-0 gap-0"
        showCloseButton
      >
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/60">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex size-9 items-center justify-center rounded-lg bg-orange-soft text-orange">
                <LayoutDashboard className="size-5" />
              </div>
              <div>
                <DialogTitle
                  className="text-xl font-bold text-navy"
                  style={manropeStyle}
                >
                  Quote requests dashboard
                </DialogTitle>
                <DialogDescription
                  className="text-steel text-sm"
                  style={manropeStyle}
                >
                  {status === 'success' && lastRefresh
                    ? `${counts.total} request${counts.total === 1 ? '' : 's'} · last refreshed ${formatRelativeTime(lastRefresh.toISOString())}`
                    : 'Review and triage incoming quote requests'}
                </DialogDescription>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Toolbar */}
        <div
          className="flex flex-col gap-3 px-6 py-4 border-b border-border/60 bg-white/40 dark:bg-card/40"
          style={manropeStyle}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => void fetchQuotes()}
              disabled={status === 'loading'}
              className="h-9 border-border/60 text-navy hover:text-orange hover:border-orange/40 bg-white dark:bg-card"
              aria-label="Refresh quotes"
            >
              <RefreshCw
                className={`size-4 ${status === 'loading' ? 'animate-spin' : ''}`}
              />
              <span>Refresh</span>
            </Button>

            <Select
              value={filter}
              onValueChange={(v) => setFilter(v as FilterValue)}
            >
              <SelectTrigger
                className="h-9 w-full sm:w-[180px] border-border/60 bg-white text-navy dark:bg-card"
                aria-label="Filter by class"
              >
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                {FILTER_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-steel pointer-events-none" />
              <Input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search reference, name, company or email"
                className="h-9 pl-9 border-border/60 bg-white text-navy placeholder:text-steel dark:bg-card"
                aria-label="Search quotes"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            <StatCard label="Total requests" value={counts.total} accent="navy" />
            <StatCard label="Class A" value={counts.classA} accent="orange" />
            <StatCard label="Class B" value={counts.classB} accent="orange" />
            <StatCard label="Class C" value={counts.classC} accent="orange" />
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {status === 'loading' ? (
            <LoadingState />
          ) : status === 'error' ? (
            <ErrorState onRetry={() => void fetchQuotes()} />
          ) : filteredQuotes.length === 0 ? (
            <EmptyState hasQuotes={quotes.length > 0} />
          ) : (
            <div
              className="flex-1 overflow-y-auto px-6 py-4"
              style={manropeStyle}
            >
              <table className="w-full border-collapse text-sm">
                <thead className="sticky top-0 z-10 bg-ivory-light dark:bg-card">
                  <tr className="text-left text-[0.65rem] font-semibold uppercase tracking-wider text-steel">
                    <th className="py-2 pr-3 font-semibold">Reference</th>
                    <th className="py-2 pr-3 font-semibold">Submitted</th>
                    <th className="py-2 pr-3 font-semibold">Contact</th>
                    <th className="py-2 pr-3 font-semibold">System</th>
                    <th className="py-2 pr-3 font-semibold">V / Qty</th>
                    <th className="py-2 pr-3 font-semibold">Status</th>
                    <th className="py-2 pr-2 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuotes.map((rec, idx) => {
                    const isExpanded = expandedId === rec.id;
                    const striped = idx % 2 === 1;
                    return (
                      <QuoteRow
                        key={rec.id}
                        record={rec}
                        striped={striped}
                        expanded={isExpanded}
                        onToggleExpand={() => toggleExpand(rec.id)}
                        onCopyEmail={() => void handleCopyEmail(rec.email)}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer summary */}
        <div
          className="px-6 py-3 border-t border-border/60 bg-white/60 dark:bg-card/60 flex items-center justify-between text-xs text-steel"
          style={manropeStyle}
        >
          <span>
            Showing <span className="text-navy font-semibold">{filteredQuotes.length}</span> of{' '}
            <span className="text-navy font-semibold">{quotes.length}</span> requests
          </span>
          <span className="hidden sm:inline">
            Data is in-memory and resets on server restart
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ---------- Row ---------- */

function QuoteRow({
  record,
  striped,
  expanded,
  onToggleExpand,
  onCopyEmail,
}: {
  record: QuoteRecord;
  striped: boolean;
  expanded: boolean;
  onToggleExpand: () => void;
  onCopyEmail: () => void;
}) {
  return (
    <>
      <tr
        className={`group border-b border-border/40 transition-colors ${
          striped ? 'bg-muted/40' : 'bg-white/40 dark:bg-card/30'
        } hover:bg-orange-soft`}
      >
        <td className="py-3 pr-3 align-top">
          <span
            className="font-mono text-[0.78rem] font-semibold text-orange tabular-nums"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {record.id}
          </span>
        </td>
        <td className="py-3 pr-3 align-top whitespace-nowrap">
          <span
            className="text-navy text-[0.78rem]"
            title={formatAbsoluteTime(record.submittedAt)}
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {formatRelativeTime(record.submittedAt)}
          </span>
        </td>
        <td className="py-3 pr-3 align-top">
          <div className="flex flex-col">
            <span className="font-medium text-navy leading-tight">
              {record.name}
            </span>
            {record.company ? (
              <span className="text-[0.72rem] text-steel leading-tight">
                {record.company}
              </span>
            ) : null}
            <span className="text-[0.72rem] text-steel leading-tight mt-0.5">
              {record.email}
            </span>
          </div>
        </td>
        <td className="py-3 pr-3 align-top">
          <div className="flex flex-col">
            <span className="text-navy text-[0.78rem] leading-tight">
              {resolveProductSystemName(record.productSystem)}
            </span>
            <span
              className="text-[0.7rem] text-steel leading-tight mt-0.5"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {classLabel(record.productClass)}
            </span>
          </div>
        </td>
        <td className="py-3 pr-3 align-top">
          <div className="flex flex-col">
            <span
              className="text-navy text-[0.78rem] leading-tight"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {record.operatingVoltage || '—'}
            </span>
            <span
              className="text-[0.7rem] text-steel leading-tight mt-0.5"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {record.quantity || '—'}
            </span>
          </div>
        </td>
        <td className="py-3 pr-3 align-top">
          <Badge
            className="bg-orange text-white border-transparent hover:bg-orange"
            style={manropeStyle}
          >
            NEW
          </Badge>
        </td>
        <td className="py-3 pr-2 align-top">
          <div className="flex items-center justify-end gap-1.5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={onToggleExpand}
                  className="h-8 px-2 text-navy hover:text-orange hover:bg-orange-soft"
                  aria-label={expanded ? 'Collapse details' : 'View full details'}
                  aria-expanded={expanded}
                >
                  <Eye className="size-4" />
                  <span className="text-xs">{expanded ? 'Hide' : 'View'}</span>
                  <ChevronDown
                    className={`size-3.5 transition-transform ${
                      expanded ? 'rotate-180' : ''
                    }`}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>View full details</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={onCopyEmail}
                  className="h-8 px-2 text-navy hover:text-orange hover:bg-orange-soft"
                  aria-label={`Copy email ${record.email}`}
                >
                  <Copy className="size-4" />
                  <span className="text-xs hidden lg:inline">Copy email</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy email to clipboard</TooltipContent>
            </Tooltip>
          </div>
        </td>
      </tr>

      {expanded ? (
        <tr className="bg-orange-soft/60 dark:bg-card/60">
          <td colSpan={7} className="px-6 py-4">
            <div
              className="animate-in fade-in-0 slide-in-from-top-2 duration-200 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3"
              style={manropeStyle}
            >
              <DetailField
                icon={<MapPin className="size-3.5" />}
                label="Delivery location"
                value={record.deliveryLocation}
              />
              <DetailField
                icon={<FileText className="size-3.5" />}
                label="Dimensions"
                value={record.dimensions}
              />
              <DetailField
                icon={<Phone className="size-3.5" />}
                label="Phone"
                value={record.phone}
              />
              <DetailField
                icon={<Mail className="size-3.5" />}
                label="Email"
                value={record.email}
              />
              <div className="md:col-span-2">
                <DetailField
                  icon={<FileText className="size-3.5" />}
                  label="Additional requirements"
                  value={record.message}
                  multiline
                />
              </div>
            </div>
          </td>
        </tr>
      ) : null}
    </>
  );
}

function DetailField({
  icon,
  label,
  value,
  multiline = false,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  multiline?: boolean;
}) {
  const hasValue = Boolean(value && value.trim());
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5 text-[0.65rem] font-medium uppercase tracking-wider text-steel">
        <span className="text-orange">{icon}</span>
        <span>{label}</span>
      </div>
      <div
        className={`text-sm text-navy ${
          multiline ? 'whitespace-pre-wrap leading-relaxed' : ''
        }`}
      >
        {hasValue ? value : <span className="text-steel-light italic">Not provided</span>}
      </div>
    </div>
  );
}

/* ---------- States ---------- */

function LoadingState() {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-4" style={manropeStyle}>
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-lg border border-border/40 bg-white/40 dark:bg-card/40 p-3"
          >
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-12 rounded-full" />
            <Skeleton className="h-8 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div
      className="flex-1 flex items-center justify-center px-6 py-10"
      style={manropeStyle}
    >
      <div className="max-w-md text-center">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-orange-soft text-orange">
          <AlertCircle className="size-6" />
        </div>
        <h3 className="text-base font-semibold text-navy">Could not load quotes</h3>
        <p className="mt-1 text-sm text-steel">
          Something went wrong while fetching the quote requests. Please try again.
        </p>
        <Button
          type="button"
          onClick={onRetry}
          className="mt-4 bg-orange hover:bg-orange-hover text-white"
        >
          <RefreshCw className="size-4" />
          Retry
        </Button>
      </div>
    </div>
  );
}

function EmptyState({ hasQuotes }: { hasQuotes: boolean }) {
  return (
    <div
      className="flex-1 flex items-center justify-center px-6 py-12"
      style={manropeStyle}
    >
      <div className="max-w-md text-center">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-muted text-steel">
          <Inbox className="size-6" />
        </div>
        <h3 className="text-base font-semibold text-navy">
          {hasQuotes ? 'No matching requests' : 'No quote requests yet'}
        </h3>
        <p className="mt-1 text-sm text-steel">
          {hasQuotes
            ? 'Try adjusting the filter or search query to find what you are looking for.'
            : 'Submitted quote requests will appear here. New requests from the quote form are stored in-memory and will show up after a refresh.'}
        </p>
      </div>
    </div>
  );
}
