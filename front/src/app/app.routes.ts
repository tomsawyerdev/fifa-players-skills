import { Routes } from '@angular/router';

import {PlayersMainComponent} from './features/players/players-main/players-main.component';
import {PlayerEditComponent} from './features/players/player-edit/player-edit.component';
import {PlayerDetailComponent} from './features/players/player-detail/player-detail.component';
import {SessionCreateComponent} from './features/session/session-create/session-create.component';
import {LandingPageComponent} from './features/landing/landing-page/landing-page.component';

import { authGuard } from './core/services/auth/auth.guard';



export const routes: Routes = [

    {path: 'players', component: PlayersMainComponent,canActivate: [authGuard]},    
    {path: 'players/create', component: PlayerEditComponent,canActivate: [authGuard]},
    {path: 'players/edit', component: PlayerEditComponent,canActivate: [authGuard]},
    {path: 'players/detail', component: PlayerDetailComponent,canActivate: [authGuard]},
    {path: 'session', component: SessionCreateComponent},
    {path: '', component: LandingPageComponent},

];

//{path: 'players/create', component: PlayerCreateComponent,canActivate: [authGuard]},