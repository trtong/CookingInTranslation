import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITranslatedIngredient } from 'app/shared/model/translated-ingredient.model';
import { AccountService } from 'app/core';
import { TranslatedIngredientService } from './translated-ingredient.service';

@Component({
    selector: 'jhi-translated-ingredient',
    templateUrl: './translated-ingredient.component.html'
})
export class TranslatedIngredientComponent implements OnInit, OnDestroy {
    translatedIngredients: ITranslatedIngredient[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected translatedIngredientService: TranslatedIngredientService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.translatedIngredientService.query().subscribe(
            (res: HttpResponse<ITranslatedIngredient[]>) => {
                this.translatedIngredients = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTranslatedIngredients();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITranslatedIngredient) {
        return item.id;
    }

    registerChangeInTranslatedIngredients() {
        this.eventSubscriber = this.eventManager.subscribe('translatedIngredientListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
