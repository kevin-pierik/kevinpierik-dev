import {describe, expect, it} from 'vitest'

import {blockText, entriesSummary} from './preview'

describe('blockText', () => {
  it('joins block text and truncates it', () => {
    const blocks = [
      {_type: 'block', children: [{text: 'Hello '}, {text: 'world.'}]},
      {_type: 'image'},
      {_type: 'block', children: [{text: 'Second paragraph.'}]},
    ]

    expect(blockText(blocks)).toBe('Hello world. Second paragraph.')
    expect(blockText(blocks, 5)).toBe('Hello…')
    expect(blockText(undefined)).toBe('')
  })
})

describe('entriesSummary', () => {
  it('counts entries and shows the year range', () => {
    expect(entriesSummary([])).toBe('No items')
    expect(entriesSummary([{start: '2019-01-01'}])).toBe('1 item · 2019')
    expect(
      entriesSummary([
        {start: '2019-01-01', end: '2021-06-01'},
        {start: '2015-09-01', end: '2019-06-01'},
      ]),
    ).toBe('2 items · 2015–2021')
    expect(entriesSummary([{start: '2021-01-01', current: true}, {start: '2015-09-01'}])).toBe(
      '2 items · 2015–present',
    )
  })
})
