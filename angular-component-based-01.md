# The challenge



## TOPICS
* How does our code become unmanageable? A practical example
* Issues and challenges in developing complex / large HTML5 applications
* Huge controllers and "scope soup"



## Feature Pressure

## Working Prototype != Production-Ready



## What often happens
* huge files
* deep interconnections between features
* cross-cutting mechanisms "spread" everywhere
* fragility
* risk of change increases
* productivity decreases over time



## What can we do about it? 



## To Learn More
TODO - link or integrate the Codemotion presentation



# Thinking In Components



## TOPICS
* From huge controllers and "scope soup" to Component-based Uis
* How to identify application Components



# Thinking in Components
* Learn to split a single "View" or "Page" from the user perspective into a hierarchy of Components
From huge controllers and "scope soup" to Component-based Uis
* How to identify application Components



## What is a UI Component? 
Very rough definition 
* a part of an application / website which includes
  * UI elements
  * interaction logic
  * and (possibly) Business logic

More ideas? 



## Let's try
* Let's focus on UI Components
* Analyze the http://www.trenitalia.com website

TIP: use a screen capture and annotation tool such as https://qsnapnet.com/



## Types of components
* UI Components
  * individual input / output widgets
  * more complex widgets
  * user-level features 
  * entire "pages"
* Non-Graphical Components



## LAB
* Identify key components in a typical WebMail application
* Analyze which components can be reused in multiple views

* Identify key inputs and outputs for each component
* Now go find even more components

* https://drive.google.com/drive/u/0/folders/0B-Bogp8tUho_bDh6SkFOMXEwa1E



## Advantages in short
* More reuse
* more Encapsulation
* easier collaboration in the team



## References



# Component-based development with Angular



## TOPICS
* Angular 2 Component model and API
* How to develop a simple Component in Angular 2



## The Issues

* up to Angular 1.4.x, developing Component-Based Applications was possible, but 
  * NOT easy
  * required additional effort
  * "handcraft" a ``directive`` following a number of criteria



## Enter Angular 1.5
* Components as (almost) first class citizens
* embed consolidated Best Practices into the framework
  * controllerAs


* big syntax simplification
  * improved readability
  * less effort

* goal: make creating components so easy that you want to do it everywhere

* Truly first class support in Angular2



## Angular 1.5 Components API
* declaring components ``angular.component()``
* defining the component interface with ``bindings``
* manage the component lifecycle with ``$onInit`` ``$onChange`` and ``$onDestroy``
* linking components with each other

_as always, embracing HTML_ 



## Aside - Components vs HTML elements
PLNKR or demo

How can it possibly work? 



## So, in HTML
* custom nodes are 
  * managed within the DOM 
  * styled with CSS
  * processed with JS

Angular builds on that and tries to integrate its component model with HTML as much as possible



## Our first component
TODO - translate to Angular 2 

A minimal ``<hello></hello>`` component

```js
angular.module("helloApp").component("hello",
  {
    template: "<h3>Hello World</h3>
  });
```

in the page
```html
<body>
  <hello></hello>
</body>
```



## LAB 01
Create the ``<mail-logo>`` component

Preliminary steps: 
* create a ``mailLogo`` folder under ``components``
* create a ``mailLogo.html`` within ``mailLogo``
* create a ``mailLogo.component.js`` within ``mailLogo``
* add a ``<script>`` reference to ``mailLogo.component.js`` in ``index.html``

Steps: 
* complete the component definition 

Remember: TEST the page at each step



## The importance of Naming conventions
* You already know about this
* even more important in Javascript where you have less support from the Type-system and language




## What's in a Component? 
* a selector, to reference it in HTML 
  * a tag name in the simplest case 

* some HTML
  * inline, with ``template``
  * in an external file, with ``templateUrl``
  * dynamic (with a ``function()``)
* the Component Class



# Beyond Hello World
This is already useful to reduce duplication in our pages, but to be useful, the component must be able to interact with the user and with the rest of the page



## The main page controller
Role of the ``MailView`` component
* interact with backend services
* provide data to the individual components
* coordinate page elements

A look at the code...


## TIP
Separate Layout from components, to increase reuse



## The mail-message-list component
Manages
* display
* navigation within the list
** current message
** Next message action
** Previous message action



## Adding a controller
TODO - translate to Angular 2 

```js
angular.module("mailApp").component("messageList",
  {
    templateUrl: "components/messageList/messageList.html",
    controller: MessageListController //or inline function, if simple
    controllerAs: "messageListCtrl" //default is $ctrl
  });
```



## Where to put the controller
* In the same file, if simple
* in a separate ``messageList.controller.js`` file if more complex
* or agree on a standard convention for your team



## Managing Component Inputs



## TOPICS
* Adding inputs to the Component through bindings



## Input bindings
If we want to reuse the component, for instance
* for the Inbox views
* for a single folder view 
* for the search results

