import { ITranslatedIngredient } from 'app/shared/model//translated-ingredient.model';
import { IRecipe } from 'app/shared/model//recipe.model';

export const enum Language {
    ENGLISH = 'ENGLISH',
    SPANISH = 'SPANISH',
    FRENCH = 'FRENCH',
    CHINESE = 'CHINESE'
}

export interface IIngredient {
    id?: number;
    name?: string;
    language?: Language;
    amount?: number;
    unit?: string;
    description?: string;
    translatedIngredients?: ITranslatedIngredient[];
    recipe?: IRecipe;
}

export class Ingredient implements IIngredient {
    constructor(
        public id?: number,
        public name?: string,
        public language?: Language,
        public amount?: number,
        public unit?: string,
        public description?: string,
        public translatedIngredients?: ITranslatedIngredient[],
        public recipe?: IRecipe
    ) {}
}
