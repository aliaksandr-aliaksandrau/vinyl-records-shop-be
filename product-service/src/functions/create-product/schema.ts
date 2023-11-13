export default {
  type: "object",
  properties: {
    title: { type: "string" },
    artist: { type: "string" },
    description: { type: "string" },
    price: { type: "number" },
    year: { type: "number" },
    count: { type: "number" },
    album_cover_link: { type: "string" },
  },
  required: [
    "title",
    "artist",
    "description",
    "price",
    "year",
    "count",
    "album_cover_link",
  ],
} as const;
