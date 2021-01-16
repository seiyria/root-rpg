import { Component, Input, OnInit } from '@angular/core';
import { IonCheckbox, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-force-selector',
  templateUrl: './force-selector.component.html',
  styleUrls: ['./force-selector.component.scss'],
})
export class ForceSelectorComponent implements OnInit {

  @Input() public title: string;
  @Input() public message: string;
  @Input() public numChoices = 1;
  @Input() public choices: Array<{ name: string, text: string }> = [];
  @Input() public bannedChoices: string[] = [];
  @Input() public disableBanned = false;
  @Input() public defaultSelected: string[] = [];

  public selected: boolean[] = [];

  public get numSelected(): number {
    return this.selected.filter(Boolean).length;
  }

  public get formattedSelected(): Array<{ name: string, text: string }> {
    return this.choices.filter((x, i) => this.selected[i]);
  }

  constructor(
    private modal: ModalController
  ) { }

  ngOnInit() {
    this.selected = this.choices.map(({ name }) => this.defaultSelected.includes(name));
  }

  selectItem(checkbox: IonCheckbox, index: number): void {
    this.selected[index] = checkbox.checked;
  }

  dismiss(choices?: Array<{ name: string, text: string }>) {
    this.modal.dismiss(choices);
  }

}
