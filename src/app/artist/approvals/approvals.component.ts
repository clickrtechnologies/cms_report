import { Component } from '@angular/core';
import { ArtistApproval } from 'src/app/models/artist-models/artist-approval.model';
import { ApprovalService } from 'src/app/service/artist-service/artist-approval.service';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.css']
})
export class ApprovalsComponent {
  // approvals = [
  //   {
  //     id: 1,
  //     artist: 'Arijit Singh',
  //     album: 'Soulful Tunes',
  //     songName: 'Raabta',
  //     songFile: 'assets/audio/raabta.mp3',
  //     genre: 'Romantic',
  //     uploadDate: '2025-07-01',
  //     cp: 'Alex Music',
  //     fromDate: '2025-07-01',
  //     toDate: '2025-12-31',
  //     country: 'India',
  //     mno: 'Airtel',
  //     approved: null,
  //     songCode: '',
  //     qrUrl: ''
  //   }
  // ];

  approvals: ArtistApproval[] = [];

  constructor(private approvalService: ApprovalService) {
      this.approvals = this.approvalService.getApprovals();
    }

  approveSong(song: any) {
    if (song.approved === null) {
      song.approved = true;
      song.songCode = this.generateSongCode(song.cp, song.id);
      song.qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${song.songCode}&size=60x60`;

      alert(`✅ Song "${song.songName}" approved. Notification sent to MNO, artist & KAM.`);
    }
  }

  rejectSong(song: any) {
    if (song.approved === null) {
      song.approved = false;
      alert(`❌ Song "${song.songName}" has been disapproved.`);
    }
  }

  generateSongCode(cp: string, id: number): string {
    const prefix = cp.split(' ')[0].substring(0, 3).toUpperCase();
    return `${prefix}-${String(id).padStart(3, '0')}`;
  }
}
