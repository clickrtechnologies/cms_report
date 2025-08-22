import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Contract } from 'src/app/models/cp-models/contract.model';
import { ContractService } from 'src/app/service/cp-service/contract.service';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent {


  form = this.fb.group({
    contracts: this.fb.array<FormGroup>([])
  });

  get contracts(): FormArray<FormGroup> {
    return this.form.get('contracts') as FormArray<FormGroup>;
  }

  isEditing: boolean[] = [];

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
    const grp = this.contracts.at(i);
    if (!grp) return;

    const v = grp.getRawValue();

    const payload = {
      id: v.id,
      fromDate: this.formatDate(v.fromDate),
      toDate: this.formatDate(v.toDate),
      expiryDate: this.formatDate(v.expiryDate),
      contractFileUrl: v.contractFileUrl
    };

    this.contractService.saveContract(payload).subscribe({
      next: () => {
        alert('Contract updated successfully!');
        this.isEditing[i] = false;
        this.setRowEnabled(i, false);
        this.getContractList(); // refresh
      },
      error: () => {
        console.error('Failed to update contract: ' + JSON.stringify(payload));
        alert('Failed to update contract');
      }
    });
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




}
