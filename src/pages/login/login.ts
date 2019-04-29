import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { Usuario } from '../../modelos/usuario';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string = 'joao@alura.com.br';
  senha: string = 'alura123';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _usuariosService: UsuariosServiceProvider) {
  }

  efetuaLogin() {
    console.log(this.email);
    console.log(this.senha);

    this._usuariosService
        .efetuaLogin(this.email, this.senha) //retorna um observable e precisa inscrever pra receber a resposta
        .subscribe(
          (usuario: Usuario) => {
            console.log(usuario);
            this.navCtrl.setRoot(HomePage); // setar root para nao ter backbutton na homepage se usasse o 'push'
          },
          () => {
            this._alertCtrl.create({ //recebe objeto javascript
              title: 'Falha no login',
              subTitle: 'Email ou senha incorretos! Verifique!',
              buttons: [
                { text: 'ok' }
              ]
            }).present();
          }
        )


  }

}
