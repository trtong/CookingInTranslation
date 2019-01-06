import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITranslatedIngredient } from 'app/shared/model/translated-ingredient.model';
import { TranslatedIngredientService } from './translated-ingredient.service';
import { ITranslatedRecipe } from 'app/shared/model/translated-recipe.model';
import { TranslatedRecipeService } from 'app/entities/translated-recipe';
import { IIngredient } from 'app/shared/model/ingredient.model';
import { IngredientService } from 'app/entities/ingredient';

@Component({
    selector: 'jhi-translated-ingredient-update',
    templateUrl: './translated-ingredient-update.component.html'
})
export class TranslatedIngredientUpdateComponent implements OnInit {
    translatedIngredient: ITranslatedIngredient;
    isSaving: boolean;

    translatedrecipes: ITranslatedRecipe[];

    ingredients: IIngredient[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected translatedIngredientService: TranslatedIngredientService,
        protected translatedRecipeService: TranslatedRecipeService,
        protected ingredientService: IngredientService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ translatedIngredient }) => {
            this.translatedIngredient = translatedIngredient;
        });
        this.translatedRecipeService.query().subscribe(
            (res: HttpResponse<ITranslatedRecipe[]>) => {
                this.translatedrecipes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.ingredientService.query().subscribe(
            (res: HttpResponse<IIngredient[]>) => {
                this.ingredients = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.translatedIngredient.id !== undefined) {
            this.subscribeToSaveResponse(this.translatedIngredientService.update(this.translatedIngredient));
        } else {
            this.subscribeToSaveResponse(this.translatedIngredientService.create(this.translatedIngredient));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITranslatedIngredient>>) {
        result.subscribe(
            (res: HttpResponse<ITranslatedIngredient>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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

    trackTranslatedRecipeById(index: number, item: ITranslatedRecipe) {
        return item.id;
    }

    trackIngredientById(index: number, item: IIngredient) {
        return item.id;
    }
}
