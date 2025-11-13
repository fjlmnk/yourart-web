import React, { useState, useRef, useEffect } from 'react';

// --- 2. Компонент Страницы Камеры ---
function CameraPage({ onNavigateHome }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [snapshot, setSnapshot] = useState(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState('');

  // Функция включения камеры
  const startCamera = async () => {
    setError('');
    setSnapshot(null);
    try {
      // Запрашиваем доступ к камере
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480, facingMode: 'environment' },
        audio: false 
      });
      setStream(mediaStream); // Сохраняем поток в "состоянии"
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream; // Показываем видео
      }
    } catch (err) {
      console.error("Ошибка доступа к камере:", err);
      setError('Не вдалося отримати доступ до камери. Перевірте дозволи у браузері.');
    }
  };

  // Функция "сделать фото"
  const captureSnapshot = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Устанавливаем размер холста
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // "Рисуем" кадр с видео на холсте
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Конвертируем холст в URL (картинку)
    const dataUrl = canvas.toDataURL('image/png');
    setSnapshot(dataUrl);
  };

  // Очистка при уходе со страницы
  useEffect(() => {
    // Эта функция будет вызвана, когда компонент "уничтожается"
    // (т.е. когда мы уходим на главную страницу)
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop()); // Выключаем камеру
      }
    };
  }, [stream]); // Зависимость от [stream]

  return (
    <div className="camera-page">
      <div className="camera-header">Сканер Картини</div>
      
      <div className="video-container">
        {/* <video> будет показывать поток с камеры */}
        <video id="webcam" ref={videoRef} autoPlay playsInline muted></video>
        {/* <canvas> скрыт и нужен только для создания снимка */}
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="controls">
        <button 
          className="control-button back-button" 
          onClick={onNavigateHome}>
          На Головну
        </button>
        <button 
          className="control-button start-button" 
          onClick={startCamera}>
          Включити камеру
        </button>
        <button 
          className="control-button capture-button" 
          onClick={captureSnapshot} 
          disabled={!stream}>
          Зробити знімок
        </button>
      </div>

      {/* Показываем снимок, если он есть */}
      {snapshot && (
        <div className="snapshot-container">
          <div className="snapshot-title">Ваш знімок:</div>
          <img id="snapshot" src={snapshot} alt="Знімок з камери" />
        </div>
      )}
    </div>
  );
}

export default CameraPage;