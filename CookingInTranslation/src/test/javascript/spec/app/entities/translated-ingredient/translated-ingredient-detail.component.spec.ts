/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CookingInTranslationTestModule } from '../../../test.module';
import { TranslatedIngredientDetailComponent } from 'app/entities/translated-ingredient/translated-ingredient-detail.component';
import { TranslatedIngredient } from 'app/shared/model/translated-ingredient.model';

describe('Component Tests', () => {
    describe('TranslatedIngredient Management Detail Component', () => {
        let comp: TranslatedIngredientDetailComponent;
        let fixture: ComponentFixture<TranslatedIngredientDetailComponent>;
        const route = ({ data: of({ translatedIngredient: new TranslatedIngredient(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CookingInTranslationTestModule],
                declarations: [TranslatedIngredientDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TranslatedIngredientDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TranslatedIngredientDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.translatedIngredient).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
