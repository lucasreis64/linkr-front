import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from './assets/styles/GlobalStyle';
import SignIn from "./pages/SignInPage/SignInPage";
import SignUp from "./pages/SignUpPage/SignUpPage";
import Timeline from "./pages/Timeline";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path='/timeline' element={<Timeline />}/>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
