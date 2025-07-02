import {AfterViewInit, Component } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.css']
})
export class ApprovalsComponent {
  approvalList = [
    {
      artistName: 'Arijit Singh',
      albumName: 'Romantic Vibes',
      songName: 'Tum Hi Ho',
      songCode: 'ALX-0001',
      qrCodeUrl: 'https://example.com/qr/ALX-0001',
      genre: 'Romantic',
      cpName: 'CP1 Music Co.',
      country: 'India',
      mno: 'Airtel',
      contractFile: new File(["dummy content"], "contract.pdf", { type: "application/pdf" }),
      expiryDate: '2026-01-31',
      audioUrl: 'https://example.com/audio/tum-hi-ho.mp3',
      approved: true,
      rejectionReason: ''
    }
  ];

  downloadContract(file: File): void {
    const blobUrl = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = file.name || 'contract.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      $('#approvalTable').DataTable({
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
