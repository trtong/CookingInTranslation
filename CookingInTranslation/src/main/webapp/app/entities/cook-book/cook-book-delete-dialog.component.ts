import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICookBook } from 'app/shared/model/cook-book.model';
import { CookBookService } from './cook-book.service';

@Component({
    selector: 'jhi-cook-book-delete-dialog',
    templateUrl: './cook-book-delete-dialog.component.html'
})
export class CookBookDeleteDialogComponent {
    cookBook: ICookBook;

    constructor(private cookBookService: CookBookService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cookBookService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'cookBookListModification',
                content: 'Deleted an cookBook'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cook-book-delete-popup',
    template: ''
})
export class CookBookDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cookBook }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CookBookDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.cookBook = cookBook;
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
