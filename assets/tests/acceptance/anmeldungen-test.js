import { module, test } from 'qunit';
import { visit, currentURL, click, findAll } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | anmeldungen', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('main nav link for /anmeldungen', async function(assert) {
    await visit('/');

    const links = findAll('.nav-link');

    await click(links[0]);

    assert.equal(currentURL(), '/anmeldungen');
  });

  test('visiting /anmeldungen', async function(assert) {
    const students = server.createList('student', 10);

    await visit('/anmeldungen');

    const studentRows = findAll('.student-row');

    assert.equal(studentRows.length, students.length);

    assert.equal(
      studentRows[0].textContent.trim(),
      `${students[0].firstName} ${students[0].lastName}`
    );
  });
});
