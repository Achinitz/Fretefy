
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';


@Injectable({
  providedIn: 'root'
})
export class ExcelService {

exportToExcell(data: any, nome: string): void {

  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, 'exported_data.xlsx');
}

  exportToExcel(data: any[], fileName: string, sheetName: string = 'Dados'): void {
 
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    const workbook: XLSX.WorkBook = { 
      Sheets: { [sheetName]: worksheet }, 
      SheetNames: [sheetName] 
    };
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  }
}