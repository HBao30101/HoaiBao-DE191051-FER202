function Exercise2() {
    // khai bao mang so nguyen
    const number = [1, 2, 3, 4, 5, 19, -20, 0, 15, -5];
    // tinh tong va gia tri trung binh
    const sum = number.reduce((acc, curr) => acc + curr, 0);
    const average = sum / number.length;

    // khai bao chuoi name, in ra danh sach name theo thu tu tang dan
    const names = ["An", "Binh", "Cuong", "Dung", "Anh"];
    names.sort();

    // Mỗi đối tượng student có các thuộc tính: id, name, age, grade
    const students = [
        { id: 1, name: "An", age: 20, grade: 8.5 },
        { id: 2, name: "Binh", age: 22, grade: 7.0 },
        { id: 3, name: "Cuong", age: 21, grade: 9.0 },
        { id: 4, name: "Dung", age: 23, grade: 6.5 },
        { id: 5, name: "Anh", age: 20, grade: 8.0 }
    ];
    // In ra danh sách sinh viên có điểm >= 7
    const topStudents = students.filter(student => student.grade >= 7).sort((a, b) => b.grade - a.grade);
    // Avaerage grade
    const avgGrade = (students.reduce((acc, student) => acc + student.grade, 0) / students.length).toFixed(2);  
    students.sort((a, b) => a.age - b.age);
    return (
        <div>
        <h2>Exercise 2</h2>
        <p>In mang so nguyen
            <ul>
                {number.map((num, index) => (
                    <li key={index}>{num}</li>
                ))}
            </ul>
        </p>
        <p>
            Tong cac so trong mang la: {sum}
        </p>
        <p>
            Gia tri trung binh cua mang la: {average}
        </p>
        <p>
            Danh sach ten:
            <ul>
                {names.map((name, index) => (
                    <li key={index}>{name}</li>
                ))}
            </ul>
        </p>
        <p>
            Danh sach sinh vien co diem lon hon hoac bang 7
            <ul>
                {topStudents.map(student => (
                    <li key={student.id}>{student.name}: {student.grade}</li>
                ))}
            </ul>
        </p>
        <p>
            Danh sach theo dang bang:
            <table border="1" cellPadding="5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {students.filter(student => ( student.grade >= 7)).map(student => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.grade}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="3"><strong>Average Grade</strong></td>
                        <td><strong>{avgGrade}</strong></td>
                    </tr>
                </tbody>
            </table>    
        </p>    
        <p>
            Danh sach sinh vien co tuoi tu 20-22:
            <table border="1" cellPadding="5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {students.filter(student => ( student.age <= 22 && student.age >= 20)).map(student => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.grade}</td>
                        </tr>
                    ))}
                </tbody>
            </table>    
        </p>
        </div>
    );
}

export default Exercise2;