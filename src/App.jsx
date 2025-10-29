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
              <div className="relative flex flex-col min-h-screen overflow-x-hidden">
                {/* Fondo estático global */}
                <div className="fixed inset-0 w-full h-full z-0">
                    <div className="absolute inset-0 bg-[url('/assets/img/background2.jpg')] bg-cover bg-center bg-fixed"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-black/85 to-gray-900/90"></div>
                  
                  {/* Efectos de luz adicionales */}
                  <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                  </div>
                </div>

                {/* Patrón/overlay adicional para más profundidad (sin duplicar la imagen de fondo) */}
                <div className="fixed inset-0 opacity-30 pattern-large mix-blend-overlay" aria-hidden="true"></div>

                {/* Contenido */}
                <Navbar className="relative z-50" />
                <main className="flex-grow relative z-10 pt-16">
                  <AppRoutes />
                </main>
                <Footer className="relative z-20" />
                <WhatsAppButton className="relative z-50" />
              </div>
            </Router>
          </CartProvider>
        </AuthProvider>
      </PayPalScriptProvider>
    </ThemeProvider>
  );
}

export default App;