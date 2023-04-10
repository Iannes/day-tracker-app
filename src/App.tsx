import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import MainContent from "./components/MainContent";

import { DatesProvider } from "./contexts/DatesProvider";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./styles.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000"
    },
    secondary: {
      main: "#C2185B"
    },
    success: {
      main: "#30ac9a"
    },
    error: {
      main: "#f44336"
    }
  }
});

const App = () => {
  return (
    <div className="App">
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <DatesProvider>
          <MainContent />
        </DatesProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
