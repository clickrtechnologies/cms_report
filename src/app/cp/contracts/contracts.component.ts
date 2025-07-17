import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Contract } from 'src/app/models/cp-models/contract.model';
import { ContractService } from 'src/app/service/cp-service/contract.service';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent {

  // contractList = [
  //   {
  //     artistName: 'Arijit Singh',
  //     albumName: 'Romantic Vibes',
  //     songName: 'Tum Hi Ho',
  //     genre: 'Romantic',
  //     cpName: 'CP1 Music Co.',
  //     licensedCountry: 'India',
  //     licensedMNO: 'Airtel',
  //     fromDate: '2025-07-01',
  //     toDate: '2025-12-31',
  //     expiryDate: '2026-01-31',
  //     contractFile: null
  //   }
  // ];

   contractList: Contract[] = [];

  constructor(private contractService: ContractService) {
      this.contractList = this.contractService.getContracts();
    }

 

  onFileUpload(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      this.contractList[index].contractFile = file;
      alert(`Uploaded contract for "${this.contractList[index].artistName}"`);
    }
  }
}