We need to separate 
* where do we get the list of messages
* where this list is stored
* from how it is displayed and navigated



## Passing inputs to Components
```
import {Component} from '@angular/core';
import {Input, Output, EventEmitter} from '@angular/core';

@Component({selector: 'message-viewer', 
    templateUrl : "components/message-viewer/message-viewer.html",
    inputs : ["message"],
    outputs: ["onReply","onForward","onDelete"],
    directives: ["common-star"]
})
export class MessageViewerComponent  {
    message; 
```



## In the index.html
TODO - translate to Angular 2 

```html
  <div ng-controller="MailController as mailCtrl">

    <section class="main-pane">
      <message-list messages="mailCtrl.messages"></message-list>
    </section>
  </div>

```


## In the component definition 
TODO - translate to Angular 2 

```js
angular.module("mailApp").component("messageList",
  {
    ...
    bindings: {
      messages: "<messages" //or just "<" if the name is the same
    }
  });
```
This is automatically available as a ``messages`` field in the controller
```js
  if (this.messages.length >0)
    //doSomething
```



## In the component html
TODO - translate to Angular 2 

```html
  <div ng-repeat="message in messageListController.messages">

  </div>
``` 




# Message List component
Declare the output events in ``MessageViewerComponent.ts``
* reply
* forward
* delete

Handle the button click events and emit the events

In the parent html (mail-view.html)
* bind the events to the ``MailViewComponent`` class methods

In the ``mail-view.html`` conditionally display the compose section when reply / forward is selected



## LAB 02
Define the ``<message-viewer>`` component

Preliminary steps: 
* create a ``message-viewer`` folder under ``components``
* create a ``message-viewer.html`` within ``message-viewer``
* create a ``message-viewer.component.js`` within ``message-viewer``
* add a ``<script>`` reference to ``message-viewer.component.js`` in ``index.html``

Steps: 
* move the mail message html into ``message-viewer.html``
* complete the component definition in ``message-viewer.component.js``, passing in the ``message`` parameter
* link the two components in ``message-list.html``

Remember: TEST the page at each step - __F12 is your friend__



## Aside - simpler parameters
TODO - translate to Angular 2 

With the ``@`` binding 
* Passed to the component on initialization
* can be computed dynamically, but are not watched by default

Typical examples: 
* size
* themes or css styles



## Managing Component Outputs



## TOPICS
* Returning outputs through events and callbacks



## A component cannot do everything by himself
To implement complex logics, a component needs to interact with 
* child components, such as...
* parent components, such as...
* sibling components, such as 



## Separating responsibilities
* the ``<message-list>`` component is responsible for 
  * displaying the list
  * navigating in the list
  * showing which element is selected 

But what to do when the User selects a message can change in different Use Cases

So let's keep this OUT of the ``message-list`` component



## Managing an action with both internal and external Consequences
When a user selects a message, two different thing must take place: 
* within the component, the current message must be outlined
* outside the component, other components must be notified of the selection and perform actions
  * enable buttons
  * update other views



## In the component  
TODO - translate to Angular 2 

```html
  <div ng-click="messageListCtrl.select(message)"> {{message.subject}}} </div>
```

```js
  this.select = function (selectedMessage){
     this.currentMessage = selectedMessage; 
  }
```



## Outside the component
TODO - translate to Angular 2 

We would like to be notified
```html
  <message-list 
    messages="mailCtrl.messages"
    on-select="mailCtrl.messageSelected(message)"
  >
  </message-list>
```



## We need three steps to do this
TODO - translate to Angular 2 

1) declare the event in the bindings
```js
angular.module("mailApp").component("messageList",
  {
    ...
    bindings: {
      onSelected: "&" 
    }
  });
```
This injects an ``onSelected`` event callback in the controller instance

2) call the callback when the message is selected within the component
 ```js
  this.select = function (selectedMessage){
     this.currentMessage = selectedMessage; 
     this.onSelected(selectedMessage); 
  }
```



## This will NOT work, unless you remember step 3
TODO - translate to Angular 2 

3) explicitely declare the event object 
 ```javascript
  this.select = function (selectedMessage){
     this.currentMessage = selectedMessage; 
     this.onSelected({
       message: selectedMessage
     }); 
  }
```





## Propagating output from Components
```
@Component({
  moduleId: module.id,
  selector: 'app-confirm',
  templateUrl: 'confirm.component.html'
})
export class ConfirmComponent {
  @Input() okMsg = '';
  @Input('cancelMsg') notOkMsg = '';
  @Output() ok = new EventEmitter();
  @Output('cancel') notOk = new EventEmitter();
  onOkClick() {
    this.ok.emit(true);
  }
  onNotOkClick() {
    this.notOk.emit(true);
  }
}
```


