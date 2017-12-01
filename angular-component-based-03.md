# PART 3 - Advanced Angular Recipes



# Some references about Angular Basics
Angular 4 with Yakov Fain
https://www.youtube.com/watch?v=k8r76d8QzXs

TypeScript with Dan Wahlin
https://www.youtube.com/watch?v=4xScMnaasG0&feature=em-subs_digest-vrecs

Packaging Angular
https://www.youtube.com/watch?v=unICbsPGFIA&feature=em-subs_digest-vrecs



# Observables and Reactive Programming



# What's an Observable
Observable == stream of events 
* published by some source
* observed/subscribed by one or more functions

To listen for events in this stream, subscribe to the Observable.

The introduction to Reactive Programming you have been missing (Andre Staltz)
https://gist.github.com/staltz/868e7e9bc2a7b8c1f754

Functional Programming you already know (Kevlin Henney)
https://www.youtube.com/watch?v=lNKXTlCOGEc



# Observable's functions
* next(value): called every time a new event is generated
* error(err): called when an error occurs. It will terminate the observer (so no more events may be received)
* complete(): called when the observer complete the procedure (so no more events may be received).



# Let's try something

https://jsfiddle.net/8ptLorpj/



# Consuming events
```
    source.subscribe(
          event => { console.log("Event received "+event); },
          error =>  this.errorMessage = <any>error);
```

Remember to ``unsubscribe`` the stream at the end to prevent memory leaks



# Without using => functions

```
var observer = {
	next: function(value){
  	console.log(value);
  },
  error: function(error){
  	console.error(error);
  },
  complete: function(){
  	console.log('Observer completed');
  }
};

Rx.Observable.fromEvent(button,'click')
.subscribe(observer)
```

https://jsfiddle.net/kq1cr1ns/



# Creating an Observable
A stream containing a single value
```
var source = Rx.Observable
  .of({name: "Carlo"});
```

A number sequence as a stream
```
var source = Rx.Observable
  .range(1, 10);
```

Or from an Array
```
var source = Rx.Observable.from(array);
```

* https://github.com/ReactiveX/rxjs
* http://reactivex.io/rxjs/
* http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html
* http://reactivex.io/documentation/observable.html



# Creating an Observable manually

```
Rx.Observable.create(function(obs){
	obs.next('Value emitted');
  setTimeout(function(){
	  obs.complete();

	},2000);
  //obs.error('Error');
  obs.next('Value emitted 2');
}).subscribe(observer) 
```

https://jsfiddle.net/agjemjxk/



# Unsubscribe
```

var sub1 = Rx.Observable.fromEvent(button,'click')
.subscribe(observer)

setTimeout(function(){
	sub1.unsubscribe();
},3000)
```

https://jsfiddle.net/9q297vo7/

https://xgrommx.github.io/rx-book/content/getting_started_with_rxjs/creating_and_querying_observable_sequences/creating_and_subscribing_to_simple_observable_sequences.html



# A timer / scheduler
```
var source = Rx.Observable.timer(
  5000, /* 5 seconds */
  1000 /* 1 second */)
   .timestamp(); //adds the timestamp to generated events

var subscription = source.subscribe(
  x => console.log(x.value + ': ' + x.timestamp));
```



# Publish/Subscribe with Subjects

A subject is an observer... observable

* http://reactivex.io/documentation/subject.html



# Using subjects

```
subject.subscribe({
	next:function(value){
  	console.log('1° subscriber ' + value);
  },
  error:function(error){
  	console.error(error);
  },
  complete:function(){
  	console.log('completed');
  }
});

subject.subscribe({
	next:function(value){
  	console.log('2° subscriber ' + value);
  }
});

subject.next('test');

```

https://jsfiddle.net/w6jy1fyx/1/



# Combining and processing Streams: Operators
* http://reactivex.io/documentation/operators.html
* https://blog.thoughtram.io/angular/2016/01/06/taking-advantage-of-observables-in-angular2.html


* https://netbasal.com/rxjs-six-operators-that-you-must-know-5ed3b6e238a0



