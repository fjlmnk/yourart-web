import React, { useState } from 'react';
import './App.css';

// --- КОМПОНЕНТ 1: ГЛАВНАЯ СТРАНИЦА (Светлая) ---
function HomePage({ onStartScan }) {
  return (
    <div className="app-container home-page">
      <header className="app-header-original">
        <h1>YourArt</h1>
        <p>Вивчай і колекціонуй картини за допомогою штучного інтелекту</p>
      </header>

      <main className="app-main-original">
        <div className="hero-section">
           {/* Здесь можно добавить логотип или иконку */}
           <div className="hero-icon">🎨</div>
        </div>
        
        <button className="scan-button-main" onClick={onStartScan}>
          Відсканувати картину
        </button>
        
        <div className="info-text-original">
          <p>Наведи камеру на картину, щоб отримати інформацію про автора, рік і стиль.</p>
        </div>
      </main>

      <footer className="app-footer-original">
        <p>© 2025 YourArt | Розроблено студентом</p>
      </footer>
    </div>
  );
}

// --- КОМПОНЕНТ 2: СТРАНИЦА СКАНИРОВАНИЯ (Темная, Gold дизайн) ---
function ScanPage({ onGoBack }) {
  return (
    <div className="app-container scan-page">
      {/* Верхняя панель */}
      <header className="scan-header">
        <button className="icon-btn" onClick={onGoBack}>
          ← {/* Стрелка назад */}
        </button>
        <div className="header-dots">•••</div>
      </header>

      {/* Область сканирования */}
      <main className="scan-main">
        <div className="scan-frame-container">
           <div className="scan-frame">
             <div className="scan-corner top-left"></div>
             <div className="scan-corner top-right"></div>
             <div className="scan-corner bottom-left"></div>
             <div className="scan-corner bottom-right"></div>
             
             {/* Имитация камеры или картинка */}
             <img 
               src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1660_Velazquez_Infantin_Margarita_Teresa_in_rosafarbenem_Kleid_anagoria.jpg/800px-1660_Velazquez_Infantin_Margarita_Teresa_in_rosafarbenem_Kleid_anagoria.jpg" 
               alt="Preview" 
               className="camera-preview" 
             />
           </div>
        </div>

        {/* Элементы управления сканированием */}
        <div className="scan-controls">
          <button className="control-small-btn">↩</button> {/* Undo */}
          <button className="scan-action-btn">SCAN</button>
          <button className="control-small-btn">⚡</button> {/* Flash */}
        </div>

        {/* Карусель (превью внизу) */}
        <div className="scan-carousel">
           <div className="carousel-item"></div>
           <div className="carousel-item active"></div>
           <div className="carousel-item"></div>
        </div>
      </main>

      {/* Нижняя навигация */}
      <footer className="scan-footer">
        <button className="nav-btn" onClick={onGoBack}>🏠</button>
        <button className="nav-btn active">📷</button>
        <button className="nav-btn">👤</button>
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