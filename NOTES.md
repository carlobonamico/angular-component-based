#NOTES.md

#Topics to be refined with more details

More details on 
* binding syntax
*ngIf
*ngFor

typescript types

forms

dependency injection (annotations!)

moving to angular cli
http

# Third day
pipes (cenni)
observables
async pipe
routing


# Other TODOS
* re-generate the PDF documentation



# Labs to be added
0) generare i tre componenti con ng generate order-list-view

1) importare Routes, RouterModule

2) definire la configurazione delle Route

const appRoutes: Routes = [
  { 
      path: 'messages', 
      component: MessageListComponent 
  },
];

in @NgModule
imports: [
    RouterModule.forRoot(appRoutes)
    
  ],


3) importare nel modulo il RouterModule con la configurazione corretta

4) aggiungere router-outlet nell' html

5) la vista di default si dovrebbe già vedere

6) scrivo il menu usando la direttiva routerLink 

<a routerLink="/messages" routerLinkActive="active">Messages</a>

7) leggo il parametro id e visualizzo il dettaglio del componente

class MyComponent {
  constructor(route: ActivatedRoute) {

    route.snapshot.params.id

