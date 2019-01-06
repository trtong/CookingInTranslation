/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    TranslatedIngredientComponentsPage,
    TranslatedIngredientDeleteDialog,
    TranslatedIngredientUpdatePage
} from './translated-ingredient.page-object';

const expect = chai.expect;

describe('TranslatedIngredient e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let translatedIngredientUpdatePage: TranslatedIngredientUpdatePage;
    let translatedIngredientComponentsPage: TranslatedIngredientComponentsPage;
    let translatedIngredientDeleteDialog: TranslatedIngredientDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load TranslatedIngredients', async () => {
        await navBarPage.goToEntity('translated-ingredient');
        translatedIngredientComponentsPage = new TranslatedIngredientComponentsPage();
        expect(await translatedIngredientComponentsPage.getTitle()).to.eq('Translated Ingredients');
    });

    it('should load create TranslatedIngredient page', async () => {
        await translatedIngredientComponentsPage.clickOnCreateButton();
        translatedIngredientUpdatePage = new TranslatedIngredientUpdatePage();
        expect(await translatedIngredientUpdatePage.getPageTitle()).to.eq('Create or edit a Translated Ingredient');
        await translatedIngredientUpdatePage.cancel();
    });

    it('should create and save TranslatedIngredients', async () => {
        const nbButtonsBeforeCreate = await translatedIngredientComponentsPage.countDeleteButtons();

        await translatedIngredientComponentsPage.clickOnCreateButton();
        await promise.all([
            translatedIngredientUpdatePage.setNameInput('name'),
            translatedIngredientUpdatePage.languageSelectLastOption(),
            translatedIngredientUpdatePage.setAmountInput('5'),
            translatedIngredientUpdatePage.setUnitInput('unit'),
            translatedIngredientUpdatePage.setDescriptionInput('description'),
            translatedIngredientUpdatePage.translatedRecipeSelectLastOption(),
            translatedIngredientUpdatePage.ingredientSelectLastOption()
        ]);
        expect(await translatedIngredientUpdatePage.getNameInput()).to.eq('name');
        expect(await translatedIngredientUpdatePage.getAmountInput()).to.eq('5');
        expect(await translatedIngredientUpdatePage.getUnitInput()).to.eq('unit');
        expect(await translatedIngredientUpdatePage.getDescriptionInput()).to.eq('description');
        await translatedIngredientUpdatePage.save();
        expect(await translatedIngredientUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await translatedIngredientComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last TranslatedIngredient', async () => {
        const nbButtonsBeforeDelete = await translatedIngredientComponentsPage.countDeleteButtons();
        await translatedIngredientComponentsPage.clickOnLastDeleteButton();

        translatedIngredientDeleteDialog = new TranslatedIngredientDeleteDialog();
        expect(await translatedIngredientDeleteDialog.getDialogTitle()).to.eq(
            'Are you sure you want to delete this Translated Ingredient?'
        );
        await translatedIngredientDeleteDialog.clickOnConfirmButton();

        expect(await translatedIngredientComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
