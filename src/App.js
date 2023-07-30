import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CharacterListPage from "./pages/CharacterListPage";
import CharacterDetailPage from "./pages/CharacterDetailPage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            {/* Rota para a página de lista de personagens */}
            <Route path="/" element={<CharacterListPage />} />

            {/* Rota para a página de detalhes do personagem */}
            <Route
              path="/character/:characterId"
              element={<CharacterDetailPage />}
            />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
