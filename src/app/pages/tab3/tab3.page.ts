import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CompanyService } from '../../services/company.service';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { Test } from '../../interfaces/test';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  usuario:Usuario={};
  
  contacto={
    name:'',
    description:'',
    phone1:'',
    phone2:'',
    phone3:'',
    email:'',
    web:'',
    observations:'',
  }

  persona={
    name:'',
    address:'',
    movil:'',
    email:'',
    date_admission:'',
    date_termination:'',
    observations:''
  }

  constructor(
    private usuarioService:UsuarioService,
    private companyService:CompanyService,
    private callNumber: CallNumber
  ) {}

  async ngOnInit() {
    this.usuario= this.usuarioService.getUsuario();

    this.getInformationContacto();
    this.getInformationPersona();
  }

  logout(){
    this.usuarioService.logout();
    
  }

  async getInformationContacto(){
    await this.companyService.getCompanyInformation()
          .subscribe(resp=>{
            console.log(resp)
            this.contacto.name=resp['name'];
            this.contacto.description=resp['description'];
            this.contacto.phone1=resp['phone1'];
            this.contacto.phone2=resp['phone2'];
            this.contacto.phone3=resp['phone3'];
            this.contacto.email=resp['email'];
            this.contacto.web=resp['web'];
            this.contacto.observations=resp['observations'];
          });
  }
  async getInformationPersona(){
    await this.usuarioService.getPersonInformation(this.usuario.id)
          .subscribe(resp=>{
            console.log(resp)
            this.persona.name=resp['name'];
            this.persona.address=resp['address'];
            this.persona.movil=resp['movil'];
            this.persona.email=resp['email'];
            this.persona.date_admission=resp['date_admission'];
            this.persona.observations=resp['observations'];
          });
  }

  call(telefono){

    this.callNumber.callNumber(telefono, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }
}
