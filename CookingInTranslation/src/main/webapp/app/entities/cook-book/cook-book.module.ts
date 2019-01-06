import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CookingInTranslationSharedModule } from 'app/shared';
import {
    CookBookComponent,
    CookBookDetailComponent,
    CookBookUpdateComponent,
    CookBookDeletePopupComponent,
    CookBookDeleteDialogComponent,
    cookBookRoute,
    cookBookPopupRoute
} from './';

const ENTITY_STATES = [...cookBookRoute, ...cookBookPopupRoute];

@NgModule({
    imports: [CookingInTranslationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CookBookComponent,
        CookBookDetailComponent,
        CookBookUpdateComponent,
        CookBookDeleteDialogComponent,
        CookBookDeletePopupComponent
    ],
    entryComponents: [CookBookComponent, CookBookUpdateComponent, CookBookDeleteDialogComponent, CookBookDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CookingInTranslationCookBookModule {}
