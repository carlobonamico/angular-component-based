# PART 3 - More on Angular



## TOPICS
* From AngularJS 1.5 to Angular 2.0: syntax changes, 
* but Component-based architecture remains



## Without Typescript
```
ConfirmComponent.annotations = [
  new ng.core.Component({
    selector: 'app-confirm',
    templateUrl: 'app/confirm.component.html',
    inputs: [
      'okMsg',
      'notOkMsg: cancelMsg'
    ],
    outputs: [
      'ok',
      'notOk: cancel'
    ]
  })
];
function ConfirmComponent() {
  this.ok    = new ng.core.EventEmitter();
  this.notOk = new ng.core.EventEmitter();
}
ConfirmComponent.prototype.onOkClick = function() {
  this.ok.emit(true);
}
ConfirmComponent.prototype.onNotOkClick = function() {
  this.notOk.emit(true);
}
```



## What if I do not want Typescript? 
https://angular.io/docs/ts/latest/cookbook/ts-to-js.html
```
HeroComponent.annotations = [
  new ng.core.Component({
    selector: 'hero-view',
    template: '<h1>{{title}}: {{getName()}}</h1>'
  })
];
```



## Or with DSL 
```
app.HeroDslComponent = ng.core.Component({
    selector: 'hero-view-dsl',
    template: '<h1>{{title}}: {{getName()}}</h1>',
  })
  .Class({
    constructor: function HeroDslComponent() {
      this.title = "Hero Detail";
    },
    getName: function() { return 'Windstorm'; }
  });
```


## Routed Components



## Hierarchical DI



## ngUpgrade
* How to incrementally upgrade an application from 1.5 to 2.0 with ng-upgrade



## Performance 
* Sidenote: performance tips



