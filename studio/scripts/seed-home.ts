import {randomUUID} from 'node:crypto'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-10-28'})

const key = () => randomUUID().slice(0, 12)

type Span = string | {text: string; href: string}

function block(...spans: Span[]) {
  const markDefs: {_key: string; _type: 'link'; href: string}[] = []
  const children = spans.map((span) => {
    if (typeof span === 'string') return {_type: 'span', _key: key(), text: span, marks: []}
    const linkKey = key()
    markDefs.push({_key: linkKey, _type: 'link', href: span.href})
    return {_type: 'span', _key: key(), text: span.text, marks: [linkKey]}
  })
  return {_type: 'block', _key: key(), style: 'normal', markDefs, children}
}

const friday = {company: 'Friday Digital Agency', link: 'https://www.friday.nl'}

const content = {
  en: {
    title: 'Kevin Pierik',
    uri: '/',
    seo: {
      title: 'Kevin Pierik | Frontend Developer',
      description:
        'Frontend developer focused on clear, useful interfaces in Hardenberg, the Netherlands.',
    },
    sections: [
      {
        _type: 'introSection',
        body: [
          block(
            'Kevin Pierik is a frontend developer based in Hardenberg, the Netherlands, working at Friday Digital Agency.',
          ),
          block(
            'If you would like more information, or to discuss collaborations and other opportunities, please don’t hesitate to get in touch via email.',
          ),
        ],
      },
      {
        _type: 'entriesSection',
        title: 'Work Experience',
        entries: [
          {
            title: 'Junior UX Developer',
            ...friday,
            start: '2025-05-01',
            current: true,
            location: 'Hardenberg, Netherlands',
            description:
              'Designs and builds accessible, fast websites for clients, with Next.js, TypeScript, and Tailwind CSS.',
          },
          {
            title: 'Developer Intern',
            ...friday,
            start: '2024-09-01',
            end: '2025-01-01',
            location: 'Hardenberg, Netherlands',
          },
        ],
      },
      {
        _type: 'entriesSection',
        title: 'Education',
        entries: [
          {
            title: 'Deltion College',
            start: '2023-09-01',
            current: true,
            location: 'Zwolle, Netherlands',
            description: 'MBO 4, Software Developer',
          },
          {
            title: 'Vechtdal College',
            start: '2018-08-01',
            location: 'Hardenberg, Netherlands',
            description: 'HAVO, Natuur & Techniek',
          },
        ],
      },
      {
        _type: 'textSection',
        title: 'Skills',
        body: [block('Next.js, TypeScript, Tailwind CSS, and Vercel.')],
      },
      {
        _type: 'rowsSection',
        title: 'Contact',
        address: true,
        rows: [
          {label: 'Location', text: 'Hardenberg, Overijssel, the Netherlands'},
          {label: 'Email', text: 'hello@kevinpierik.dev', link: 'mailto:hello@kevinpierik.dev'},
          {label: 'Phone', text: '+31\u00a06\u00a015545687', link: 'tel:+31615545687'},
        ],
      },
      {
        _type: 'rowsSection',
        title: 'Socials',
        rows: [
          {
            label: 'LinkedIn',
            text: 'linkedin.com/in/kevin-pierik',
            link: 'https://nl.linkedin.com/in/kevin-pierik',
          },
          {
            label: 'GitHub',
            text: 'github.com/kevin-pierik',
            link: 'https://github.com/kevin-pierik',
          },
          {
            label: 'Instagram',
            text: 'instagram.com/kevinpierikk',
            link: 'https://www.instagram.com/kevinpierikk',
          },
        ],
      },
    ],
  },
  nl: {
    title: 'Kevin Pierik',
    uri: '/nl',
    seo: {
      title: 'Kevin Pierik | Frontend developer',
      description: 'Frontend developer uit Hardenberg, gericht op heldere, bruikbare interfaces.',
    },
    sections: [
      {
        _type: 'introSection',
        body: [
          block(
            'Kevin Pierik is een frontend developer uit Hardenberg en werkt bij Friday Digital Agency.',
          ),
          block(
            'Wil je meer weten, of praten over een samenwerking of andere mogelijkheden? Neem gerust contact op via e-mail.',
          ),
        ],
      },
      {
        _type: 'entriesSection',
        title: 'Werkervaring',
        entries: [
          {
            title: 'Junior UX Developer',
            ...friday,
            start: '2025-05-01',
            current: true,
            location: 'Hardenberg, Nederland',
            description:
              'Ontwerpt en bouwt toegankelijke, snelle websites voor klanten, met Next.js, TypeScript en Tailwind CSS.',
          },
          {
            title: 'Stagiair developer',
            ...friday,
            start: '2024-09-01',
            end: '2025-01-01',
            location: 'Hardenberg, Nederland',
          },
        ],
      },
      {
        _type: 'entriesSection',
        title: 'Opleiding',
        entries: [
          {
            title: 'Deltion College',
            start: '2023-09-01',
            current: true,
            location: 'Zwolle, Nederland',
            description: 'MBO 4, Software Developer',
          },
          {
            title: 'Vechtdal College',
            start: '2018-08-01',
            location: 'Hardenberg, Nederland',
            description: 'HAVO, Natuur & Techniek',
          },
        ],
      },
      {
        _type: 'textSection',
        title: 'Vaardigheden',
        body: [block('Next.js, TypeScript, Tailwind CSS en Vercel.')],
      },
      {
        _type: 'rowsSection',
        title: 'Contact',
        address: true,
        rows: [
          {label: 'Locatie', text: 'Hardenberg, Overijssel, Nederland'},
          {label: 'E-mail', text: 'hello@kevinpierik.dev', link: 'mailto:hello@kevinpierik.dev'},
          {label: 'Telefoon', text: '+31\u00a06\u00a015545687', link: 'tel:+31615545687'},
        ],
      },
      {
        _type: 'rowsSection',
        title: 'Socials',
        rows: [
          {
            label: 'LinkedIn',
            text: 'linkedin.com/in/kevin-pierik',
            link: 'https://nl.linkedin.com/in/kevin-pierik',
          },
          {
            label: 'GitHub',
            text: 'github.com/kevin-pierik',
            link: 'https://github.com/kevin-pierik',
          },
          {
            label: 'Instagram',
            text: 'instagram.com/kevinpierikk',
            link: 'https://www.instagram.com/kevinpierikk',
          },
        ],
      },
    ],
  },
}

