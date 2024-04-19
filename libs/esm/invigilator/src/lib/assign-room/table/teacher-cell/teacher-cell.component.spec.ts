import { ElementRef, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefaultValueAccessor, FormControl, NgControl } from '@angular/forms';
import { ESM_STORE_PROVIDER } from '@esm/test';
import { TESTING_COMMON_IMPORTS } from '@utconnect/test';
import { of } from 'rxjs';
import { InvigilatorAssignRoomStore } from '../../assign-room.store';
import {
  InvigilatorAssignRoomTableTeacherCellComponent,
  TAIGA_UI,
} from './teacher-cell.component';

describe('InvigilatorAssignRoomTableTeacherCellComponent', () => {
  let component: InvigilatorAssignRoomTableTeacherCellComponent;
  let fixture: ComponentFixture<InvigilatorAssignRoomTableTeacherCellComponent>;
  let mockNgControl: jasmine.SpyObj<NgControl>;
  const assignValueAccessor = (): void => {
    component.valueAccessor = new DefaultValueAccessor(
      {} as Renderer2,
      {} as ElementRef,
      true,
    );
  };

  beforeEach(async () => {
    mockNgControl = jasmine.createSpyObj<NgControl>('ngControl', ['control']);

    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS, TAIGA_UI],
      providers: [
        ESM_STORE_PROVIDER,
        InvigilatorAssignRoomStore,
        {
          provide: NgControl,
          useValue: mockNgControl,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(
      InvigilatorAssignRoomTableTeacherCellComponent,
    );

    component = fixture.componentInstance;
    component.ngControl = new FormControl() as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('writeValue', () => {
    it('should call valueAccessor.writeValue', () => {
      assignValueAccessor();

      const obj = {};
      const spy = spyOn<any>(component.valueAccessor, 'writeValue');

      component.writeValue(obj);
      expect(spy).toHaveBeenCalledWith(obj);
    });
  });

  describe('registerOnChange', () => {
    it('should call valueAccessor.registerOnChange', () => {
      assignValueAccessor();

      const fn = (): object => ({});
      const spy = spyOn<any>(component.valueAccessor, 'registerOnChange');

      component.registerOnChange(fn);
      expect(spy).toHaveBeenCalledWith(fn);
    });
  });

  describe('registerOnTouched', () => {
    it('should call valueAccessor.registerOnTouched', () => {
      assignValueAccessor();

      const fn = (): null => null;
      const spy = spyOn<any>(component.valueAccessor, 'registerOnTouched');

      component.registerOnTouched(fn);
      expect(spy).toHaveBeenCalledWith(fn);
    });
  });

  describe('setDisabledState', () => {
    it('should call valueAccessor.setDisabledState', () => {
      assignValueAccessor();

      const isDisabled = false;
      const spy = spyOn<any>(component.valueAccessor, 'setDisabledState');

      component.setDisabledState(isDisabled);
      expect(spy).toHaveBeenCalledWith(isDisabled);
    });
  });

  describe('onInvigilatorChanges', () => {
    it('should call delete old invigilator and assign new one', () => {
      component.usedInvigilatorsMap$.next({
        'shift-group-1': {
          'invigilator-id-11': 'shift-1',
          'invigilator-id-12': 'shift-2',
          'invigilator-id-21': 'shift-3',
          'invigilator-id-22': 'shift-4',
        },
        'shift-group-2': {
          'invigilator-id-31': 'shift-1',
          'invigilator-id-32': 'shift-2',
          'invigilator-id-41': 'shift-3',
          'invigilator-id-42': 'shift-4',
        },
      });

      const spy = spyOn(component.usedInvigilatorsMap$, 'next');
      const expectedParam = {
        'shift-group-1': {
          'invigilator-id-13': 'shift-1', // Changed from invigilator-id-11
          'invigilator-id-12': 'shift-2',
          'invigilator-id-21': 'shift-3',
          'invigilator-id-22': 'shift-4',
        },
        'shift-group-2': {
          'invigilator-id-31': 'shift-1',
          'invigilator-id-32': 'shift-2',
          'invigilator-id-41': 'shift-3',
          'invigilator-id-42': 'shift-4',
        },
      };

      component.onInvigilatorChanges(
        'shift-group-1',
        'shift-1',
        'invigilator-id-13',
      );

      expect(spy).toHaveBeenCalledWith(expectedParam);
    });
  });

  describe('onAddNewInvigilator', () => {
    it('[Form submitted] Should call store.updateTeacherAssignment', () => {
      const invigilatorName = 'mock-invigilator-name';
      const departmentId = 'mock-department-id';
      const shiftGroupId = 'mock-shift-group-id';
      const userId = 'mock-id';

      const storeSpy = spyOn(component['store'], 'updateTeacherAssignment');
      const dialogSpy = spyOn(
        component['dialogService'],
        'open',
      ).and.returnValue(of({ id: userId }));

      component.onAddNewInvigilator(
        invigilatorName,
        departmentId,
        shiftGroupId,
      );

      expect(dialogSpy).toHaveBeenCalled();
      expect(storeSpy).toHaveBeenCalledWith({
        shiftGroupId,
        departmentId,
        userId,
      });
    });

    it('[Form cancelled] Should not call store.updateTeacherAssignment', () => {
      const storeSpy = spyOn(component['store'], 'updateTeacherAssignment');
      spyOn(component['dialogService'], 'open').and.returnValue(of(null));

      component.onAddNewInvigilator('', '', '');

      expect(storeSpy).not.toHaveBeenCalled();
    });
  });

  describe('onAddOtherInvigilator', () => {
    it('[Form submitted] Should call store.save', () => {
      const shiftGroupId = 'mock-shift-group-id';
      const userId = 'mock-id';

      const storeSpy = spyOn(component['store'], 'save');
      const dialogSpy = spyOn(
        component['dialogService'],
        'open',
      ).and.returnValue(of({ id: userId }));

      component.onAddOtherInvigilator(shiftGroupId);

      expect(dialogSpy).toHaveBeenCalled();
      expect(storeSpy).toHaveBeenCalledWith({ 'mock-shift-group-id': userId });
    });

    it('[Form cancelled] Should not call store.save', () => {
      const storeSpy = spyOn(component['store'], 'save');
      spyOn(component['dialogService'], 'open').and.returnValue(of(null));

      component.onAddOtherInvigilator('');
      expect(storeSpy).not.toHaveBeenCalled();
    });
  });
});
