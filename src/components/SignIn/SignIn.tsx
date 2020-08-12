import React, {FC} from "react";
import {useAuth} from "../../Auth";




type SigninAction = 'signin' | 'signin-callback';

interface  Props {
    action: SigninAction;
}


const SignIn :FC<Props> = ({action}) => {
    const {signIn} = useAuth();

    if(action == 'signin'){
        signIn();
    }

    return(
        <div>
            Signing...
        </div>
    )
}

export default SignIn;
