import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CountryService } from 'src/app/services/country.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-country',
  templateUrl: './add-edit-country.component.html',
  styleUrls: ['./add-edit-country.component.scss']
})
export class AddEditCountryComponent implements OnInit {
  isEditMode = false;
  countryform = new FormGroup({
    name: new FormControl('', Validators.required)
  });
  constructor(private countryService: CountryService, private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddEditCountryComponent>,
    @Inject(MAT_DIALOG_DATA) public id: number) { }

  ngOnInit(): void {
    if (this.id) {
      this.isEditMode = true;
      this.countryService.getCountryByID(this.id).subscribe((res: any) => {
        this.countryform.get('name')?.setValue(res.name);
      });
    }
  }

  save() {
    if (!this.isEditMode) {
      this.countryService.addCountry(this.countryform.value).subscribe(() => {
        this.saveCallback();
      });
    }
    else {
      this.countryService.editCountry({id:this.id, ...this.countryform.value}).subscribe(() => {
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
