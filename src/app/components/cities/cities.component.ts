import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CityService } from 'src/app/services/city.service';
import { City } from 'src/app/models/city';
import { MatTableDataSource } from '@angular/material/table';
import { AddEditCityComponent } from '../add-edit-city/add-edit-city.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource = new MatTableDataSource<City>();
  countryID = 0;
  constructor(private route: ActivatedRoute, private cityService: CityService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.countryID = +(this.route.snapshot.paramMap.get('id') || 0);
    this.getCityList();
  }
  getCityList() {
    this.cityService.getcityByCountryID(+this.countryID).subscribe((res: any) => {
      this.dataSource = new MatTableDataSource<City>(res);
    })
  }

  openDialogAddEdit(cityId?: number) {
    this.dialog.open(AddEditCityComponent, { data: { cityId: cityId, CountryId: this.countryID } }).afterClosed()
      .subscribe((added: boolean) => {
        if (added) {
          this.getCityList();
        }
      });
  }
  openDialogDelete(id: number) {
    this.dialog
      .open(ConfirmDialogComponent, { data: 'city' })
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.cityService.deletecity(id).subscribe(() => {
            this._snackBar.open('City Deleted Successfully', '', {
              duration: 3000,
              panelClass: 'success-snackbar'
            });
          })
          this.getCityList();
        }
      });
  }

}
