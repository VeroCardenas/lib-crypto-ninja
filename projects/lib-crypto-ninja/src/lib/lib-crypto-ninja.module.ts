import { ModuleWithProviders, NgModule } from '@angular/core';
import { CoreModule } from './core/core.modele';
import { EncryptService } from './core/services';
import { LibCryptoNinjaComponent } from './lib-crypto-ninja.component';



@NgModule({
  declarations: [
    LibCryptoNinjaComponent
  ],
  imports: [
    CoreModule,
  ],
  exports: [
    LibCryptoNinjaComponent
  ]
})
export class LibCryptoNinjaModule {
  public static forRoot(environment: any): ModuleWithProviders<LibCryptoNinjaModule> {

    return {
      ngModule: LibCryptoNinjaModule,
      providers: [
        EncryptService,
        {
          provide: 'env', // you can also use InjectionToken
          useValue: environment
        }
      ]
    };
  }
}
