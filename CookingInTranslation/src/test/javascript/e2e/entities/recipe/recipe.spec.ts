/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RecipeComponentsPage, RecipeDeleteDialog, RecipeUpdatePage } from './recipe.page-object';

const expect = chai.expect;

describe('Recipe e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let recipeUpdatePage: RecipeUpdatePage;
    let recipeComponentsPage: RecipeComponentsPage;
    let recipeDeleteDialog: RecipeDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Recipes', async () => {
        await navBarPage.goToEntity('recipe');
        recipeComponentsPage = new RecipeComponentsPage();
        expect(await recipeComponentsPage.getTitle()).to.eq('Recipes');
    });

    it('should load create Recipe page', async () => {
        await recipeComponentsPage.clickOnCreateButton();
        recipeUpdatePage = new RecipeUpdatePage();
        expect(await recipeUpdatePage.getPageTitle()).to.eq('Create or edit a Recipe');
        await recipeUpdatePage.cancel();
    });

    it('should create and save Recipes', async () => {
        const nbButtonsBeforeCreate = await recipeComponentsPage.countDeleteButtons();

        await recipeComponentsPage.clickOnCreateButton();
        await promise.all([
            recipeUpdatePage.setServingSizeInput('5'),
            recipeUpdatePage.setNameInput('name'),
            recipeUpdatePage.setInstructionsInput('instructions'),
            recipeUpdatePage.originalLanguageSelectLastOption()
            // recipeUpdatePage.userDetailsSelectLastOption(),
            // recipeUpdatePage.ingredientSelectLastOption(),
        ]);
        expect(await recipeUpdatePage.getServingSizeInput()).to.eq('5');
        expect(await recipeUpdatePage.getNameInput()).to.eq('name');
        expect(await recipeUpdatePage.getInstructionsInput()).to.eq('instructions');
        await recipeUpdatePage.save();
        expect(await recipeUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await recipeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Recipe', async () => {
        const nbButtonsBeforeDelete = await recipeComponentsPage.countDeleteButtons();
        await recipeComponentsPage.clickOnLastDeleteButton();

        recipeDeleteDialog = new RecipeDeleteDialog();
        expect(await recipeDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Recipe?');
        await recipeDeleteDialog.clickOnConfirmButton();

        expect(await recipeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
