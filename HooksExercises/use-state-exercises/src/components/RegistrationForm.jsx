import React, { useState, useMemo } from "react";

const REGEX = {
  username: /^[a-zA-Z0-9_.]{3,}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
};

export default function RegistrationForm() {
  const [data, setData] = useState({ username: "", email: "", password: "", confirm: "" });
  const [err, setErr] = useState({});
  const [toast, setToast] = useState(false);
  const [modal, setModal] = useState(false);

  const check = (name, val, pass) => {
    let msg = "";
    if (name === "username") msg = val.trim() !== val ? "Không được chứa khoảng trắng." :
      !REGEX.username.test(val) ? "Username ≥3 ký tự (chữ, số, _, .)" : "";
    if (name === "email" && !REGEX.email.test(val)) msg = "Email không hợp lệ.";
    if (name === "password" && !REGEX.password.test(val)) msg = "Mật khẩu yếu (8+, hoa, thường, số, ký tự đặc biệt).";
    if (name === "confirm" && val !== pass) msg = "Mật khẩu không khớp.";
    setErr((e) => ({ ...e, [name]: msg }));
  };

  const valid = useMemo(() =>
    Object.values(data).every(v => v.trim()) &&
    Object.values(err).every(e => !e) &&
    data.password === data.confirm &&
    REGEX.username.test(data.username) &&
    REGEX.email.test(data.email) &&
    REGEX.password.test(data.password)
  , [data, err]);

  const submit = (e) => {
    e.preventDefault();
    if (!valid) return Object.entries(data).forEach(([k, v]) => check(k, v, data.password));
    setToast(true);
    setModal(true);
    setTimeout(() => setToast(false), 2500);
  };

  const reset = () => {
    setData({ username: "", email: "", password: "", confirm: "" });
    setErr({});
    setToast(false);
    setModal(false);
  };

  const input = (name, type, label, ph) => (
    <div style={{ marginBottom: 15 }}>
      <label style={{ fontWeight: 600, color: "#333" }}>{label}</label>
      <input
        type={type}
        name={name}
        value={data[name]}
        placeholder={ph}
        onChange={(e) => setData({ ...data, [name]: e.target.value })}
        onBlur={(e) => check(name, e.target.value, data.password)}
        style={{
          width: "100%",
          padding: 10,
          borderRadius: 8,
          border: `1.5px solid ${err[name] ? "#e57373" : "#90caf9"}`,
          outline: "none",
        }}
      />
      {err[name] && <div style={{ color: "#d32f2f", fontSize: 12 }}>{err[name]}</div>}
    </div>
  );

  return (
    <div style={{
      maxWidth: 450, margin: "40px auto", padding: 25,
      borderRadius: 12, boxShadow: "0 4px 15px rgba(0,0,0,0.1)", background: "#f7fafd"
    }}>
      <h3 style={{ textAlign: "center", color: "#1976d2", marginBottom: 20 }}>Đăng ký tài khoản 📝</h3>
      <form onSubmit={submit}>
        {input("username", "text", "Username", "Chỉ chữ, số,... (≥3 ký tự)")}
        {input("email", "email", "Email", "example@mail.com")}
        {input("password", "password", "Password", "Mật khẩu mạnh (8+, Hoa, Thường, Số, ĐB)")}
        {input("confirm", "password", "Confirm Password", "Nhập lại mật khẩu")}

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
          <button type="button" onClick={reset} style={{
            background: "#f44336", color: "#fff", border: "none",
            padding: "10px 18px", borderRadius: 6, fontWeight: "bold"
          }}>Reset</button>

          <button disabled={!valid} style={{
            background: valid ? "#4CAF50" : "#a5d6a7", color: "#fff", border: "none",
            padding: "10px 18px", borderRadius: 6, fontWeight: "bold", cursor: valid ? "pointer" : "not-allowed"
          }}>Submit</button>
        </div>
      </form>

      {/* Toast */}
      <div style={{
        position: "fixed", top: 20, right: 20, background: "#4CAF50",
        color: "#fff", padding: "10px 20px", borderRadius: 5,
        opacity: toast ? 1 : 0, transition: "0.3s"
      }}>✅ Submitted successfully!</div>

      {/* Modal */}
      {modal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
          display: "flex", justifyContent: "center", alignItems: "center", zIndex: 999
        }}>
          <div style={{
            background: "#fff", padding: 25, borderRadius: 12,
            width: "90%", maxWidth: 400, boxShadow: "0 5px 20px rgba(0,0,0,0.3)"
          }}>
            <h4 style={{ color: "#1976d2", marginBottom: 10 }}>Đăng ký thành công 🎉</h4>
            <div style={{ background: "#e3f2fd", padding: 10, borderRadius: 8 }}>
              <p><b>Username:</b> {data.username}</p>
              <p><b>Email:</b> {data.email}</p>
              <p><b>Password:</b> *** (ẩn)</p>
            </div>
            <button onClick={() => setModal(false)} style={{
              marginTop: 15, background: "#1976d2", color: "#fff", border: "none",
              padding: "10px 18px", borderRadius: 5, fontWeight: 600
            }}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
}
