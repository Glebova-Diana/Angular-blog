import { Component, OnInit } from '@angular/core';
import {PostService} from '../shared/post.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable} from 'rxjs';
import {Post} from '../shared/interfaces';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  post$: Observable<Post>;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.post$ = this.activatedRoute.params
      .pipe(
        switchMap((params: Params) => {
          return this.postService.getById(params.id);
        })
      );
  }

}
