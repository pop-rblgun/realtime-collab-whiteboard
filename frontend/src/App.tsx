import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/store';
import { updateElement, undo, Element } from './store/whiteboardSlice';
import { emitElementUpdate } from './socket';

const App: React.FC = () => {
  const elements = useSelector((state: RootState) => state.whiteboard.elements);
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState('#0071e3');

  const addElement = (type: 'rect' | 'circle', x: number, y: number) => {
    const newElement: Element = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      x,
      y,
      color: selectedColor,
    };
    dispatch(updateElement(newElement));
    emitElementUpdate(newElement);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - 25;
    const y = e.clientY - rect.top - 25;
    addElement('rect', x, y);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <h1>Collaborative Whiteboard</h1>
          <p>Real-time updates via WebSockets & Redux</p>
        </div>
        <div className="toolbar">
          <button className="apple-btn undo-btn" onClick={() => dispatch(undo())}>Undo</button>
          <div className="color-picker">
            <input type="color" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} />
          </div>
        </div>
      </header>

      <main className="canvas-container">
        <div className="canvas" onClick={handleCanvasClick}>
          {elements.map((el) => (
            <div
              key={el.id}
              className={`element ${el.type}`}
              style={{
                left: `${el.x}px`,
                top: `${el.y}px`,
                backgroundColor: el.color,
              }}
            />
          ))}
          <div className="canvas-instruction">Click anywhere to add a square</div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --apple-blue: #0071e3;
          --apple-bg: #f5f5f7;
          --apple-dark: #1d1d1f;
          --apple-gray: #86868b;
        }
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          background-color: var(--apple-bg);
          color: var(--apple-dark);
        }
        .app-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
        }
        .header {
          padding: 24px 48px;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 100;
        }
        .header h1 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .header p {
          margin: 4px 0 0;
          font-size: 0.9rem;
          color: var(--apple-gray);
        }
        .toolbar {
          display: flex;
          gap: 16px;
          align-items: center;
        }
        .apple-btn {
          padding: 8px 16px;
          border-radius: 8px;
          border: none;
          background: var(--apple-blue);
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .apple-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        .undo-btn {
          background: #e8e8ed;
          color: var(--apple-dark);
        }
        .canvas-container {
          flex: 1;
          padding: 32px;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .canvas {
          width: 100%;
          height: 100%;
          background: white;
          border-radius: 24px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.05);
          position: relative;
          cursor: crosshair;
        }
        .element {
          position: absolute;
          width: 50px;
          height: 50px;
          border-radius: 8px;
          transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .canvas-instruction {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          color: var(--apple-gray);
          font-size: 0.8rem;
          pointer-events: none;
        }
      `}} />
    </div>
  );
};

export default App;
