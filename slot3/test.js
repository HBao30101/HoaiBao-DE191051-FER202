//Bai 1
// double: dùng return ngầm định (implicit return)
const double = n => n * 2;


// isEven: dùng return tường minh (explicit return)
const isEven = (n) => {
  return n % 2 === 0;
};


// In kết quả
console.log(double(7));    // 14
console.log(isEven(10));   // true
console.log(isEven(7));    // false


//Bai 2
// sum: cộng tất cả số hợp lệ
const sum = (...nums) => {
  return nums.reduce((total, val) => {
    const n = Number(val); // ép kiểu về số
    return !isNaN(n) ? total + n : total; // chỉ cộng nếu hợp lệ
  }, 0);
};


// avg: trung bình 2 chữ số thập phân
const avg = (...nums) => {
  const validNums = nums.filter(v => !isNaN(Number(v))).map(Number);


  if (validNums.length === 0) return 0;


  const total = validNums.reduce((a, b) => a + b, 0);
  return (total / validNums.length).toFixed(2); // toFixed trả string
};


// In kết quả
console.log(sum(1, 2, 3));        // 6
console.log(sum(1, 'x', 4));      // 5
console.log(avg(1, 2, 3, 4));     // "2.50"
console.log(avg());               // 0


//Bai 3
const person = {
  name: "Costas",
  address: {
    street: "Lalaland 12"
  }
};


// Destructuring
const { address: { street, city = "Unknown City" } } = person;


console.log(street); // Lalaland 12
console.log(city);   // Unknown City


//Bai 4
const ages = [33, 12, 20, 16];


// Destructuring
const [first, , third = 0, ...restAges] = ages;


console.log(first);     // 33
console.log(third);     // 20
console.log(restAges);  // [16]


//Bai 5
const people = [
  { name: "Ann", age: 19 },
  { name: "Tom", age: 12 },
  { name: "Lisa", age: 15 },
  { name: "John", age: 20 },
  { name: "Mary", age: 13 }
];


// Lọc teen (13–19) và map thành chuỗi "Name (Age)"
const teens = people
  .filter(p => p.age >= 13 && p.age <= 19)
  .map(p => `${p.name} (${p.age})`);


// In ra từng dòng
teens.forEach(t => console.log(t));


//Bai 6
const companies = [
  { name: "Company One", category: "Finance", start: 1981, end: 2004 },
  { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
  { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
  { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
  { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
  { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
  { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
  { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
  { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
];


// Sort bất biến + slice
const sorted = [...companies].sort((a, b) => a.end - b.end);
const top3 = sorted.slice(0, 3);


// In ra theo định dạng "Company - EndYear"
top3.forEach(c => console.log(`${c.name} - ${c.end}`));


//Bai 7
const companie = [
  { name: "Company One", category: "Finance", start: 1981, end: 2004 },
  { name: "Company Two", category: "Retail", start: 1992, end: 2008 }
];


// Tạo bản sao bất biến với spread
const company0New = { ...companies[0], start: companies[0].start + 1 };


// Hàm concatAll dùng rest + spread
const concatAll = (...arrays) => {
  return arrays.reduce((acc, arr) => [...acc, ...arr], []);
};


// In kết quả
console.log("Original:", companies[0]);
console.log("New:", company0New);


console.log(concatAll([1, 2], [3], [4, 5]));
//Bai 8
const age = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];


const stats = ages.reduce(
  (acc, age) => {
    // Tổng
    acc.total += age;


    // Min/Max
    if (age < acc.min) acc.min = age;
    if (age > acc.max) acc.max = age;


    // Buckets
    if (age >= 13 && age <= 19) {
      acc.buckets.teen++;
    } else if (age >= 20) {
      acc.buckets.adult++;
    }


    return acc;
  },
  { total: 0, min: Infinity, max: -Infinity, buckets: { teen: 0, adult: 0 } }
);


// In kết quả
console.log(`Total: ${stats.total}, Min: ${stats.min}, Max: ${stats.max}`);
console.log("Buckets:", stats.buckets);



