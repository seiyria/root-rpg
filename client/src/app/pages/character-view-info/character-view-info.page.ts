import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-character-view-info',
  templateUrl: './character-view-info.page.html',
  styleUrls: ['./character-view-info.page.scss'],
})
export class CharacterViewInfoPage implements OnInit {

  constructor(public data: DataService) { }

  ngOnInit() {
  }

}