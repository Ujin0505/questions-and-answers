import React, {FC, Fragment} from "react";
import {useAuth} from "../../Auth";

interface Props {

}

const WithAuth : FC<Props> = ({children}) =>{
    const {isAuth} = useAuth();

    if(isAuth){
        return <Fragment>
            {children}
        </Fragment>
    }
    return <div>You have not permission.</div>

}

export default  WithAuth;