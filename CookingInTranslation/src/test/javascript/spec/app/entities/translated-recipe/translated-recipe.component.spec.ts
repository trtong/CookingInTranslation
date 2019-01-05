/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CookingInTranslationTestModule } from '../../../test.module';
import { TranslatedRecipeComponent } from 'app/entities/translated-recipe/translated-recipe.component';
import { TranslatedRecipeService } from 'app/entities/translated-recipe/translated-recipe.service';
import { TranslatedRecipe } from 'app/shared/model/translated-recipe.model';

describe('Component Tests', () => {
    describe('TranslatedRecipe Management Component', () => {
        let comp: TranslatedRecipeComponent;
        let fixture: ComponentFixture<TranslatedRecipeComponent>;
        let service: TranslatedRecipeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CookingInTranslationTestModule],
                declarations: [TranslatedRecipeComponent],
                providers: []
            })
                .overrideTemplate(TranslatedRecipeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TranslatedRecipeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TranslatedRecipeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TranslatedRecipe(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.translatedRecipes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
