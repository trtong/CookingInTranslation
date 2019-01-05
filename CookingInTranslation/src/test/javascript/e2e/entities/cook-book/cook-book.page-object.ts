import { element, by, ElementFinder } from 'protractor';

export class CookBookComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-cook-book div table .btn-danger'));
    title = element.all(by.css('jhi-cook-book div h2#page-heading span')).first();

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

export class CookBookUpdatePage {
    pageTitle = element(by.id('jhi-cook-book-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    descriptionInput = element(by.id('field_description'));
    allRecipesSelect = element(by.id('field_allRecipes'));
    translatedRecipesSelect = element(by.id('field_translatedRecipes'));
    userDetailsSelect = element(by.id('field_userDetails'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async allRecipesSelectLastOption() {
        await this.allRecipesSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async allRecipesSelectOption(option) {
        await this.allRecipesSelect.sendKeys(option);
    }

    getAllRecipesSelect(): ElementFinder {
        return this.allRecipesSelect;
    }

    async getAllRecipesSelectedOption() {
        return this.allRecipesSelect.element(by.css('option:checked')).getText();
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

export class CookBookDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-cookBook-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-cookBook'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
