import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrl: './master.component.css',
})
export class MasterComponent {
  isCollapsed = false;
  selectedRoute: string = '/dashboard/add-user';
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.checkTokenExpiration();
    this.decodeToken();

    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.selectedRoute = event.urlAfterRedirects;
        // console.log(this.selectedRoute);
      });
    // console.log(this.selectedRoute);
  }

  decode: any;
  decodeToken(): void {
    const token = sessionStorage.getItem('token');
    const jwtHelper = new JwtHelperService();
    this.decode = jwtHelper.decodeToken(token!);
    localStorage.setItem('decodeToken', JSON.stringify(this.decode));
  }
  checkTokenExpiration(): void {
    const expirationDate = sessionStorage.getItem('tokenExpiration');
    if (expirationDate) {
      const currentTime = new Date().getTime();
      // console.log(currentTime + 'hello' + expirationDate);

      if (currentTime >= +expirationDate) {
        // Token has expired, remove it
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('tokenExpiration');
      }
    }
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('tokenExpiration');
    this.router.navigate(['auth/login']);
  }
}
