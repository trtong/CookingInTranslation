import { element, by, ElementFinder } from 'protractor';

export class TranslatedIngredientComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-translated-ingredient div table .btn-danger'));
    title = element.all(by.css('jhi-translated-ingredient div h2#page-heading span')).first();

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

export class TranslatedIngredientUpdatePage {
    pageTitle = element(by.id('jhi-translated-ingredient-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    languageSelect = element(by.id('field_language'));
    amountInput = element(by.id('field_amount'));
    unitInput = element(by.id('field_unit'));
    descriptionInput = element(by.id('field_description'));
    translatedRecipeSelect = element(by.id('field_translatedRecipe'));
    ingredientSelect = element(by.id('field_ingredient'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
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

    async setAmountInput(amount) {
        await this.amountInput.sendKeys(amount);
    }

    async getAmountInput() {
        return this.amountInput.getAttribute('value');
    }

    async setUnitInput(unit) {
        await this.unitInput.sendKeys(unit);
    }

    async getUnitInput() {
        return this.unitInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async translatedRecipeSelectLastOption() {
        await this.translatedRecipeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async translatedRecipeSelectOption(option) {
        await this.translatedRecipeSelect.sendKeys(option);
    }

    getTranslatedRecipeSelect(): ElementFinder {
        return this.translatedRecipeSelect;
    }

    async getTranslatedRecipeSelectedOption() {
        return this.translatedRecipeSelect.element(by.css('option:checked')).getText();
    }

    async ingredientSelectLastOption() {
        await this.ingredientSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async ingredientSelectOption(option) {
        await this.ingredientSelect.sendKeys(option);
    }

    getIngredientSelect(): ElementFinder {
        return this.ingredientSelect;
    }

    async getIngredientSelectedOption() {
        return this.ingredientSelect.element(by.css('option:checked')).getText();
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

export class TranslatedIngredientDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-translatedIngredient-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-translatedIngredient'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