## LAB 03
Implement the ``<folder-list>`` component
* receive the list of folders from the main MailController 
* display it 
* outline the current folder
* allow for selecting a folder
* notify the MailController, so that it can load the list of messages for that folder



## LAB steps
Define the ``<folder-list>`` component

Preliminary steps: 
* create a ``folder-list`` folder under ``components``
* create a ``folder-list.html`` within ``folder-list``
* create a ``folder-list.component.js`` within ``folder-list``
* add a ``<script>`` reference to ``folder-list.component.js`` in ``index.html``

Steps: 
* move the UI in ``folder-list.html``
* complete the component definition in ``folder-list.component.js``
  * passing in the ``folders`` parameter
  * passing the ``on-selected`` callback
* link the components in ``index.html``

Remember: TEST the page at each step - __F12 is your friend__



# FolderList component
Declaring a Component
1) import Component Class in app.ts
2) add to ``declarations: []`` section 

3) completing the declaration
    * define metadata
    * complete html template
    * activate the selected class on click


Declaring outputs

Instantiate event Emitter

Handle click on folder
* initially, just log it

Emit the event on click

Bind the event in the parent html template (mail view)

Implement the ``selectFolder()`` method in the parent component


## LAB extra 
Pass an additional ``allow-create="true"`` parameter



## Reuse 
Advantages: 
* we can create multiple instances of the components linked to different data



## Readability
When we look at the parent html (index.html or parent component)
* we clearly see the main UI structure
* we get an overview, not low-level details
* we clearly see how components are linked and interact



## Encapsulation 
Changing the Controller or the template of a component has a much reduced risk of introducing regressions elsewhere

The robustness of the application increases if the components are smaller

See also the Clean Code principles on SRP and Class design



#TOPICS 
* How to interconnect multiple collaborating Components to achieve complex UI interactions



## Separation of responsibilities
Component Design Principles
* minimize Coupling
* maximize Cohesion
* every component does one thing Well



## Composition
If we apply this pattern at the application level, 

Components form a hierarchy

We achieve complex behaviours by collaboration of many simpler components

## Examples



# Component-based UI Architecture
* "Smart", "dumb" and "stateless" components



# Two way databinding vs one-way dataflow
* When to use two-way DataBinding and when One-Way Data Flow
<img src="images/phone-wires.jpg" >

* events vs outputs vs services



## Lab 05
Integrate the mail-composer component

Include the component in the app module

Declare inputs
* draft

Declare output events
* send, cancel, and optionally save

Include it in the parent html template

Bind the inputs and outputs

Add the message reply logic to mail-view.ts
* sender becomes to field
* Prepend "Re" to Subject
* Prefix body text with ">"



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


# Forms

ngModel

required

``<form #formName = "ngForm">``

Then form validation status is formName.form.valid

Disable the send button if the form is not valid

Validate minimum 3 characters length in the Subject field

Display a validation error message



# Lifecycle callbacks

## TOPICS

## Simplify the lifecycle of a component
* Reduce boilerplate code
* perform actions only when it is best or needed



## $onInit
## $onChanges
Example: display the count of unread messages

## $onDestroy
Called when the scope of the component is 
## $postLink


## Lab 04
Develop the message-list component

Implement the $OnChanges callback



## To learn more

# Lifecycle Hooks
## ngOnInit
## ngOnChanges
* managing changes in arrays
https://teropa.info/blog/2016/03/06/writing-an-angular-2-template-directive.html



# Create a datepicker

CalendarService 
getDays(monthName)

returns an array of 
{
    number : 1,
    dayOfWeek: "Monday"
}

Initially, hard-coded array

DatePicker component

Add input binding of selected date

Add output binding of selectedChange date

Display the "closed" header with just the current date

Open the day list on click

Close the day list on click and update hte current date

Emit the selectedDateChange even


## Lab 06
Integrate the mail-composer component with the reply button in message viewer



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




#Services
Create a TemplateService class

Create the getReplyTemplate() method

import the service class in mailView.ts

Replace the old code with the new method call

Test ot 

Configure the provider in the app module and re-test with Dependency Injection



#FolderService
Create the FolderService class

methods
* getCustomFolders()
* getFolders()

Create with a nerw an instance in mail-view.ts

Replace the hard-coded folder lists with the new method calls

Add the FolderService class as a Provider in the module

Inject it in the component constructor

Call its methods




# @Injectable
* Injecting Services into Services


# LAB 
Create the LogService and inject it into the other services



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



# Integration with the REST backend
## Making Http calls with Promises 



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



#LAB: Add HTTP clients calling mock REST data
Include the HttpModule in the main module

Import Http service in FolderService

Inject Http service instance in the FolderService constructor

Create the folders.json mock data file in the root project folder (or better in a dedicated data folder)

Implement the http GET call

Convert the result ``toPromise()``

Handle the resulting promise



# More on HTTP: POST
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

