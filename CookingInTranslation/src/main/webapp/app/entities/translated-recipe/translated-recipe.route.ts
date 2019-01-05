import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TranslatedRecipe } from 'app/shared/model/translated-recipe.model';
import { TranslatedRecipeService } from './translated-recipe.service';
import { TranslatedRecipeComponent } from './translated-recipe.component';
import { TranslatedRecipeDetailComponent } from './translated-recipe-detail.component';
import { TranslatedRecipeUpdateComponent } from './translated-recipe-update.component';
import { TranslatedRecipeDeletePopupComponent } from './translated-recipe-delete-dialog.component';
import { ITranslatedRecipe } from 'app/shared/model/translated-recipe.model';

@Injectable({ providedIn: 'root' })
export class TranslatedRecipeResolve implements Resolve<ITranslatedRecipe> {
    constructor(private service: TranslatedRecipeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TranslatedRecipe> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TranslatedRecipe>) => response.ok),
                map((translatedRecipe: HttpResponse<TranslatedRecipe>) => translatedRecipe.body)
            );
        }
        return of(new TranslatedRecipe());
    }
}

export const translatedRecipeRoute: Routes = [
    {
        path: 'translated-recipe',
        component: TranslatedRecipeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TranslatedRecipes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'translated-recipe/:id/view',
        component: TranslatedRecipeDetailComponent,
        resolve: {
            translatedRecipe: TranslatedRecipeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TranslatedRecipes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'translated-recipe/new',
        component: TranslatedRecipeUpdateComponent,
        resolve: {
            translatedRecipe: TranslatedRecipeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TranslatedRecipes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'translated-recipe/:id/edit',
        component: TranslatedRecipeUpdateComponent,
        resolve: {
            translatedRecipe: TranslatedRecipeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TranslatedRecipes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const translatedRecipePopupRoute: Routes = [
    {
        path: 'translated-recipe/:id/delete',
        component: TranslatedRecipeDeletePopupComponent,
        resolve: {
            translatedRecipe: TranslatedRecipeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TranslatedRecipes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
