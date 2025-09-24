function Exercise5() {
  const people = [
    { name: "Ann", age: 19 },
    { name: "Tom", age: 12 },
    { name: "Lisa", age: 15 },
    { name: "John", age: 20 },
    { name: "Mary", age: 13 },
    { name: "David", age: 17 },
    { name: "Emma", age: 14 },
    { name: "Chris", age: 22 },
    { name: "Sophia", age: 18 },
    { name: "Mike", age: 16 },
  ];

  // Toàn bộ danh sách (Name (Age))
  const allPeople = people.map((p) => `${p.name} (${p.age})`);

  // Lọc teen (13–19) và map sang chuỗi "Name (Age)"
  const teens = people
    .filter((p) => p.age >= 13 && p.age <= 19)
    .map((p) => `${p.name} (${p.age})`);

  return (
    <div style={{ textAlign: "left" }}>
        <h2>Exercise 5</h2>
      <h3>All People</h3>
      {allPeople.map((p, index) => (
        <p key={`all-${index}`}>{p}</p>
      ))}

      <h3>Teen List (13–19)</h3>
      {teens.map((t, index) => (
        <p key={`teen-${index}`}>{t}</p>
      ))}
    </div>
  );
}

export default Exercise5;
