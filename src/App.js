import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
    createMuiTheme,
    CssBaseline,
    MuiThemeProvider,
} from "@material-ui/core";
import { Wrapper } from "./layout/Wrapper";
import Layout from "./layout/Layout";
import AuthGuard from "./layout/AuthGuard";

import theme from "./utils/theme";

// auth pages
import { Splash } from "./pages/auth/Splash";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import PasswordReset from "./pages/auth/ResetPassword";

// attendance
import ClockIn from "./pages/attendance/ClockIn";

function App() {
    const [loading, setLoading] = useState(true);
    const [theming, setTheme] = useState(theme);
    const [clicked, setClicked] = React.useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const toggleDarkTheme = () => {
        let newPaletteType = theming.palette.type === "light" ? "dark" : "light";
        setTheme({
            palette: {
                type: newPaletteType,
            },
            typography: {
                fontFamily: "Rubik",
            },
        });
        localStorage.setItem("theme", newPaletteType);

        setClicked((prev) => {
            localStorage.setItem("clicked", JSON.stringify(!prev));
            return !prev;
        });
    };

    const muiTheme = createMuiTheme(theming);

    return (
        <MuiThemeProvider theme={muiTheme}>
            <CssBaseline />
            
                <Wrapper>
                <Router>
                    <Switch>
                        <Route exact path="/" component={loading ? Splash : Login} />
                        <Route path="/login" component={Login} />
                        <Route path="/forgotpass" component={ForgotPassword} />
                        <Route path="/resetpassword/:token" component={PasswordReset} />
                            <>
                                <Layout
                                    toggleDarkTheme={toggleDarkTheme}
                                    clicked={clicked}
                                >
                                    <AuthGuard path="/dashboard"><ClockIn  /></AuthGuard>
                                </Layout>
                            </>
                        </Switch>
                    </Router>
                </Wrapper>
            
        </MuiThemeProvider>
    );
}

export default App;