# Map Operator
```
var observable = Rx.Observable.interval(1000);

var observer = {
	next: function(value){
  	console.log(value);
  }
};

observable.map(
	(x) => 'Value is '+ x
).subscribe(observer);
```

https://jsfiddle.net/zv1yt9bq/



# ThrottleTime Operator
```
var observable = Rx.Observable.interval(1000);

var observer = {
	next: function(value){
  	console.log(value);
  }
};

observable.map(
	(x) => 'Value is '+ x
).throttleTime(3000).subscribe(observer);
```

https://jsfiddle.net/zv1yt9bq/



### Let's see it in action
* http://rxmarbles.com/



### Another example
* Event Demo

https://github.com/carlobonamico/angular-event-streams-lab



# LAB
Use JSFiddle at https://jsfiddle.net/8ptLorpj/ to try ReactiveX

* Create an observable using one of the one available on the documentation
* Create two or more kind of observers subscribing the observable with different operators (even chained).

For instance the first observer using a map operator, the second using a debounce and a filter.



# Managing HTTP calls with RxJs
```
import { Http, Response }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web API
  constructor (private http: Http) {}
  getHeroes(): Observable<Hero[]> {
    return this.http.get(this.heroesUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  
  extractData(res: Response) {
    let body = res.json();
    return body || { };
  }
```



# Managing Errors
```
  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
```



# Stream composition
At this point, if you want to add retry on error, just add 
```
.retry(3);
```



# On the other side...
```
this.heroService.getHeroes()
    .subscribe(
      heroes => this.heroes = heroes,
      error =>  this.errorMessage = <any>error);
```



# Now I see why...
Creating a smart Autocomplete widget

UI
```
@Component({
  selector: 'my-wiki-smart',
  template: `
    <h1>Smarter Wikipedia Demo</h1>
    <p>Search when typing stops</p>
    <input #term (keyup)="search(term.value)"/>
    <ul>
      <li *ngFor="let item of items | async">{{item}}</li>
    </ul>`,
  providers: [ WikipediaService ]
})
```

Async pipe?



# Async Pipe
https://angular.io/docs/ts/latest/api/common/index/AsyncPipe-pipe.html

* The async pipe subscribes to an Observable or Promise and returns the latest value it has emitted. 
* When a new value is emitted, the async pipe marks the component to be checked for changes. 
* When the component gets destroyed, the async pipe unsubscribes automatically to avoid potential memory leaks.

https://blog.thoughtram.io/angular/2016/01/07/taking-advantage-of-observables-in-angular2-pt2.html



# Piping requests
```
export class WikiSmartComponent implements OnInit {
  items: Observable<string[]>;
  constructor (private wikipediaService: WikipediaService) {}
  private searchTermStream = new Subject<string>();
  search(term: string) { this.searchTermStream.next(term); }
  ngOnInit() {
    this.items = this.searchTermStream
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap((term: string) => this.wikipediaService.search(term));
  }
}
```



## Explaining the example

 * debounceTime waits for the user to stop typing for at least 300 milliseconds.

 * distinctUntilChanged ensures that the service is called only when the new search term is different from the previous search term.

 *  he switchMap calls the WikipediaService with a fresh, debounced search term and coordinates the stream(s) of service response.



# How do I...
https://xgrommx.github.io/rx-book/content/getting_started_with_rxjs/creating_and_querying_observable_sequences/operators_by_category.html
https://xgrommx.github.io/rx-book/content/which_operator_do_i_use/instance_operators.html



# Creating a custom operator
```
function toJSON<T>(): Observable<T> {
  return this.map(( response : Response ) => response.json());
}

Observable.prototype.toJSON = toJSON;
```



# LAB

* call the Http service using Observable instead of Promises

```
  this.messageService.getHttpObservableMessages()
  .subscribe(
      res => this.setMessages(res.json()),
      error => this.manageError(error)
  );

```



# LAB

* Add a search field to the application.
* Use operators (and a subject) to send requests with a debounce time of 2 seconds.



