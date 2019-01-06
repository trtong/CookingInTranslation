/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CookingInTranslationTestModule } from '../../../test.module';
import { TranslatedIngredientComponent } from 'app/entities/translated-ingredient/translated-ingredient.component';
import { TranslatedIngredientService } from 'app/entities/translated-ingredient/translated-ingredient.service';
import { TranslatedIngredient } from 'app/shared/model/translated-ingredient.model';

describe('Component Tests', () => {
    describe('TranslatedIngredient Management Component', () => {
        let comp: TranslatedIngredientComponent;
        let fixture: ComponentFixture<TranslatedIngredientComponent>;
        let service: TranslatedIngredientService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CookingInTranslationTestModule],
                declarations: [TranslatedIngredientComponent],
                providers: []
            })
                .overrideTemplate(TranslatedIngredientComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TranslatedIngredientComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TranslatedIngredientService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TranslatedIngredient(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.translatedIngredients[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
