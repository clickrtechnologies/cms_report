import { Component } from '@angular/core';

interface NameRbtRow {
  msisdn: string;
  name: string;
  code: string;
  audioFile: File | null;
  audioUrl: string;
  hasPreviewed: boolean;
}

@Component({
  selector: 'app-name-rbt',
  templateUrl: './name-rbt.component.html',
  styleUrls: ['./name-rbt.component.css']
})
export class NameRbtComponent {
  rbtList: NameRbtRow[] = [
    {
      msisdn: '9876543210',
      name: 'Welcome Tune',
      code: 'RBT1234',
      audioFile: null,
      audioUrl: '',
      hasPreviewed: false
    },
    {
      msisdn: '9123456789',
      name: 'Morning Alarm',
      code: 'RBT5678',
      audioFile: null,
      audioUrl: '',
      hasPreviewed: false
    },
    {
      msisdn: '9988776655',
      name: 'Birthday Song',
      code: 'RBT9012',
      audioFile: null,
      audioUrl: '',
      hasPreviewed: false
    }
  ];

  onAudioUpload(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      this.rbtList[index].audioFile = file;
      this.rbtList[index].audioUrl = URL.createObjectURL(file);
      this.rbtList[index].hasPreviewed = false;
    }
  }

  playAudio(index: number) {
    const audio = new Audio(this.rbtList[index].audioUrl);
    audio.play();
    audio.onended = () => {
      this.rbtList[index].hasPreviewed = true;
    };
  }

  deleteAudio(index: number) {
    this.rbtList[index].audioFile = null;
    this.rbtList[index].audioUrl = '';
    this.rbtList[index].hasPreviewed = false;
  }

  saveAudio(index: number) {
    if (this.rbtList[index].hasPreviewed) {
      alert('Audio saved for Name RBT!');
      // Backend logic can go here.
    }
  }
}
