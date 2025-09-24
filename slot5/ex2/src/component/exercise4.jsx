function Exercise4() {
  const ages = [33, 12, 20, 16];

  // destructuring array
  const [first, , third = 0, ...restAges] = ages;
  // ^ bỏ qua phần tử thứ 2 bằng dấu phẩy trống

  return (
    <div style={{ textAlign: "left" }}>
        <h2>Exercise 4</h2>
      <p>First: {first}</p>
      <p>Third: {third}</p>
      <p>Rest Ages: {restAges.join(", ")}</p>
    </div>
  );
}

export default Exercise4;
