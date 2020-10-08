import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from '../../shared/post.service';
import {Post} from '../../shared/interfaces';
import {BehaviorSubject, Subject, Subscription} from 'rxjs';
import {takeUntil, takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  postSubscription: Subscription;
  destroy$: Subject<boolean> = new Subject<boolean>();
  searchStr = '';

  constructor(
    private postService: PostService
  ) {
  }

  ngOnInit(): void {
    this.postService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(posts => {
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    // if (this.postSubscription) {
    //   this.postSubscription.unsubscribe();
    // }
  }

  removePost(id: string): void {

  }
}
