import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../modelos/usuario';
import { ApiServiceProvider } from '../api-service/api-service';

@Injectable()
export class UsuariosServiceProvider {
  _url: string;

  private _usuarioLogado: Usuario;

  constructor(private _api: ApiServiceProvider,
    public _http: HttpClient) {
      this._url = this._api.url;
  }

  efetuaLogin(email, senha) { // o método post nos chama um observable
    return this._http.post<Usuario>(this._url+'/login', { email, senha}) // passo a url e como segundo parametro passo oq eu quero que a api receba
      .do((usuario: Usuario) => this._usuarioLogado = usuario); //e se a requisição for bem sucedida (.do quando da sucesso) a API retorna um usuário padrão que nosso cliente deixou na nossa API pra gente poder testar
  }         //faz a requisição, pega o usuario retornado pela API e joga dentro da variável

  obtemUsuarioLogado() { //nem precisa por public
    return this._usuarioLogado;
  }

  get usuarioLogado() {
    return this._usuarioLogado;
  }
}
