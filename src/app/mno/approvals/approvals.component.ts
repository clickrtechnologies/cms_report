import {AfterViewInit, Component } from '@angular/core';
import { MnoApproval } from 'src/app/models/mno-models/mno-approval.model';
import { MnoApprovalService } from 'src/app/service/mno-service/mno-approval.service';
declare var $: any;
@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.css']
})
export class ApprovalsComponent {
  approvalList : MnoApproval []= [];

  constructor(private mnoApprovalService: MnoApprovalService) {
    this.approvalList = this.mnoApprovalService.getApprovals();
  } 

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
