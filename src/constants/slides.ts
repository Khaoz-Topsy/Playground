import { EntelectTechAndBorrel2022EarlyLifeSlides } from "../components/applet/powerPrezz/slides/entelectTechAndBorrel2022/earlyLife";
import { EntelectTechAndBorrel2022GamingLifeSlides } from "../components/applet/powerPrezz/slides/entelectTechAndBorrel2022/gamingLife";
import { EntelectTechAndBorrel2022WorkLifeSlides } from "../components/applet/powerPrezz/slides/entelectTechAndBorrel2022/workLife";

export interface IKnownSlideDeck {
    [prop: string]: {
        [prop: string]: ISlide;
    };
}

export interface ISlide {
    id: string;
    name: string;
    component: React.FC<ISlideProps>;
    createdDate: Date;
}

export interface ISlideProps {
    isFocused?: boolean;
}

export const knownSlides: IKnownSlideDeck = {
    EntelectTechAndBorrel2022: {
        EarlyLife: {
            id: 'EntelectTechAndBorrel2022-early-life',
            name: 'family life.pptx',
            component: EntelectTechAndBorrel2022EarlyLifeSlides,
            createdDate: new Date('2022-12-14T19:24:00'),
        },
        GamingLife: {
            id: 'EntelectTechAndBorrel2022-gaming-life',
            name: 'gaming.pptx',
            component: EntelectTechAndBorrel2022GamingLifeSlides,
            createdDate: new Date('2022-12-15T20:01:00'),
        },
        WorkLife: {
            id: 'EntelectTechAndBorrel2022-work-life',
            name: 'work life.pptx',
            component: EntelectTechAndBorrel2022WorkLifeSlides,
            createdDate: new Date('2022-12-15T20:02:00'),
        },
    }
};

export const iframesInSlides = {
    koppieAlleen: 'https://www.google.com/maps/embed?pb=!4v1670413947733!6m8!1m7!1sSzd-RbVyuUd8JbxB4Wc50g!2m2!1d-27.90745370324197!2d26.7958425026662!3f198.92!4f-0.10999999999999943!5f0.7820865974627469',
    sadiolla: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d54699.310627189596!2d-11.638247499574664!3d13.877860167508024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2snl!4v1670421584701!5m2!1sen!2snl',
    morilla: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d27600.576848688866!2d-6.844318424097357!3d11.690196435818883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2snl!4v1670421099106!5m2!1sen!2snl',
    flevoland: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d369397.58427145326!2d5.335150960068551!3d52.53714128496269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c626f2b69113d7%3A0x3ffadcc247ee2ce1!2sFlevoland!5e0!3m2!1sen!2snl!4v1673882788311!5m2!1sen!2snl',
}