function Exercise1() {
    // 1
    const hamDouble = (x) => x * 2;
    const isEven = (x) => x % 2 === 0;
  return (
    <div>
      <h2>Exercise 1</h2>
      <p>Result of hamDouble(5): {hamDouble(5)}</p>
      <p>Result of isEven(4): {isEven(4).toString()? "Even" : "Odd"}</p>
    </div>
);
}
export default Exercise1;