function Exercise3() {
  const person = {
    name: "Costas",
    address: {
      street: "Lalaland 12"
      // city không có -> sẽ dùng default
    }
  };

  // Destructuring lồng nhau + default value
  const {
    address: {
      street,
      city = "Unknown City"
    }
  } = person;

  return (
    <div style={{ textAlign: "left" }}>
        <h2>Exercise 3</h2>
      <p>Street: {street}</p>
      <p>City: {city}</p>
    </div>
  );
}

export default Exercise3;
