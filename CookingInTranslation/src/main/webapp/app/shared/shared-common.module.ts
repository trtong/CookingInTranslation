import { NgModule } from '@angular/core';

import { CookingInTranslationSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [CookingInTranslationSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [CookingInTranslationSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class CookingInTranslationSharedCommonModule {}
