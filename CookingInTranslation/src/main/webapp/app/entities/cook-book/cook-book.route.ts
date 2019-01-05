import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CookBook } from 'app/shared/model/cook-book.model';
import { CookBookService } from './cook-book.service';
import { CookBookComponent } from './cook-book.component';
import { CookBookDetailComponent } from './cook-book-detail.component';
import { CookBookUpdateComponent } from './cook-book-update.component';
import { CookBookDeletePopupComponent } from './cook-book-delete-dialog.component';
import { ICookBook } from 'app/shared/model/cook-book.model';

@Injectable({ providedIn: 'root' })
export class CookBookResolve implements Resolve<ICookBook> {
    constructor(private service: CookBookService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CookBook> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<CookBook>) => response.ok),
                map((cookBook: HttpResponse<CookBook>) => cookBook.body)
            );
        }
        return of(new CookBook());
    }
}

export const cookBookRoute: Routes = [
    {
        path: 'cook-book',
        component: CookBookComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CookBooks'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cook-book/:id/view',
        component: CookBookDetailComponent,
        resolve: {
            cookBook: CookBookResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CookBooks'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cook-book/new',
        component: CookBookUpdateComponent,
        resolve: {
            cookBook: CookBookResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CookBooks'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cook-book/:id/edit',
        component: CookBookUpdateComponent,
        resolve: {
            cookBook: CookBookResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CookBooks'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cookBookPopupRoute: Routes = [
    {
        path: 'cook-book/:id/delete',
        component: CookBookDeletePopupComponent,
        resolve: {
            cookBook: CookBookResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CookBooks'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
