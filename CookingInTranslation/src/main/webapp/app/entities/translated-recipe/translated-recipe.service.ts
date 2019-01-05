import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITranslatedRecipe } from 'app/shared/model/translated-recipe.model';

type EntityResponseType = HttpResponse<ITranslatedRecipe>;
type EntityArrayResponseType = HttpResponse<ITranslatedRecipe[]>;

@Injectable({ providedIn: 'root' })
export class TranslatedRecipeService {
    public resourceUrl = SERVER_API_URL + 'api/translated-recipes';

    constructor(protected http: HttpClient) {}

    create(translatedRecipe: ITranslatedRecipe): Observable<EntityResponseType> {
        return this.http.post<ITranslatedRecipe>(this.resourceUrl, translatedRecipe, { observe: 'response' });
    }

    update(translatedRecipe: ITranslatedRecipe): Observable<EntityResponseType> {
        return this.http.put<ITranslatedRecipe>(this.resourceUrl, translatedRecipe, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITranslatedRecipe>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITranslatedRecipe[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
