export interface MnoApproval {
  artistName: string;
  albumName: string;
  songName: string;
  songCode: string;
  qrCodeUrl: string;
  genre: string;
  cpName: string;
  country: string;
  mno: string;
  contractFile: File;
  expiryDate: string;
  audioUrl: string;
  approved: boolean;
  rejectionReason: string;
}
