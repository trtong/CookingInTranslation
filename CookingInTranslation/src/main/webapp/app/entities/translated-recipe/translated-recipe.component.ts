import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITranslatedRecipe } from 'app/shared/model/translated-recipe.model';
import { AccountService } from 'app/core';
import { TranslatedRecipeService } from './translated-recipe.service';

@Component({
    selector: 'jhi-translated-recipe',
    templateUrl: './translated-recipe.component.html'
})
export class TranslatedRecipeComponent implements OnInit, OnDestroy {
    translatedRecipes: ITranslatedRecipe[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected translatedRecipeService: TranslatedRecipeService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.translatedRecipeService.query().subscribe(
            (res: HttpResponse<ITranslatedRecipe[]>) => {
                this.translatedRecipes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTranslatedRecipes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITranslatedRecipe) {
        return item.id;
    }

    registerChangeInTranslatedRecipes() {
        this.eventSubscriber = this.eventManager.subscribe('translatedRecipeListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
