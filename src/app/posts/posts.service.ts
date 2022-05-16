import {PostModel} from './post.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

/* instead of using Injectable here you also could have added this service to
 the providers array in the app.module.ts file */

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: PostModel[] = [];
  private postUpdatedSubject = new Subject<PostModel[]>();

  getPosts() {
    return [...this.posts];
  }

  getPostUpdateListenerObservable() {
    return this.postUpdatedSubject.asObservable();
  }

  addPost(post: PostModel) {
    const addedPost: PostModel = {
      title: post.title,
      content: post.content,
    };
    this.posts.push(addedPost);
    this.postUpdatedSubject.next([...this.posts]);
  }
}
