import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MaterialService} from "../../classes/material.service";

@Component({
  selector: 'app-site-layouts',
  templateUrl: './site-layouts.component.html',
  styleUrls: ['./site-layouts.component.css']
})
export class SiteLayoutsComponent implements AfterViewInit {

  @ViewChild('floating') floatingRef: ElementRef

  links = [
    {url: '/overview', name: 'Overview'},
    {url: '/analytics', name: 'Analytics'},
    {url: '/history', name: 'History'},
    {url: '/order', name: 'Add order'},
    {url: '/categories', name: 'Assortment'}
  ]

  constructor(private auth: AuthService,
              private router: Router) {
  }


  ngAfterViewInit() {
    MaterialService.initializeFloatingButton(this.floatingRef)
  }

  logout(event: Event) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])

  }

}
