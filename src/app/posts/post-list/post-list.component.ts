import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostModel} from '../post.model';
import {PostsService} from '../posts.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  constructor(public postService: PostsService) {
  }

  posts: PostModel[] = [];
  private postSub: Subscription;

  ngOnInit() {
    this.postService.getPosts();

    this.postSub = this.postService.getPostUpdateListenerObservable()
      .subscribe((posts: PostModel[]) => {
        this.posts = posts;
      });
  }

  onDelete(postId) {
    this.postService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

}
