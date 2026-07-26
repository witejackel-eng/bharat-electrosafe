/**
 * CSV export helpers for the Bharat Electrosafe quote admin dashboard.
 *
 * - Builds a CSV string with proper escaping (RFC 4180):
 *   every value wrapped in double quotes, internal quotes doubled.
 * - Prepends a UTF-8 BOM so Excel opens the file with the correct
 *   encoding (handles ₹ and other non-ASCII characters).
 * - Triggers a browser download with a date-stamped filename.
 */

export interface CsvQuoteRow {
  reference: string;
  submittedAt: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  productSystem: string;
  productClass: string;
  voltage: string;
  quantity: string;
  dimensions: string;
  deliveryLocation: string;
  message: string;
  status: string;
}

const CSV_HEADERS: readonly string[] = [
  'Reference',
  'Submitted At',
  'Name',
  'Company',
  'Email',
  'Phone',
  'Product System',
  'Class',
  'Voltage',
  'Quantity',
  'Dimensions',
  'Delivery Location',
  'Message',
  'Status',
] as const;

const COLUMN_ORDER: readonly (keyof CsvQuoteRow)[] = [
  'reference',
  'submittedAt',
  'name',
  'company',
  'email',
  'phone',
  'productSystem',
  'productClass',
  'voltage',
  'quantity',
  'dimensions',
  'deliveryLocation',
  'message',
  'status',
] as const;

/**
 * Escape a single CSV cell. Always wraps in double quotes; doubles any
 * internal double quotes. Normalizes newlines inside the value to spaces
 * so a single record never splits across multiple CSV rows.
 */
function escapeCell(value: string): string {
  const safe = (value ?? '').replace(/\r\n|\n|\r/g, ' ');
  return `"${safe.replace(/"/g, '""')}"`;
}

/** Build a CSV string (UTF-8, BOM-friendly) from the given rows. */
export function buildCsv(rows: readonly CsvQuoteRow[]): string {
  const headerLine = CSV_HEADERS.map(escapeCell).join(',');
  const bodyLines = rows.map((row) =>
    COLUMN_ORDER.map((key) => escapeCell(row[key])).join(',')
  );
  return [headerLine, ...bodyLines].join('\r\n');
}

/** Format today's date as YYYY-MM-DD in the local timezone. */
function todayDateStamp(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Generate a CSV from `rows` and trigger a browser download.
 * Returns the generated filename on success.
 */
export function downloadCsv(rows: readonly CsvQuoteRow[]): string {
  const csv = buildCsv(rows);
  // Prepend the UTF-8 BOM so Excel parses ₹ and other Unicode correctly.
  const blob = new Blob(['\uFEFF', csv], {
    type: 'text/csv;charset=utf-8;',
  });
  const url = URL.createObjectURL(blob);
  const filename = `bharat-electrosafe-quotes-${todayDateStamp()}.csv`;
  // Use a temporary anchor element to trigger the download.
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  link.setAttribute('aria-hidden', 'true');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  // Defer revoke so the download has time to start in all browsers.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return filename;
}
