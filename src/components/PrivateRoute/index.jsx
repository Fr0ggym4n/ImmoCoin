import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";


const PrivateRoute = ({ component: Component, data, ...rest }) => {
    const currentUser = useSelector(state => state.authReducer)
    return (
        <Route
            {...rest}
            render={(props) =>
                currentUser.id ? (
                    <Component {...props}{...data} />
                ) : (
                        <Redirect to="/login" />
                    )
            }
        />
    );
};

export default (PrivateRoute)