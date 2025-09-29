import { Routes, Route } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard";

import "./index.css";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
        </Routes>
      </main>
    </div>
  );
}
