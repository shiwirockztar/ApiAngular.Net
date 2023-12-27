import { Component } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { UserCustomer } from 'src/app/models/user-customer';

@Component({
  selector: 'app-uploading',
  templateUrl: './uploading.component.html',
  styleUrls: ['./uploading.component.css']
})
export class UploadingComponent {
  pageSize: number = 7; // Número de elementos por página
  currentPage: number = 1; // Página actual
  selectedFile: File | null = null;
  users: any;

  constructor(
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.selectedFile) {
      console.log('Archivo seleccionado:', this.selectedFile);
    } else {
      console.log('No se ha seleccionado ningún archivo.');
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const workbook = XLSX.read(e.target.result, { type: 'binary' });

        // Obtener la primera hoja del libro de Excel
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convertir la hoja de Excel a un array de objetos
        const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Mapear los datos del Excel al modelo UserCustomer
        const userCustomers: UserCustomer[] = excelData
          .slice(1)
          .map((rowData: any) => {
            const userCustomer = new UserCustomer();
            userCustomer.name = rowData[0];
            userCustomer.lastname = rowData[1];
            userCustomer.email = rowData[2];
            userCustomer.phoneNumber = rowData[3];
            userCustomer.documentType = rowData[4];
            userCustomer.documentNumber = rowData[5];
            userCustomer.positionCompany = rowData[6];

            this.users = userCustomer;
            return userCustomer;
          });

        console.log('Datos de Excel en formato de objeto:', userCustomers);
      };

      reader.readAsBinaryString(file);
    }

    console.log('users:', this.users);
  }

  openDialog() {
    // this.dialog.open(DialogDataExampleDialog, {
    //   data: {
    //     animal: 'panda',
    //   },
    // });
  }

  pageChanged(newPage: number): void {
    this.currentPage = newPage;
  }

  back() {
    this.router.navigate(['/model/customers'], {});
  }
}

// @Component({
//   selector: 'dialog-data-example-dialog',
//   templateUrl: './modal/dialog.html',
//   standalone: true,
//   imports: [MatDialogTitle, MatDialogContent],
// })
// export class DialogDataExampleDialog {
//   constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
// }