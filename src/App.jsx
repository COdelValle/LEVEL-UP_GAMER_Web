import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import AppRoutes from "./routes";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import WhatsAppButton from "./components/common/WhatsAppButton"; // NUEVA IMPORTACIÓN

function App() {
  return (
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
  );
}

export default App;