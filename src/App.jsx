import React from 'react'
import Routing from './Router/Routing'
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: "var(--color-surface)",
            color: "var(--color-text)",
            border: "1px solid var(--color-border)",
            padding: "12px 16px",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: 500,
          },
          success: {
            iconTheme: {
              primary: "#f97316",
              secondary: "var(--color-surface)",
            },
            style: {
              border: "1px solid #f97316",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444", 
              secondary: "var(--color-surface)",
            },
            style: {
              border: "1px solid #ef4444",
            },
          },
          loading: {
            iconTheme: {
              primary: "#f97316",
              secondary: "var(--color-surface)",
            },
          },
        }}
      />
      <Routing />
    </>
  )
}

export default App