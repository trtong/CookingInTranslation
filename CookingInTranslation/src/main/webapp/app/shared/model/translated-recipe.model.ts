import { ITranslatedIngredient } from 'app/shared/model//translated-ingredient.model';
import { IRecipe } from 'app/shared/model//recipe.model';
import { ICookBook } from 'app/shared/model//cook-book.model';

export const enum Language {
    ENGLISH = 'ENGLISH',
    SPANISH = 'SPANISH',
    FRENCH = 'FRENCH',
    CHINESE = 'CHINESE'
}

export interface ITranslatedRecipe {
    id?: number;
    servingSize?: number;
    instructions?: string;
    language?: Language;
    ingredients?: ITranslatedIngredient[];
    recipe?: IRecipe;
    translatedRecipes?: ICookBook;
}

export class TranslatedRecipe implements ITranslatedRecipe {
    constructor(
        public id?: number,
        public servingSize?: number,
        public instructions?: string,
        public language?: Language,
        public ingredients?: ITranslatedIngredient[],
        public recipe?: IRecipe,
        public translatedRecipes?: ICookBook
    ) {}
}
