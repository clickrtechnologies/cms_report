import { AfterViewInit , Component } from '@angular/core';
import { MnoSong } from 'src/app/models/mno-models/mno-song.model';
import { MnoDashboardService } from 'src/app/service/mno-service/mno-dashboard.service';
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  mnoSongs : MnoSong[]= [];

  constructor(private mnoDashboardService: MnoDashboardService) {
    this.mnoSongs = this.mnoDashboardService.getMnoSongs(); 
  }

    ngAfterViewInit(): void {
    setTimeout(() => {
      $('#mnoTable').DataTable({
          dom: 'Bfrtip',
          paging: true,
          searching: true,
          ordering: true,
          scrollX: true,
          pageLength: 10, 
          buttons: ['excelHtml5', 'csvHtml5','copy', 'print'] 
      });
    }, 100);
  }
}


