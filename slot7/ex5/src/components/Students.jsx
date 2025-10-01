import React from "react";

const students = [
  {
    id: "DE160182",
    name: "Nguyễn Hữu Quốc Khánh",
    address: "DaNang",
    img: "https://www.shutterstock.com/image-photo/primary-school-students-think-perform-260nw-1145766542.jpg",
  },
  {
    id: "DE160377",
    name: "Choy Vĩnh Thiên",
    address: "QuangNam",
    img: "https://www.workitdaily.com/media-library/a-happy-young-teacher-grades-an-assignment-from-one-of-her-students.jpg?id=22146397&width=1200&height=800&quality=85&coordinates=0%2C0%2C0%2C1",
  },
  {
    id: "DE160547",
    name: "Đỗ Nguyên Phúc",
    address: "QuangNam",
    img: "https://media.istockphoto.com/id/1056467104/photo/cheering-student-looking-at-a-test-results-on-a-laptop-computer.jpg?s=612x612&w=0&k=20&c=tHysd3tfePW8FF2QWiREPPZOGaEgyh8jrsbWFD5Gs3Y=",
  },
  {
    id: "DE170049",
    name: "Lê Hoàng Minh",
    address: "DaNang",
    img: "https://www.shutterstock.com/image-photo/student-curly-red-hair-holding-260nw-2628013179.jpg",
  },
];

export default function Students() {
  return (
    <div className="container my-5">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
  <ol
    className="breadcrumb"
    style={{
      display: "inline-flex",
      gap: "5px",
      padding: "5px 10px",
      backgroundColor: "#f8f9fa",
      borderRadius: "12px",
    }}
  >
    <li className="breadcrumb-item" style={{ margin: 0 }}>
      <a href="#" style={{ color: "#e8823e", textDecoration: "none" }}>Home</a>
    </li>
    <li className="breadcrumb-item active" aria-current="page" style={{ margin: 0 }}>
      Students
    </li>
  </ol>
</nav>


      {/* Tiêu đề */}
      <h2 className="text-center mb-4">Students Detail</h2>

      {/* Grid students */}
      <div className="row">
        {students.map((st, index) => (
          <div className="col-md-6 mb-4" key={index}>
            <div className="card h-100">
              <img src={st.img} className="card-img-top" alt={st.name} />
              <div className="card-body">
                {/* Hàng 1: ID */}
                <h5 className="text-center mb-3">{st.id}</h5>

                {/* Hàng 2: Name - Address */}
                <div className="d-flex justify-content-between mb-3">
                  <span className="fw-bold">{st.name}</span>
                  <span>{st.address}</span>
                </div>

                {/* Hàng 3: Absent - Present */}
                <div className="d-flex justify-content-between mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`attendance-${st.id}`}
                      id={`absent-${st.id}`}
                    />
                    <label className="form-check-label" htmlFor={`absent-${st.id}`}>
                      Absent
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`attendance-${st.id}`}
                      id={`present-${st.id}`}
                    />
                    <label className="form-check-label" htmlFor={`present-${st.id}`}>
                      Present
                    </label>
                  </div>
                </div>

                {/* Hàng 4: Submit */}
                <div className="text-center">
                  <button
                    className="btn"
                    style={{
                      backgroundColor: "#e8823e", // cam đậm
                      color: "white",
                      border: "1px solid black",
                      borderRadius: "10px", // bo tròn
                      padding: "6px 20px",
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
