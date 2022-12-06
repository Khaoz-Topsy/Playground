import { Center } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import Mousetrap from 'mousetrap';
import React, { ReactNode, useEffect, useState } from 'react'
import { Backgrounds, Presentation } from '../../../../constants/appImage';
import { knownKeybinds } from '../../../../constants/keybind';
import { AnimatePresenceWithoutType } from '../../../core/framerMotionFix';

interface IProps {
    isFocused?: boolean;
    slides: Array<(paginate: (newDirection: number) => void) => ReactNode>;
    bgRender: (slideIdx: number) => ReactNode | void;
}

export const SlideTemplate: React.FC<IProps> = (props: IProps) => {
    const [[currentSlideIndex, direction], setCurrentSlideIndex] = useState([0, 0]);

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
    }, [props.isFocused]);

    const variants = {
        enter: () => ({
            x: 0,
            opacity: 0.5,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: () => ({
            x: -1000,
            opacity: 0,
        })
    };

    const currentSlide = props.slides[currentSlideIndex];
    const bg = props.bgRender(currentSlideIndex);
    return (
        <>
            <AnimatePresenceWithoutType initial={false}>
                {
                    (bg != null) &&
                    <motion.div
                        key={`bg-${currentSlideIndex}`}
                        className="prezz-container-bg pos-abs-top-left"
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                    >
                        {bg}
                    </motion.div>
                }
                <motion.div
                    key={`slide-${currentSlideIndex}`}
                    className="prezz-container"
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                >
                    {currentSlide(paginate)}
                    {
                        (currentSlideIndex < (props.slides.length - 1)) &&
                        <Center className="prezz-next" onClick={() => paginate(1)}>&gt;</Center>
                    }
                    {
                        (currentSlideIndex > 0) &&
                        <Center className="prezz-prev" onClick={() => paginate(-1)}>&lt;</Center>
                    }
                </motion.div>
            </AnimatePresenceWithoutType>
        </>
    );
}

export const entelectSlidedBackground = (<img src={Presentation.entelectbg2} alt="entelect background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />);
