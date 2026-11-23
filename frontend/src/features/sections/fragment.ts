import { imageFragment } from "../sanity/media/fragment";

export const sectionsFragment = /* groq */ `
  sections[]{
    _key,
    _type,
    _type == "textSection" => { body },
    _type == "imageSection" => { ${imageFragment}, caption, wide },
    _type == "code" => { code, language },
    _type == "table" => { rows },
    _type == "carouselSection" => {
      title,
      items[]{ _key, title, link, description, image{ ${imageFragment} } }
    }
  }
`;
