import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaActivities, Activity } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';

const URL= environment.url;

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  paginaActivity =0;

  constructor(
    private http:HttpClient,
    private usuarioService:UsuarioService
  ) { }

  getActivities(pull:boolean =false, buscar:string=''){
    if(pull){
      this.paginaActivity=0;
    }
    this.paginaActivity++;
    return this.http.get<RespuestaActivities>( `${URL}/api/activities/get?page=${this.paginaActivity}&buscar=${buscar}`);
  }//.getActivities
}
