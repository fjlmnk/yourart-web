import React, { useState } from "react";
import "./App.css";
import Webcam from "react-webcam";


// --- КОМПОНЕНТ 1: ГЛАВНАЯ СТРАНИЦА ---
function HomePage({ onStartScan }) {
  return (
    <div className="app-container home-page">
      <header className="app-header-original">
        <h1>YourArt</h1>
        <p>Вивчай і колекціонуй картини за допомогою штучного інтелекту</p>
      </header>

      <main className="app-main-original">
        <div className="hero-section">
          <div className="hero-icon">🎨</div>
        </div>

        <button className="scan-button-main" onClick={onStartScan}>
          Відсканувати картину
        </button>

        <div className="info-text-original">
          <p>
            Наведи камеру на картину, щоб отримати інформацію про автора, рік і
            стиль.
          </p>
        </div>
      </main>

      <footer className="app-footer-original">
        <p>© 2025 YourArt | Розроблено студентом</p>
      </footer>
    </div>
  );
}

// --- КОМПОНЕНТ 2: СТРАНИЦА СКАНИРОВАНИЯ ---
function ScanPage({ onGoBack }) {
  return (
    <div className="app-container scan-page">

      {/* Верхняя панель */}
      <header className="scan-header">
        <button className="icon-btn" onClick={onGoBack}>
          <span>←</span>
        </button>
        <div className="header-dots">
          <span>•••</span>
        </div>
      </header>

      {/* Область сканирования */}
      <main className="scan-main">
        <div className="scan-frame-container">
          <div className="scan-frame">
            <div className="scan-corner top-left"></div>
            <div className="scan-corner top-right"></div>
            <div className="scan-corner bottom-left"></div>
            <div className="scan-corner bottom-right"></div>

<Webcam 
  className="camera-preview"
  audio={false}
  screenshotFormat="image/jpeg"
  videoConstraints={{
    facingMode: "environment", // задня камера на телефонах
  }}
/>

          </div>
        </div>

        {/* Элементы управления */}
        <div className="scan-controls">
          <button className="control-small-btn">
            <span>↩</span>
          </button>
          <button className="scan-action-btn">SCAN</button>
          <button className="control-small-btn">
            <span>⚡</span>
          </button>
        </div>

        {/* Карусель */}
        <div className="scan-carousel">
          <div className="carousel-item"></div>
          <div className="carousel-item active"></div>
          <div className="carousel-item"></div>
        </div>
      </main>

      {/* Нижняя навигация */}
      <footer className="scan-footer">
        <button className="nav-btn" onClick={onGoBack}>
          <span>🏠</span>
        </button>
        <button className="nav-btn active">
          <span>📷</span>
        </button>
        <button className="nav-btn">
          <span>👤</span>
        </button>
      </footer>
    </div>
  );
}

// --- ГЛАВНЫЙ КОМПОНЕНТ ---
function App() {
  const [isScanning, setIsScanning] = useState(false);

  return (
    <div className="App">
      {isScanning ? (
        <ScanPage onGoBack={() => setIsScanning(false)} />
      ) : (
        <HomePage onStartScan={() => setIsScanning(true)} />
      )}
    </div>
  );
}

export default App;
