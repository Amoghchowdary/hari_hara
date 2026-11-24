import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';

const source = readFileSync('apps-script/Code.gs', 'utf8');
const records = [];
const rateCache = new Map();
let sheetId = '';
let idCounter = 0;
const sheet = {
  getLastRow() { return records.length; },
  appendRow(row) { records.push(row); },
  getRange(row, col, count, width) {
    return {
      getValues() {
        return records.slice(row - 1, row - 1 + count).map((r) => r.slice(col - 1, col - 1 + width));
      },
      setFontWeight() {},
    };
  },
  setFrozenRows() {},
};
const workbook = {
  getId: () => 'private-sheet-id',
  getUrl: () => 'https://docs.google.com/spreadsheets/d/private-sheet-id/edit',
  getSheetByName: () => records.length ? sheet : null,
  insertSheet: () => sheet,
};
const context = {
  PropertiesService: {
    getScriptProperties: () => ({
      getProperty: () => sheetId,
      setProperty: (_key, val) => { sheetId = val; },
    }),
  },
  SpreadsheetApp: {
    create: () => workbook,
    openById: (id) => { assert.equal(id, 'private-sheet-id'); return workbook; },
    flush: () => {},
  },
  Logger: { log() {} },
  CacheService: { getScriptCache: () => ({ get: (key) => rateCache.get(key), put: (key, value) => rateCache.set(key, value) }) },
  LockService: {
    getScriptLock: () => ({ waitLock() {}, releaseLock() {} }),
  },
  Utilities: {
    getUuid: () => `12345678-0000-0000-0000-${++idCounter}`,
    formatDate: () => '20261121',
  },
  Session: { getScriptTimeZone: () => 'Asia/Kolkata' },
  HtmlService: {
    XFrameOptionsMode: { ALLOWALL: 'ALLOWALL' },
    createHtmlOutput(html) {
      return { html, setXFrameOptionsMode(mode) { this.xFrameMode = mode; return this; } };
    },
  },
};
vm.createContext(context);
vm.runInContext(source, context);
assert.match(context.doGet().html, /Harihara Constructions Enquiry API/);
context.setupSpreadsheet();
assert.equal(records.length, 1, 'Must create header row');
const parameters = {
  action: 'submit_enquiry',
  request_id: 'test-request-123456789',
  origin: 'http://localhost:3000',
  website: '',
  full_name: 'Sample Customer',
  phone: '9876543210',
  whatsapp: '',
  email: 'customer@example.com',
  location: 'Hyderabad',
  service_interest: 'Construction',
  budget_range: 'Not sure yet',
  preferred_contact_time: 'Anytime',
  project_description: 'A new farmhouse for our family',
  source: 'harihara-website-v4',
};
const result = context.doPost({ parameter: parameters });
assert.equal(result.xFrameMode, 'ALLOWALL');
assert.match(result.html, /"ok":true/);
assert.match(result.html, /HH-20261121-/);
assert.match(result.html, /window\.top\.postMessage/);
assert.equal(records.length, 2, 'One enquiry appended');
const customDomainParams = { ...parameters, origin: 'https://www.hariharafabrictionsandconstructions.in' };
const customDomainResult = context.doPost({ parameter: customDomainParams });
assert.match(customDomainResult.html, /"ok":true/);
assert.match(customDomainResult.html, /window\.top\.postMessage/);
assert.ok(customDomainResult.html.includes('https://www.hariharafabrictionsandconstructions.in'), 'Receipt must be posted to custom domain');
assert.equal(records.length, 2, 'Same request_id must be deduplicated');
const dup = context.doPost({ parameter: parameters });
assert.match(dup.html, /"ok":true/);
assert.equal(records.length, 2, 'Duplicate should not append another row');
const bad = context.doPost({ parameter: { ...parameters, request_id: 'test-bad-request-12', phone: '123' } });
assert.match(bad.html, /"ok":false/);
assert.equal(records.length, 2, 'Bad phone should not append');
const foreign = context.doPost({ parameter: { ...parameters, request_id: 'test-foreign-123', origin: 'https://untrusted.example' } });
assert.match(foreign.html, /"ok":false/);
assert.equal(records.length, 2, 'Untrusted origin should not append');
const poison = context.doPost({ parameter: { ...parameters, request_id: 'test-formula-123', phone: '9876543211', full_name: '=IMPORTRANGE("a","b")' } });
assert.match(poison.html, /"ok":true/);
assert.match(records[2][3], /^'/, 'Formula injection must be escaped');
const throttled = context.doPost({ parameter: { ...parameters, request_id: 'test-throttle-123' } });
assert.match(throttled.html, /"ok":false/);
assert.equal(records.length, 3, 'Rapid repeat from same phone should be throttled');
console.log('PASS: Apps Script backend simulation: success, duplicate, invalid phone, foreign origin, formula safety, rate-limit, safe Google Sheets write.');
