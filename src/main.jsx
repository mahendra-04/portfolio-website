import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// React entry point for the Vite app. main.jsx stays intentionally small:
// global browser resets are imported once here, while the portfolio layout and
// behavior live in App.jsx and App.css. StrictMode helps catch unsafe React
// patterns during development without changing production output.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
