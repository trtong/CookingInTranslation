/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CookingInTranslationTestModule } from '../../../test.module';
import { CookBookUpdateComponent } from 'app/entities/cook-book/cook-book-update.component';
import { CookBookService } from 'app/entities/cook-book/cook-book.service';
import { CookBook } from 'app/shared/model/cook-book.model';

describe('Component Tests', () => {
    describe('CookBook Management Update Component', () => {
        let comp: CookBookUpdateComponent;
        let fixture: ComponentFixture<CookBookUpdateComponent>;
        let service: CookBookService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CookingInTranslationTestModule],
                declarations: [CookBookUpdateComponent]
            })
                .overrideTemplate(CookBookUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CookBookUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CookBookService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new CookBook(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.cookBook = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new CookBook();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.cookBook = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
