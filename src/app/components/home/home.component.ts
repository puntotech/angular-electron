import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { IpcService } from 'src/app/services/ipc.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  public pong$: Observable<boolean>;

  constructor(private ipcService: IpcService) {}

  ngOnInit(): void {
    this.listenReply();
  }

  listenReply = (): void => {
    if (!this.ipcService.isElectron()) {
      return;
    }
    this.pong$ = this.ipcService
      .on('reply')
      .pipe(map((payload) => payload === 'pong'));
  };

  ping = (): void => this.ipcService.send('message', 'ping');

  ngOnDestroy(): void {
    this.ipcService.removeAllListeners('reply');
  }
}
