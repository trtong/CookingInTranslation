import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TranslatedIngredient } from 'app/shared/model/translated-ingredient.model';
import { TranslatedIngredientService } from './translated-ingredient.service';
import { TranslatedIngredientComponent } from './translated-ingredient.component';
import { TranslatedIngredientDetailComponent } from './translated-ingredient-detail.component';
import { TranslatedIngredientUpdateComponent } from './translated-ingredient-update.component';
import { TranslatedIngredientDeletePopupComponent } from './translated-ingredient-delete-dialog.component';
import { ITranslatedIngredient } from 'app/shared/model/translated-ingredient.model';

@Injectable({ providedIn: 'root' })
export class TranslatedIngredientResolve implements Resolve<ITranslatedIngredient> {
    constructor(private service: TranslatedIngredientService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TranslatedIngredient> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TranslatedIngredient>) => response.ok),
                map((translatedIngredient: HttpResponse<TranslatedIngredient>) => translatedIngredient.body)
            );
        }
        return of(new TranslatedIngredient());
    }
}

export const translatedIngredientRoute: Routes = [
    {
        path: 'translated-ingredient',
        component: TranslatedIngredientComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TranslatedIngredients'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'translated-ingredient/:id/view',
        component: TranslatedIngredientDetailComponent,
        resolve: {
            translatedIngredient: TranslatedIngredientResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TranslatedIngredients'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'translated-ingredient/new',
        component: TranslatedIngredientUpdateComponent,
        resolve: {
            translatedIngredient: TranslatedIngredientResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TranslatedIngredients'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'translated-ingredient/:id/edit',
        component: TranslatedIngredientUpdateComponent,
        resolve: {
            translatedIngredient: TranslatedIngredientResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TranslatedIngredients'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const translatedIngredientPopupRoute: Routes = [
    {
        path: 'translated-ingredient/:id/delete',
        component: TranslatedIngredientDeletePopupComponent,
        resolve: {
            translatedIngredient: TranslatedIngredientResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TranslatedIngredients'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
