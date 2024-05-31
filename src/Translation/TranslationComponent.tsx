import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Languages } from '../constants/languages';

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
    DonthaveanaccountSignUp
}

export const  translationValues: EnumDictionary<TranslationKeys, TranslationValues> = {
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
    },   [TranslationKeys.ForgotPassword] : {
        [Languages.Ru]: "Забыли пароль?",
        [Languages.En]: "Forgot password?",
        [Languages.Srb]: "Forgot password?",
        [Languages.Mne]: "Forgot password?",
        [Languages.Bih]: "Forgot password?",
    },   [TranslationKeys.DonthaveanaccountSignUp] : {
        [Languages.Ru]: "Ещё не зарегистрированы? Регистрация.",
        [Languages.En]: "Don`t have an account? SignUp",
        [Languages.Srb]: "Don`t have an account? SignUp",
        [Languages.Mne]: "Don`t have an account? SignUp",
        [Languages.Bih]: "Don`t have an account? SignUp",
    }
}

export const Translation =(value: TranslationKeys)=>{
    const languageId = globalThis.languageId;
    try{
        let language: Languages = Languages.En;
        switch (languageId) {
            case 1: { language = Languages.Ru; break; }
            case 2: { language =  Languages.En; break; }
            case 3: { language =  Languages.Srb; break; }
            case 4: { language =  Languages.Mne; break; }
            case 5: { language =  Languages.Bih; break; }
            default: { language =  Languages.En; break; }
        }

        return translationValues[value][language];
    }
    catch {
        return value;
    }
}
