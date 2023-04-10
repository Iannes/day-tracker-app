import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import AppRouter from "./components/AppRouter";
import { DatesProvider } from "./contexts/DatesProvider";
import { AuthProvider } from "./contexts/AuthProvider";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./styles.css";
import { firebaseConfig, auth } from "./firebaseConfig";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#C2185B",
    },
    success: {
      main: "#30ac9a",
    },
    error: {
      main: "#f44336",
    },
  },
});

const App = () => {

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);
    // Initialize Analytics
    const analytics = getAnalytics(app);
  return (
    <div className="App">
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AuthProvider auth={auth}>
          <DatesProvider>
            <AppRouter />
          </DatesProvider>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
