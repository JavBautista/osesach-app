import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';

const routes: Routes = [
  
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    //canActivate:[ UsuarioGuard ]
    canLoad:[ UsuarioGuard ]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path:'',
    pathMatch:'full',
    redirectTo:'login'
  },
  {
    path: 'directory',
    loadChildren: () => import('./pages/directory/directory.module').then( m => m.DirectoryPageModule)
  },
  {
    path: 'supervisor/home',
    loadChildren: () => import('./pages/supervisor/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'agente-visitas',
    loadChildren: () => import('./pages/agente-visitas/agente-visitas.module').then( m => m.AgenteVisitasPageModule)
  },
  {
    path: 'visita-actualizar',
    loadChildren: () => import('./pages/visita-actualizar/visita-actualizar.module').then( m => m.VisitaActualizarPageModule)
  },
  {
    path: 'agente-avance',
    loadChildren: () => import('./pages/agente-avance/agente-avance.module').then( m => m.AgenteAvancePageModule)
  },
  {
    path: 'directory-create',
    loadChildren: () => import('./pages/directory-create/directory-create.module').then( m => m.DirectoryCreatePageModule)
  },
  {
    path: 'select-activity',
    loadChildren: () => import('./pages/select-activity/select-activity.module').then( m => m.SelectActivityPageModule)
  },
  {
    path: 'view-visit',
    loadChildren: () => import('./pages/view-visit/view-visit.module').then( m => m.ViewVisitPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'agente-directory',
    loadChildren: () => import('./pages/agente-directory/agente-directory.module').then( m => m.AgenteDirectoryPageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./pages/messages/messages.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'new-conversation',
    loadChildren: () => import('./pages/new-conversation/new-conversation.module').then( m => m.NewConversationPageModule)
  },
  {
    path: 'supervisor-agentes',
    loadChildren: () => import('./pages/supervisor-agentes/supervisor-agentes.module').then( m => m.SupervisorAgentesPageModule)
  },
  {
    path: 'supervisor-agente-avance',
    loadChildren: () => import('./pages/supervisor-agente-avance/supervisor-agente-avance.module').then( m => m.SupervisorAgenteAvancePageModule)
  },
  {
    path: 'supervisor-avances',
    loadChildren: () => import('./pages/supervisor-avances/supervisor-avances.module').then( m => m.SupervisorAvancesPageModule)
  },
  {
    path: 'directory-image',
    loadChildren: () => import('./pages/directory-image/directory-image.module').then( m => m.DirectoryImagePageModule)
  },
  {
    path: 'admin-supervisores',
    loadChildren: () => import('./pages/admin-supervisores/admin-supervisores.module').then( m => m.AdminSupervisoresPageModule)
  },
  {
    path: 'admin-supervisor-info',
    loadChildren: () => import('./pages/admin-supervisor-info/admin-supervisor-info.module').then( m => m.AdminSupervisorInfoPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
