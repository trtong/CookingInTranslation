/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CookingInTranslationTestModule } from '../../../test.module';
import { TranslatedRecipeUpdateComponent } from 'app/entities/translated-recipe/translated-recipe-update.component';
import { TranslatedRecipeService } from 'app/entities/translated-recipe/translated-recipe.service';
import { TranslatedRecipe } from 'app/shared/model/translated-recipe.model';

describe('Component Tests', () => {
    describe('TranslatedRecipe Management Update Component', () => {
        let comp: TranslatedRecipeUpdateComponent;
        let fixture: ComponentFixture<TranslatedRecipeUpdateComponent>;
        let service: TranslatedRecipeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CookingInTranslationTestModule],
                declarations: [TranslatedRecipeUpdateComponent]
            })
                .overrideTemplate(TranslatedRecipeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TranslatedRecipeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TranslatedRecipeService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new TranslatedRecipe(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.translatedRecipe = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new TranslatedRecipe();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.translatedRecipe = entity;
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
