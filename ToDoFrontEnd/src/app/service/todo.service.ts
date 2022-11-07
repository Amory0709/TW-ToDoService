import { ToDoItem } from './../model/ToDoItem';
import { TodoApiService } from './todo.api.service';
import { Injectable } from '@angular/core';
import { TodoStoreService } from './todo-store.service';
import { HttpResponse } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private _selectedTodoItem: ToDoItem = {} as ToDoItem;
  private _updatingTodoItem: ToDoItem = {} as ToDoItem;
  errorMessage!: string;

  constructor(
    private todoStore: TodoStoreService,
    private todoApiService: TodoApiService
  ) { }

  public get todoItems(): Array<ToDoItem> {
    return this.todoStore.getAll();
  }

  public create(todoItem: ToDoItem): void {
    this.todoApiService.create(todoItem).subscribe({
      next: (response) => { },
      error: (error) => {
        this.errorMessage = error.errorMessage;
      },
    });
  }

  public update(updateTodoItem: ToDoItem): void {
    this.todoStore.update(updateTodoItem);
  }

  public delete(id: number): void {
    this.todoApiService.delete(id).subscribe({
      next: (response) => { },
      error: (error) => {
        this.errorMessage = error.errorMessage;
      },
    });
  }

  public selectTodoItem(id: number): void {
    this._selectedTodoItem = this.todoStore.findById(id);
  }

  public selectTodoItemForUpdate(id: number): void {
    this._updatingTodoItem = Object.assign({}, this.todoStore.findById(id));
  }

  public currentTodoItem(): ToDoItem {
    return this._selectedTodoItem;
  }

  public findById(id: number): Observable<any> {
    return this.todoApiService.getById(id).pipe(
      // tap(res => console.log(res)),
      catchError(err => {
        this.errorMessage = err.errorMessage
        return err
      })
    )
  }

  public currentUpdatingTodoItem(): ToDoItem {
    return this._updatingTodoItem;
  }
}
