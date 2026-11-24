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
    _type == "textSection" => { body },
    _type == "mediaSection" => { ${mediaFragment}, caption, wide },
    _type == "code" => { code, language },
    _type == "table" => { rows },
    _type == "listSection" => {
      title,
      items[]{ _key, period, title, link, description, location }
    },
    _type == "carouselSection" => {
      title,
      items[]{ _key, title, link, description, media{ ${mediaFragment} } }
    }
  }
`;
