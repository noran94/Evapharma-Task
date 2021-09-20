import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userform = new FormGroup({
    name: new FormControl('', Validators.required),
    job: new FormControl('', Validators.required)
  });
  constructor(private userService: UserService, private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public id: number) { }

  ngOnInit(): void { }

  save() {
    this.userService.addUser(this.userform.value).subscribe(() => {
      this._snackBar.open('Data Saved Successfully', '', {
        duration: 3000,
        panelClass: 'success-snackbar'
      });
      this.dialogRef.close();
    });
  }
}
