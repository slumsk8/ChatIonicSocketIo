import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatIonicPage } from './chat-ionic.page';

describe('ChatIonicPage', () => {
  let component: ChatIonicPage;
  let fixture: ComponentFixture<ChatIonicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatIonicPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatIonicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
