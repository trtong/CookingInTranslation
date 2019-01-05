/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TranslatedRecipeComponentsPage, TranslatedRecipeDeleteDialog, TranslatedRecipeUpdatePage } from './translated-recipe.page-object';

const expect = chai.expect;

describe('TranslatedRecipe e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let translatedRecipeUpdatePage: TranslatedRecipeUpdatePage;
    let translatedRecipeComponentsPage: TranslatedRecipeComponentsPage;
    let translatedRecipeDeleteDialog: TranslatedRecipeDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load TranslatedRecipes', async () => {
        await navBarPage.goToEntity('translated-recipe');
        translatedRecipeComponentsPage = new TranslatedRecipeComponentsPage();
        expect(await translatedRecipeComponentsPage.getTitle()).to.eq('Translated Recipes');
    });

    it('should load create TranslatedRecipe page', async () => {
        await translatedRecipeComponentsPage.clickOnCreateButton();
        translatedRecipeUpdatePage = new TranslatedRecipeUpdatePage();
        expect(await translatedRecipeUpdatePage.getPageTitle()).to.eq('Create or edit a Translated Recipe');
        await translatedRecipeUpdatePage.cancel();
    });

    it('should create and save TranslatedRecipes', async () => {
        const nbButtonsBeforeCreate = await translatedRecipeComponentsPage.countDeleteButtons();

        await translatedRecipeComponentsPage.clickOnCreateButton();
        await promise.all([
            translatedRecipeUpdatePage.setServingSizeInput('5'),
            translatedRecipeUpdatePage.setInstructionsInput('instructions'),
            translatedRecipeUpdatePage.languageSelectLastOption(),
            translatedRecipeUpdatePage.recipeSelectLastOption(),
            translatedRecipeUpdatePage.translatedRecipesSelectLastOption()
        ]);
        expect(await translatedRecipeUpdatePage.getServingSizeInput()).to.eq('5');
        expect(await translatedRecipeUpdatePage.getInstructionsInput()).to.eq('instructions');
        await translatedRecipeUpdatePage.save();
        expect(await translatedRecipeUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await translatedRecipeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last TranslatedRecipe', async () => {
        const nbButtonsBeforeDelete = await translatedRecipeComponentsPage.countDeleteButtons();
        await translatedRecipeComponentsPage.clickOnLastDeleteButton();

        translatedRecipeDeleteDialog = new TranslatedRecipeDeleteDialog();
        expect(await translatedRecipeDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Translated Recipe?');
        await translatedRecipeDeleteDialog.clickOnConfirmButton();

        expect(await translatedRecipeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
