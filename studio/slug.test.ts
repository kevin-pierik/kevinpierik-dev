import {describe, expect, test} from 'vitest'

import {slugify, uriFromTitle} from './slug'

describe('slugify', () => {
  test('lowercases, strips diacritics, and joins words with dashes', () => {
    expect(slugify('  Über Café & Co. ')).toBe('uber-cafe-co')
  })
})

describe('uriFromTitle', () => {
  test('builds the full public path', () => {
    expect(uriFromTitle('About me')).toBe('/about-me')
  })

  test('falls back to the root for an empty title', () => {
    expect(uriFromTitle('')).toBe('/')
  })
})
