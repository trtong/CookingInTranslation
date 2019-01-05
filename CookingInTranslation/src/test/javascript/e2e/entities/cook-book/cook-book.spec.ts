/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CookBookComponentsPage, CookBookDeleteDialog, CookBookUpdatePage } from './cook-book.page-object';

const expect = chai.expect;

describe('CookBook e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let cookBookUpdatePage: CookBookUpdatePage;
    let cookBookComponentsPage: CookBookComponentsPage;
    let cookBookDeleteDialog: CookBookDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load CookBooks', async () => {
        await navBarPage.goToEntity('cook-book');
        cookBookComponentsPage = new CookBookComponentsPage();
        expect(await cookBookComponentsPage.getTitle()).to.eq('Cook Books');
    });

    it('should load create CookBook page', async () => {
        await cookBookComponentsPage.clickOnCreateButton();
        cookBookUpdatePage = new CookBookUpdatePage();
        expect(await cookBookUpdatePage.getPageTitle()).to.eq('Create or edit a Cook Book');
        await cookBookUpdatePage.cancel();
    });

    it('should create and save CookBooks', async () => {
        const nbButtonsBeforeCreate = await cookBookComponentsPage.countDeleteButtons();

        await cookBookComponentsPage.clickOnCreateButton();
        await promise.all([
            cookBookUpdatePage.setNameInput('name'),
            cookBookUpdatePage.setDescriptionInput('description'),
            // cookBookUpdatePage.recipesSelectLastOption(),
            cookBookUpdatePage.userDetailsSelectLastOption()
        ]);
        expect(await cookBookUpdatePage.getNameInput()).to.eq('name');
        expect(await cookBookUpdatePage.getDescriptionInput()).to.eq('description');
        await cookBookUpdatePage.save();
        expect(await cookBookUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await cookBookComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last CookBook', async () => {
        const nbButtonsBeforeDelete = await cookBookComponentsPage.countDeleteButtons();
        await cookBookComponentsPage.clickOnLastDeleteButton();

        cookBookDeleteDialog = new CookBookDeleteDialog();
        expect(await cookBookDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Cook Book?');
        await cookBookDeleteDialog.clickOnConfirmButton();

        expect(await cookBookComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
