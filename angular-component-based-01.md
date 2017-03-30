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
* Angular 1.5 Component model and API
* How to develop a simple Component in Angular 1.5



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
* a name, to reference it in HTML (with CamelCase to kebab-case convention)
* some HTML
  * inline, with ``template``
  * in an external file, with ``templateUrl``
  * dynamic (with a ``function()``)
* an optional controller
  * aliased as ``$ctrl`` by default



# Beyond Hello World
This is already useful to reduce duplication in our pages, but to be useful, the component must be able to interact with the user and with the rest of the page



## The main page controller
Role of the ``MailController``
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



## In the index.html
```html
  <div ng-controller="MailController as mailCtrl">

    <section class="main-pane">
      <message-list messages="mailCtrl.messages"></message-list>
    </section>
  </div>

```


## In the component definition 
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
```html
  <div ng-repeat="message in messageListController.messages">

  </div>
``` 



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
```html
  <div ng-click="messageListCtrl.select(message)"> {{message.subject}}} </div>
```

```js
  this.select = function (selectedMessage){
     this.currentMessage = selectedMessage; 
  }
```



## Outside the component
We would like to be notified
```html
  <message-list 
    messages="mailCtrl.messages"
    on-select="mailCtrl.messageSelected(message)"
  >
  </message-list>
```



## We need three steps to do this
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
3) explicitely declare the event object 
 ```javascript
  this.select = function (selectedMessage){
     this.currentMessage = selectedMessage; 
     this.onSelected({
       message: selectedMessage
     }); 
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



## Lab 06
Integrate the mail-composer component with the reply button in message viewer



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
