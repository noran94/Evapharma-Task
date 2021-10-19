import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country.service';
import { AddEditCountryComponent } from '../add-edit-country/add-edit-country.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource = new MatTableDataSource<Country>();
  constructor(private countryService: CountryService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getList();
  }
  getList() {
    this.countryService.getCountries().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource<Country>(res);
    });
  }
  openDialogAddEdit(id?: number) {
    this.dialog.open(AddEditCountryComponent, { data: id }).afterClosed()
      .subscribe((added: boolean) => {
        if (added) {
          this.getList();
        }
      });

  }
  openDialogDelete(id: number) {
    this.dialog
      .open(ConfirmDialogComponent, { data:'country'})
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.countryService.deleteCountry(id).subscribe(() => {
            this._snackBar.open('Country Deleted Successfully', '', {
              duration: 3000,
              panelClass: 'success-snackbar'
            });
          })
          this.getList();
        }
      });
  }

}
