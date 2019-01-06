import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICookBook } from 'app/shared/model/cook-book.model';

@Component({
    selector: 'jhi-cook-book-detail',
    templateUrl: './cook-book-detail.component.html'
})
export class CookBookDetailComponent implements OnInit {
    cookBook: ICookBook;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cookBook }) => {
            this.cookBook = cookBook;
        });
    }

    previousState() {
        window.history.back();
    }
}
