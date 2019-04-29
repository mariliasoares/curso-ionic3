import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ListaAgendamentosPage } from '../pages/lista-agendamentos/lista-agendamentos';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { UsuariosServiceProvider } from '../providers/usuarios-service/usuarios-service';
@Component({
  selector: 'myapp',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) //consegue recuperar elemento do template e passar qual o tipo do compoonente q quero recuperar
  public nav: Nav; //quero recuperar do meu template q é um ion nave (recuperar do app html)
  rootPage:any = LoginPage; //.name é lazy loading

  public paginas = [
    { titulo: 'Agendamentos', componente: ListaAgendamentosPage.name, icone: 'calendar'},
    { titulo: 'Perfil', componente: PerfilPage.name, icone: 'person'}
  ];

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private _usuariosService: UsuariosServiceProvider) {
      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
      });
  }

  irParaPagina(componente) {
    this.nav.push(componente); //metodo pra fzer navegação passando o component
  }

  get usuarioLogado() {
    return this._usuariosService.obtemUsuarioLogado();
  }
}

