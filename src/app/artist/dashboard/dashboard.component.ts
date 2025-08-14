import { Component, AfterViewInit } from '@angular/core';
import { ArtistSong } from 'src/app/models/artist-models/artist-song.model';
import { ArtistDashboardService } from 'src/app/service/artist-service/artist-dashboard.service';
import { ApprovalsComponent } from '../approvals/approvals.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ArtistApproval } from 'src/app/models/artist-models/artist-approval.model';
import { ApprovalService } from 'src/app/service/artist-service/artist-approval.service';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  songs: ArtistSong[] = [];

  constructor(private artistDashboardService: ArtistDashboardService,private approvalService: ApprovalService,  private fb: FormBuilder) {
    // this.getSongList();
  }

  ngOnInit(): void {
      const artistId = Number(sessionStorage.getItem('id'));
      if (artistId) {
        this.getArtistSongContent(artistId);
      }
      this.getArtistLoginList();
      this.getMnoLoginList();
    }

  // Fetch songs from the service
  getSongList(): void {
    this.artistDashboardService.getArtistDashboardSongs().subscribe({
      next: (response: any) => {
        this.songs = Array.isArray(response.data) ? response.data : [];
      },
      error: (err) => {
        console.error('Failed to fetch songs:', err);
        this.songs = [];
      }
    });
  }

  approvals: (any & { controls: FormGroup })[] = [];
    artistList: any;
    mnoLogins: any;
  
    
  
    // Fetch songs for this artist ( approved only)
    getArtistSongContent(artistId: number): void {
  this.approvalService.getArtistContent(artistId).subscribe({
    next: (response: any) => {
      console.log('Response from getArtistContent:', response);

      if (Array.isArray(response.data)) {
        console.log('Data is an array:', response.data);

        // ✅ Only keep songs approved by the artist
        const approvedSongs = response.data.filter((item: any) => item.approvedByArtist === true);

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
   


}
