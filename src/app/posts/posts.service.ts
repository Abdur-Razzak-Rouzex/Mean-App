import {PostModel} from './post.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';


/* instead of using Injectable here you also could have added this service to
 the providers array in the app.module.ts file */

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: PostModel[] = [];
  private postUpdatedSubject = new Subject<PostModel[]>();
  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  getPosts() {
    this.http
      .get<{ message: string, posts: PostModel[] }>(this.baseUrl + '/api/posts')
      .pipe(map((postData: any) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe((postData) => {
        this.posts = postData;
        this.postUpdatedSubject.next([...this.posts]);
      });
  }

  getPostUpdateListenerObservable() {
    return this.postUpdatedSubject.asObservable();
  }

  addPost(post: PostModel) {
    const addedPost: PostModel = {
      title: post.title,
      content: post.content,
    };

    this.http.post<{ message: string, postId: string }>(this.baseUrl + '/api/posts/', addedPost)
      .subscribe((response) => {
        addedPost.id = response.postId;
        this.posts.push(addedPost);
        this.postUpdatedSubject.next([...this.posts]);
      });
  }

  updatePost(id: string, title: string, content: string) {
    const post: PostModel = {id, title, content};

    this.http.put(this.baseUrl + `/api/posts/${id}`, post)
      .subscribe((response: PostModel) => {
        console.log('the updated data: ', response);
      });
  }

  getPost(id: string) {
    return this.http.get(this.baseUrl + `/api/posts/${id}`);
  }

  deletePost(postId: string) {
    this.http.delete(this.baseUrl + '/api/posts/' + postId)
      .subscribe(() => {
        this.posts = this.posts.filter(post => post.id !== postId);
        this.postUpdatedSubject.next([...this.posts]);
      });
  }
}
