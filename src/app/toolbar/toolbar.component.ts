import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  host: {
    '(document:click)': 'closePopout($event)',
  }
})
export class ToolbarComponent implements OnInit {

  @Input() title: String;
  @Output() toggleSidenav = new EventEmitter<any>();
  @ViewChild('popOutButton') elementView: ElementRef;
  showPopout: boolean = false;
  showFleet: boolean = false;
  showProfile: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    console.log("Init Toolbar");
  }

  toggle() {
    this.toggleSidenav.emit();
  }

  togglePopout() {
    this.showPopout = !this.showPopout;
  }

  /**
   * This is used to hide the popout when clicking anywhere else on the screen.
   * @param event The click event
   */
  closePopout(event) {
    if (!this.elementView.nativeElement.contains(event.target)) //check if the clicked target is out icon
      this.showPopout = false;
  }

  logout() {
    this.router.navigate(['/auth'], { replaceUrl: true });
  }
}
