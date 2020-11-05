import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ClientService} from '../../services/client.service';
import {Client} from '../../models/client.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  client:Client;
  clients:Client[];

  searchValue:string;
  constructor(
    private toastr:ToastrService,
    private clientService:ClientService,
  ) { }

  ngOnInit(): void {
    this.client = new Client();
    this.getClients();
  }

  showNotification(titulo, mensaje,from, align){
    this.toastr.info('<span class="tim-icons icon-check-2" [data-notify]="icon"></span>'+mensaje, titulo, {
      disableTimeOut: true,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-success alert-with-icon',
      positionClass: 'toast-' + from + '-' +  align
    });

  }

  getClients(){
    this.clientService.get().subscribe(
      res=>{
        if(res!=null){
          this.clients = res.clients;
        }
      }
    );
  }

  add() {
    console.log(this.client)
    this.clientService.post(this.client).subscribe(p => {
      if (p != null) {
        console.log(p);
        this.showNotification('Agregado','Cliente agregado','bottom','right');
      }else{
        console.log(p);
      }
      this.getClients();
    });
  }

}
