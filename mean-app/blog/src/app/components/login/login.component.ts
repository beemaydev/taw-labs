import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public credentials = {
    login: '',
    password: ''
  };
  public logged?: boolean;
  public logout?: boolean;
  public error?: boolean;
  public a?: boolean;
  constructor(public authService: AuthService,
    private router: Router) {
  }
  ngOnInit(): void {
  }
  signIn() {
    this.error = true;
    return this.authService.authenticate(this.credentials).subscribe((result) => {
      if (!result) {
        this.logged = false;
      } else {
        this.error = false;

        this.logout = false;
        this.credentials = {
          login: '',
          password: ''
        };

        this.router.navigate(['/']);
      }
    });
  }
}
