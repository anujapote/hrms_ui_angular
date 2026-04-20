import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSubject = new Subject<string>();
  message$ = this.messageSubject.asObservable();

  add(message: string) {
    this.messageSubject.next(message);
    // Auto-clear after 3 seconds for UI
    setTimeout(() => this.messageSubject.next(''), 3000);
  }

  clear() {
    this.messageSubject.next('');
  }
}

