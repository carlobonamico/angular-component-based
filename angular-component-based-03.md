# PART 3 - Advanced Angular (2) Recipes



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



### Let's see it in action
* http://rxmarbles.com/



# Creating an Observable
A stream containing a single value
```
var source = Rx.Observable
  .just({name: "Carlo"});
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



# Consuming events
```
    source.subscribe(
          event => { console.log("Event received "+event); },
          error =>  this.errorMessage = <any>error);
```

Remember to ``unsubscribe`` the stream at the end to prevent memory leaks



# Programmatically generate events
```
var source = Rx.Observable.create(observer => {
  // Yield a two values and complete
  observer.onNext(42);
  observer.onNext(45);
  
  observer.onCompleted();
  // Any cleanup logic might go here
  return () => console.log('disposed')
});
```

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
* http://reactivex.io/documentation/subject.html



# Combining and processing Streams
* http://reactivex.io/documentation/operators.html
* https://blog.thoughtram.io/angular/2016/01/06/taking-advantage-of-observables-in-angular2.html


* https://netbasal.com/rxjs-six-operators-that-you-must-know-5ed3b6e238a0



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
    return body.data || { };
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



# Async Pipe
https://angular.io/docs/ts/latest/api/common/index/AsyncPipe-pipe.html

* The async pipe subscribes to an Observable or Promise and returns the latest value it has emitted. 
* When a new value is emitted, the async pipe marks the component to be checked for changes. 
* When the component gets destroyed, the async pipe unsubscribes automatically to avoid potential memory leaks.

https://blog.thoughtram.io/angular/2016/01/07/taking-advantage-of-observables-in-angular2-pt2.html



# The conclusion
Split between 
* simple, stateless, synchronous UI components
* smarter, stateful, Business Logic components, dealing with asynchronicity

And link them with the async pipe



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



#Query Parameters
Use the [queryParams] directive along with [routerLink]
```
<a [routerLink]="['messages']" [queryParams]="{ page: 99 }">Go to Page 99</a>
```

Navigate programmatically using the Router service:
```
  goToPage(pageNum) {
    this.router.navigate(['/messages'], { queryParams: { page: pageNum } });
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



# Programmatic navigation
Have a Router service injected in your component
```
private router: Router;

```
Then 

```
router.go()
```



# Resolvers
```

@Injectable()
export class MessageDetailResolver implements Resolve<Message> {
  constructor(private cs: MessageService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Message> {
    let id = route.params['id'];
    
    return this.cs.getMessage(id).then(message => {
      if (message) {
        return message;
      } else { // id not found
        this.router.navigate(['/messages']);
        return null;
      }
    });
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
* moving to angular cli



## Angular 2 - to probe further
Change Detection
https://angular-2-training-book.rangle.io/handout/change-detection/angular_1_vs_angular_2.html
https://juristr.com/blog/2016/04/angular2-change-detection/

In Memory API
https://plnkr.co/edit/sIi9tWbekqAbxqwZEwkX?p=preview





# Bonus: Clean Components



##Concept 1 - Naming
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
