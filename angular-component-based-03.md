# PART 3 - Advanced Angular (2) Recipes



# What's an Observable
Think of an Observable as a stream of events published by some source. To listen for events in this stream, subscribe to the Observable.

http://reactivex.io/documentation/observable.html

### Let's see it in action
* http://rxmarbles.com/



# Creating an Observable
* https://github.com/ReactiveX/rxjs
* http://reactivex.io/rxjs/
* http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html



# Consuming events
```
    this.heroService.getHeroes()
                     .subscribe(
                       heroes => this.heroes = heroes,
                       error =>  this.errorMessage = <any>error);
```



# Event Streams
* http://reactivex.io/documentation/operators.html
* http://reactivex.io/documentation/subject.html
* https://blog.thoughtram.io/angular/2016/01/06/taking-advantage-of-observables-in-angular2.html




# Now I see why...
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



# With In Memory API
https://plnkr.co/edit/sIi9tWbekqAbxqwZEwkX?p=preview



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


https://juristr.com/blog/2016/04/angular2-change-detection/




# Routing
# What is Routing
* Wikipedia Example
* SPA Example



# Types of Routing
* Url-based
* State-based
* Component-based



# Defining a Route

# Routed Components

# Router-outlet

# Route Parameters
 Snapshot vs params

# Resolvers

# Guards

# Async - reactive Routing



# LAB
* moving to angular cli



## Angular 2 - to probe further






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
