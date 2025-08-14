import { AfterViewInit , Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MnoApproval } from 'src/app/models/mno-models/mno-approval.model';
import { MnoSong } from 'src/app/models/mno-models/mno-song.model';
import { ApprovalService } from 'src/app/service/artist-service/artist-approval.service';
import { MnoApprovalService } from 'src/app/service/mno-service/mno-approval.service';
import { MnoDashboardService } from 'src/app/service/mno-service/mno-dashboard.service';
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  mnoSongs : MnoSong[]= [];

  approvals: (MnoApproval & { controls: FormGroup })[] = [];
    artistList: any[] = [];
    mnoLogins: any[] = [];
  
    constructor(
      private approvalService: ApprovalService,
      private fb: FormBuilder,
      private mnoApprovalService: MnoApprovalService
    ) {}
  
    ngOnInit(): void {
      const mnoId = Number(sessionStorage.getItem('id'));
      if (mnoId) {
        this.getMnoSongContent(mnoId);
        
      }
      this.getArtistLoginList();
      this.getMnoLoginList();
    }
  
    getMnoSongContent(mnoId: number): void {
      this.mnoApprovalService.getMnoSongContent(mnoId).subscribe({
        next: (response: any) => {
          
          if (Array.isArray(response.data)) {
            console.log('Data is an array:', response.data);
            const approvedSongs = response.data.filter((item: any) => item.approvedByMno === true && item.approvedByArtist === true || item.rejectionReason !== ""  );
            console.log('Approved songs:', approvedSongs);
            this.approvals = approvedSongs.map((item: any) => {
              const song: MnoApproval = {
                id: item.id || null,
                artist: item.artist?.name || item.artistName || '',
                album: item.albumName || '',
                songName: item.songName || '',
                genre: item.genre || '',
                uploadDate: item.uploadDate?.split('T')[0] || '',
                cp: item.cpName || '',
                fromDate: item.fromDate?.split('T')[0] || '',
                toDate: item.toDate?.split('T')[0] || '',
                country: item.country || '',
                mno: item.mno?.name || item.mno || '',
                approvedByMno: item.approvedByMno ?? null,
                contractFileUrl: item.contractFileUrl || '',
                expiryDate: item.expiryDate?.split('T')[0] || '',
                audioFileUrl: item.audioFileUrl || '',
                rejectionReason: item.rejectionReason || '',
                songCode: item.songCode || '',
                qrUrl: item.qrUrl || '',
                licensedCountry: item.licensedCountry || ''
              };
              console.log('Mapped song:', song);
  
              return {
                ...song,
                controls: this.fb.group({
                  approved: new FormControl(song.approvedByMno)
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
}


