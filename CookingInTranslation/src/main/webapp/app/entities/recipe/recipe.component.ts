import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRecipe } from 'app/shared/model/recipe.model';
import { Principal } from 'app/core';
import { RecipeService } from './recipe.service';

@Component({
    selector: 'jhi-recipe',
    templateUrl: './recipe.component.html'
})
export class RecipeComponent implements OnInit, OnDestroy {
    recipes: IRecipe[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private recipeService: RecipeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.recipeService.query().subscribe(
            (res: HttpResponse<IRecipe[]>) => {
                this.recipes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRecipes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRecipe) {
        return item.id;
    }

    registerChangeInRecipes() {
        this.eventSubscriber = this.eventManager.subscribe('recipeListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
