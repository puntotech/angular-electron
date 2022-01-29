import { Component, OnInit } from '@angular/core';
import { ElectronStoreService } from 'src/app/services/electron-store.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  clicks: number = 0;
  saved: boolean = true;
  constructor(private electronStoreService: ElectronStoreService) { }

  ngOnInit(): void {
    this.clicks = this.electronStoreService.get("clicks");
  }

  addClicks = (): void => {
    this.clicks++;
    this.saved = false;
  }

  save = (): void => {
    this.electronStoreService.set("clicks", this.clicks);
    this.saved = true;
  }
}
