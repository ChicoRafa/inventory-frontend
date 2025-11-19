import { MediaMatcher } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-sidenav',
  standalone: false,
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.css',
})
export class Sidenav {
  themeService = inject(ThemeService);

  mobileQuery: MediaQueryList;
  menuNav = [
    {name: 'Home', route: 'home', icon: 'home' },
    {name: 'Categories', route: 'category', icon: 'category' },
    {name: 'Products', route: 'products', icon: 'production_quantity_limits' },
  ]

  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
