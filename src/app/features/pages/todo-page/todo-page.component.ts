import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {CommonModule } from '@angular/common';
import {SharedModule} from "../../../shared/shared.module";
import {MediaMatcher} from "@angular/cdk/layout";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnDestroy{
   mobileQuery: MediaQueryList;
  _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
