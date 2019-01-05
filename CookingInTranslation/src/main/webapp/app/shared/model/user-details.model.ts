import { IUser } from 'app/core/user/user.model';
import { ICookBook } from 'app/shared/model//cook-book.model';
import { IRecipe } from 'app/shared/model//recipe.model';

export const enum Language {
    ENGLISH = 'ENGLISH',
    SPANISH = 'SPANISH',
    FRENCH = 'FRENCH',
    CHINESE = 'CHINESE'
}

export interface IUserDetails {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    languagePreference?: Language;
    user?: IUser;
    cookbooks?: ICookBook[];
    recipes?: IRecipe[];
}

export class UserDetails implements IUserDetails {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public languagePreference?: Language,
        public user?: IUser,
        public cookbooks?: ICookBook[],
        public recipes?: IRecipe[]
    ) {}
}
