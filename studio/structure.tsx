import type {StructureResolver} from 'sanity/structure'

import {languages} from './i18n'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items(
      [
        {type: 'page', title: 'Pages'},
        {type: 'article', title: 'Articles'},
      ].map(({type, title}) =>
        S.listItem()
          .title(title)
          .schemaType(type)
          .child(
            S.list()
              .title(title)
              .items([
                S.documentTypeListItem(type).title(`All ${title.toLowerCase()}`),
                S.divider(),
                ...languages.map((language) =>
                  S.listItem()
                    .title(language.title)
                    .schemaType(type)
                    .child(
                      S.documentList()
                        .title(`${title} · ${language.title}`)
                        .schemaType(type)
                        .filter('_type == $type && language == $language')
                        .params({type, language: language.id}),
                    ),
                ),
              ]),
          ),
      ),
    )
