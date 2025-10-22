import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import AppRoutes from "./routes";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
// CSS removido - ya se importa en main.jsx

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-black text-white">
            <Navbar />
            <main>
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
