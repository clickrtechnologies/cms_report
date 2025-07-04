import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  themeColor = 'default';

  ngOnInit(): void {
    const saved = localStorage.getItem('cms_theme');
    if (saved) this.themeColor = saved;
  }

  saveTheme() {
    localStorage.setItem('cms_theme', this.themeColor);
    alert('Theme saved! Please reload to see changes.');
  }
}
