export const imageFragment = /* groq */ `
  alt,
  crop,
  hotspot,
  asset->{ _id, metadata { lqip, dimensions { width, height } } }
`;
