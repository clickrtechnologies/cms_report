import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MnoApproval } from 'src/app/models/mno-models/mno-approval.model';
import { ApprovalService } from 'src/app/service/artist-service/artist-approval.service';
import { MnoApprovalService } from 'src/app/service/mno-service/mno-approval.service';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.css']
})
export class ApprovalsComponent {
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
          const approvedSongs = response.data.filter((item: any) => (item.approvedByMno === false  ) && item.approvedByArtist === true && item.rejectionReason === "" );
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
              approvedByMno: item.approvedByMno ?? false,
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

  saveApproval(index: number): void {
    const song = this.approvals[index];
    const approved = song.controls?.get('approved')?.value;
    const rejectionReason = song.rejectionReason || '';

    const requestDTO = {
      id: song.id,
      approvedByMno: approved,
      rejectionReason: approved ? '' : rejectionReason,
    };

    this.mnoApprovalService.approveSong(requestDTO).subscribe({
      next: () => {
        alert('Approval saved successfully!');
        song.approvedByMno = approved;
        this.getMnoSongContent(Number(sessionStorage.getItem('id')));
        song.controls.setValue({rejectionReason: ''}); // Reset the form control
      },
      error: (err: any) => {
        console.error('Failed to save approval', err);
        alert('Failed to save approval.');
      }
    });
  }

  saveAllApprovals(): void {
  if (this.approvals.length === 0) {
    alert('No records to save.');
    return;
  }

  const requests = this.approvals.map(song => {
    const approved = song.controls.get('approved')?.value;
    return {
      id: song.id,
      approvedByMno: approved,
      rejectionReason: approved ? '' : song.rejectionReason || 'Rejected by MNO'
    };
  });

  this.mnoApprovalService.bulkApproveSongs(requests).subscribe({
    next: () => {
      alert('All approvals saved successfully!');
      this.getMnoSongContent(Number(sessionStorage.getItem('id')));
    },
    error: (err:any) => {
      console.error('Failed to save approvals:', err);
      alert('Failed to save approvals.');
    }
  });
}
}


