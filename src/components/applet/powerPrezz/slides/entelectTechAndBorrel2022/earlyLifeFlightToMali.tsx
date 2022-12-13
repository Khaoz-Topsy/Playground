import { Center } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { Presentation } from '../../../../../constants/appImage';

interface IProps {
    isReverse?: boolean;
    paginate: (newDirection: number) => void
}

export const EarlyLifeFlightToMaliSlide: React.FC<IProps> = (props: IProps) => {
    const vidRef: any = useRef();

    const navigateNext = () => setTimeout(() => props.paginate(1), 500);

    useEffect(() => {
        vidRef?.current?.addEventListener?.("ended", navigateNext);

        return () => {
            // eslint-disable-next-line
            vidRef?.current?.removeEventListener?.("ended", navigateNext)
        }
        // eslint-disable-next-line
    }, []);

    const videoToPlay = (props.isReverse === true)
        ? Presentation.flyToMaliReverse
        : Presentation.flyToMali;
    return (
        <Center>
            <video ref={vidRef}
                src={videoToPlay}
                autoPlay={true}
                loop={false}
                style={{ height: '100%' }}
            ></video>
        </Center>
    );
}
