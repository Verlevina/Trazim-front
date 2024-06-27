import React, { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUser, setJWTToken } from '../server/userAPI';
import { loginReducer } from '../store/user/user';
import { LangugeArray } from '../constants/languages';
import { setLanguageReducer } from '../store/language/language';

type Props = {
    children: ReactNode
  }

const AuthWrapper =  ({children}:Props) => {
    const dispatch = useDispatch();

    useEffect(()=> {
        const token: string|null = localStorage.getItem("token");
        if(token) {
            setJWTToken(token);
            getCurrentUser().then((data)=>{
              const userState = {
                id: data?.id,
                email: data.email,
                isSignedIn: true,
                languageId: data.languageId,
                locationId: data.locationId,
                login: data.login,
                name: data.name,
                pictureUrl: data.pictureUrl,
                surname: data.surname,
                telegram: data.telegram,
                token: token,
                userRating: data.userRating
              };
              dispatch(loginReducer(userState));
              dispatch(setLanguageReducer(LangugeArray[+userState.languageId - 1]))
            }).catch(e=>{
              localStorage.removeItem("token");
            }).finally();             
        } else {
          localStorage.removeItem("token");
        }
      }, [dispatch]);

    return <React.Fragment>{children}</React.Fragment>
}
export default AuthWrapper;