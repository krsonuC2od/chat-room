import { Routes, Route,Navigate  } from "react-router-dom";
import { useMemo , useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";


import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";



const App = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const setAuthenticationStatus = (status) => {
  //   setIsAuthenticated(status);
  // };
  const theme = useMemo(() => createTheme(themeSettings(), []));
  
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Toaster />
        <Routes>
       
            {/*<Route path="/chatroom" element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />}></Route>*/}
            <Route path="/chatroom" element={ <Home />}></Route>
          <Route path="/" element={<Register />}></Route>
          <Route path="/login" element={<Login  />}></Route>
        </Routes>
      </ThemeProvider>
    </>
  );
};
export default App;
