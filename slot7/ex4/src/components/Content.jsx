import React from "react";

export default function Content() {
  return (
    <main className="container text-center my-5">
      <section id="about" className="mb-5">
        <h2 className="fw-bold">About</h2>
        <p>This is the about section of the website.</p>
      </section>

      <section id="contact">
        <h2 className="fw-bold">Contact</h2>
        <p>For any inquiries, please contact us at example@example.com.</p>
      </section>
    </main>
  );
}
