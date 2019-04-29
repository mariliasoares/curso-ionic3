import { Injectable } from '@angular/core';
import { Agendamento } from '../../modelos/agendamento';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AgendamentoDaoProvider { //

  constructor(private _storage: Storage) {
  }

  private _geraChave(agendamento: Agendamento) {
    return agendamento.emailCliente + agendamento.data.substr(0, 10);
  }
  salva(agendamento: Agendamento) {
    let chave = this._geraChave(agendamento);
    let promise = this._storage.set(chave, agendamento);

    return Observable.fromPromise(promise);
  }

  ehDuplicado(agendamento: Agendamento) {
    let chave = this._geraChave(agendamento);
    let promise = this._storage
                  .get(chave) //recebe chave e retorna objeto se houver a chave no banco retorna uma promise!!!!
                  .then(dado => dado ? true : false); //.then quando eu receber a resposta eu faço um if ternario
    return Observable.fromPromise(promise); //retorna true ou false promise de retorno do then
  }

  listaTodos() {
    let agendamentos: Agendamento[] = [];

    let promise = this._storage.forEach((agendamento: Agendamento) => { //método forEach itera por cada item e trabalha com promise, retorna um promise
      agendamentos.push(agendamento); //promise guarda o retorno do forEach
    })
    .then(() => agendamentos);

    return Observable.fromPromise(promise);
  }
}
