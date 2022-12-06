import { Center } from '@chakra-ui/react';
import Mousetrap from 'mousetrap';
import React, { ReactNode, useEffect, useState } from 'react'
import { Presentation } from '../../../../constants/appImage';
import { knownKeybinds } from '../../../../constants/keybind';

interface IProps {
    isFocused?: boolean;
    slides: Array<(paginate: (newDirection: number) => void) => ReactNode>;
    bgRender: (slideIdx: number) => ReactNode | void;
}

export const SlideTemplate: React.FC<IProps> = (props: IProps) => {
    const [[currentSlideIndex], setCurrentSlideIndex] = useState([0, 0]);

    const paginate = (newDirection: number) => {
        setCurrentSlideIndex((oldValue) => {
            const newIndex = oldValue[0] + newDirection;
            if (newIndex >= props.slides.length) return oldValue;
            if (newIndex < 0) return oldValue;

            return [newIndex, newDirection];
        });
    };

    useEffect(() => {

        if (props.isFocused !== true) return;

        Mousetrap.bind(knownKeybinds.left, (e) => paginate(-1));
        Mousetrap.bind(knownKeybinds.right, (e) => paginate(1));

        return () => {
            Mousetrap.unbind(knownKeybinds.left);
            Mousetrap.unbind(knownKeybinds.right);
        }
        // eslint-disable-next-line
    }, [props.isFocused]);

    const currentSlide = props.slides[currentSlideIndex];
    const bg = props.bgRender(currentSlideIndex);
    return (
        <>
            <>
                {
                    (bg != null) &&
                    <div key={`bg-${currentSlideIndex}`} className="prezz-container-bg pos-abs-top-left">
                        {bg}
                    </div>
                }
                <div key={`slide-${currentSlideIndex}`} className="prezz-container">
                    {currentSlide(paginate)}
                    {
                        (currentSlideIndex < (props.slides.length - 1)) &&
                        <Center className="prezz-next" onClick={() => paginate(1)}>&gt;</Center>
                    }
                    {
                        (currentSlideIndex > 0) &&
                        <Center className="prezz-prev" onClick={() => paginate(-1)}>&lt;</Center>
                    }
                </div>
            </>
        </>
    );
}

export const entelectSlidedBackground = (<img src={Presentation.entelectbg2} alt="entelect background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />);
