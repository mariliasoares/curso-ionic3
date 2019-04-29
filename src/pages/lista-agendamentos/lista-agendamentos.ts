import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AgendamentoDaoProvider } from '../../providers/agendamento-dao/agendamento-dao';
import { Agendamento } from '../../modelos/agendamento';
import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';

@IonicPage() //decorator que permite o lazy loading
@Component({
  selector: 'page-lista-agendamentos',
  templateUrl: 'lista-agendamentos.html',
})
export class ListaAgendamentosPage {
  agendamentos: Agendamento[]; //uma propriedade nao recebe 'let' na frente. array de agendamento
  private _alerta;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _agendamentoDao: AgendamentoDaoProvider,
    private _alertCtrl: AlertController,
    private _agendamentosService: AgendamentosServiceProvider) {
  }

  ionViewDidLoad() {
    this._agendamentoDao.listaTodos()
        .subscribe( //pq estamos recebendo uma resposta de m observable
          (agendamentos: Agendamento[]) => { //sucesso recebe uma lista array de agendamentos
            this.agendamentos = agendamentos; //atributo recebe parametro do call back de sucesso, ja tem a listagem
          }
        )
  }


  reenvia(agendamento: Agendamento) {
    this._alerta = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [
        { text: 'ok'
        }
      ]
    });

    let mensagem = '';

    this._agendamentosService.agenda(agendamento) //envio para API que é o método agenda
        .mergeMap((valor) => {
          let observable = this._agendamentoDao.salva(agendamento);
          if(valor instanceof Error) {
            throw valor;
          }

          return observable;
        })
        .finally(
          () => {
            this._alerta.setSubTitle(mensagem);
            this._alerta.present();
          }
        )
        .subscribe(
          () => mensagem = 'Agendamento reenviado!',
          (err: Error) => mensagem = err.message //callback de falha
        );
  }
}
