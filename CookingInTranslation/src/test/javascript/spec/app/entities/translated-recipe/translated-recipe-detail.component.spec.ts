/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CookingInTranslationTestModule } from '../../../test.module';
import { TranslatedRecipeDetailComponent } from 'app/entities/translated-recipe/translated-recipe-detail.component';
import { TranslatedRecipe } from 'app/shared/model/translated-recipe.model';

describe('Component Tests', () => {
    describe('TranslatedRecipe Management Detail Component', () => {
        let comp: TranslatedRecipeDetailComponent;
        let fixture: ComponentFixture<TranslatedRecipeDetailComponent>;
        const route = ({ data: of({ translatedRecipe: new TranslatedRecipe(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CookingInTranslationTestModule],
                declarations: [TranslatedRecipeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TranslatedRecipeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TranslatedRecipeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.translatedRecipe).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
