/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CookingInTranslationTestModule } from '../../../test.module';
import { CookBookComponent } from 'app/entities/cook-book/cook-book.component';
import { CookBookService } from 'app/entities/cook-book/cook-book.service';
import { CookBook } from 'app/shared/model/cook-book.model';

describe('Component Tests', () => {
    describe('CookBook Management Component', () => {
        let comp: CookBookComponent;
        let fixture: ComponentFixture<CookBookComponent>;
        let service: CookBookService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CookingInTranslationTestModule],
                declarations: [CookBookComponent],
                providers: []
            })
                .overrideTemplate(CookBookComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CookBookComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CookBookService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CookBook(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.cookBooks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
