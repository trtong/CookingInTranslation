/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CookingInTranslationTestModule } from '../../../test.module';
import { TranslatedRecipeDeleteDialogComponent } from 'app/entities/translated-recipe/translated-recipe-delete-dialog.component';
import { TranslatedRecipeService } from 'app/entities/translated-recipe/translated-recipe.service';

describe('Component Tests', () => {
    describe('TranslatedRecipe Management Delete Component', () => {
        let comp: TranslatedRecipeDeleteDialogComponent;
        let fixture: ComponentFixture<TranslatedRecipeDeleteDialogComponent>;
        let service: TranslatedRecipeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CookingInTranslationTestModule],
                declarations: [TranslatedRecipeDeleteDialogComponent]
            })
                .overrideTemplate(TranslatedRecipeDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TranslatedRecipeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TranslatedRecipeService);
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
