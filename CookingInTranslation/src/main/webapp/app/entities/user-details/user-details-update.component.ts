import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IUserDetails } from 'app/shared/model/user-details.model';
import { UserDetailsService } from './user-details.service';
import { IUser, UserService } from 'app/core';
import { IRecipe } from 'app/shared/model/recipe.model';
import { RecipeService } from 'app/entities/recipe';

@Component({
    selector: 'jhi-user-details-update',
    templateUrl: './user-details-update.component.html'
})
export class UserDetailsUpdateComponent implements OnInit {
    userDetails: IUserDetails;
    isSaving: boolean;

    users: IUser[];

    recipes: IRecipe[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected userDetailsService: UserDetailsService,
        protected userService: UserService,
        protected recipeService: RecipeService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ userDetails }) => {
            this.userDetails = userDetails;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.recipeService.query().subscribe(
            (res: HttpResponse<IRecipe[]>) => {
                this.recipes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.userDetails.id !== undefined) {
            this.subscribeToSaveResponse(this.userDetailsService.update(this.userDetails));
        } else {
            this.subscribeToSaveResponse(this.userDetailsService.create(this.userDetails));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserDetails>>) {
        result.subscribe((res: HttpResponse<IUserDetails>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserById(index: number, item: IUser) {
        return item.id;
    }

    trackRecipeById(index: number, item: IRecipe) {
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
