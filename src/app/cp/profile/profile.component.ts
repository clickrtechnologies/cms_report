import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  cp = {
    cpName: 'Sample CP',
    cpEmail: 'cp@example.com',
    username: 'cpuser',
    password: '******'
  };

  editMode = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const storedUser = sessionStorage.getItem('loggedInUser');
    if (!storedUser) {
      this.router.navigate(['/']);
    } else {
      const parsedUser = JSON.parse(storedUser);
      this.cp = parsedUser;
    }
  }

  saveChanges() {
    this.editMode = false;
    sessionStorage.setItem('loggedInUser', JSON.stringify(this.cp));
    alert('CP Profile updated successfully');
  }
}
