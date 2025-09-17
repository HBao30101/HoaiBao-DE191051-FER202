// Tạo 1 mảng số nguyên
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Duyệt qua mảng (cách 1: for)
for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}

// Duyệt qua mảng (cách 2: forEach)
numbers.forEach(num => console.log(num));

// Duyệt qua mảng (cách 3: map)
numbers.map(num => console.log(num));

 //Bài 2 // In ra mảng mới gồm các số chẵn (dùng filter)
let evenNumbers = numbers.filter(num => num % 2 === 0);
console.log("Số chẵn:", evenNumbers);

// Tạo mảng people
let people = [
  { id: 1, name: "An", age: 18 },
  { id: 2, name: "Bảo", age: 25 },
  { id: 3, name: "Chi", age: 30 },
  { id: 4, name: "Dung", age: 19 }
];

// Duyệt qua mảng -> In ra danh sách id, name, age
people.forEach(person => {
  console.log(`ID: ${person.id}, Name: ${person.name}, Age: ${person.age}`);
});

// Lọc ra danh sách người có age > 20
let over20 = people.filter(person => person.age > 20);
console.log("Người có tuổi > 20:", over20);


