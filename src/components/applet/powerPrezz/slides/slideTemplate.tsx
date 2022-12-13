import { Center } from '@chakra-ui/react';
import Mousetrap from 'mousetrap';
import React, { ReactNode, useEffect, useState } from 'react'
import { knownKeybinds } from '../../../../constants/keybind';

interface ISlideProps {
    backgroundId: string;
    skip?: boolean;
    render: (paginate: (newDirection: number) => void) => ReactNode;
}

interface IProps {
    isFocused?: boolean;
    slides: Array<ISlideProps>;
    bgRender: (backgroundId: string, slideIdx: number) => ReactNode | void;
}

export const SlideTemplate: React.FC<IProps> = (props: IProps) => {
    const [[currentSlideIndex], setCurrentSlideIndex] = useState([0, 0]);
    const actualSlides = props.slides.filter(s => s.skip !== true);

    const paginate = (newDirection: number) => {
        setCurrentSlideIndex((oldValue) => {
            const newIndex = oldValue[0] + newDirection;
            if (newIndex >= actualSlides.length) return oldValue;
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

    const currentSlideObj = actualSlides[currentSlideIndex];
    const bg = props.bgRender(currentSlideObj.backgroundId, currentSlideIndex);
    return (
        <>
            {
                (bg != null) &&
                <div key={`bg-${currentSlideIndex}`} className="prezz-container-bg pos-abs-top-left noselect">
                    {bg}
                </div>
            }
            <div key={`slide-${currentSlideIndex}`} className="prezz-container noselect">
                {currentSlideObj.render(paginate)}
                {
                    (currentSlideIndex < (actualSlides.length - 1)) &&
                    <Center className="prezz-next" onClick={() => paginate(1)}>&gt;</Center>
                }
                {
                    (currentSlideIndex > 0) &&
                    <Center className="prezz-prev" onClick={() => paginate(-1)}>&lt;</Center>
                }
            </div>
        </>
    );
}

