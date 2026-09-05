import { test } from 'node:test';
import assert from 'node:assert/strict';
import { seal, unseal } from '../lib/session.ts';
const secret = 'test-only-key-that-is-at-least-32-characters';
test('encrypted sessions authenticate and do not expose the access token', async () => {
  const token = await seal(
    { access: 'private-token', until: Date.now() + 60000 },
    secret,
  );
  assert(!token.includes('private-token'));
  assert.equal((await unseal(token, secret)).access, 'private-token');
});
test('tampering, wrong keys, expired sessions and malformed values fail closed', async () => {
  const token = await seal(
    { access: 'private-token', until: Date.now() + 60000 },
    secret,
  );
  assert.equal(
    await unseal(token.slice(0, 20) + '!' + token.slice(21), secret),
    null,
  );
  assert.equal(await unseal(token, secret + 'wrong'), null);
  assert.equal(await unseal(await seal({ until: 1 }, secret), secret), null);
  assert.equal(await unseal('bad', secret), null);
});
