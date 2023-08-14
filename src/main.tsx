import React from 'react'
import ReactDOM from 'react-dom/client'
import Tracker from '@/components/Tracker'
import '@/styles/index.css'
import '@/styles/tracker.css'
//import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Tracker />
  </React.StrictMode>,
)
