import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaVisits, Visit} from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';

const URL= environment.url;

@Injectable({
  providedIn: 'root'
})
export class VisitsService {

  paginaVisits =0;
  
  constructor(
    private http:HttpClient,
    private usuarioService:UsuarioService
  ) { }


  getVisits(pull:boolean =false, buscar:string=''){
    if(pull){
      this.paginaVisits=0;
    }
    this.paginaVisits++;
    return this.http.get<RespuestaVisits>( `${URL}/api/visit/get?page=${this.paginaVisits}&buscar=${buscar}`);
  }//.getVisits
  
  getVisitsDirectoryAgent( directory_id:number=0, pull:boolean =false, buscar:string=''){
    if(pull){
      this.paginaVisits=0;
    }
    this.paginaVisits++;

    let user = this.usuarioService.getUsuario(); 
    console.log('User ID:')
    console.log(user.person_id)
    let person_id = user.person_id;


    return this.http.get<RespuestaVisits>( `${URL}/api/visit/get/avance?directory_id=${directory_id}&person_id=${person_id}&page=${this.paginaVisits}&buscar=${buscar}`);
  }//.getVisits

}
