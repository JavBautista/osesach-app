import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaPersonas } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
const URL= environment.url;

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  paginaPersonas =0;

  constructor(
    private http:HttpClient,
    private usuarioService:UsuarioService
  ) { }

  getAgentes(pull:boolean =false, buscar:string=''){
    if(pull){
      this.paginaPersonas=0;
    }
    this.paginaPersonas++;
    return this.http.get<RespuestaPersonas>( `${URL}/api/person/get/agentes?page=${this.paginaPersonas}&buscar=${buscar}`);
  }//.getAgentes

  getSupervisores(pull:boolean =false, buscar:string=''){
    if(pull){
      this.paginaPersonas=0;
    }
    this.paginaPersonas++;
    return this.http.get<RespuestaPersonas>( `${URL}/api/person/get/supervisores?page=${this.paginaPersonas}&buscar=${buscar}`);
  }//.getSupervisores
}
