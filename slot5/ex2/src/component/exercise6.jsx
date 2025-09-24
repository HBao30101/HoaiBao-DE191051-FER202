import React from "react";

function CompanyList() {
  const companies = [
    { name: "Company A", category: "Tech", start: 2000, end: 2010 },
    { name: "Company B", category: "Finance", start: 1995, end: 2005 },
    { name: "Company C", category: "Retail", start: 2010, end: 2020 },
    { name: "Company D", category: "Health", start: 2005, end: 2015 },
    { name: "Company E", category: "Tech", start: 2018, end: 2023 }
  ];

  // Tạo bản sao mảng rồi sort theo end tăng dần
  const sortedCompanies = [...companies].sort((a, b) => a.end - b.end);

  // Lấy 3 công ty đầu
  const top3 = sortedCompanies.slice(0, 3);

  return (
    <div>
      <h2>Exercise 6</h2>
      <h2>Top 3 Companies by End Year:</h2>
      <ul>
        {top3.map((company, index) => (
          <li key={index}>
            {company.name} - {company.end}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompanyList;
