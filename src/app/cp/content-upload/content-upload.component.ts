import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content-upload',
  templateUrl: './content-upload.component.html',
  styleUrls: ['./content-upload.component.css']
})
export class ContentUploadComponent {

uploads = [
  {
    artistName: '',
    albumName: '',
    songName: '',
    genre: '',
    uploadDate: '',
    cpName: '',
    country: '',
    mno: '',
    audioFile: null as File | null // ✅ important fix
  }
];

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
