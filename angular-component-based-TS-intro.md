# PART 1 - Introduction Typescript



## TOPICS
* Syntax 
* Pros of using Typescript



## Typescript
* Superset of Javascript 
* very powerful
* Compile output is Javascript
* Java/C++/C# developers are more comfortable than with Javascript
* Valid Javascript code is valid Typescript code
* Easier to implement
    * modularity
    * robustness
    * readability	
    * maintainability



## Typescript
* Errors at compile time 
* Developer tools
    * Visual studio code and plugins
    * ... but you can use the IDE you want



## Classes
```typescript
class Persona { 
    constructor(private nome: string, private cognome: string) { 
        
    }

    visualizzaNomeCognome() {
        return this.nome + ' ' + this.cognome; 
    } 
} 
```



## Inheritance
```typescript
enum Materie {Storia, Informatica, Matematica, Scienze}; 

class Studente extends Persona { 
    materie: Materie[]; 

    constructor(nome, cognome) { 
        super(nome, cognome); 
    } 
}
```



## Generics
```typescript
function identity<T>(arg: T): T { return arg; }

let output = identity<string>("myString");
```



## Functions

```typescript
function buildName(firstName = "Jim", lastName?: string) { 
	if (lastName) 
		return firstName + " " + lastName; 
	else return firstName; 
}

buildName();
buildName("Jack");
buildName("Jack","Jones");

```



## Fat arrow functions
```typescript
let inc = (x)=>x+1;

onClickGood = (e: Event) => { this.info = e.message }
```



## Fat arrow functions: scope
```typescript
...
let a = this;
myFunction(function(value){
   let b = this; 
});
...
```
Is a and b the same object?

```typescript
...
let a = this;
myFunction((value)=>{
   let b = this; 
});
...
```
And now?



## Example: Compile errors

```typescript
var utente = {nome: "Mario", cognome: "Rossi", nome: "Carlo"};
var ora = Date().getTime(); 

document.onload = init(); 
function init() {    
    var elemento = document.getElementByID("myDiv");    elemento.innerHTML = "Test!";
}

```

try it on http://www.typescriptlang.org/play/



## Example: Type errors
Without type checking
```typescript
var x = "test";
function square(n) {
    return n*n;
}
var y = square(x);
```

With type checking
```typescript
var x = "test";
function square(n:number) {
    return n*n;
}
var y = square(x);
```

try it on http://www.typescriptlang.org/play/