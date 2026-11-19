import {defineArrayMember, defineField} from 'sanity'

import {sectionTypes} from '../sections'

export function createPageBuilder() {
  return defineField({
    name: 'sections',
    type: 'array',
    of: sectionTypes.map(({name}) => defineArrayMember({type: name})),
  })
}
