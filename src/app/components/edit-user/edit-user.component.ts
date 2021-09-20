import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  id: any;
  userform = new FormGroup({
    name: new FormControl('', Validators.required),
    job: new FormControl('', Validators.required)
  });
  constructor(private userService: UserService, private _snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || 0;
    this.userService.getUserByID(this.id).subscribe((res: any) => {
      this.userform.get('name')?.setValue(res.data.first_name + ' ' + res.data.last_name);
    });
  }
  save() {
    this.userService.editUser(this.id, this.userform.value).subscribe(() => {
      this._snackBar.open('Data Saved Successfully', '', {
        duration: 3000,
        panelClass: 'success-snackbar'
      });
      this.router.navigate(['/users']);
    });
  }
}
