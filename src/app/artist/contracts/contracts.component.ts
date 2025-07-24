import { Component } from '@angular/core';
import { ArtistContract } from 'src/app/models/artist-models/artist-contract.model';
import { ArtistContractService } from 'src/app/service/artist-service/artist-contract.service';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent {
  // contractList = [
  //   {
  //     date: '2025-07-01',
  //     artistName: 'Arijit Singh',
  //     albumName: 'Romantic Vibes',
  //     songName: 'Tum Hi Ho',
  //     genre: 'Romantic',
  //     cpName: 'CP1 Music Co.',
  //     fromDate: '2025-07-01',
  //     toDate: '2025-12-31',
  //     contractFile: File
  //   }
  // ];

  contractList : ArtistContract[] = [];
  
    constructor(private artistContractService: ArtistContractService) {
        this.getContractList();
      }

      // Method to fetch contracts from the service
  getContractList(): void {
    this.artistContractService.getContracts().subscribe({
      next: (response: any) => {
        this.contractList = Array.isArray(response.data) ? response.data : [];
      },
      error: (err) => {
        console.error('Failed to fetch contracts:', err);
        this.contractList = [];
      }
    });
  }

onFileUpload(event: any, index: number): void {
  const file = event.target.files[0];
  if (file) {
    this.contractList[index].contractFile = file;
    alert(`✅ Uploaded contract: ${file.name}`);
  }
}

downloadContract(index: number): void {
  const file = this.contractList[index].contractFile;

  if (file instanceof File) {
    const blobUrl = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = file.name || 'contract.pdf'; // fallback name
    document.body.appendChild(link); // Needed for Firefox
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  } else {
    alert('❌ No valid contract file available to download.');
  }
}
}