# Routing



# What is Routing
* Wikipedia Example
* SPA Example



# Types of Routing
* Url-based
* State-based
* Component-based

https://angular-2-training-book.rangle.io/handout/routing



# Installing the Router
Add base URL to index.html 
```
<base href="/">
```
Can also use dynamic script to automatically adapt 

Add dependency to project
```
npm install -g @angular/router --save 
```



# Defining Routes
```
import { Routes, RouterModule } from '@angular/router';
```

```
const appRoutes: Routes = [
  { path: 'messages', component: MessageListComponent },
  { path: 'message/:id',      component: MessageDetailComponent },
  {
    path: 'inbox',
    component: MessageListComponent,
    data: { title: 'Inbox', folder: 'inbox' }
  },
  { path: '',
    redirectTo: '/inbox',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];
```



# Including the RouterModule dependency
```
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
    // other imports here
  ],
  ...
})
export class AppModule { }
```



# Routed Components
A component which receives parameters and state from the current route



# Router-outlet
To be put: 
* in the high-level main component, defining the overall layout
```<router-outlet></router-outlet>```
* in sub-components for child routes

* can have multiple outlets with names
```
<router-outlet name="popup"></router-outlet>
```



# Creating links
```
<nav>
    <a routerLink="/messages" routerLinkActive="active">Messages</a>
    <a routerLink="/inbox" routerLinkActive="active">Inbox</a>
  </nav>
```



# Passing parameters
Path Parameters
```
  { path: 'message/:id',      component: MessageDetailComponent },

```

```
this.router.navigate(['/message', message.id]);
```



# LAB
* Create a new application with angular-cli

* Generate 3 components:
  * main-page
  * detail-page with an id parameter
  * about-page




# LAB
* definire la configurazione delle Route
```
const appRoutes: Routes = [
  { 
      path: 'details', 
      component: DetailPageComponent 
  },
];
```
in @NgModule
```
imports: [
    RouterModule.forRoot(appRoutes)
    
  ],
```



# LAB

* add <router-outlet> into the html

* add a navigation menu to reach two detail-page and the about-page (start with the last one)
```
<a routerLink="/details" routerLinkActive="active">Messages</a>
```

* Print the id Parameter on detail-page
```
class DetailPageComponent {
  constructor(route: ActivatedRoute) {

    route.snapshot.params.id
```



# Query Parameters
Use the [queryParams] directive along with [routerLink]
```
<a [routerLink]="['details']" [queryParams]="{ id: 99 }">Go to Id 99</a>
```

Navigate programmatically using the Router service:
```
  goToPage(pageNum) {
    this.router.navigate(['/details'], { queryParams: { id: pageNum } });
  }
```



# Reading parameters in components
With Snapshot

```
ngOnInit() {
  // (+) converts string 'id' to a number
  let id = +this.route.snapshot.params['id'];

```



# Reading parameters with an Observable
```
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number

       // In a real app: dispatch action to load the details here.
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  ```



# Resolvers

https://blog.thoughtram.io/angular/2016/10/10/resolving-route-data-in-angular-2.html

```

@Injectable()
export class MessageDetailResolver implements Resolve<Message> {
  constructor(private messageService: MessageService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Message> {
    let id = route.params['id'];
    
    return this.messageService.getHttpObservableMessages(id); //returns an observable
  }
}
```



# Resolvers on routing configuration
```
export const AppRoutes: Routes = [
  ...
  { 
    path: 'message/:id',
    component: MessageDetailComponent,
    resolve: {
      message: MessageDetailResolver
    }
  }
];
```



# Resolvers on component
```
@Component()
export class MessageDetailComponent implements OnInit {

  message;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.message = this.route.snapshot.data['message'];
  }
}
```



# Guards
Determine if navigation is possible

```
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate() {
    console.log('AuthGuard#canActivate called');
    return true;
  }
}
```



# Guards for security
An example: authentication
```
const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'crises', component: ManageCrisesComponent },
          { path: 'heroes', component: ManageHeroesComponent },
          { path: '', component: AdminDashboardComponent }
        ],
      }
    ]
  }
];
```

