export interface ArtistApproval {
  id: number;
  artist: string;
  album: string;
  songName: string;
  songFile: string;
  genre: string;
  uploadDate: string;
  cp: string;
  fromDate: string;
  toDate: string;
  country: string;
  mno: string;
  approved: boolean | null;
  songCode: string;
  qrUrl: string;
}
