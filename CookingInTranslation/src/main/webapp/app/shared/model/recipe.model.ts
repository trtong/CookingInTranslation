import { ITranslatedRecipe } from 'app/shared/model//translated-recipe.model';
import { IUserDetails } from 'app/shared/model//user-details.model';
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
    name?: string;
    instructions?: string;
    originalLanguage?: Language;
    translations?: ITranslatedRecipe[];
    userDetails?: IUserDetails[];
    ingredients?: IIngredient[];
    recipes?: ICookBook[];
}

export class Recipe implements IRecipe {
    constructor(
        public id?: number,
        public servingSize?: number,
        public name?: string,
        public instructions?: string,
        public originalLanguage?: Language,
        public translations?: ITranslatedRecipe[],
        public userDetails?: IUserDetails[],
        public ingredients?: IIngredient[],
        public recipes?: ICookBook[]
    ) {}
}
