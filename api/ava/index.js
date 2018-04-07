const root = require('path').join.bind(this, __dirname, '..');
require('dotenv').config({path: root('.env')})

import test from 'ava'

test('this will pass', t => {
  t.pass()
})

test('app can be initialized', async t => {
  const app = require('../app')

  t.truthy(app)
})
