import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { navItems } from './ovas-nav';

@Component({
  selector: 'app-ovas-layout',
  templateUrl: './ovas-layout.component.html',
  styleUrls: ['./ovas-layout.component.scss']
})
export class OvasLayoutComponent implements OnInit {

  constructor(private router: Router) { }

  public sidebarMinimized = false;
  public navItems = navItems;

  ngOnInit(): void {
  }

}
