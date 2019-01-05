import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITranslatedIngredient } from 'app/shared/model/translated-ingredient.model';

type EntityResponseType = HttpResponse<ITranslatedIngredient>;
type EntityArrayResponseType = HttpResponse<ITranslatedIngredient[]>;

@Injectable({ providedIn: 'root' })
export class TranslatedIngredientService {
    public resourceUrl = SERVER_API_URL + 'api/translated-ingredients';

    constructor(protected http: HttpClient) {}

    create(translatedIngredient: ITranslatedIngredient): Observable<EntityResponseType> {
        return this.http.post<ITranslatedIngredient>(this.resourceUrl, translatedIngredient, { observe: 'response' });
    }

    update(translatedIngredient: ITranslatedIngredient): Observable<EntityResponseType> {
        return this.http.put<ITranslatedIngredient>(this.resourceUrl, translatedIngredient, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITranslatedIngredient>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITranslatedIngredient[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
