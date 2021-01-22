import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-clearing-view-events',
  templateUrl: './clearing-view-events.page.html',
  styleUrls: ['./clearing-view-events.page.scss'],
})
export class ClearingViewEventsPage implements OnInit {

  public isEditing: boolean;

  constructor(
    public data: DataService
  ) { }

  ngOnInit() {
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;

    if (!this.isEditing) {
      this.data.patchCampaign().subscribe(() => {});
    }
  }

}