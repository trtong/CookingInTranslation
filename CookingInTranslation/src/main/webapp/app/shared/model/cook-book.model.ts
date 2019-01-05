import { IRecipe } from 'app/shared/model//recipe.model';
import { IUserDetails } from 'app/shared/model//user-details.model';

export interface ICookBook {
    id?: number;
    name?: string;
    description?: string;
    recipes?: IRecipe[];
    userDetails?: IUserDetails;
}

export class CookBook implements ICookBook {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public recipes?: IRecipe[],
        public userDetails?: IUserDetails
    ) {}
}
