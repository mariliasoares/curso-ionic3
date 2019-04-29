import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _usuariosService: UsuariosServiceProvider) { //classe responsavel por fazer login e receber de volta informaçoes relativas ao usuario q fez login
  }

  get usuarioLogado() {
    return this._usuariosService.obtemUsuarioLogado();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

}
