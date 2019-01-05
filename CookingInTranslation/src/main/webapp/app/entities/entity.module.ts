import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CookingInTranslationUserDetailsModule } from './user-details/user-details.module';
import { CookingInTranslationCookBookModule } from './cook-book/cook-book.module';
import { CookingInTranslationRecipeModule } from './recipe/recipe.module';
import { CookingInTranslationTranslatedRecipeModule } from './translated-recipe/translated-recipe.module';
import { CookingInTranslationIngredientModule } from './ingredient/ingredient.module';
import { CookingInTranslationTranslatedIngredientModule } from './translated-ingredient/translated-ingredient.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        CookingInTranslationUserDetailsModule,
        CookingInTranslationCookBookModule,
        CookingInTranslationRecipeModule,
        CookingInTranslationTranslatedRecipeModule,
        CookingInTranslationIngredientModule,
        CookingInTranslationTranslatedIngredientModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CookingInTranslationEntityModule {}
