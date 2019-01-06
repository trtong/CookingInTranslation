/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CookingInTranslationTestModule } from '../../../test.module';
import { CookBookDetailComponent } from 'app/entities/cook-book/cook-book-detail.component';
import { CookBook } from 'app/shared/model/cook-book.model';

describe('Component Tests', () => {
    describe('CookBook Management Detail Component', () => {
        let comp: CookBookDetailComponent;
        let fixture: ComponentFixture<CookBookDetailComponent>;
        const route = ({ data: of({ cookBook: new CookBook(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CookingInTranslationTestModule],
                declarations: [CookBookDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CookBookDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CookBookDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.cookBook).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
