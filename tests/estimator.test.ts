import assert from 'node:assert/strict';
import test from 'node:test';
import { calculateEstimate, type EstimatorSelections } from '../lib/estimator-config';

const base: EstimatorSelections = { projectType: 'website', units: 5, complexity: 'standard', bilingual: false, ecommerce: false, authentication: false, adminDashboard: false, payments: false, integrations: 0, timeline: 'flexible' };
test('estimator returns an ordered non-negative SAR range', () => { const result = calculateEstimate(base); assert.ok(result.min >= 0); assert.ok(result.max >= result.min); assert.equal(result.min % 500, 0); assert.equal(result.max % 500, 0); });
test('additional scope cannot reduce the estimate', () => { const baseline = calculateEstimate(base); const expanded = calculateEstimate({ ...base, units: 18, complexity: 'premium', bilingual: true, ecommerce: true, authentication: true, adminDashboard: true, payments: true, integrations: 4, timeline: 'priority' }); assert.ok(expanded.min > baseline.min); assert.ok(expanded.max > baseline.max); });
test('units and integrations are capped defensively', () => { assert.deepEqual(calculateEstimate({ ...base, units: 10_000, integrations: 1_000 }), calculateEstimate({ ...base, units: 100, integrations: 10 })); });
