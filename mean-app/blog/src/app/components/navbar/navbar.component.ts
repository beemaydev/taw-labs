import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Subscription } from 'rxjs';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  providers: [AuthService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  login: string = '';
  private dataSubscription!: Subscription;

  constructor(public authService: AuthService, public router: Router, private loginService: LoginService) {
  }
  ngOnInit(): void {
    this.dataSubscription = this.loginService.currentData.subscribe(data => {
      this.login = data;
    });
  }
  loginUser() {
    this.router.navigate(['/login']);

    if (this.login != null && this.login != "") {
      window.location.reload();
    }
  }
  signOut() {
    this.authService.logout().subscribe((result: any) => {
      this.loginService.changeData("");
      this.router.navigate(['/']);
      return result;
    });
  }
}