http://plnkr.co/edit/sRNxfXsbcWnPU818aZsu?p=preview



# Guards for UI (e.g. Unsaved Changes)
```
import { Injectable }    from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable }    from 'rxjs/Observable';
export interface CanComponentDeactivate {
 canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
```



# Child Routes
When they must be accessible only within other routes and not by themselves.

```
const crisisCenterRoutes: Routes = [
  {
    path: 'messages',
    component: CrisisCenterComponent,
    children: [
      {
        path: '',
        component: MessageListComponent,
        children: [
          {
            path: ':id',
            component: MessageDetailComponent
          },
          {
            path: 'help',
            component: HelpComponent
          },
        ]
      }
    ]
```



# LAB

* clone the routing demo workspace

https://github.com/mattex83/routing-demo

* git checkout empty-app

* Create three components ``<app-login>``, ``<app-not-found>`` and ``<app-main>``
* Use a guard to activate the ``<app-main>`` component when the user credentials are good
  ** just simulate it with fixed values

* put the ``<router-outlet>`` component instead a ``<app-root>`` component



# Lazy Loading of a module

https://angular-2-training-book.rangle.io/handout/modules/lazy-loading-module.html

https://plnkr.co/edit/vpCqRHDAj7V6mlN1AknN?p=preview



# LAB

Refactor the application: 
* keep <app-login> component and <app-not-found> component in the application module
* put other component and eventually its dependencies into a new module called *BodyModule*
* Lazy load the module when the navigation is performed



# how to access dom from ts

* sometimes we need to access the DOM
* for instance to wrap a third party JS library in an angular component
* or to make some directives



# ElementRef

THe following example prints the html of the component itself

```
import { AfterContentInit, Component, ElementRef } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
    <h1>My App</h1>
    <pre>
      <code>{{ node }}</code>
    </pre>
  `
})
export class AppComponent implements AfterContentInit {
  node: string;

  constructor(private elementRef: ElementRef) { }

  ngAfterContentInit() {
    const tmp = document.createElement('div');
    const el = this.elementRef.nativeElement.cloneNode(true);

    tmp.appendChild(el);
    this.node = tmp.innerHTML;
  }

}
```



# An example of Directive
```
import { Directive, ElementRef, Input } from '@angular/core';

