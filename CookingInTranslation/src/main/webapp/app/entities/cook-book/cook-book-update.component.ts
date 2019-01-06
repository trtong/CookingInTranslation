import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICookBook } from 'app/shared/model/cook-book.model';
import { CookBookService } from './cook-book.service';
import { IRecipe } from 'app/shared/model/recipe.model';
import { RecipeService } from 'app/entities/recipe';
import { ITranslatedRecipe } from 'app/shared/model/translated-recipe.model';
import { TranslatedRecipeService } from 'app/entities/translated-recipe';
import { IUserDetails } from 'app/shared/model/user-details.model';
import { UserDetailsService } from 'app/entities/user-details';

@Component({
    selector: 'jhi-cook-book-update',
    templateUrl: './cook-book-update.component.html'
})
export class CookBookUpdateComponent implements OnInit {
    cookBook: ICookBook;
    isSaving: boolean;

    recipes: IRecipe[];

    translatedrecipes: ITranslatedRecipe[];

    userdetails: IUserDetails[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected cookBookService: CookBookService,
        protected recipeService: RecipeService,
        protected translatedRecipeService: TranslatedRecipeService,
        protected userDetailsService: UserDetailsService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ cookBook }) => {
            this.cookBook = cookBook;
        });
        this.recipeService.query().subscribe(
            (res: HttpResponse<IRecipe[]>) => {
                this.recipes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.translatedRecipeService.query().subscribe(
            (res: HttpResponse<ITranslatedRecipe[]>) => {
                this.translatedrecipes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.userDetailsService.query().subscribe(
            (res: HttpResponse<IUserDetails[]>) => {
                this.userdetails = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.cookBook.id !== undefined) {
            this.subscribeToSaveResponse(this.cookBookService.update(this.cookBook));
        } else {
            this.subscribeToSaveResponse(this.cookBookService.create(this.cookBook));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICookBook>>) {
        result.subscribe((res: HttpResponse<ICookBook>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTranslatedRecipeById(index: number, item: ITranslatedRecipe) {
        return item.id;
    }

    trackUserDetailsById(index: number, item: IUserDetails) {
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
