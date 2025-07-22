import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContentUploadService } from '../../service/cp-service/content-upload.service';
import { ContentUpload } from '../../models/cp-models/content-upload.model';

@Component({
  selector: 'app-content-upload',
  templateUrl: './content-upload.component.html',
  styleUrls: ['./content-upload.component.css']
})
export class ContentUploadComponent {

  // uploads = [
  //   {
  //     artistName: '',
  //     albumName: '',
  //     songName: '',
  //     genre: '',
  //     uploadDate: '',
  //     cpName: '',
  //     country: '',
  //     mno: '',
  //     audioFile: null as File | null 
  //   }
  // ];

  uploads: ContentUpload[] = [];

  constructor(private contentUploadService: ContentUploadService) {
    this.getUploadData();
  }

  //fetch uploads from the service
  getUploadData(): void {
  this.contentUploadService.getUploads().subscribe({
    next: (response: any) => {
      this.uploads = Array.isArray(response.data) ? response.data : [];
    },
    error: (err) => {
      console.error('Failed to fetch uploads:', err);
      this.uploads = [];
    }
  });
}



  onFileChange(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      this.uploads[index].audioFile = file;
    }
  }

  uploadAudio(index: number) {
    const song = this.uploads[index];
    if (song.audioFile) {
      alert(`Uploading "${song.audioFile.name}" for ${song.songName}`);
    } else {
      alert('Please select an audio file first.');
    }
  }

  playAudio(index: number) {
    const file = this.uploads[index].audioFile;
    if (file) {
      const url = URL.createObjectURL(file);
      const audio = new Audio(url);
      audio.play();
    }
  }
}