@Directive({ selector: '[myHighlight]' })
export class HighlightDirective {
    constructor(el: ElementRef) {
       el.nativeElement.style.backgroundColor = 'yellow';
    }
}
```



# i18n



# How the process works?

* Mark static text messages in your component templates for translation.

* An angular i18n tool extracts the marked messages into an industry standard translation source file.

* A translator edits that file, translating the extracted text messages into the target language, and returns the file to you.

* The Angular compiler imports the completed translation files, replaces the original messages with translated text, and generates a new version of the application in the target language.

### You need to build and deploy a separate version of the application for each supported language



# The alternative

NGX TRANSLATE
https://github.com/ngx-translate/core

* Allows changing language at runtime
* same approach of translation service in AngularJS



# i18n custom attribute
```
<h1 i18n>Hello i18n!</h1>
```



# add a description

```
<h1 i18n="An introduction header for this sample">Hello i18n!</h1>
```



# add a meaning

```
<h1 i18n="site header|An introduction header for this sample">Hello i18n!</h1>
```



# add an ID

On the generated xml file we will have
```
<trans-unit id="ba0cc104d3d69bf669f97b8d96a4c5d8d9559aa3" datatype="html">
```

the id may change on every export procedure, to avoid it
```
<h1 i18n="@@introductionHeader">Hello i18n!</h1>
```

the trans-unit will become 
```
<trans-unit id="introductionHeader" datatype="html">
```



# this works only with text inside tags?

What if I don't want to add a tag with the text inside?
```
<ng-container i18n>I don't output any element</ng-container>
```



# Handle single or plural
```
<span i18n>{wolves, plural, =0 {no wolves} =1 {one wolf} =2 {two wolves} other {a wolf pack}}</span>
```



# How to extract i18n file
```
ng xi18n -op locale -of messages.en.xlf
```



# How to build an i18n app
```
ng build --prod --i18n-file locale/messages.it.xlf --locale it --i18n-format xlf
```



# LAB

* Add i18n feature into the routing app.
* extract the xlf file, compile the italian trnaslation and build an italian version of the application



## Angular 2 - to probe further
Change Detection
https://angular-2-training-book.rangle.io/handout/change-detection/angular_1_vs_angular_2.html
https://juristr.com/blog/2016/04/angular2-change-detection/

In Memory API
https://plnkr.co/edit/sIi9tWbekqAbxqwZEwkX?p=preview





# Bonus: Clean Components



## Concept 1 - Naming
-reading code vs writing code
- what is a good name?
- same but different: the importance of conventions



##Concept 3 - What's in a good function?
- single responsibility
- separing inputs from outputs
- if you have to do 3 things, make 4 functions
- primitives and orchestrators



##Concept 4 - What's in a good class? Design Principles
- Single Responsibility Principle
- collaborating with other classes
- composition vs inheritance (and the Open/Closed principle)
- Dependency Injection
- interfaces and the importante of Contracts



## Clean Code
* It cannot solve all development problems...

* But it can make them way more tractable!



## Design Principles
Once we have got the basics covered, then we will need to understand the Software Dynamics
* vs the nature (and Laws) of Software

Take them into account => Design Principles

Basically, Common Sense applied to software design
>Treat your code like your kitchen
> C.B., about 2013



## Improve our code
It takes a Deliberate approach and constant effort

>To complicate is easy, to simplify is hard
>To complicate, just add, everyone is able to complicate
>Few are able to simplify
>Bruno Munari



##reading code vs writing code
>What is written without effort is in general read without pleasure.
>
>Samuel Johnson

Most code is written once, but read
* every time you need to fix a bug
* to add new features
* by other developers
  * including your future self 



##what is a good name?
* Ideas?



## What is a good name
<img src="images/naming.png">

 * nonsense
 * honest
 * honest & complete
 * does the right thing
 * intent
 * domain abstraction

http://llewellynfalco.blogspot.it/p/infographics.html



## Single Responsibility
>Each function should do 1 thing

Or even better, have a single responsibility
* and reason to change



## how to find responsibilities? 
Ask yourself questions...

* What? 
* Who?
* When?
* Why?
* Where?

And put the answer in different sub-functions



## Inputs vs outputs
* make inputs clear
* limit / avoid output parameters



## 3 things, 4 functions
## Primitives, Orchestrators, level of abstraction
* Primitives: small, focused, typically use-case independent
* Orchestrators: implement use-cases by combining primitives

* rinse and repeat over multiple levels of abstraction

* benefits:
  * more reusable
  * easier to test



##Single Responsibility Principle
Have you ever seen your grandmother put dirty clothes in the fridge?

Or biscuits in the vegetable box?

So, why to we do this all the time in our code? 



##Single Responsibility Principle
Responsibility == reason to change



## From bad to good
Incremental transformation

<img src ="http://1.bp.blogspot.com/-Aaw2GppgxeA/Ve-a1CMqJEI/AAAAAAAAD8w/Epy6-J7VdGY/s320/PracticalRefactoringDemo.gif" >



## In steps
* Each step should not change the functional properties of the system
* and improve the non-functional ones

* separate adding features from refactoring
  * don't do both in the same step



## The Boy Scout Rule
>Leave the campsite a little better than you found it

>Every time you touch some code, leave it a little better

The power of compounding many small changes _in the same direction_
* 1% time



##More practice and Katas
* http://codekata.com/

* https://www.industriallogic.com/blog/modern-agile/

# Improvement Culture
* https://codeascraft.com/2012/05/22/blameless-postmortems/



## Learning to learn
* Kathy Sierra
* https://www.youtube.com/watch?v=FKTxC9pl-WM
