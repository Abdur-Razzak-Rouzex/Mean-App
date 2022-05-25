import {Component, OnInit} from '@angular/core';
import {PostModel} from '../post.model';
import {NgForm} from '@angular/forms';
import {PostsService} from '../posts.service';
import {ActivatedRoute, ParamMap, Route, Router} from '@angular/router';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit {

  private mode = 'create';
  private postId: string;
  post: PostModel;
  isLoading = false;

  constructor(public postService: PostsService, public activatedRoute: ActivatedRoute, public router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.isLoading = true;
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.postService.getPost(this.postId)
          .subscribe((result: any) => {
            console.log('the result: ', result);
            this.post = result.post;
            this.isLoading = false;
          });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.isLoading = true;
    const post: PostModel = {
      title: form.value.title,
      content: form.value.content,
    };

    if (this.mode === 'create') {
      this.postService.addPost(post);
    } else {
      this.postService.updatePost(this.postId, post.title, post.content);
    }
    this.router.navigate(['/']);
    form.resetForm();
  }
}
