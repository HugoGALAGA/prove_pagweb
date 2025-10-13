import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit { 

  isDarkMode: boolean = true;

  ngOnInit(): void {
    if (localStorage.getItem('theme') === 'light' || 
       (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)) {
      this.setTheme(false);
    } else {
      this.setTheme(true);
    }
  }

  toggleTheme() {
    this.setTheme(!this.isDarkMode);
  }

  setTheme(isDark: boolean) {
    this.isDarkMode = isDark;
    if (isDark) {
      document.body.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    }
  }
}