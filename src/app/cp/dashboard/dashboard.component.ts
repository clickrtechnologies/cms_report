import { AfterViewInit, Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { Song } from 'src/app/models/cp-models/song.model';
import { ContentUploadService } from 'src/app/service/cp-service/content-upload.service';
import { DashboardService } from 'src/app/service/cp-service/dashboard.service';

declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  // songs = [
  //   {
  //     artistName: 'Arijit Singh',
  //     albumName: 'Soulful Vibes',
  //     songName: 'Tum Hi Ho',
  //     songCode: 'RBT12345',
  //     qrCodeUrl: 'https://example.com/wap/RBT12345',
  //     category: 'Romantic',
  //     uploadDate: '2025-06-30',
  //     cpName: 'CP1 Music Co.',
  //     fromDate: '2025-07-01',
  //     toDate: '2025-12-31',
  //     country: 'India',
  //     mnoName: 'Airtel',
  //     contractAvailable: true,
  //     audioUrl: 'https://example.com/audio/tumhiho.mp3'
  //   },
  //       {
  //     artistName: 'Hony Singh',
  //     albumName: 'Trending Vibes',
  //     songName: 'yo yo honey singh',
  //     songCode: 'RBT12346',
  //     qrCodeUrl: 'https://example.com/wap/RBT12345',
  //     category: 'Romantic',
  //     uploadDate: '2025-06-29',
  //     cpName: 'CP1 Music Co.',
  //     fromDate: '2025-07-01',
  //     toDate: '2025-12-31',
  //     country: 'India',
  //     mnoName: 'Airtel',
  //     contractAvailable: true,
  //     audioUrl: 'https://example.com/audio/tumhiho.mp3'
  //   }

  // ];

  form = this.fb.group({
    uploads: this.fb.array<FormGroup>([])
  });

  get uploads(): FormArray<FormGroup> {
    return this.form.get('uploads') as FormArray<FormGroup>;
  }

  songs: Song[] = [];

  constructor(private dashboardService: DashboardService, private fb: FormBuilder, contentUploadService: ContentUploadService) {
    this.getSongs();
  }

  ngOnInit(): void {
    this.getAllSongcontent();
  }

  private createRow(song?: any): FormGroup {
    return this.fb.group({
      id: new FormControl(song?.id ?? null),
      artistId: new FormControl(song?.artistId ?? ''),
      artistName: new FormControl(song?.artistName ?? ''),
      albumName: new FormControl(song?.albumName ?? ''),
      songName: new FormControl(song?.songName ?? ''),
      genre: new FormControl(song?.genre ?? ''),
      uploadDate: new FormControl(song?.uploadDate ?? ''), // yyyy-MM-dd in UI
      cpName: new FormControl(song?.cpName ?? ''),
      country: new FormControl(song?.country ?? ''),
      mnoId: new FormControl(song?.mnoId ?? ''),
      mnoName: new FormControl(song?.mnoName ?? ''),
      audioFileUrl: new FormControl(song?.audioFileUrl ?? ''),
      audioFile: new FormControl<File | null>(null),
      qrCodeUrl: new FormControl(song?.qrCodeUrl ?? ''),
      fromDate: new FormControl(song?.fromDate ?? ''),
      toDate: new FormControl(song?.toDate ?? ''),
      songCode: new FormControl(song?.songCode ?? '')

    });
  }


  getAllSongcontent(): void {
    const id = sessionStorage.getItem('id');
    if (!id) {
      console.error('No ID found in sessionStorage');
      return;
    }

    this.dashboardService.getAllSongContent(id).subscribe({
      next: (response: any) => {
        const list = Array.isArray(response?.data) ? response.data : [];
        const uploads = this.form.get('uploads') as FormArray;

        // Clear existing rows
        uploads.clear();

        // Add rows dynamically
        list.forEach((item: any) => {
          const normalized = {
            id: item.id ?? null,
            artistId: item.artist?.id ?? item.artistId ?? '',
            artistName: item.artist?.artistName ?? item.artistName ?? '',
            albumName: item.albumName ?? '',
            songName: item.songName ?? '',
            genre: item.genre ?? '',
            qrCodeUrl: item.qrCodeUrl ?? '',
            uploadDate: item.uploadDate ? String(item.uploadDate).split('T')[0] : '',
            cpName: item.cpName ?? '',
            fromDate: item.fromDate ? String(item.fromDate).split('T')[0] : '',
            toDate: item.toDate ? String(item.toDate).split('T')[0] : '',
            country: item.country ?? '',
            mnoId: item.mno?.id ?? item.mnoId ?? '',
            mnoName: item.mno?.name ?? item.mnoName ?? item.mno ?? '',
            audioFileUrl: item.audioFileUrl ?? '',
            songCode: item.songCode ?? '',
          };

          uploads.push(this.createRow(normalized));

        });
        console.log('Fetched uploads:', list);
      },
      error: (err: any) => {
        console.error('Failed to fetch content uploads', err);
      }
    });
  }

  getSongs(): void {
    this.dashboardService.getSongs().subscribe({
      next: (response: any) => {
        this.songs = Array.isArray(response.data) ? response.data : [];
      },
      error: (err) => {
        console.error('Failed to fetch songs:', err);
        this.songs = [];
      }
    });
  }

  playAudio(index: number): void {
  const uploads = this.form.get('uploads') as FormArray;
  const audioFileControl = uploads.at(index).get('audioFile');

  if (audioFileControl && audioFileControl.value) {
    const file = audioFileControl.value as File;

    // Create an object URL for the audio file
    const audioUrl = URL.createObjectURL(file);

    // Create an audio element and play the file
    const audio = new Audio(audioUrl);
    audio.play();
  } else {
    alert('No audio file selected for this row.');
  }
}


}
