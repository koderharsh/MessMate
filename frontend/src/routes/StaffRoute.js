import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated as isStaffAuthenticated} from "../util/staffApi";

const StaffRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
          isStaffAuthenticated()?(
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default StaffRoute;
