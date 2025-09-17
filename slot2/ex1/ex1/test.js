let greet = (name, timeOfDay) => {
  console.log(`Good ${timeOfDay}, ${name}!`);
};

greet('Alice', 'morning')
// Output: Good morning, Alice!

greet('Bob', 'evening')
// Output: Good evening, Bob!

//Function 3:
let square = num => {
  return num * num;
};

console.log(square(5)); // Output: 25
console.log(square(8)); // Output: 64

//Function 4
let sayHello = () => {
  console.log("Hello there!");
};

sayHello(); // Output: Hello there!

//Function 5
let person = {
  name: "John",
  age: 30,
  greet: function() {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
  }
};

//Function 6
function example() {
  let x = 10; // block-scoped variable

  if (true) {
    let y = 20; // block-scoped variable
    console.log(x); // Output: 10
    console.log(y); // Output: 20
  }

  console.log(x); // Output: 10
  console.log(y); // Error: y is not defined
}

example();

//Function 7
function example1() {
  const PI = 3.14159; // constant

  if (true) {
    const MAX_VALUE = 100; // constant
    console.log(PI); // Output: 3.14159
    console.log(MAX_VALUE); // Output: 100
  }

  console.log(PI); // Output: 3.14159
  console.log(MAX_VALUE); // Error: MAX_VALUE is not defined
}

example();

//Function 8
function sum(...numbers) {
  let total = 0;
  for (let number of numbers) {
    total += number;
  }
  return total;
}

console.log(sum(1, 2, 3, 4, 5)); // Output: 15
console.log(sum(10, 20));        // Output: 30
console.log(sum(3, 6, 9, 12, 15, 18)); // Output: 63

//Function 9
const numbers = [1, 2, 3, 4, 5];

// Destructuring assignment
const [a, b, ...rest] = numbers;

console.log(a);    // Output: 1
console.log(b);    // Output: 2
console.log(rest); // Output: [3, 4, 5]

//Function 10
const person1 = {
  name1: 'John Doe',
  age1: 30,
  city1: 'New York'
};

// Destructuring assignment
const { name1, age1, city1 } = person1;

console.log(name1); // Output: 'John Doe'
console.log(age1);  // Output: 30
console.log(city1); // Output: 'New York'

//Function 11
function greet1(name = 'Guest') {
  console.log(`Hello, ${name}!`);
}

greet1();        // Output: Hello, Guest!
greet1('John');  // Output: Hello, John!

function createFullName(firstName, lastName = 'Doe') {
  console.log(`${firstName} ${lastName}`);
}

createFullName('John');             // Output: John Doe
createFullName('Jane', 'Smith');    // Output: Jane Smith

