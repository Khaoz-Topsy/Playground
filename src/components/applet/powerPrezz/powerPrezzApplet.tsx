import React from 'react'
import { site } from '../../../constants/site';
import { knownSlides } from '../../../constants/slides';

import { IApplet } from '../../../contracts/interface/IApplet'
import { Applet } from '../../window/applet/applet'
import { EntelectTechAndBorrel2022EarlyLifeSlides } from './slides/entelectTechAndBorrel2022/earlyLife';

interface IProps extends IApplet { }

export const PowerPrezzApplet: React.FC<IProps> = (props: IProps) => {
    // const ctx = useContext(DependencyInjectionContext);


    const renderSlides = (slideName: string) => {
        if (slideName === knownSlides.EntelectTechAndBorrel2022.EarlyLife) {
            return (<EntelectTechAndBorrel2022EarlyLifeSlides isFocused={props.isFocused} />);
        }

        return (
            <iframe
                id="prezzIframe"
                key="prezzIframe"
                title="prezzIframe"
                className="pos-abs-top-left"
                style={{ zIndex: 2 }}
                src={slideName}
                frameBorder="0"
            />
        )
    }

    const slidesToLoad = props?.meta?.slides ?? site.kurt.presentation;
    return (
        <Applet
            key="prezzWindow"
            {...props}
            isFullscreen={true}
        >
            {renderSlides(slidesToLoad)}
        </Applet>
    );
}
