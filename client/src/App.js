import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import Index from "./components/Index";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";

const App = observer (() => {
    const {user} = useContext(Context);
    const[loading, setLoading] = useState(true);


    useEffect(() => {
        try {
            check().then(data => {
                user.setUser(data);
                user.setIsAuth(true);
            }).finally(() => setLoading(false))
        } catch (e) {

        }
    }, [])

    if (loading) {
        return <Spinner animation={'grow'}/>
    }

    return (
        <BrowserRouter>
            <Index />
        </BrowserRouter>
    );
});

export default App;