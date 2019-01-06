import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IRecipe } from 'app/shared/model/recipe.model';
import { RecipeService } from './recipe.service';
import { IUserDetails } from 'app/shared/model/user-details.model';
import { UserDetailsService } from 'app/entities/user-details';
import { IIngredient } from 'app/shared/model/ingredient.model';
import { IngredientService } from 'app/entities/ingredient';
import { ICookBook } from 'app/shared/model/cook-book.model';
import { CookBookService } from 'app/entities/cook-book';

@Component({
    selector: 'jhi-recipe-update',
    templateUrl: './recipe-update.component.html'
})
export class RecipeUpdateComponent implements OnInit {
    recipe: IRecipe;
    isSaving: boolean;

    userdetails: IUserDetails[];

    ingredients: IIngredient[];

    cookbooks: ICookBook[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected recipeService: RecipeService,
        protected userDetailsService: UserDetailsService,
        protected ingredientService: IngredientService,
        protected cookBookService: CookBookService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ recipe }) => {
            this.recipe = recipe;
        });
        this.userDetailsService.query().subscribe(
            (res: HttpResponse<IUserDetails[]>) => {
                this.userdetails = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.ingredientService.query().subscribe(
            (res: HttpResponse<IIngredient[]>) => {
                this.ingredients = res.body;
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
        if (this.recipe.id !== undefined) {
            this.subscribeToSaveResponse(this.recipeService.update(this.recipe));
        } else {
            this.subscribeToSaveResponse(this.recipeService.create(this.recipe));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IRecipe>>) {
        result.subscribe((res: HttpResponse<IRecipe>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserDetailsById(index: number, item: IUserDetails) {
        return item.id;
    }

    trackIngredientById(index: number, item: IIngredient) {
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
