import React from "react";
import "src/App.css";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>YourArt </h1>
        <p>Вивчай і колекціонуй картини за допомогою штучного інтелекту</p>
      </header>

      <main className="app-main">
        <button className="scan-button">Відсканувати картину</button>
        <div className="info-text">
          <p>Наведи камеру на картину, щоб отримати інформацію про автора, рік і стиль.</p>
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2025 YourArt | Розроблено студентом</p>
      </footer>
    </div>
  );
}

export default App;
