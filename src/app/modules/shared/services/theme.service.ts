import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = signal(false);
  private readonly lightTheme = 'indigo-pink.css';
  private readonly darkTheme = 'pink-bluegrey.css';

  constructor() {
    // Cargar tema claro por defecto
    this.loadTheme(this.lightTheme);
  }

  isDarkMode() {
    return this.darkMode();
  }

  toggleTheme() {
    this.darkMode.update(value => !value);
    const theme = this.darkMode() ? this.darkTheme : this.lightTheme;
    this.loadTheme(theme);
  }

  private loadTheme(themeName: string) {
    // Remover tema anterior
    const existingTheme = document.getElementById('app-theme');
    if (existingTheme) {
      existingTheme.remove();
    }

    // Añadir nuevo tema
    const link = document.createElement('link');
    link.id = 'app-theme';
    link.rel = 'stylesheet';
    link.href = themeName;
    document.head.appendChild(link);
  }
}
