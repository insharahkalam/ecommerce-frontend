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
            background: "#171717", // neutral-900
            color: "#fafafa", // neutral-50
            border: "1px solid #262626", // neutral-800
            padding: "12px 16px",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: 500,
          },
          success: {
            iconTheme: {
              primary: "#f97316", // orange-500
              secondary: "#171717",
            },
            style: {
              border: "1px solid #f97316",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444", // red-500
              secondary: "#171717",
            },
            style: {
              border: "1px solid #ef4444",
            },
          },
          loading: {
            iconTheme: {
              primary: "#f97316",
              secondary: "#171717",
            },
          },
        }}
      />
      <Routing />
    </>
  )
}

export default App