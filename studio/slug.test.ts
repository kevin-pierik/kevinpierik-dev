import {describe, expect, test} from 'vitest'

import {slugProblem, slugify, uriFromTitle, uriProblem} from './slug'

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

describe('uriProblem', () => {
  test('accepts the root and lowercase paths', () => {
    expect(uriProblem('/')).toBeUndefined()
    expect(uriProblem('/posts')).toBeUndefined()
    expect(uriProblem('/work/case-study')).toBeUndefined()
  })

  test('rejects missing or trailing slashes and odd characters', () => {
    expect(uriProblem('about')).toBeDefined()
    expect(uriProblem('/about/')).toBeDefined()
    expect(uriProblem('/About')).toBeDefined()
    expect(uriProblem('/feed.xml')).toBeDefined()
  })

  test('rejects paths the site already uses', () => {
    expect(uriProblem('/contact')).toBeDefined()
    expect(uriProblem('/privacy')).toBeDefined()
    expect(uriProblem('/posts/hello')).toBeDefined()
    expect(uriProblem('/api')).toBeDefined()
  })
})

describe('slugProblem', () => {
  test('accepts lowercase slugs with single hyphens', () => {
    expect(slugProblem('my-first-post')).toBeUndefined()
  })

  test('rejects characters that break URLs or XML', () => {
    expect(slugProblem('rock&roll')).toBeDefined()
    expect(slugProblem('Hello')).toBeDefined()
    expect(slugProblem('trailing-')).toBeDefined()
  })
})
