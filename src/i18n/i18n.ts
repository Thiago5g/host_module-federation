import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
    en: {
        translation: {
            home_title: 'Welcome to Host Application',
            home_subtitle: 'This is the home page with local content',
            login: 'Login',
            sign_in: 'Sign In',
            signing_in: 'Signing in...',
            sign_tip: 'Tip: Any email/password works (mock)',
            shared_counter_title: 'Shared Counter (Host + Remote)',
            shared_counter_desc: 'This counter uses a single global Zustand store exposed by the Host and consumed by the Remote.',
            microfrontend_title: 'Microfrontend (Module Federation)',
            microfrontend_loading: 'Loading remote content...',
            tech_zustand_title: 'Zustand Store',
            tech_zustand_desc: 'Minimal, unopinionated global state with zero boilerplate and great TypeScript support.',
            tech_i18n_title: 'i18n (react-i18next)',
            tech_i18n_desc: 'Runtime language switching shared across host and remote via props + Zustand.',
            language: 'Language'
        }
    },
    pt: {
        translation: {
            home_title: 'Bem-vindo ao Aplicativo Host',
            home_subtitle: 'Esta é a página inicial com conteúdo local',
            login: 'Entrar',
            sign_in: 'Entrar',
            signing_in: 'Entrando...',
            sign_tip: 'Dica: Qualquer e-mail/senha funciona (mock)',
            shared_counter_title: 'Contador Compartilhado (Host + Remote)',
            shared_counter_desc: 'Este contador usa uma única store global do Host consumida pelo Remote.',
            microfrontend_title: 'Microfrontend (Module Federation)',
            microfrontend_loading: 'Carregando conteúdo remoto...',
            tech_zustand_title: 'Store Zustand',
            tech_zustand_desc: 'Estado global mínimo, sem boilerplate e com ótimo suporte a TypeScript.',
            tech_i18n_title: 'i18n (react-i18next)',
            tech_i18n_desc: 'Troca de idioma em tempo real compartilhada entre host e remote via props + Zustand.',
            language: 'Idioma'
        }
    },
    es: {
        translation: {
            home_title: 'Bienvenido a la Aplicación Host',
            home_subtitle: 'Esta es la página de inicio con contenido local',
            login: 'Iniciar sesión',
            sign_in: 'Iniciar sesión',
            signing_in: 'Iniciando...',
            sign_tip: 'Consejo: Cualquier correo/contraseña funciona (mock)',
            shared_counter_title: 'Contador Compartido (Host + Remote)',
            shared_counter_desc: 'Este contador usa una única store global del Host consumida por el Remote.',
            microfrontend_title: 'Microfrontend (Module Federation)',
            microfrontend_loading: 'Cargando contenido remoto...',
            tech_zustand_title: 'Store Zustand',
            tech_zustand_desc: 'Estado global mínimo y sin boilerplate con gran soporte TypeScript.',
            tech_i18n_title: 'i18n (react-i18next)',
            tech_i18n_desc: 'Cambio de idioma en runtime compartido entre host y remote vía props + Zustand.',
            language: 'Idioma'
        }
    }
}

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: { escapeValue: false },
    })

export default i18n
