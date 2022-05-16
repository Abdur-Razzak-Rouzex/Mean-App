import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent  {
/*  posts = [
    {title: 'this is post 1', content: 'This is the content 1'},
    {title: 'this is post 2', content: 'This is the content 2'},
    {title: 'this is post 3', content: 'This is the content 3'},
  ];*/

  @Input() posts = [];

}
