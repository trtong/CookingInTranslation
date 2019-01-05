import { IRecipe } from 'app/shared/model//recipe.model';
import { ITranslatedIngredient } from 'app/shared/model//translated-ingredient.model';

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
    recipe?: IRecipe;
    translatedIngredients?: ITranslatedIngredient[];
}

export class Ingredient implements IIngredient {
    constructor(
        public id?: number,
        public name?: string,
        public language?: Language,
        public amount?: number,
        public unit?: string,
        public description?: string,
        public recipe?: IRecipe,
        public translatedIngredients?: ITranslatedIngredient[]
    ) {}
}
