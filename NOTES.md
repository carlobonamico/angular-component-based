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


# Resolver
A resolver takes as inputs
* route params and possibly state
* one or more services
And returns as a result
* a value
* a Promise or Observable

Angular then resolves the observable if needed, then puts the result in the data field of the route
* `` route.snapshot['data']``

# Navigation 
View 1 -> Can Deactivate Guard (V1) -> Can Activate Guard (V2)-> Resolver -> View 2

# LAB 
* Create an OrderList component
* Create an OrderDetailsView component
* create a mock order.json service
* add the ``getOrder(id)`` method in the service
Compare adding the call to orderService.getOrder(id) 
* in the ngOnInit method of the component
* in a resolver


Angular Language Service
Angular Support (per la navigazione html-componente e viceversa)
Typescript Hero (per auto-import ts, con il caveat che funziona bene
per le classi del progetto, mentre per le classi di libreria a volte
sbaglia il path)


Opzionali:
Angular Files (per generazione di componenti da gui, stile angular-cli)
Angular 4 and Typescript Snippets di Dan Wahlin
Angular 4 snippets di John Papa
VersionLens per maggiori dettagli in package.json



