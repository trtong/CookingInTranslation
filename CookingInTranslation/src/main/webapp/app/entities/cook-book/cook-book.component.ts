import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICookBook } from 'app/shared/model/cook-book.model';
import { AccountService } from 'app/core';
import { CookBookService } from './cook-book.service';

@Component({
    selector: 'jhi-cook-book',
    templateUrl: './cook-book.component.html'
})
export class CookBookComponent implements OnInit, OnDestroy {
    cookBooks: ICookBook[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected cookBookService: CookBookService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.cookBookService.query().subscribe(
            (res: HttpResponse<ICookBook[]>) => {
                this.cookBooks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCookBooks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICookBook) {
        return item.id;
    }

    registerChangeInCookBooks() {
        this.eventSubscriber = this.eventManager.subscribe('cookBookListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
