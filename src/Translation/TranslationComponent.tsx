import React, { useContext, useEffect } from 'react';
import { Languages } from '../constants/languages';
import { CurrentLanguageContext } from '../App';

interface TranslationValues {
    [Languages.Ru]: String,
    [Languages.En]: String,
    [Languages.Srb]: String,
    [Languages.Mne]: String,
    [Languages.Bih]: String,
}

type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
};

export enum TranslationKeys {
    Welcome,
    Login,
    Authorization,
    InputLogin,
    Enter,
    RememberMe,
    ForgotPassword,
    DonthaveanaccountSignUp,
    AuthorizationError,
    CreateNewPost,
    MyPosts,
    Profile
}

export const  translationValues: EnumDictionary<TranslationKeys, TranslationValues> = {
    [TranslationKeys.MyPosts]: {
        [Languages.Ru]: "Мои объявления",
        [Languages.En]: "My posts",
        [Languages.Srb]:"My posts",
        [Languages.Mne]: "My posts",
        [Languages.Bih]: "My posts",
    },
    [TranslationKeys.Welcome]: {
        [Languages.Ru]: "Добро пожаловать",
        [Languages.En]: "Welcome",
        [Languages.Srb]: "Добродошли",
        [Languages.Mne]: "Dobrodošli",
        [Languages.Bih]: "Dobrodošli",
    },
    [TranslationKeys.Login]: {
        [Languages.Ru]: "Войти",
        [Languages.En]: "Log in",
        [Languages.Srb]: "Log in",
        [Languages.Mne]: "Log in",
        [Languages.Bih]: "Log in",
    },
    [TranslationKeys.Authorization]: {
        [Languages.Ru]: "Авторизация",
        [Languages.En]: "Authorization",
        [Languages.Srb]: "Овлашћење",
        [Languages.Mne]: "Ovlašćenje",
        [Languages.Bih]: "Ovlašćenje",
    },
    [TranslationKeys.InputLogin]:{
        [Languages.Ru]: "Логин",
        [Languages.En]: "Login",
        [Languages.Srb]: "Login",
        [Languages.Mne]: "Login",
        [Languages.Bih]: "Login",
    },
    [TranslationKeys.Enter] : {
        [Languages.Ru]: "Войти",
        [Languages.En]: "Enter",
        [Languages.Srb]: "Ући",
        [Languages.Mne]: "Ući",
        [Languages.Bih]: "Ući",
    },
    [TranslationKeys.RememberMe] : {
        [Languages.Ru]: "Запомнить",
        [Languages.En]: "Remember me",
        [Languages.Srb]: "Remember me",
        [Languages.Mne]: "Remember me",
        [Languages.Bih]: "Remember me",
    },   
    [TranslationKeys.ForgotPassword] : {
        [Languages.Ru]: "Забыли пароль?",
        [Languages.En]: "Forgot password?",
        [Languages.Srb]: "Forgot password?",
        [Languages.Mne]: "Forgot password?",
        [Languages.Bih]: "Forgot password?",
    },   
    [TranslationKeys.DonthaveanaccountSignUp] : {
        [Languages.Ru]: "Ещё не зарегистрированы? Регистрация.",
        [Languages.En]: "Don`t have an account? SignUp",
        [Languages.Srb]: "Don`t have an account? SignUp",
        [Languages.Mne]: "Don`t have an account? SignUp",
        [Languages.Bih]: "Don`t have an account? SignUp",
    },   
    [TranslationKeys.AuthorizationError] : {
        [Languages.Ru]: "Неверный email или пароль",
        [Languages.En]: "Wrong password",
        [Languages.Srb]: "Wrong password",
        [Languages.Mne]: "Wrong password",
        [Languages.Bih]: "Wrong password",
    },   
    [TranslationKeys.CreateNewPost] : {
        [Languages.Ru]: "Создать объявление",
        [Languages.En]: "Create post",
        [Languages.Srb]: "Create post",
        [Languages.Mne]: "Create post",
        [Languages.Bih]: "Create post",
    },   
    [TranslationKeys.Profile] : {
        [Languages.Ru]: "Профиль пользователя",
        [Languages.En]: "Profile",
        [Languages.Srb]: "Profile",
        [Languages.Mne]: "Profile",
        [Languages.Bih]: "Profile",
    }
}

export const Translation = (value: TranslationKeys, currentLanguage: string) => {
    try{
        let language: Languages = Languages.En;
        switch (currentLanguage) {
            case "Ru": { language = Languages.Ru; break; }
            case "En": { language =  Languages.En; break; }
            case "Srb": { language =  Languages.Srb; break; }
            case "Mne": { language =  Languages.Mne; break; }
            case "Bih": { language =  Languages.Bih; break; }
            default: { language =  Languages.En; break; }
        }

        return translationValues[value][language]; 
    }
    catch {
        return value.toString();
    }
}
export const TranslationWithLanguage = (currentLanguage: string) => {
    return function (value: TranslationKeys) {
        try{
            let language: Languages = Languages.En;
            switch (currentLanguage) {
                case "Ru": { language = Languages.Ru; break; }
                case "En": { language =  Languages.En; break; }
                case "Srb": { language =  Languages.Srb; break; }
                case "Mne": { language =  Languages.Mne; break; }
                case "Bih": { language =  Languages.Bih; break; }
                default: { language =  Languages.En; break; }
            }
    
            return translationValues[value][language]; 
        }
        catch {
            return value.toString();
        }
    }
}
