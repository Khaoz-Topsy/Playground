import { Center } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Loader } from '../core/loader';

interface IProps {
    isFocused?: boolean;
    stream: MediaStream | undefined;
}

export const Screenshare: React.FC<IProps> = (props: IProps) => {
    const localVideo = React.createRef<any>();

    useEffect(() => {
        if (localVideo.current) (localVideo.current as any).srcObject = props.stream;
    }, [props.stream, localVideo]);



    if (props.stream == null) return (
        <Center flexDirection="column">
            <Loader text="Loading..." />
        </Center>
    );
    return (
        <Center>
            <video ref={localVideo} style={{ height: '100%' }} autoPlay></video>
        </Center>
    );
}

