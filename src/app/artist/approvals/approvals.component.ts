import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ArtistApproval } from 'src/app/models/artist-models/artist-approval.model';
import { ApprovalService } from 'src/app/service/artist-service/artist-approval.service';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.css']
})
export class ApprovalsComponent implements OnInit {

  approvals: (ArtistApproval & { controls: FormGroup })[] = [];
  artistList: any;
  mnoLogins: any;

  constructor(private approvalService: ApprovalService,  private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log('ApprovalsComponent initialized');
    const artistId = Number(sessionStorage.getItem('id'));
    if (artistId) {
      this.getArtistSongContent(artistId);
    }
    this.getArtistLoginList();
    this.getMnoLoginList();
  }

  // Fetch songs for this artist (un approved only)
  getArtistSongContent(artistId: number): void {
  this.approvalService.getArtistContent(artistId).subscribe({
    next: (response: any) => {
      console.log('Response from getArtistContent:', response);

      if (Array.isArray(response.data)) {
        console.log('Data is an array:', response.data);

        // ✅ Only keep songs approved by the artist
        const approvedSongs = response.data.filter((item: any) => item.approvedByArtist === false);

        this.approvals = approvedSongs.map((item: any) => {
          const song = {
            id: item.id || null,
            artist: item.artist?.name || item.artistName || '',
            album: item.albumName || '',
            songName: item.songName || '',
            genre: item.genre || '',
            uploadDate: item.uploadDate?.split("T")[0] || '',
            cp: item.cpName || '',
            fromDate: item.fromDate?.split("T")[0] || '',
            toDate: item.toDate?.split("T")[0] || '',
            country: item.country || '',
            mno: item.mno?.name || item.mno || '',
            approved: item.approvedByArtist ?? null,
            songCode: item.songCode || '',
            qrUrl: item.qrUrl || '',
            licensedCountry: item.licensedCountry || '',
          };

          return {
            ...song,
            controls: this.fb.group({
              approved: new FormControl(song.approved)
            })
          };
        });
      } else {
        this.approvals = [];
      }
    },
    error: () => {
      this.approvals = [];
    }
  });
}


  getArtistLoginList(): void {
    this.approvalService.getArtistLogins().subscribe({
      next: (response: any) => {
        this.artistList = Array.isArray(response.data) ? response.data : [];
      },
      error: (err: any) => {
        console.error('Failed to fetch artist logins:', err);
        this.artistList = [];
      }
    });
  }
  

  getMnoLoginList(): void {
    this.approvalService.getMnoLogins().subscribe({
      next: (response: any) => {
        this.mnoLogins = Array.isArray(response.data) ? response.data : [];
      },
      error: (err: any) => {
        console.error('Failed to fetch MNO logins:', err);
        this.mnoLogins = [];
      }
    });
  }



  // Save approval
  saveApproval(index: number): void {
    const song = this.approvals[index];
    const approved = song.controls?.get('approved')?.value;

    const requestDTO = {
      id: song.id,
      approvedByArtist: approved
    };

    this.approvalService.approveSong(requestDTO).subscribe({
      next: () => {
        alert('Approval saved successfully!');
        song.approved = approved; // update local value
        this.getArtistSongContent(Number(sessionStorage.getItem('id'))); // refresh the list
      },
      error: (err: any) => {
        console.error('Failed to save approval', err);
        alert('Failed to save approval.');
      }
    });
  }
  
  saveAllApprovals(): void {
  const bulkRequest = this.approvals.map(song => ({
    id: song.id,
    approvedByArtist: song.approved
  }));

  this.approvalService.approveSongsBulk(bulkRequest).subscribe({
    next: () => {
      alert('All approvals saved successfully!');
      this.getArtistSongContent(Number(sessionStorage.getItem('id')));
    },
    error: (err) => {
      console.error('Failed to save approvals', err);
      alert('Failed to save approvals.');
    }
  });
}


}
