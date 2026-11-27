import { imageFragment } from "../sanity/media/fragment";

const mediaFragment = /* groq */ `
  kind,
  image{ ${imageFragment} },
  video{
    asset->{
      playbackId,
      "aspectRatio": data.aspect_ratio,
      "captions": data.tracks[type == "text" && status == "ready"]{ id, language_code, name }
    }
  },
  videoTitle,
  autoplay
`;

export const sectionsFragment = /* groq */ `
  sections[]{
    _key,
    _type,
    _type == "heroSection" => {
      eyebrow, eyebrowIcon, title, titleMuted, lead, size, align,
      buttons[]{ _key, label, link },
      image{ ${imageFragment} }
    },
    _type == "textSection" => { title, body },
    _type == "mediaSection" => { ${mediaFragment}, caption, wide },
    _type == "code" => { code, language, highlightedLines },
    _type == "table" => { rows },
    _type == "listSection" => {
      title,
      titleMuted,
      buttons[]{ _key, label, link },
      items[]{ _key, period, title, organization, link, description, location, tags }
    },
    _type == "linksSection" => {
      eyebrow,
      title,
      text,
      links[]{ _key, label, link }
    },
    _type == "postsSection" => { title, limit, layout, showAllLink },
    _type == "carouselSection" => {
      title,
      items[]{ _key, title, link, description, media{ ${mediaFragment} } }
    }
  }
`;
