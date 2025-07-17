import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NameRbt } from 'src/app/models/admin-models/admin-name-rbt.model';
import { NameRbtService } from 'src/app/service/admin-service/admin-namerbt.service';

@Component({
  selector: 'app-name-rbt',
  templateUrl: './name-rbt.component.html',
  styleUrls: ['./name-rbt.component.css']
})
export class NameRbtComponent {
rbtList : NameRbt []=[];

  constructor(private nameRbtService: NameRbtService) {
      this.rbtList = this.nameRbtService.getNameRbtList();
    }

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
