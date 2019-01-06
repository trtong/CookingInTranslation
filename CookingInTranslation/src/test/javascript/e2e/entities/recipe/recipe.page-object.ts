import { element, by, ElementFinder } from 'protractor';

export class RecipeComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-recipe div table .btn-danger'));
    title = element.all(by.css('jhi-recipe div h2#page-heading span')).first();

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

export class RecipeUpdatePage {
    pageTitle = element(by.id('jhi-recipe-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    servingSizeInput = element(by.id('field_servingSize'));
    instructionsInput = element(by.id('field_instructions'));
    originalLanguageSelect = element(by.id('field_originalLanguage'));
    userDetailsSelect = element(by.id('field_userDetails'));
    ingredientSelect = element(by.id('field_ingredient'));

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

    async setOriginalLanguageSelect(originalLanguage) {
        await this.originalLanguageSelect.sendKeys(originalLanguage);
    }

    async getOriginalLanguageSelect() {
        return this.originalLanguageSelect.element(by.css('option:checked')).getText();
    }

    async originalLanguageSelectLastOption() {
        await this.originalLanguageSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async userDetailsSelectLastOption() {
        await this.userDetailsSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async userDetailsSelectOption(option) {
        await this.userDetailsSelect.sendKeys(option);
    }

    getUserDetailsSelect(): ElementFinder {
        return this.userDetailsSelect;
    }

    async getUserDetailsSelectedOption() {
        return this.userDetailsSelect.element(by.css('option:checked')).getText();
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

export class RecipeDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-recipe-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-recipe'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
