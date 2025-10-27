import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import AppRoutes from "./routes";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import WhatsAppButton from "./components/common/WhatsAppButton";

function App() {
  // Configuración de PayPal
  const paypalOptions = {
    "EJxWLyDQzJakF3mbalADJsk2aFASTPkRq6o-k8lMmpftvX6r4DKxwAaIZ3PefLNFNf-2glk6BbpBWLcd": "test", // Para pruebas - cambia por tu client-id real en producción
    currency: "USD",
    intent: "capture",
    "enable-funding": "paylater,card",
    "disable-funding": "venmo",
  };

  return (
    <ThemeProvider>
      <PayPalScriptProvider options={paypalOptions}>
        <AuthProvider>
          <CartProvider>
            <Router>
              <div className="min-h-screen bg-black text-white">
                <Navbar />
                <main className="pt-16">
                  <AppRoutes />
                </main>
                <Footer />
                <WhatsAppButton />
              </div>
            </Router>
          </CartProvider>
        </AuthProvider>
      </PayPalScriptProvider>
    </ThemeProvider>
  );
}

export default App;