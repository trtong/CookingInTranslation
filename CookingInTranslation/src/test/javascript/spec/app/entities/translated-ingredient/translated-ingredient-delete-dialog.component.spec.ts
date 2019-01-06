/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CookingInTranslationTestModule } from '../../../test.module';
import { TranslatedIngredientDeleteDialogComponent } from 'app/entities/translated-ingredient/translated-ingredient-delete-dialog.component';
import { TranslatedIngredientService } from 'app/entities/translated-ingredient/translated-ingredient.service';

describe('Component Tests', () => {
    describe('TranslatedIngredient Management Delete Component', () => {
        let comp: TranslatedIngredientDeleteDialogComponent;
        let fixture: ComponentFixture<TranslatedIngredientDeleteDialogComponent>;
        let service: TranslatedIngredientService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CookingInTranslationTestModule],
                declarations: [TranslatedIngredientDeleteDialogComponent]
            })
                .overrideTemplate(TranslatedIngredientDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TranslatedIngredientDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TranslatedIngredientService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
