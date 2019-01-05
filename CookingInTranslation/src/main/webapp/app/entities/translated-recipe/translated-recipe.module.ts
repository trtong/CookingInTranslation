import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CookingInTranslationSharedModule } from 'app/shared';
import {
    TranslatedRecipeComponent,
    TranslatedRecipeDetailComponent,
    TranslatedRecipeUpdateComponent,
    TranslatedRecipeDeletePopupComponent,
    TranslatedRecipeDeleteDialogComponent,
    translatedRecipeRoute,
    translatedRecipePopupRoute
} from './';

const ENTITY_STATES = [...translatedRecipeRoute, ...translatedRecipePopupRoute];

@NgModule({
    imports: [CookingInTranslationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TranslatedRecipeComponent,
        TranslatedRecipeDetailComponent,
        TranslatedRecipeUpdateComponent,
        TranslatedRecipeDeleteDialogComponent,
        TranslatedRecipeDeletePopupComponent
    ],
    entryComponents: [
        TranslatedRecipeComponent,
        TranslatedRecipeUpdateComponent,
        TranslatedRecipeDeleteDialogComponent,
        TranslatedRecipeDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CookingInTranslationTranslatedRecipeModule {}
