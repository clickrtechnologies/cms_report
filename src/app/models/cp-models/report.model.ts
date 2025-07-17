export interface Reports {
  date: string;
  artist: string;
  album: string;
  song: string;
  genre: string;
  downloads: number;
  modes: {
    copy: number;
    ivr: number;
    app: number;
  };
  rbtSet: number;
  cp: string;
}
