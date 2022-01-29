import { Injectable, NgZone } from '@angular/core';
import { IpcRenderer } from 'electron';
import { Observable } from 'rxjs';

declare global {
  interface Window {
    ipcRenderer: IpcRenderer;
  }
}

@Injectable({
  providedIn: 'root',
})
export class IpcService {
  constructor(private ngZone: NgZone) {}

  isElectron(): Boolean {
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.includes(' electron/');
  }

  on(channel: string): Observable<any> {
    return new Observable((observer) => {
      window.ipcRenderer.on(channel, (_event, payload) => {
        this.ngZone.run(() => observer.next(payload));
      });
    });
  }

  send(channel: string, ...args: any[]): void {
    if (!this.isElectron()) {
      return;
    }
    window.ipcRenderer.send(channel, ...args);
  }

  removeAllListeners(channel: string): void {
    if (!this.isElectron()) {
      return;
    }
    window.ipcRenderer.removeAllListeners(channel);
  }
}
