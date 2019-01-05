import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITranslatedRecipe } from 'app/shared/model/translated-recipe.model';
import { TranslatedRecipeService } from './translated-recipe.service';

@Component({
    selector: 'jhi-translated-recipe-delete-dialog',
    templateUrl: './translated-recipe-delete-dialog.component.html'
})
export class TranslatedRecipeDeleteDialogComponent {
    translatedRecipe: ITranslatedRecipe;

    constructor(
        protected translatedRecipeService: TranslatedRecipeService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.translatedRecipeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'translatedRecipeListModification',
                content: 'Deleted an translatedRecipe'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-translated-recipe-delete-popup',
    template: ''
})
export class TranslatedRecipeDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ translatedRecipe }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TranslatedRecipeDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.translatedRecipe = translatedRecipe;
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
