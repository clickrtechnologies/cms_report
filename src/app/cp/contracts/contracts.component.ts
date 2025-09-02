import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as JSZip from 'jszip';
import * as XLSX from 'xlsx';
import { ContractService } from 'src/app/service/cp-service/contract.service';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent {

  isEditing: boolean[] = [];

  excelRowCount = 0;

  uploadedFiles: File[] = [];

  excelFile: File | null = null;
  contractFiles: File[] = [];

  form = this.fb.group({
    contracts: this.fb.array<FormGroup>([])
  });

  get contracts(): FormArray<FormGroup> {
    return this.form.get('contracts') as FormArray<FormGroup>;
  }


  constructor(private fb: FormBuilder, private contractService: ContractService) {
    this.getContractList();
  }

  private createRow(contract?: any): FormGroup {
    return this.fb.group({
      id: new FormControl(contract?.id ?? null),
      artistName: new FormControl(contract?.artistName ?? ''),
      albumName: new FormControl(contract?.albumName ?? ''),
      songName: new FormControl(contract?.songName ?? ''),
      genre: new FormControl(contract?.genre ?? ''),
      cpName: new FormControl(contract?.cpName ?? ''),
      licensedCountry: new FormControl(contract?.licensedCountry ?? ''),
      licensedMNO: new FormControl(contract?.licensedMNO ?? ''),

      // store yyyy-MM-dd string (not Date object)
      fromDate: new FormControl(contract?.fromDate ?? ''),
      toDate: new FormControl(contract?.toDate ?? ''),
      expiryDate: new FormControl(contract?.expiryDate ?? ''),

      contractFile: new FormControl<File | null>(null),
      contractFileUrl: new FormControl(contract?.contractFileUrl ?? '')
    });
  }

  private setRowEnabled(i: number, enabled: boolean) {
    const grp = this.contracts.at(i);
    if (!grp) return;

    const editableFields = ['fromDate', 'toDate', 'expiryDate', 'contractFile'];
    editableFields.forEach(field => {
      const ctrl = grp.get(field);
      if (!ctrl) return;
      enabled ? ctrl.enable({ emitEvent: false }) : ctrl.disable({ emitEvent: false });
    });
  }


  getContractList(): void {
    const id = sessionStorage.getItem('id');
    if (!id) {
      console.error('No ID found in sessionStorage');
      return;
    }
    this.contractService.getContracts(id).subscribe({
      next: (response: any) => {
        this.contracts.clear();
        this.isEditing = [];
        console.log('Fetched contract list:', response);
        const list = Array.isArray(response.data) ? response.data : [];
        list.forEach((item: any) => {
          const normalized = {
            id: item.id ?? null,
            artistName: item.artistName ?? '',
            albumName: item.albumName ?? '',
            songName: item.songName ?? '',
            genre: item.genre ?? '',
            cpName: item.cpName ?? '',
            licensedCountry: item.country ?? '',
            licensedMNO: item.mno ?? '',
            fromDate: (item.fromDate ? String(item.fromDate).split('T')[0] : ''),
            toDate: (item.toDate ? String(item.toDate).split('T')[0] : ''),
            expiryDate: (item.expiryDate ? String(item.expiryDate).split('T')[0] : ''),

            contractFileUrl: item.contractFileUrl ?? ''
          };
          const row = this.createRow(normalized);
          this.contracts.push(row);
          this.isEditing.push(false);
          this.setRowEnabled(this.contracts.length - 1, false);
          console.log('Added contract row:', normalized);
        });
      },

      error: (err) => {
        console.error('Failed to fetch contract list:', err);
        this.contracts.clear();
        this.isEditing = [];
      }
    });
  }

  editContract(i: number) {
    this.isEditing[i] = true;
    this.setRowEnabled(i, true);
  }

  formatDate(date: string | Date): string {
    if (!date) return '';
    if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    }
    // already a string (like "2025-08-12" or "2025-08-12T00:00:00Z")
    return date.split('T')[0];
  }


  saveContract(i: number) {
  const grp = this.contracts.at(i) as FormGroup;
  if (!grp) return;

  const v = grp.getRawValue();

  const payload = {
  id: v.id,
  fromDate: this.formatDateTime(v.fromDate),   // "2025-08-01T00:00:00"
  toDate: this.formatDateTime(v.toDate),
  expiryDate: this.formatDateTime(v.expiryDate),
  contractFileUrl: v.contractFileUrl
};


  this.contractService.saveContract(payload).subscribe({
    next: () => {
      alert('Contract updated successfully!');
      this.isEditing[i] = false;
      this.setRowEnabled(i, false);
      this.getContractList();
    },
    error: (err) => {
      console.error('Failed to update contract:', err);
      alert('Failed to update contract');
    }
  });
}

formatDateTime(date: any): string | null {
  if (!date) return null;
  const d = new Date(date);
  return d.toISOString().split('.')[0]; // "2025-08-01T00:00:00"
}



  onFileUpload(event: Event, i: number) {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      const file = input.files[0];
      const grp = this.contracts.at(i);
      grp?.get('contractFile')?.setValue(file);

      const formData = new FormData();
      formData.append('contractFile', file);

      this.contractService.uploadContract(formData).subscribe({
        next: (res: any) => {
          const url = res?.url || '';
          grp?.get('contractFileUrl')?.setValue(url);
        }
      });
    }
  }

  // Parse Excel
  onExcelUpload(event: any) {
  this.excelFile = event.target.files[0];
  console.log('Selected Excel:', this.excelFile);

  // Read Excel to count rows
  const reader = new FileReader();
  reader.onload = (e: any) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    this.excelRowCount = jsonData.length;
    console.log('Excel row count:', this.excelRowCount);
  };
  if (this.excelFile) {
    reader.readAsArrayBuffer(this.excelFile);
  }
}


  // Capture multiple contract files
onContractFilesSelected(event: any) {
  this.contractFiles = Array.from(event.target.files);
  console.log('Selected files:', this.contractFiles);
}

  // Upload Excel + Contracts Zip
  async uploadAll() {
  if (!this.excelFile) {
    alert('Please upload the Excel file first.');
    return;
  }

  if (!this.contractFiles.length) {
    alert('Please select contract files.');
    return;
  }

  // Validation: Excel rows vs Contract files
  if (this.contractFiles.length !== this.excelRowCount) {
    alert(`Number of contract files (${this.contractFiles.length}) does not match number of rows in Excel (${this.excelRowCount}).`);
    return;
  }

  // Zip contract files
  const zip = new JSZip();
  this.contractFiles.forEach(file => zip.file(file.name, file));
  const blob = await zip.generateAsync({ type: 'blob' });

  // FormData
  const formData = new FormData();
  formData.append('contractExcelFile', this.excelFile);
  formData.append('contractsZip', blob, 'contracts.zip');

  // Call service
  this.contractService.uploadBulkContracts(formData).subscribe({
    next: () => {
      alert('Contracts uploaded successfully!');
      this.contractFiles = [];
      this.excelFile = null;
      this.excelRowCount = 0;
    },
    error: (err) => {
      console.error('Upload failed:', err);
      alert('Failed to upload contracts.');
    }
  });
}



}
