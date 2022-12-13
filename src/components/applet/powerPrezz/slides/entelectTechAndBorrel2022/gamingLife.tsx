import { CheckIcon } from '@chakra-ui/icons';
import { Button, Center, Text } from '@chakra-ui/react';
import React, { ReactNode, useState } from 'react';
import { getScreenshareStream } from '../../../../../helper/screenshareHelper';
import { Screenshare } from '../../../../special/screenshare';
import { SlideTemplate } from '../slideTemplate';
import { entelectSlideBackground, entelectSlideBackgroundLookup } from './common';

interface IProps {
    isFocused?: boolean;
}

export const EntelectTechAndBorrel2022GamingLifeSlides: React.FC<IProps> = (props: IProps) => {
    const [satisfactoryStream, setSatisfactoryStream] = useState<MediaStream | undefined>();
    const [otherStream, setOtherStream] = useState<MediaStream | undefined>();

    return (
        <SlideTemplate
            isFocused={props.isFocused}
            bgRender={(backgroundId: string, index: number): ReactNode | void => {
                if (entelectSlideBackgroundLookup[backgroundId] != null) return entelectSlideBackgroundLookup[backgroundId].render();
                return entelectSlideBackground;
            }}
            slides={[
                {
                    backgroundId: entelectSlideBackgroundLookup.default.id,
                    render: (_) => (
                        <Center flexDirection="column">
                            <Text fontSize="4xl" textAlign="center">Setup</Text>
                            <Button onClick={() => getScreenshareStream((strm) => setSatisfactoryStream(strm))}
                                leftIcon={satisfactoryStream != null ? <CheckIcon /> : undefined}>Satisfactory stream</Button>
                            <br />
                            <Button onClick={() => getScreenshareStream((strm) => setOtherStream(strm))}
                                leftIcon={otherStream != null ? <CheckIcon /> : undefined}>Other stream</Button>
                        </Center>
                    ),
                },
                {
                    backgroundId: entelectSlideBackgroundLookup.default.id,
                    render: (_) => (
                        <Center>
                            <Text fontSize="4xl" textAlign="center">Entelect<br />Tech & Borrel</Text>
                        </Center>
                    ),
                },
                {
                    skip: satisfactoryStream == null,
                    backgroundId: entelectSlideBackgroundLookup.default.id,
                    render: (_: any) => (
                        <Screenshare stream={satisfactoryStream} />
                    ),
                },
                {
                    skip: otherStream == null,
                    backgroundId: entelectSlideBackgroundLookup.default.id,
                    render: (_) => (
                        <Screenshare stream={otherStream} />
                    ),
                },
            ]}
        />
    );
}
