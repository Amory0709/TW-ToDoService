import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoItem } from '../model/ToDoItem';

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  constructor(private httpClient: HttpClient) { }

  create(todoItem: ToDoItem): Observable<any> {
    return this.httpClient.post(
      'https://localhost:5001/todos',
      todoItem
    );
  }

  getById(id: number): Observable<ToDoItem> {
    return this.httpClient.get<ToDoItem>(
      `https://localhost:5001/todos/${id}`
    );
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(
      `https://localhost:5001/todos/${id}`
    );
  }
}
