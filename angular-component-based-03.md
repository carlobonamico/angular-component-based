# PART 2 - Angular (2) Recipes



# Template-Driven Forms
* quick setup
* based on familiar `ngModel` directive
  * similar to Angular 1.x
* more difficult to dynamically add/modify fields



# Template-Driven Form recipe
* include `FormsModule` in the module`imports: []` section
  * ```import { FormsModule }   from '@angular/forms';```
* add the `<form>` tag
* include `name` attribute for each `input` tag
  * e.g. `<input type="text" name="userName">`
* add DataBinding to input tags
  * `[(ngModel)]="user.userName"`

* Optionally add validations e.g. `required` or `[required]="conditional expression"`



#Advanced Forms Features
* Give the form a name
  * `<form #userForm="ngForm">` 
  * meaning this form has an id of `userForm` which will reference the "ngForm" directive instance in the controller

* Try printing it
```html
  {{ userForm.valid }}
  <pre>{{ userForm | json }}</pre>
```



# Form state management
* `ngModel` will automatically update the following control, form and css properties
  * `form.valid` -> `ng-valid` css class
  * `form.field.valid` -> `ng-valid` css class
  * `form.field.invalid` -> `ng-invalid` css class
  * and recursively compute them on forms and subforms
* Other 
  * valid - invalid
  * dirty - pristine
  * touched - untouched



# Make CSS nice  
```css
.ng-valid[required], .ng-valid.required  {
  border-left: 5px solid #42A948; /* green */
}
.ng-invalid:not(form)  {
  border-left: 5px solid #a94442; /* red */
}
```



# Custom Validation messages
```html
 <input type="text" id="name"
               required
               [(ngModel)]="user.name" name="name"
               #name="ngModel">
        <div [hidden]="name.valid || name.pristine"
             class="alert alert-danger">
```



# Other features
* Reset a form to initial state
```userForm.reset()```
* Handle form submission (e.g. 'ENTER' key)  
  * ```<form (ngSubmit)="onSubmit()" #userForm="ngForm">```
* Prevent submission on invalid form
```html 
<button type="submit" class="btn btn-success" [disabled]="!userForm.form.valid">Submit</button>
```



# Dependency Injection Recipe
* make sure annotation support is enabled
```json
typescriptOptions: {
  enableMetadataSupport: true
}
```
in `tsconfig.json` and/or `system.conf.js`



# Declare Service to be injected
```typescript
import 'Injectable' from

@Injectable
class MessageService {


}
```


# Add Service to Providers section
```typescript
  providers: [MessageService]
```



# Reference Service in component Constructor
```typescript
  constructor(private messageService: MessageService)
```



# @Injectable
* Injecting Services into Services



# Injector Hierarchy
https://angular.io/docs/ts/latest/guide/dependency-injection.html
https://blog.thoughtram.io/angular/2015/05/18/dependency-injection-in-angular-2.html



# Injector tokens
```
import { InjectionToken } from '@angular/core';

export const TITLE = new InjectionToken<string>('title');

providers: [
    { provide: Hero,          useValue:    someHero },
    { provide: TITLE,         useValue:   'Hero of the Month' },
    { provide: HeroService,   useClass:    HeroService },
    { provide: LoggerService, useClass:    DateLoggerService },
    { provide: MinimalLogger, useExisting: LoggerService },
    { provide: RUNNERS_UP,    useFactory:  runnersUpFactory(2), deps: [Hero, HeroService] }
  ]
```



# Lifecycle Hooks
## ngOnInit
## ngOnChanges
* managing changes in arrays
https://teropa.info/blog/2016/03/06/writing-an-angular-2-template-directive.html



# What's a Promise
```
  this.http.get(this.heroesUrl)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
```



# Creating a Promise
```
new Promise((resolve, reject) => {
    if (success)
      resolve(42);
  });
```
And resolving it later



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



# HTTP Client
* https://angular.io/docs/ts/latest/guide/server-communication.html

### SETUP
* import ```import { HttpModule } from '@angular/http';```
* add HttpModule to main NgModule
 


# GET
```
import { Http, Response }          from '@angular/http';
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
  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }
```



# Handling Errors
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



# POST
```
create(name: string): Observable<Hero> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.heroesUrl, { name }, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
```



# Encapsulating Backend Calls in a Service Layer



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




