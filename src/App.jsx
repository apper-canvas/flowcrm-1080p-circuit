import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sidebar from "@/components/organisms/Sidebar";
import ContactsPage from "@/components/pages/ContactsPage";
import CompaniesPage from "@/components/pages/CompaniesPage";
import DealsPage from "@/components/pages/DealsPage";
import { useMobileMenu } from "@/hooks/useMobileMenu";

function App() {
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useMobileMenu();

  return (
    <Router>
      <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
        <Sidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
        
        <div className="flex-1 flex flex-col min-w-0">
          <Routes>
            <Route 
              path="/" 
              element={<ContactsPage onMenuClick={toggleMobileMenu} />} 
            />
            <Route 
              path="/companies" 
              element={<CompaniesPage onMenuClick={toggleMobileMenu} />} 
            />
            <Route 
              path="/deals" 
              element={<DealsPage onMenuClick={toggleMobileMenu} />} 
            />
          </Routes>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  );
}

export default App;