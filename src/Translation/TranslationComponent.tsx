import { Languages } from "../constants/languages";

export type TranslationFC = (value: TranslationKeys) => string;

interface TranslationValues {
  [Languages.Ru]: String;
  [Languages.En]: String;
  [Languages.Srb]: String;
  [Languages.Mne]: String;
  [Languages.Bih]: String;
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
  Profile,
  AddMainInfo,
  AddPhoto,
  AddLocation,
  Signup,
  Title,
  Update,
  Subscribe,
}

export const translationValues: EnumDictionary<
  TranslationKeys,
  TranslationValues
> = {
  [TranslationKeys.Subscribe]: {
    [Languages.Ru]: "Подписки",
    [Languages.En]: "Subscribe",
    [Languages.Srb]: "Subscribe",
    [Languages.Mne]: "Subscribe",
    [Languages.Bih]: "Subscribe",
  },
  [TranslationKeys.Update]: {
    [Languages.Ru]: "Обновить",
    [Languages.En]: "Update",
    [Languages.Srb]: "Update",
    [Languages.Mne]: "Update",
    [Languages.Bih]: "Update",
  },
  [TranslationKeys.MyPosts]: {
    [Languages.Ru]: "Мои объявления",
    [Languages.En]: "My posts",
    [Languages.Srb]: "Моја саопштења",
    [Languages.Mne]: "Moja saopštenja",
    [Languages.Bih]: "Moja saopštenja",
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
  [TranslationKeys.InputLogin]: {
    [Languages.Ru]: "Логин",
    [Languages.En]: "Login",
    [Languages.Srb]: "Login",
    [Languages.Mne]: "Login",
    [Languages.Bih]: "Login",
  },
  [TranslationKeys.Enter]: {
    [Languages.Ru]: "Войти",
    [Languages.En]: "Enter",
    [Languages.Srb]: "Ући",
    [Languages.Mne]: "Ući",
    [Languages.Bih]: "Ući",
  },
  [TranslationKeys.RememberMe]: {
    [Languages.Ru]: "Запомнить",
    [Languages.En]: "Remember me",
    [Languages.Srb]: "Сети ме се",
    [Languages.Mne]: "Seti me se",
    [Languages.Bih]: "Seti me se",
  },
  [TranslationKeys.ForgotPassword]: {
    [Languages.Ru]: "Забыли пароль?",
    [Languages.En]: "Forgot password?",
    [Languages.Srb]: "Заборавили сте лозинку?",
    [Languages.Mne]: "Zaboravili ste lozinku?",
    [Languages.Bih]: "Zaboravili ste lozinku?",
  },
  [TranslationKeys.DonthaveanaccountSignUp]: {
    [Languages.Ru]: "Ещё не зарегистрированы? Регистрация.",
    [Languages.En]: "Don`t have an account? SignUp",
    [Languages.Srb]: "Don`t have an account? SignUp",
    [Languages.Mne]: "Don`t have an account? SignUp",
    [Languages.Bih]: "Don`t have an account? SignUp",
  },
  [TranslationKeys.AuthorizationError]: {
    [Languages.Ru]: "Неверный пароль",
    [Languages.En]: "Wrong password",
    [Languages.Srb]: "Погрешна лозинка",
    [Languages.Mne]: "Pogrešna lozinka",
    [Languages.Bih]: "Pogrešna lozinka",
  },
  [TranslationKeys.CreateNewPost]: {
    [Languages.Ru]: "Создать объявление",
    [Languages.En]: "Create post",
    [Languages.Srb]: "Направите оглаc",
    [Languages.Mne]: "Napravite oglas",
    [Languages.Bih]: "Napravite oglas",
  },
  [TranslationKeys.Profile]: {
    [Languages.Ru]: "Профиль пользователя",
    [Languages.En]: "Profile",
    [Languages.Srb]: "Профил корисника",
    [Languages.Mne]: "Profil korisnika",
    [Languages.Bih]: "Profil korisnika",
  },
  [TranslationKeys.AddMainInfo]: {
    [Languages.Ru]: "Главная информация",
    [Languages.En]: "Main info",
    [Languages.Srb]: "Главне информације",
    [Languages.Mne]: "Glavne informacije",
    [Languages.Bih]: "Glavne informacije",
  },
  [TranslationKeys.AddPhoto]: {
    [Languages.Ru]: "Добавить фото",
    [Languages.En]: "Add image",
    [Languages.Srb]: "Додај слику",
    [Languages.Mne]: "Dodaj sliku",
    [Languages.Bih]: "Dodaj sliku",
  },
  [TranslationKeys.AddLocation]: {
    [Languages.Ru]: "Локация",
    [Languages.En]: "Локация",
    [Languages.Srb]: "Локация",
    [Languages.Mne]: "Локация",
    [Languages.Bih]: "Локация",
  },
  [TranslationKeys.Signup]: {
    [Languages.Ru]: "Регистрация",
    [Languages.En]: "Sing up",
    [Languages.Srb]: "Sing up",
    [Languages.Mne]: "Sing up",
    [Languages.Bih]: "Sing up",
  },

  [TranslationKeys.Title]: {
    [Languages.Ru]: "Название",
    [Languages.En]: "Title",
    [Languages.Srb]: "Title",
    [Languages.Mne]: "Title",
    [Languages.Bih]: "Title",
  },
};

export const Translation = (
  value: TranslationKeys,
  currentLanguage: string
) => {
  try {
    let language: Languages = Languages.En;
    switch (currentLanguage) {
      case "Ru": {
        language = Languages.Ru;
        break;
      }
      case "En": {
        language = Languages.En;
        break;
      }
      case "Srb": {
        language = Languages.Srb;
        break;
      }
      case "Mne": {
        language = Languages.Mne;
        break;
      }
      case "Bih": {
        language = Languages.Bih;
        break;
      }
      default: {
        language = Languages.En;
        break;
      }
    }

    return translationValues[value][language];
  } catch {
    return value.toString();
  }
};
export const TranslationWithLanguage = (currentLanguage: string) => {
  return function (value: TranslationKeys) {
    try {
      let language: Languages = Languages.En;
      switch (currentLanguage) {
        case "Ru": {
          language = Languages.Ru;
          break;
        }
        case "En": {
          language = Languages.En;
          break;
        }
        case "Srb": {
          language = Languages.Srb;
          break;
        }
        case "Mne": {
          language = Languages.Mne;
          break;
        }
        case "Bih": {
          language = Languages.Bih;
          break;
        }
        default: {
          language = Languages.En;
          break;
        }
      }

      return translationValues[value][language];
    } catch {
      return value.toString();
    }
  } as TranslationFC;
};
