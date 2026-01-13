# 📘 Learning JavaScript

---
### What is JavaScript?

JavaScript is a high-level, interpreted programming language used to create interactive, dynamic, and responsive web applications.  

It runs directly in the browser and allows developers to control webpage behavior such as user interactions, data updates, animations, and real-time content changes. 

JavaScript is one of the core web technologies, alongside HTML (structure) and CSS (styling), and is also widely used on the server-side, mobile apps, and desktop applications.

---
### Data Types & Variables

Variables
```
// Three ways to declare variables:
var oldWay = "avoid using var"; // old, function-scoped
let age = 25; // can be reassigned
const name = "Sarah"; // cannot be reassigned

age = 26; // ✓ works
// name = "John"; // ✗ error - can't reassign const
```

Data Types
```
// 1. STRING - text
let greeting = "Hello";
let message = 'Single quotes work too';
let template = `I can include ${greeting} here`; // template literal

// 2. NUMBER - integers and decimals
let integer = 42;
let decimal = 3.14;
let negative = -10;

// 3. BOOLEAN - true or false
let isStudent = true;
let hasGraduated = false;

// 4. UNDEFINED - no value assigned
let notDefined;
console.log(notDefined); // undefined

// 5. NULL - intentionally empty
let emptyValue = null;

// 6. Check types
console.log(typeof greeting); // "string"
console.log(typeof integer); // "number"
```

### Operators & Control Flow

Arithmetic Operators
```
let a = 10;
let b = 3;

console.log(a + b); // 13 (addition)
console.log(a - b); // 7 (subtraction)
console.log(a * b); // 30 (multiplication)
console.log(a / b); // 3.333... (division)
console.log(a % b); // 1 (remainder/modulo)
console.log(a ** b); // 1000 (exponentiation)

// Increment/Decrement
let count = 5;
count++; // count is now 6
count--; // count is now 5
```

Comparison Operators
```
let x = 5;
let y = "5";

console.log(x == y);  // true (loose equality, converts types)
console.log(x === y); // false (strict equality, checks type too)
console.log(x != y);  // false
console.log(x !== y); // true

console.log(x > 3);   // true
console.log(x <= 5);  // true
```

If Statements
```
let temperature = 25;

if (temperature > 30) {
    console.log("It's hot!");
} else if (temperature > 20) {
    console.log("Nice weather!"); // This runs
} else {
    console.log("It's cold!");
}

// Ternary operator (shorthand)
let status = temperature > 25 ? "Warm" : "Cool";
```
Loops
```
// FOR loop - when you know how many times
for (let i = 0; i < 5; i++) {
    console.log(`Count: ${i}`); // 0, 1, 2, 3, 4
}

// WHILE loop - when condition-based
let countdown = 3;
while (countdown > 0) {
    console.log(countdown); // 3, 2, 1
    countdown--;
}

// DO-WHILE - runs at least once
let answer;
do {
    answer = prompt("Enter 'yes':");
} while (answer !== "yes");
```

### Functions

Basic Functions
```
// Function declaration
function greet(name) {
    return `Hello, ${name}!`;
}

console.log(greet("Alex")); // "Hello, Alex!"

// Function with multiple parameters
function add(a, b) {
    return a + b;
}

let sum = add(5, 3); // 8

// Default parameters
function welcome(name = "Guest") {
    return `Welcome, ${name}!`;
}

console.log(welcome()); // "Welcome, Guest!"
console.log(welcome("Sam")); // "Welcome, Sam!"
```

Arrow Functions (Modern Syntax)
```
// Traditional function
function multiply(a, b) {
    return a * b;
}

// Arrow function (shorter)
const multiply = (a, b) => {
    return a * b;
};

// Even shorter (implicit return)
const multiply = (a, b) => a * b;

// Single parameter (no parentheses needed)
const square = x => x * x;

console.log(square(4)); // 16
```

### Objects & Arrays

Objects: Collections of Key-Value Pairs
```
// Creating an object
const person = {
    firstName: "Emma",
    lastName: "Wilson",
    age: 28,
    isEmployed: true,
    greet: function() {
        return `Hi, I'm ${this.firstName}`;
    }
};

// Accessing properties
console.log(person.firstName); // "Emma"
console.log(person["lastName"]); // "Wilson"
console.log(person.greet()); // "Hi, I'm Emma"

// Adding/modifying properties
person.city = "Boston";
person.age = 29;

// Deleting properties
delete person.isEmployed;

// Object methods (ES6)
const car = {
    brand: "Tesla",
    start() {
        return `${this.brand} is starting`;
    }
};
```

Arrays: Ordered Lists
```
// Creating arrays
const fruits = ["apple", "banana", "orange"];
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, "hello", true, null];

// Accessing elements (zero-indexed)
console.log(fruits[0]); // "apple"
console.log(fruits[2]); // "orange"

// Array length
console.log(fruits.length); // 3

// Adding elements
fruits.push("grape"); // adds to end
fruits.unshift("mango"); // adds to beginning

