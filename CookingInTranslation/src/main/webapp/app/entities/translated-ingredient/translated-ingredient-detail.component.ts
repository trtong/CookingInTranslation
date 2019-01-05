import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITranslatedIngredient } from 'app/shared/model/translated-ingredient.model';

@Component({
    selector: 'jhi-translated-ingredient-detail',
    templateUrl: './translated-ingredient-detail.component.html'
})
export class TranslatedIngredientDetailComponent implements OnInit {
    translatedIngredient: ITranslatedIngredient;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ translatedIngredient }) => {
            this.translatedIngredient = translatedIngredient;
        });
    }

    previousState() {
        window.history.back();
    }
}
