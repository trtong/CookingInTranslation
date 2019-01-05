import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICookBook } from 'app/shared/model/cook-book.model';

type EntityResponseType = HttpResponse<ICookBook>;
type EntityArrayResponseType = HttpResponse<ICookBook[]>;

@Injectable({ providedIn: 'root' })
export class CookBookService {
    public resourceUrl = SERVER_API_URL + 'api/cook-books';

    constructor(private http: HttpClient) {}

    create(cookBook: ICookBook): Observable<EntityResponseType> {
        return this.http.post<ICookBook>(this.resourceUrl, cookBook, { observe: 'response' });
    }

    update(cookBook: ICookBook): Observable<EntityResponseType> {
        return this.http.put<ICookBook>(this.resourceUrl, cookBook, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICookBook>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICookBook[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
