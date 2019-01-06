import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITranslatedRecipe } from 'app/shared/model/translated-recipe.model';
import { TranslatedRecipeService } from './translated-recipe.service';
import { IRecipe } from 'app/shared/model/recipe.model';
import { RecipeService } from 'app/entities/recipe';
import { ICookBook } from 'app/shared/model/cook-book.model';
import { CookBookService } from 'app/entities/cook-book';

@Component({
    selector: 'jhi-translated-recipe-update',
    templateUrl: './translated-recipe-update.component.html'
})
export class TranslatedRecipeUpdateComponent implements OnInit {
    translatedRecipe: ITranslatedRecipe;
    isSaving: boolean;

    recipes: IRecipe[];

    cookbooks: ICookBook[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected translatedRecipeService: TranslatedRecipeService,
        protected recipeService: RecipeService,
        protected cookBookService: CookBookService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ translatedRecipe }) => {
            this.translatedRecipe = translatedRecipe;
        });
        this.recipeService.query().subscribe(
            (res: HttpResponse<IRecipe[]>) => {
                this.recipes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.cookBookService.query().subscribe(
            (res: HttpResponse<ICookBook[]>) => {
                this.cookbooks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.translatedRecipe.id !== undefined) {
            this.subscribeToSaveResponse(this.translatedRecipeService.update(this.translatedRecipe));
        } else {
            this.subscribeToSaveResponse(this.translatedRecipeService.create(this.translatedRecipe));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITranslatedRecipe>>) {
        result.subscribe((res: HttpResponse<ITranslatedRecipe>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackRecipeById(index: number, item: IRecipe) {
        return item.id;
    }

    trackCookBookById(index: number, item: ICookBook) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
