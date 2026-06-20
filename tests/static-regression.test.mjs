import assert from 'node:assert/strict';
import fs from 'node:fs';

const indexHtml = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const uploadHtml = fs.readFileSync(new URL('../upload.html', import.meta.url), 'utf8');

assert.equal(
  indexHtml.includes('updated_at'),
  false,
  'index.html should not query sales_orders.updated_at because the column does not exist'
);

assert.match(
  uploadHtml,
  /FIXED_IMPORT_COLUMNS/,
  'upload.html should define fixed Excel column indexes for critical fields'
);

assert.match(
  uploadHtml,
  /header:\s*1/,
  'upload.html should read the worksheet as arrays so fixed columns do not depend on header names'
);

assert.match(
  uploadHtml,
  /newRow\.order_no\s*=\s*normalizeFixedCell\(rowCells\[FIXED_IMPORT_COLUMNS\.order_no\]\)/,
  'upload.html should read order_no from a fixed column'
);

assert.match(
  uploadHtml,
  /newRow\.barcode\s*=\s*normalizeFixedCell\(rowCells\[FIXED_IMPORT_COLUMNS\.barcode\]\)/,
  'upload.html should read barcode from a fixed column'
);
