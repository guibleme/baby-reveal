// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Translation files
const resources = {
    en: {
        translation: {
            "vote_for": "Vote for boy or girl",
            "people_voted": "people left their message already!",
            "your_name": "Your Name",
            "enter_name": "Enter your name",
            "message_to_baby": "A message to the baby (optional)",
            "leave_message": "Leave a message, it will be saved as a memento on the baby keepsake",
            "boy": "Boy",
            "girl": "Girl",
            "vote_recorded": "Vote recorded!",
            "error_fetching_votes": "Error fetching votes: ",
            "error_adding_document": "Error adding document: ",
            "please_enter_name": "Please enter your name",
            "please_complete_recaptcha": "Please complete the reCAPTCHA",
            "days": "days",
            "hours": "hours",
            "minutes": "minutes",
            "seconds": "seconds",
            "reveals_in": "in",
            "select_gender": "Please select the gender",
            "submit_vote": "Submit Vote",
            "revealed_gender": "Its a baby girl 🎀",
            "click_reveal": "Click to reveal",
            "revealed_button": "🎀"
        }
    },
    pt: {
        translation: {
            "vote_for": "Vote em menino ou menina",
            "people_voted": "pessoas já deixaram sua mensagem!",
            "your_name": "Seu nome",
            "enter_name": "Digite seu nome",
            "message_to_baby": "Uma mensagem para o bebê (opcional)",
            "leave_message": "Digite uma mensagem, ela será guardada como uma memória no álbum do bebê",
            "boy": "Menino",
            "girl": "Menina",
            "vote_recorded": "Voto computado!",
            "error_fetching_votes": "Erro ao obter votos: ",
            "error_adding_document": "Erro ao gravar documento: ",
            "please_enter_name": "Por favor digite seu nome",
            "please_complete_recaptcha": "Por favor complete o reCAPTCHA",
            "days": "dias",
            "hours": "horas",
            "minutes": "minutos",
            "seconds": "segundos",
            "reveals_in": "em",
            "submit_vote": "Submeter voto",
            "select_gender": "Por favor selecione o gênero",
            "revealed_gender": "É uma menininha 🎀",
            "click_reveal": "Clique para revelar",
            "revealed_button": "🎀"
        }
    }
};

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false // React already does escaping
        }
    });

export default i18n;
