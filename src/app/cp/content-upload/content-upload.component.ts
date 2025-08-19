import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ContentUploadService } from '../../service/cp-service/content-upload.service';

@Component({
  selector: 'app-content-upload',
  templateUrl: './content-upload.component.html',
  styleUrls: ['./content-upload.component.css']
})
export class ContentUploadComponent {
  form = this.fb.group({
    uploads: this.fb.array<FormGroup>([])
  });

  get uploads(): FormArray<FormGroup> {
    return this.form.get('uploads') as FormArray<FormGroup>;
  }

  // UI helper flags for each row
  isEditing: boolean[] = [];

  artistList: Array<{ id: number; artistName: string }> = [];
  mnoList: Array<{ id: number; name: string }> = [];

  constructor(
    private contentUploadService: ContentUploadService,
    private fb: FormBuilder
  ) {
    this.getAllSongcontent();
    this.getArtistNames();
    this.getMnoList();
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
    });
  }

  private setRowEnabled(i: number, enabled: boolean) {
    const grp = this.uploads.at(i);
    if (!grp) return;

    // Keep audioFileUrl readable; toggle others
    const toToggle = [
      'artistId','albumName','songName','genre','uploadDate',
      'cpName','country','mnoId'
    ];
    toToggle.forEach(ctrlName => {
      const ctrl = grp.get(ctrlName);
      if (!ctrl) return;
      enabled ? ctrl.enable({ emitEvent: false }) : ctrl.disable({ emitEvent: false });
    });
  }

  addContent() {
    const row = this.createRow({
      artistId: '',
      artistName: '',
      albumName: '',
      songName: '',
      genre: '',
      uploadDate: '',
      cpName: '',
      country: '',
      mnoId: '',
      mnoName: '',
      audioFileUrl: ''
    });
    this.uploads.insert(0, row);
    this.isEditing.splice(0, 0, true);
    this.setRowEnabled(0, true);
  }

  editContent(i: number) {
    this.isEditing[i] = true;
    this.setRowEnabled(i, true);
  }

  saveContent(i: number) {
    const grp = this.uploads.at(i);
    if (!grp) return;

    const v = grp.getRawValue();

    // Resolve names from ids for payload cleanliness
    const artistName =
      this.artistList.find(a => a.id === +v.artistId)?.artistName || v.artistName || '';
    const mnoName =
      this.mnoList.find(m => m.id === +v.mnoId)?.name || v.mnoName || '';

    // Convert date to ISO if provided
    const uploadDateIso = v.uploadDate
      ? new Date(v.uploadDate + 'T00:00:00').toISOString()
      : new Date().toISOString();

    const payload = {
      id: v.id ?? undefined,
      artistId: v.artistId || null,
      artistName,
      albumName: v.albumName,
      songName: v.songName,
      genre: v.genre,
      uploadDate: uploadDateIso,
      cpName: v.cpName,
      country: v.country,
      mnoId: v.mnoId || null,
      mno: mnoName, // if your backend expects `mno` as name; change to mnoName/mno if needed
      audioFileUrl: v.audioFileUrl || ''
    };

    this.contentUploadService.saveContent(payload).subscribe({
      next: () => {
        alert('Content saved successfully!');
        this.isEditing[i] = false;
        this.setRowEnabled(i, false);
        this.getAllSongcontent(); // refresh from server to stay in sync
      },
      error: () => {
        alert('Failed to save content!');
        this.getAllSongcontent();
      }
    });
  }

  deleteContent(i: number) {
    const grp = this.uploads.at(i);
    const id = grp?.get('id')?.value as number | null;
    if (!id) {
      // client-only row not saved yet
      this.uploads.removeAt(i);
      this.isEditing.splice(i, 1);
      return;
    }

    if (!confirm('Are you sure you want to delete this content?')) return;

    this.contentUploadService.deleteContentById(id).subscribe({
      next: () => {
        this.uploads.removeAt(i);
        this.isEditing.splice(i, 1);
        alert('Content deleted successfully!');
      },
      error: () => {
        alert('Failed to delete content.');
      }
    });
  }

  getAllSongcontent(): void {
    const id = sessionStorage.getItem('id');
    if (!id) {
      console.error('No ID found in sessionStorage');
      return;
    }
    this.contentUploadService.getAllSongContent(id).subscribe({
      next: (response: any) => {
        // reset array
        this.uploads.clear();
        this.isEditing = [];

        const list = Array.isArray(response?.data) ? response.data : [];
        list.forEach((item: any) => {
          const normalized = {
            id: item.id ?? null,
            artistId: item.artist?.id ?? item.artistId ?? '',
            artistName: item.artist?.artistName ?? item.artistName ?? '',
            albumName: item.albumName ?? '',
            songName: item.songName ?? '',
            genre: item.genre ?? '',
            uploadDate: (item.uploadDate ? String(item.uploadDate).split('T')[0] : ''), // yyyy-MM-dd
            cpName: item.cpName ?? '',
            country: item.country ?? '',
            mnoId: item.mno?.id ?? item.mnoId ?? '',
            mnoName: item.mno?.name ?? item.mnoName ?? item.mno ?? '',
            audioFileUrl: item.audioFileUrl ?? '',
          };
          const row = this.createRow(normalized);
          this.uploads.push(row);
          this.isEditing.push(false);
          this.setRowEnabled(this.uploads.length - 1, false);
        });
      },
      error: () => {
        this.uploads.clear();
        this.isEditing = [];
      }
    });
  }

  onFileChange(event: Event, i: number) {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      const file = input.files[0];
      const grp = this.uploads.at(i);
      grp?.get('audioFile')?.setValue(file);

      const formData = new FormData();
      formData.append('uploadAudio', file);

      this.contentUploadService.uploadAudio(formData).subscribe({
        next: (res: any) => {
          const url = res?.url || '';
          grp?.get('audioFileUrl')?.setValue(url);
        }
      });
    }
  }

  playAudio(i: number) {
    const audio = document.getElementById(`audio-player-${i}`) as HTMLAudioElement | null;
    audio?.play();
  }

  getArtistNames(): void {
    this.contentUploadService.getArtistNames().subscribe({
      next: (res: any) => {
        const data = Array.isArray(res?.data) ? res.data : [];
        // normalize to {id, artistName}
        this.artistList = data.map((a: any) => ({
          id: a.id,
          artistName: a.artistName ?? a.name ?? ''
        }));
      },
      error: (err: any) => {
        console.error('Failed to fetch artist names', err);
        this.artistList = [];
      }
    });
  }

  getMnoList(): void {
    this.contentUploadService.getMnoList().subscribe({
      next: (res: any) => {
        const data = Array.isArray(res?.data) ? res.data : [];
        // normalize to {id, name}
        this.mnoList = data.map((m: any) => ({
          id: m.id,
          name: m.name ?? m.mnoName ?? ''
        }));
      },
      error: (err: any) => {
        console.error('Failed to fetch MNO list', err);
        this.mnoList = [];
      }
    });
  }

  onArtistChange(i: number) {
    const grp = this.uploads.at(i);
    if (!grp) return;

    const artistId = +grp.get('artistId')!.value!;
    const artist = this.artistList.find(a => a.id === artistId);
    grp.get('artistName')!.setValue(artist?.artistName ?? '');
    console.log('Artist id :', artistId, '->', artist?.artistName);
  }

  onMnoChange(i: number) {
    const grp = this.uploads.at(i);
    if (!grp) return;

    const mnoId = +grp.get('mnoId')!.value!;
    const mno = this.mnoList.find(m => m.id === mnoId);
    grp.get('mnoName')!.setValue(mno?.name ?? '');
    console.log('MNO id :', mnoId, '->', mno?.name);
  }
}
