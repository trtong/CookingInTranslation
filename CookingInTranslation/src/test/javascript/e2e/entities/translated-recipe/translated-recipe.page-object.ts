import { element, by, ElementFinder } from 'protractor';

export class TranslatedRecipeComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-translated-recipe div table .btn-danger'));
    title = element.all(by.css('jhi-translated-recipe div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class TranslatedRecipeUpdatePage {
    pageTitle = element(by.id('jhi-translated-recipe-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    servingSizeInput = element(by.id('field_servingSize'));
    instructionsInput = element(by.id('field_instructions'));
    languageSelect = element(by.id('field_language'));
    recipeSelect = element(by.id('field_recipe'));
    translatedRecipesSelect = element(by.id('field_translatedRecipes'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setServingSizeInput(servingSize) {
        await this.servingSizeInput.sendKeys(servingSize);
    }

    async getServingSizeInput() {
        return this.servingSizeInput.getAttribute('value');
    }

    async setInstructionsInput(instructions) {
        await this.instructionsInput.sendKeys(instructions);
    }

    async getInstructionsInput() {
        return this.instructionsInput.getAttribute('value');
    }

    async setLanguageSelect(language) {
        await this.languageSelect.sendKeys(language);
    }

    async getLanguageSelect() {
        return this.languageSelect.element(by.css('option:checked')).getText();
    }

    async languageSelectLastOption() {
        await this.languageSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async recipeSelectLastOption() {
        await this.recipeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async recipeSelectOption(option) {
        await this.recipeSelect.sendKeys(option);
    }

    getRecipeSelect(): ElementFinder {
        return this.recipeSelect;
    }

    async getRecipeSelectedOption() {
        return this.recipeSelect.element(by.css('option:checked')).getText();
    }

    async translatedRecipesSelectLastOption() {
        await this.translatedRecipesSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async translatedRecipesSelectOption(option) {
        await this.translatedRecipesSelect.sendKeys(option);
    }

    getTranslatedRecipesSelect(): ElementFinder {
        return this.translatedRecipesSelect;
    }

    async getTranslatedRecipesSelectedOption() {
        return this.translatedRecipesSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class TranslatedRecipeDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-translatedRecipe-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-translatedRecipe'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
