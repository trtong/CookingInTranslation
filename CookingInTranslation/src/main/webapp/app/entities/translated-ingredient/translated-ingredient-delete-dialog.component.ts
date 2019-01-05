import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITranslatedIngredient } from 'app/shared/model/translated-ingredient.model';
import { TranslatedIngredientService } from './translated-ingredient.service';

@Component({
    selector: 'jhi-translated-ingredient-delete-dialog',
    templateUrl: './translated-ingredient-delete-dialog.component.html'
})
export class TranslatedIngredientDeleteDialogComponent {
    translatedIngredient: ITranslatedIngredient;

    constructor(
        protected translatedIngredientService: TranslatedIngredientService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.translatedIngredientService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'translatedIngredientListModification',
                content: 'Deleted an translatedIngredient'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-translated-ingredient-delete-popup',
    template: ''
})
export class TranslatedIngredientDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ translatedIngredient }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TranslatedIngredientDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.translatedIngredient = translatedIngredient;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
