/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CookingInTranslationTestModule } from '../../../test.module';
import { CookBookDeleteDialogComponent } from 'app/entities/cook-book/cook-book-delete-dialog.component';
import { CookBookService } from 'app/entities/cook-book/cook-book.service';

describe('Component Tests', () => {
    describe('CookBook Management Delete Component', () => {
        let comp: CookBookDeleteDialogComponent;
        let fixture: ComponentFixture<CookBookDeleteDialogComponent>;
        let service: CookBookService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CookingInTranslationTestModule],
                declarations: [CookBookDeleteDialogComponent]
            })
                .overrideTemplate(CookBookDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CookBookDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CookBookService);
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
