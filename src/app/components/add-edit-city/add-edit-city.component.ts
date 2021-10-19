import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-add-edit-city',
  templateUrl: './add-edit-city.component.html',
  styleUrls: ['./add-edit-city.component.scss']
})
export class AddEditCityComponent implements OnInit {
  isEditMode = false;
  cityform = new FormGroup({
    name: new FormControl('', Validators.required),
    CountryId: new FormControl('', Validators.required)
  });
  constructor(private cityService: CityService, private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddEditCityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.cityform.get('CountryId')?.setValue(this.data.CountryId);
    if (this.data.cityId) {
      this.isEditMode = true;
      this.cityService.getcityByID(this.data.cityId).subscribe((res: any) => {
        this.cityform.get('name')?.setValue(res.name);
      });
    }
  }

  save() {
    if (!this.isEditMode) {
      this.cityService.addcity(this.cityform.value).subscribe(() => {
        this.saveCallback();
      });
    }
    else {
      this.cityService.editcity({ id: this.data.cityId, ...this.cityform.value }).subscribe(() => {
        this.saveCallback();
      });
    }
  }
  saveCallback() {
    this._snackBar.open('Data Saved Successfully', '', {
      duration: 3000,
      panelClass: 'success-snackbar'
    });
    this.dialogRef.close(true);
  }

}
