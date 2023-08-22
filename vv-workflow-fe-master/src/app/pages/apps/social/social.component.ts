import { Component, OnInit } from "@angular/core";
import { Link } from "../../../../@vex/interfaces/link.interface";
import { scaleIn400ms } from "../../../../@vex/animations/scale-in.animation";
import { fadeInRight400ms } from "../../../../@vex/animations/fade-in-right.animation";
import { AppState } from "../../store";
import { Store } from "@ngrx/store";
import { Observable, Subject, debounceTime, takeUntil, tap } from "rxjs";
import { dataSelector as userInfoSelector } from "src/app/pages/store/auth/authentication.selector";

export interface FriendSuggestion {
  name: string;
  imageSrc: string;
  friends: number;
  added: boolean;
}

@Component({
  selector: "vex-social",
  templateUrl: "./social.component.html",
  styleUrls: ["./social.component.scss"],
  animations: [scaleIn400ms, fadeInRight400ms],
})
export class SocialComponent implements OnInit {
  private onDestroy$ = new Subject<void>();
  userInfo$: Observable<any>;
  userInfo: any = null;

  links: Link[] = [
    {
      label: "ABOUT",
      route: "./",
      routerLinkActiveOptions: { exact: true },
    },
    {
      label: "SETTING",
      route: "./setting",
      routerLinkActiveOptions: { exact: true },
    },
    // {
    //   label: 'TIMELINE',
    //   route: './timeline'
    // },
    // {
    //   label: 'FRIENDS',
    //   route: '',
    //   disabled: true
    // },
    // {
    //   label: 'PHOTOS',
    //   route: '',
    //   disabled: true
    // }
  ];

  constructor(private store$: Store<AppState>) {
    this.userInfo$ = this.store$.select(userInfoSelector);
  }

  ngOnInit(): void {
    this.userInfo$
      .pipe(
        debounceTime(10),
        takeUntil(this.onDestroy$),
        tap((userInfo) => {
          this.userInfo = userInfo;
        })
      )
      .subscribe();
  }
}
