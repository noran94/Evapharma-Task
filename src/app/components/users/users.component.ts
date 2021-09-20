import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'avatar', 'email', 'first_name', 'last_name', 'actions'];
  dataSource = new MatTableDataSource<User>();
  total = 0;
  constructor(private userService: UserService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getList(new PageEvent());
  }
  getList(pageEvent: PageEvent) {
    this.userService.getUsers(pageEvent).subscribe((res: any) => {
      this.total = res.total;
      this.dataSource = new MatTableDataSource<User>(res['data']);
    });
  }
  openDialogAdd() {
    this.dialog.open(AddUserComponent);
  }
  openDialogDelete(id: number) {
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.userService.deleteUser(id).subscribe(() => {
            this._snackBar.open('User Deleted Successfully', '', {
              duration: 3000,
              panelClass: 'success-snackbar'
            });
          })
        }
      });
  }

}
