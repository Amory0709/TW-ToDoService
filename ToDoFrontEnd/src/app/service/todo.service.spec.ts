import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ToDoItem } from '../model/ToDoItem';
import { TodoStoreService } from './todo-store.service';
import { TodoApiService } from './todo.api.service';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  let todoStoreService: TodoStoreService;
  let httpClientSpy: any;

  beforeEach(() => {
    todoStoreService = new TodoStoreService();
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get', 'delete']);
    TestBed.configureTestingModule({
      providers: [
        TodoApiService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create todo item via mockHttp post', () => {
    // given
    const todoItem = new ToDoItem(1, '11', '111', false);
    httpClientSpy.post.and.returnValue(of({}));
    // when
    service.create(todoItem);
    // then
    expect(httpClientSpy.post).toHaveBeenCalledWith(
      'https://localhost:5001/todos',
      todoItem
    );
  });

  it('should response error when create ', () => {
    // given
    const todoItem = new ToDoItem(1, '11', '111', false);
    httpClientSpy.post.and.returnValue(
      throwError(() => ({ errorMessage: 'create failed' }))
    );
    // when
    service.create(todoItem);
    // then
    expect(service.errorMessage).toEqual('create failed');
  });

  it('should get todo item detail via mockHttp get', () => {
    // given
    const todoItem = new ToDoItem(1, '11', '111', false);
    httpClientSpy.get.and.returnValue(of({}));
    // when
    service.findById(todoItem.id);
    // then
    expect(httpClientSpy.get).toHaveBeenCalledWith(
      `https://localhost:5001/todos/${todoItem.id}`,
    );
  });

  it('should get todo item detail via mockHttp get', () => {
    // given
    const todoItem = new ToDoItem(1, '11', '111', false);
    httpClientSpy.delete.and.returnValue(of({}));
    // when
    service.delete(todoItem.id);
    // then
    expect(httpClientSpy.delete).toHaveBeenCalledWith(
      `https://localhost:5001/todos/${todoItem.id}`,
    );
  });

  it('should response error when create ', () => {
    // given
    const todoItem = new ToDoItem(1, '11', '111', false);
    httpClientSpy.delete.and.returnValue(
      throwError(() => ({ errorMessage: 'delete failed' }))
    );
    // when
    service.delete(todoItem.id);
    // then
    expect(service.errorMessage).toEqual('delete failed');
  });

});
