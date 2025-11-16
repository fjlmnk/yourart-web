import Webcam from "react-webcam";

function ScanPage({ onGoBack }) {
  const videoConstraints = {
    facingMode: { exact: "environment" },
    width: { ideal: 1920 },
    height: { ideal: 1080 }
  };

  return (
    <div className="app-container scan-page">

      <header className="scan-header">
        <button className="icon-btn" onClick={onGoBack}>
          <span>←</span>
        </button>
        <div className="header-dots">
          <span>•••</span>
        </div>
      </header>

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
              videoConstraints={videoConstraints}
            />
          </div>
        </div>

        <div className="scan-controls">
          <button className="control-small-btn"><span>↩</span></button>
          <button className="scan-action-btn">SCAN</button>
          <button className="control-small-btn"><span>⚡</span></button>
        </div>

        <div className="scan-carousel">
          <div className="carousel-item"></div>
          <div className="carousel-item active"></div>
          <div className="carousel-item"></div>
        </div>
      </main>

      <footer className="scan-footer">
        <button className="nav-btn" onClick={onGoBack}><span>🏠</span></button>
        <button className="nav-btn active"><span>📷</span></button>
        <button className="nav-btn"><span>👤</span></button>
      </footer>

    </div>
  );
}