const withKeys = <T extends object>(items: T[]) => items.map((item) => ({_key: key(), ...item}))

async function seed() {
  const ids: Record<string, string> = {}

  for (const [language, page] of Object.entries(content)) {
    const existing = await client.fetch<string | null>(
      '*[_type == "page" && language == $language && uri.current == $uri][0]._id',
      {language, uri: page.uri},
    )
    if (existing) {
      console.log(`Skipping ${page.uri}: it already exists as ${existing}.`)
      ids[language] = existing
      continue
    }

    const created = await client.create({
      _type: 'page',
      language,
      title: page.title,
      uri: {_type: 'slug', current: page.uri},
      seo: page.seo,
      sections: withKeys(
        page.sections.map((section) =>
          'entries' in section
            ? {
                ...section,
                entries: withKeys(
                  (section.entries ?? []).map((entry) => ({_type: 'entry', ...entry})),
                ),
              }
            : 'rows' in section
              ? {
                  ...section,
                  rows: withKeys((section.rows ?? []).map((row) => ({_type: 'row', ...row}))),
                }
              : section,
        ),
      ),
    })
    console.log(`Created ${page.uri} as ${created._id}.`)
    ids[language] = created._id
  }

  const linked = await client.fetch<number>(
    'count(*[_type == "translation.metadata" && references($ids)])',
    {ids: Object.values(ids)},
  )
  if (linked > 0) {
    console.log('The pages are already linked as translations.')
    return
  }

  await client.create({
    _type: 'translation.metadata',
    schemaTypes: ['page'],
    translations: Object.entries(ids).map(([language, id]) => ({
      _key: language,
      _type: 'internationalizedArrayReferenceValue',
      language,
      value: {_type: 'reference', _ref: id},
    })),
  })
  console.log('Linked the pages as translations.')
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
