import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  constructor(private userService: UserService, private route: ActivatedRoute) { }
  user = new User();
  ngOnInit(): void {
    const userID = this.route.snapshot.paramMap.get('id') || 0;
    this.userService.getUserByID(+userID).subscribe((res: any) => {
      this.user = res.data;
    })
  }
}
