import { ITranslatedRecipe } from 'app/shared/model//translated-recipe.model';
import { IIngredient } from 'app/shared/model//ingredient.model';

export const enum Language {
    ENGLISH = 'ENGLISH',
    SPANISH = 'SPANISH',
    FRENCH = 'FRENCH',
    CHINESE = 'CHINESE'
}

export interface ITranslatedIngredient {
    id?: number;
    name?: string;
    language?: Language;
    amount?: number;
    unit?: string;
    description?: string;
    translatedRecipe?: ITranslatedRecipe;
    ingredient?: IIngredient;
}

export class TranslatedIngredient implements ITranslatedIngredient {
    constructor(
        public id?: number,
        public name?: string,
        public language?: Language,
        public amount?: number,
        public unit?: string,
        public description?: string,
        public translatedRecipe?: ITranslatedRecipe,
        public ingredient?: IIngredient
    ) {}
}
