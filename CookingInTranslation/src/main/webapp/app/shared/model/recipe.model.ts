import { ITranslatedRecipe } from 'app/shared/model//translated-recipe.model';
import { IIngredient } from 'app/shared/model//ingredient.model';
import { ICookBook } from 'app/shared/model//cook-book.model';

export const enum Language {
    ENGLISH = 'ENGLISH',
    SPANISH = 'SPANISH',
    FRENCH = 'FRENCH',
    CHINESE = 'CHINESE'
}

export interface IRecipe {
    id?: number;
    servingSize?: number;
    instructions?: string;
    originalLanguage?: Language;
    translations?: ITranslatedRecipe[];
    ingredients?: IIngredient[];
    cookbooks?: ICookBook[];
}

export class Recipe implements IRecipe {
    constructor(
        public id?: number,
        public servingSize?: number,
        public instructions?: string,
        public originalLanguage?: Language,
        public translations?: ITranslatedRecipe[],
        public ingredients?: IIngredient[],
        public cookbooks?: ICookBook[]
    ) {}
}
