import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  // Very simple component to create the website navigation bar
  // In a real world example this will be a dumb a component
  // Which will accept things like tabs, or any other things needed.
  // For simplicity the title is hardcoded in the html but can be easily changed
  // so that @Input can be used to accept a title property
}
