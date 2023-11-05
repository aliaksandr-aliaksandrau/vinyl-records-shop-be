export default interface MusicRecord {
  id: string;
  title: string;
  description: string;
  year: number;
  price: number;
  count: number;
  artist: string;
  album_cover_link?: string;
}
