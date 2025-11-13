import React from 'react';

// --- 1. Компонент Главной страницы ---
function HomePage({ onNavigateToCamera }) {
  return (
    <>
      <header className="app-header">
        <h1>YourArt </h1>
        <p>Вивчай і колекціонуй картини за допомогою штучного інтелекту</p>
      </header>

      <main className="app-main">
        {/* Теперь это кнопка, которая по клику 
          вызывает функцию, переданную из App.
        */}
        <button className="scan-button" onClick={onNavigateToCamera}>
          Відсканувати картину
        </button>
        <div className="info-text">
          <p>Наведи камеру на картину, щоб отримати інформацію про автора, рік і стиль.</p>
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2025 YourArt | Розроблено Fjlmnk</p>
      </footer>
    </>
  );
}

export default HomePage;