// Removing elements
let last = fruits.pop(); // removes from end
let first = fruits.shift(); // removes from beginning

// Finding elements
let index = fruits.indexOf("banana"); // 1
let exists = fruits.includes("apple"); // true
```

Array Methods (Essential)
```
const numbers = [1, 2, 3, 4, 5];

// MAP - transform each element
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// FILTER - keep elements that match condition
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4]

// REDUCE - combine all elements into single value
const sum = numbers.reduce((total, num) => total + num, 0);
console.log(sum); // 15

// FOREACH - perform action on each element
numbers.forEach(num => {
    console.log(`Number: ${num}`);
});

// FIND - get first matching element
const found = numbers.find(num => num > 3);
console.log(found); // 4
```

### DOM Manipulation

The DOM (Document Object Model) lets JavaScript interact with HTML.

```
// Selecting elements
const heading = document.getElementById("title");
const buttons = document.getElementsByClassName("btn");
const firstButton = document.querySelector(".btn"); // CSS selector
const allButtons = document.querySelectorAll(".btn");

// Changing content
heading.textContent = "New Title";
heading.innerHTML = "<em>Styled Title</em>";

// Changing styles
heading.style.color = "blue";
heading.style.fontSize = "32px";

// Adding/removing classes
heading.classList.add("active");
heading.classList.remove("inactive");
heading.classList.toggle("highlight");

// Creating elements
const newDiv = document.createElement("div");
newDiv.textContent = "Hello!";
document.body.appendChild(newDiv);

// Event listeners
const button = document.querySelector("#myButton");
button.addEventListener("click", () => {
    alert("Button clicked!");
});

// Input handling
const input = document.querySelector("#nameInput");
input.addEventListener("input", (e) => {
    console.log("You typed:", e.target.value);
});
```

### Asynchronous JavaScript

JavaScript can handle tasks that take time without blocking other code.
<b>Callbacks</b>

```
function fetchData(callback) {
    setTimeout(() => {
        const data = { name: "John", age: 30 };
        callback(data);
    }, 1000);
}

fetchData((data) => {
    console.log(data); // runs after 1 second
});
```

<b>Promises (Better than callbacks)</b>

```
function fetchUser() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = true;
            if (success) {
                resolve({ name: "Alice", age: 25 });
            } else {
                reject("Error fetching user");
            }
        }, 1000);
    });
}

// Using the promise
fetchUser()
    .then(user => {
        console.log("User:", user);
        return user.age;
    })
    .then(age => {
        console.log("Age:", age);
    })
    .catch(error => {
        console.error(error);
    });
```

### Async/Await (Cleanest syntax)

```
async function getUser() {
    try {
        const response = await fetch("https://api.example.com/user");
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error:", error);
    }
}

getUser();

// Multiple awaits
async function getUserAndPosts() {
    const user = await fetchUser();
    const posts = await fetchPosts(user.id);
    return { user, posts };
}
```

### Advanced Concepts

<b>Destructuring</b>

```
// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(rest); // [3, 4, 5]

// Object destructuring
const person = { name: "Bob", age: 30, city: "NYC" };
const { name, age } = person;
console.log(name); // "Bob"

// Rename while destructuring
const { name: personName } = person;
```

<b>Spread Operator</b>

```
// Copying arrays
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

// Merging arrays
const combined = [...arr1, ...arr2];

// Copying objects
const original = { a: 1, b: 2 };
const copy = { ...original, c: 3 }; // { a: 1, b: 2, c: 3 }
```

<b>Classes</b>

```
class Animal {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
    
    speak() {
        return `${this.name} makes a sound`;
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name, "dog");
    }
    
    speak() {
        return `${this.name} barks!`;
    }
}

