import React from "react";

function SpreadRestExample() {
  const companies = [
    { name: "Company A", category: "Tech", start: 2000, end: 2010 },
    { name: "Company B", category: "Finance", start: 1995, end: 2005 },
  ];

  // 1. Tạo company0New mà start tăng 1, không mutate companies[0]
  const company0New = { ...companies[0], start: companies[0].start + 1 };

  // 2. Hàm concatAll dùng rest parameter để gộp mảng
  function concatAll(...arrays) {
    return arrays.flat();
    // hoặc return [].concat(...arrays);
  }

  const concatenated = concatAll([1, 2], [3], [4, 5]);

  return (
    <div>
      <h2>Exercise 7</h2>
      <h2>Spread vs Rest Example</h2>
      <div>
        <strong>Original companies[0]:</strong>
        <pre>{JSON.stringify(companies[0], null, 2)}</pre>
      </div>
      <div>
        <strong>New company0New (start + 1):</strong>
        <pre>{JSON.stringify(company0New, null, 2)}</pre>
      </div>
      <div>
        <strong>concatAll([1,2],[3],[4,5]):</strong>
        <pre>{JSON.stringify(concatenated)}</pre>
      </div>
    </div>
  );
}

export default SpreadRestExample;
