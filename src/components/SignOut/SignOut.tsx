import React, {FC} from "react";
import {useAuth} from "../../Auth";

type SignoutAction = 'signout' | 'signout-callback';

interface  Props {
    action: SignoutAction;
}


const SignOut :FC<Props> = ({action}) => {
    const {signOut} = useAuth();
    let message;

    if(action == 'signout'){
        signOut();
        message = "Signing out..."
    }else if(action == 'signout-callback'){
        message = "Successfully signed out!!!"
    }

    return(
        <div>
            {message}
        </div>
    )
}

export default SignOut;