const myDog = new Dog("Rex");
console.log(myDog.speak()); // "Rex barks!"
```

<b>Modules (ES6)</b>

```
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// main.js
import { add, subtract } from './math.js';
console.log(add(5, 3)); // 8
```

---

## 🎂 Age Calculator
**What You’ll Learn:** Variables & operators, DOM manipulation, Date manipulation & calculations, input validation, dynamic UI updates  

📸 **Screenshot**  
![Age Calculator](screenshots/age-calculator.png)

<a href="https://pankajsondagar.github.io/javascript/beginner-projects/age-calculator/" target="_blank" rel="noopener noreferrer">
  🚀 Live Demo
</a>

---

## 🌡️ Temperature Converter
**What You’ll Learn:** Real-time updates, temperature conversion formulas, multiple output handling, Functions, conditionals

📸 **Screenshot**  
![Temperature Converter](screenshots/temperature-converter.png)

<a href="https://pankajsondagar.github.io/javascript/beginner-projects/temperature-converter/" target="_blank" rel="noopener noreferrer">
  🚀 Live Demo
</a>

---

## 💬 Random Quote Generator
**What You’ll Learn:** Data collections, random number generation, duplicate prevention, Arrays & objects, random logic, event handling   

📸 **Screenshot**  
![Random Quote Generator](screenshots/random-quote-generator.png)

<a href="https://pankajsondagar.github.io/javascript/beginner-projects/quote-generator/" target="_blank" rel="noopener noreferrer">
  🚀 Live Demo
</a>

---

## 🎨 Color Flipper
**What You’ll Learn:** HEX/RGB colors, brightness calculation, dynamic style updates, Random color generation, string manipulation,

📸 **Screenshot**  
![Color Flipper](screenshots/color-flipper.png)

<a href="https://pankajsondagar.github.io/javascript/beginner-projects/color-flipper/" target="_blank" rel="noopener noreferrer">
  🚀 Live Demo
</a>

---

## 🔢 Simple Counter 
**What You’ll Learn:** State handling, keyboard & button events, animations, increment/decrement logic, conditional styling 

📸 **Screenshot**  
![Simple Counter](screenshots/simple-counter.png)

<a href="https://pankajsondagar.github.io/javascript/beginner-projects/simple-counter/" target="_blank" rel="noopener noreferrer">
  🚀 Live Demo
</a>

---

## ✅ Todo List App
**What You’ll Learn:** Task filtering, persistent state, dynamic rendering, Array manipulation, CRUD operations, state management  

📸 **Screenshot**  
![Todo List App](screenshots/todo-list.png)

<a href="https://pankajsondagar.github.io/javascript/beginner-projects/todo-list/" target="_blank" rel="noopener noreferrer">
  🚀 Live Demo
</a>

---

---

## 🧠 Intermediate Concepts 

---

## 🎂 Password Generator
**What You’ll Learn:** String manipulation and concatenation, Clipboard API for copying text, DOM manipulation and styling  

📸 **Screenshot**  
![Password Generator](screenshots/password-generator.png)

<a href="https://pankajsondagar.github.io/javascript/intermediate-projects/password-generator/" target="_blank" rel="noopener noreferrer">
  🚀 Live Demo
</a>

---

## 🎂 Tip Calculator
**What You’ll Learn:** Form Handling, Calculations, State Management, DOM Manipulation, UI Patterns, Money Operations   

📸 **Screenshot**  
![Tip Calculator](screenshots/tip-calculator.png)

<a href="https://pankajsondagar.github.io/javascript/intermediate-projects/tip-calculator/" target="_blank" rel="noopener noreferrer">
  🚀 Live Demo
</a>

---

## 🎂 BMI Calculator
**What You’ll Learn:** Validation, Calculations, Conditionals & Ranges, Data Structures, DOM Manipulation, User Experience

📸 **Screenshot**  
![BMI Calculator](screenshots/bmi-calculator.png)

<a href="https://pankajsondagar.github.io/javascript/intermediate-projects/bmi-calculator/" target="_blank" rel="noopener noreferrer">
  🚀 Live Demo
</a>

---

## 🎂 Word Counter
**What You’ll Learn:**  String manipulation in depth, Text parsing and analysis, Real-time DOM updates, Frequency counting algorithms, Regular expressions basics, Array transformation methods

📸 **Screenshot**  
![Word Counter](screenshots/word-counter.png)

<a href="https://pankajsondagar.github.io/javascript/intermediate-projects/word-counter/" target="_blank" rel="noopener noreferrer">
  🚀 Live Demo
</a>

---

## 🎂 Rock Paper Scissors
**What You’ll Learn:**  Game Logic, Score Management, Data Structures, Advanced Logic, DOM Updates, User Experience   

📸 **Screenshot**  
![Rock Paper Scissors](screenshots/rock-paper-scissors.png)

<a href="https://pankajsondagar.github.io/javascript/intermediate-projects/rock-paper-scissors/" target="_blank" rel="noopener noreferrer">
  🚀 Live Demo
</a>

---

## 🎂 Quiz App
**What You’ll Learn:** Data Structures, Array Methods, Timers, Scoring Systems, State Management, Algorithm Concepts    

📸 **Screenshot**  
![Quiz App](screenshots/quiz-app.png)

<a href="https://pankajsondagar.github.io/javascript/intermediate-projects/quiz-app/" target="_blank" rel="noopener noreferrer">
  🚀 Live Demo
</a>

---

## 🎂 Weather App
**What You’ll Learn:** Asynchronous JavaScript with async/await, Making API requests with fetch, Error handling in async code, Working with real external data, Browser APIs (geolocation, localStorage), Loading and error states, Data transformation and display      

📸 **Screenshot**  
![Weather App](screenshots/weather-app.png)

<a href="https://pankajsondagar.github.io/javascript/intermediate-projects/weather-app/" target="_blank" rel="noopener noreferrer">
  🚀 Live Demo
</a>

---

## Accordion Component
**What You’ll Learn:** Show/hide state management, Event handling (clicks, keyboard), Dynamic HTML generation, Overlay patterns and positioning, Accessibility basics

📸 **Screenshot**  
![Weather App](screenshots/accoridon-component.png)

<a href="https://pankajsondagar.github.io/javascript/advanced-projects/accordion-component/" target="_blank" rel="noopener noreferrer">
  🚀 Live Demo
</a>

---