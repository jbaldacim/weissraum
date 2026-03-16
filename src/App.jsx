import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/archive" element={<Archive />} />
      <Route path="/entries/new" element={<NewEntry />} />

      {/* :id is a URL parameter */}
      <Route path="/entries/:id" element={<Entry />} />
    </Routes>
  );
}

export default App;
