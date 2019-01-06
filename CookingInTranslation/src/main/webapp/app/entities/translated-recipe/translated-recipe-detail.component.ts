import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITranslatedRecipe } from 'app/shared/model/translated-recipe.model';

@Component({
    selector: 'jhi-translated-recipe-detail',
    templateUrl: './translated-recipe-detail.component.html'
})
export class TranslatedRecipeDetailComponent implements OnInit {
    translatedRecipe: ITranslatedRecipe;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ translatedRecipe }) => {
            this.translatedRecipe = translatedRecipe;
        });
    }

    previousState() {
        window.history.back();
    }
}
