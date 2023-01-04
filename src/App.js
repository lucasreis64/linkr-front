import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from './assets/styles/GlobalStyle';
import Timeline from "./pages/Timeline";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path='/timeline' element={<Timeline />}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
