import { saveFile } from '@/shared/utils';

export function generateReport(reportData: Record<string, string | number>) {
  const data = Object.entries(reportData)
    .map((row) => row.join(','))
    .join('\n');

  const csvBlob = new Blob([data], { type: 'text/csv' });
  const blobUrl = URL.createObjectURL(csvBlob);

  saveFile(blobUrl, 'report.csv');

  URL.revokeObjectURL(blobUrl);
}
