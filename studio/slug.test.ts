import {describe, expect, test} from 'vitest'

import {slugify, uriFromTitle, uriPrefix} from './slug'

describe('slugify', () => {
  test('lowercases, strips diacritics, and joins words with dashes', () => {
    expect(slugify('  Über Café & Co. ')).toBe('uber-cafe-co')
  })
})

describe('uriPrefix', () => {
  test('has no prefix for the default language', () => {
    expect(uriPrefix('en')).toBe('')
    expect(uriPrefix('nl')).toBe('/nl')
  })
})

describe('uriFromTitle', () => {
  test('builds the full public path with the language prefix', () => {
    expect(uriFromTitle('en', 'About me')).toBe('/about-me')
    expect(uriFromTitle('nl', 'Over mij')).toBe('/nl/over-mij')
  })

  test('falls back to the language root for an empty title', () => {
    expect(uriFromTitle('en', '')).toBe('/')
    expect(uriFromTitle('nl', '')).toBe('/nl')
  })
})
