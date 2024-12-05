import React, { useMemo, useState } from 'react';
import 'devextreme/dist/css/dx.light.css';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { HashRouter } from 'react-router-dom';
import store from './store';
import AppRoutes from './routes';
import ThemeSwitcher from './components/Basic/ThemeSwitcher';
import { getTheme } from './components/Utils/theme';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = useMemo(() => getTheme(darkMode ? 'dark' : 'light'), [darkMode]);

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ThemeSwitcher darkMode={darkMode} onToggle={handleThemeChange} />
        <HashRouter>
          <AppRoutes />
        </HashRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
