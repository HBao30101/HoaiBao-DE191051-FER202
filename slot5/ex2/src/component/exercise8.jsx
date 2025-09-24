import React from "react";

function ReduceStats() {
  const ages = [12, 15, 19, 20, 25, 30, 17, 13];

  const stats = ages.reduce(
    (acc, age) => {
      // tổng
      acc.total += age;
      // min
      if (age < acc.min) acc.min = age;
      // max
      if (age > acc.max) acc.max = age;
      // đếm nhóm
      if (age >= 13 && age <= 19) acc.buckets.teen += 1;
      if (age >= 20) acc.buckets.adult += 1;
      return acc;
    },
    { total: 0, min: Infinity, max: -Infinity, buckets: { teen: 0, adult: 0 } }
  );

  return (
    <div>
      <h2>Exercise 8</h2>
      <h2>Age Statistics</h2>
      <div>
        Total: {stats.total}, Min: {stats.min}, Max: {stats.max}
      </div>
      <div>
        Buckets: {JSON.stringify(stats.buckets)}
      </div>
    </div>
  );
}

export default ReduceStats;
