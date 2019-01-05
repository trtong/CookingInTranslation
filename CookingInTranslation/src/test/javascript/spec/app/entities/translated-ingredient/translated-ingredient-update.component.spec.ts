/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CookingInTranslationTestModule } from '../../../test.module';
import { TranslatedIngredientUpdateComponent } from 'app/entities/translated-ingredient/translated-ingredient-update.component';
import { TranslatedIngredientService } from 'app/entities/translated-ingredient/translated-ingredient.service';
import { TranslatedIngredient } from 'app/shared/model/translated-ingredient.model';

describe('Component Tests', () => {
    describe('TranslatedIngredient Management Update Component', () => {
        let comp: TranslatedIngredientUpdateComponent;
        let fixture: ComponentFixture<TranslatedIngredientUpdateComponent>;
        let service: TranslatedIngredientService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CookingInTranslationTestModule],
                declarations: [TranslatedIngredientUpdateComponent]
            })
                .overrideTemplate(TranslatedIngredientUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TranslatedIngredientUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TranslatedIngredientService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new TranslatedIngredient(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.translatedIngredient = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new TranslatedIngredient();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.translatedIngredient = entity;
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
