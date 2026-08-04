import assert from 'node:assert/strict';
import test from 'node:test';
import { validateInquiry } from '../lib/inquiry';

const valid = {
  clientName: 'Test User', company: 'Test Company', phone: '+966 50 000 0000', email: 'test@example.org',
  service: 'web', budget: '5000_15000', timeline: 'ONE_TO_THREE_MONTHS',
  description: 'A sufficiently detailed project description for validation.', preferredLanguage: 'en',
  consent: true, website: '', formStartedAt: Date.now() - 5_000,
  estimatorData: { summary: 'Website estimate', range: 'SAR 12,000 – SAR 24,000', ignored: 'not persisted' },
};
test('valid enquiry is normalized and estimator fields are allow-listed', () => { const result = validateInquiry(valid); assert.equal(result.ok, true); if (result.ok) { assert.deepEqual(result.data.estimatorData, { summary: 'Website estimate', range: 'SAR 12,000 – SAR 24,000' }); assert.equal(result.data.email, 'test@example.org'); } });
test('invalid contact, consent, and enumerations are rejected', () => { const result = validateInquiry({ ...valid, email: 'bad', phone: '1', service: 'unknown', consent: false }); assert.equal(result.ok, false); if (!result.ok) assert.equal(result.code, 'validation_failed'); });
test('unsafe markup and control characters are removed', () => { const result = validateInquiry({ ...valid, clientName: '<Test>\u0000 User' }); assert.equal(result.ok, true); if (result.ok) assert.equal(result.data.clientName, 'Test User'); });
