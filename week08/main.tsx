import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx' 

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("HTML에 'root' 아이디를 가진 태그가 존재하지 않습니다.");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)