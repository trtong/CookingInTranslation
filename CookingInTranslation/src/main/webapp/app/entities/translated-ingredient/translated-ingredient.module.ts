import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CookingInTranslationSharedModule } from 'app/shared';
import {
    TranslatedIngredientComponent,
    TranslatedIngredientDetailComponent,
    TranslatedIngredientUpdateComponent,
    TranslatedIngredientDeletePopupComponent,
    TranslatedIngredientDeleteDialogComponent,
    translatedIngredientRoute,
    translatedIngredientPopupRoute
} from './';

const ENTITY_STATES = [...translatedIngredientRoute, ...translatedIngredientPopupRoute];

@NgModule({
    imports: [CookingInTranslationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TranslatedIngredientComponent,
        TranslatedIngredientDetailComponent,
        TranslatedIngredientUpdateComponent,
        TranslatedIngredientDeleteDialogComponent,
        TranslatedIngredientDeletePopupComponent
    ],
    entryComponents: [
        TranslatedIngredientComponent,
        TranslatedIngredientUpdateComponent,
        TranslatedIngredientDeleteDialogComponent,
        TranslatedIngredientDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CookingInTranslationTranslatedIngredientModule {}
