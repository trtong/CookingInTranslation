import { ITranslatedRecipe } from 'app/shared/model//translated-recipe.model';
import { IUserDetails } from 'app/shared/model//user-details.model';
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
    userDetails?: IUserDetails[];
    recipes?: ICookBook[];
}

export class Recipe implements IRecipe {
    constructor(
        public id?: number,
        public servingSize?: number,
        public instructions?: string,
        public originalLanguage?: Language,
        public translations?: ITranslatedRecipe[],
        public userDetails?: IUserDetails[],
        public recipes?: ICookBook[]
    ) {}
}
