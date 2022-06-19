import { Component, Input, OnInit } from '@angular/core';
import { ServiceStatusDetail } from '../app-interfaces';

@Component({
  selector: 'app-status-card',
  templateUrl: './status-card.component.html',
  styleUrls: ['./status-card.component.scss'],
})
export class StatusCardComponent {
  @Input() item: ServiceStatusDetail;
  constructor() {}
}
