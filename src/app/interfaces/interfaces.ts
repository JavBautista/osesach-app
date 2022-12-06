import { MessagesService } from '../services/messages.service';
export interface Usuario{
    id?: number;
    name?:string;
    email?:string;
    password?:string;
    person_id?:number;
    role_id?:number;
}

  
export interface RespuestaPersonas {
    current_page:   number;
    data?:          Persona[];
    first_page_url: string;
    from:           number;
    last_page:      number;
    last_page_url:  string;
    next_page_url:  string;
    path:           string;
    per_page:       number;
    prev_page_url:  string;
    to:             number;
    total:          number;
}

export interface Persona{
    id?:number; 
    active?:number; 
    name?:string; 
    address?:string; 
    movil?:string; 
    email?:string; 
    date_admission?:Date; 
    date_termination?:Date; 
    observations?:string; 
    created_at?:Date; 
    updated_at?:Date; 
}

export interface RespuestaDirectories {
    current_page:   number;
    data:           Directory[];
    first_page_url: string;
    from:           number;
    last_page:      number;
    last_page_url:  string;
    next_page_url:  string;
    path:           string;
    per_page:       number;
    prev_page_url:  string;
    to:             number;
    total:          number;
}

export interface Directory {
    id:                                    number;
    active?:                                number;
    status_id?:                             number;
    fecha_status?:                          Date;
    agent_id?:                              number;
    asignada?:                              number;
    fecha_asignada?:                        Date;
    id_denue?:                              string;
    clee?:                                  string;
    nombre_unidad?:                         string;
    razon_social?:                          string;
    codigo_scian?:                          string;
    nombre_clase_actividad?:                string;
    descripcion_estrato_personal_ocupado?:  string;
    tipo_vialidad?:                         string;
    nombre_vialidad?:                       string;
    tipo_entre_vialidad_1?:                 string;
    nombre_entre_vialidad_1?:               string;
    tipo_entre_vialidad_2?:                 string;
    nombre_entre_vialidad_2?:               string;
    tipo_entre_vialidad_3?:                 string;
    nombre_entre_vialidad_3?:               string;
    numero_exterior_o_kilometro?:           string;
    letra_exterior?:                        string;
    edificio?:                              string;
    edificio_piso?:                         string;
    numero_interior?:                       string;
    letra_interior?:                        string;
    tipo_asentamiento_humano?:              string;
    nombre_asentamiento_humano?:            string;
    tipo_centro_comercial?:                 string;
    corredor_industrial_comercial_mercado?: string;
    numero_local?:                          string;
    codigo_postal?:                         string;
    clave_entidad?:                         string;
    entidad_federativa?:                    string;
    clave_municipio?:                       string;
    municipio?:                             string;
    clave_localidad?:                       string;
    localidad?:                             string;
    area_geoestadistica?:                   string;
    manzana?:                               string;
    numero_telefono?:                       string;
    correo_electronico?:                    string;
    sitio_internet?:                        string;
    tipo_establecimiento?:                  string;
    latitud?:                               string;
    longitud?:                              string;
    fecha_incorporacion_denue?:             string;
    created_at?:                            Date;
    updated_at?:                            Date;
}

export interface RespuestaVisits {
    current_page:   number;
    data:           Visit[];
    first_page_url: string;
    from:           number;
    last_page:      number;
    last_page_url:  string;
    next_page_url:  string;
    path:           string;
    per_page:       number;
    prev_page_url:  string;
    to:             number;
    total:          number;
}

export interface Visit {
    id: number;
    directory_id?: number;
    user_id?: number;
    status_id?: number;
    observations?: string;

    no_personas_hombres?:string;
    no_personas_mujeres?:string;
    rango_edades?:string;

    consulta?: string;
    latitud?: string;
    longitud?: string;

    created_at?:Date;
    updated_at?:Date;
    directory?: Directory;
    status?: StatusVisit;
}


export interface RespuestaActivities {
    current_page:   number;
    data:           Activity[];
    first_page_url: string;
    from:           number;
    last_page:      number;
    last_page_url:  string;
    next_page_url:  string;
    path:           string;
    per_page:       number;
    prev_page_url:  string;
    to:             number;
    total:          number;
}

export interface Activity {
    id: number;
    key?: string;
    activity?: string;
}

export interface StatusVisit{
    id: number;
    description?: string; 
}


export interface UserPhoto {
    filepath: string;
    webviewPath: string;
  }


  
  export interface RespuestaConversations {
    current_page:   number;
    data?:          Conversation[];
    first_page_url: string;
    from:           number;
    last_page:      number;
    last_page_url:  string;
    next_page_url:  string;
    path:           string;
    per_page:       number;
    prev_page_url:  string;
    to:             number;
    total:          number;
}

export interface Conversation {
    id: number;
    agent_id?:number;
    supervisor_id?:number;
    messages?: Message[];
    supervisor?: Persona;
    agente?: Persona;
    created_at?:Date; 
    updated_at?:Date;  
}

export interface Message {
    id: number;
    conversation_id?:number;
    author_id?:number;
    message?:string; 
    created_at?:Date; 
    updated_at?:Date; 
  }

