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

  uploads: (ContentUpload & { isEditing?: boolean })[] = [];

  isPlaying: Boolean = false;
  audioFileUrl: string | null = null;
  isUploading = false;
  isSaving = false;

  constructor(private contentUploadService: ContentUploadService) {
    // this.getUploadData();
    this.getAllSongcontent();
  }

  // Fetch uploads from the service
  getUploadData(): void {
    this.contentUploadService.getUploads().subscribe({
      next: (response: any) => {
        this.uploads = Array.isArray(response.data)
          ? response.data.map((item: ContentUpload) => ({ ...item, isEditing: false }))
          : [];
      },
      error: (err) => {
        console.error('Failed to fetch uploads:', err);
        this.uploads = [];
      }
    });
  }

  addContent() {
    this.uploads.unshift({
      artistName: '',
      albumName: '',
      songName: '',
      genre: '',
      uploadDate: '',
      cpName: '',
      country: '',
      mno: '',
      audioFile: null,
      isEditing: true,
      audioFileUrl: '' // Initially no file object in browser
    });
  }

  editContent(index: number) {
    this.uploads[index].isEditing = true;
  }

  saveContent(index: number) {
    const song = this.uploads[index];

    const songData = {
      id: song.id || undefined , // Include ID if it exists
      artistName: song.artistName || '',
      albumName: song.albumName || '',
      songName: song.songName || '',
      genre: song.genre || '',
      uploadDate: song.uploadDate ? new Date(song.uploadDate).toISOString() : new Date().toISOString(),
      cpName: song.cpName || '',
      country: song.country || '',
      mno: song.mno || '',
      audioFileUrl: song.audioFileUrl || ''
    };

    this.contentUploadService.saveContent(songData).subscribe({
      next: () => {
        song.isEditing = false;
        alert('Content saved successfully!');
        this.getAllSongcontent(); // Refresh the list after saving
      },
      error: (err) => {
        alert('Failed to save content!');
        this.getAllSongcontent()
        console.error(err);
      }
    });
  }

  deleteContent(index: number) {
    const contentId = this.uploads[index].id!;

    const confirmed = window.confirm('Are you sure you want to delete this content?');
    if (!confirmed) {
      return; // user canceled
    }

    this.contentUploadService.deleteContentById(contentId).subscribe({
      next: (response) => {
        console.log('Deleted:', response);
        this.uploads.splice(index, 1);
        alert('Content deleted successfully!');
      },
      error: (err) => {
        console.error('Delete failed:', err);
        alert('Failed to delete content. Please try again.');
      }
    });
  }

  
  playAudio(index: number) {
    const audio = document.getElementById(`audio-player-${index}`) as HTMLAudioElement;
    if (audio) {
      audio.play();
    } else {
      alert('No audio file available.');
    }
  }


  getAllSongcontent(): void {
    this.contentUploadService.getAllSongContent().subscribe({
      next: (response: any) => {
        if (Array.isArray(response.data)) {
          this.uploads = response.data.map((item: any) => ({
            id: item.id || null, // Ensure ID is included if available
            artistName: item.artistName || '',
            albumName: item.albumName || '',
            songName: item.songName || '',
            genre: item.genre || '',
            uploadDate: item.uploadDate = item.uploadDate.split("T")[0]  || '',
            cpName: item.cpName || '',
            country: item.country || '',
            mno: item.mno || '',
            audioFile: item.audioFileUrl,
            audioFileUrl: item.audioFileUrl || '',
            isEditing: false
          }));
          console.log('Song content fetched successfully:', this.uploads);

        } else {
          this.uploads = [];
        }
      },
      error: (err) => {
        console.error('Failed to fetch song content:', err);
        this.uploads = [];
      }
    });
  }

  onFileChange(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      this.uploads[index].audioFile = file;

      const formData = new FormData();
      formData.append('uploadAudio', file);

      this.contentUploadService.uploadAudio(formData).subscribe({
        next: (res: any) => {
          console.log('Upload success:', res);
          this.uploads[index].audioFileUrl = res.url;
        },
        error: (err: any) => {
          console.error('Upload failed:', err);
        }
      });
    }
  }




}