import { Button, Center, Text } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { Backgrounds } from '../../../../../constants/appImage';
import { entelectSlidedBackground, SlideTemplate } from '../slideTemplate';

interface IProps {
    isFocused?: boolean;
}

export const EntelectTechAndBorrel2022EarlyLifeSlides: React.FC<IProps> = (props: IProps) => {
    return (
        <SlideTemplate
            isFocused={props.isFocused}
            bgRender={(index: number): ReactNode | void => {
                // if (index === 0) return entelectSlidedBackground;
                return entelectSlidedBackground;
            }}
            slides={[
                (_) => (
                    <Center>
                        <Text size="3xl" textAlign="center">Entelect<br />Tech & Borrel</Text>
                    </Center>
                ),
                () => (
                    <Center>
                        <div>
                            <Text fontSize="xl">Tester test</Text>
                        </div>
                    </Center>
                ),
                (paginate) => (
                    <Center>
                        <div>
                            <Text fontSize="xl">Tester test</Text>
                            <Button onClick={() => paginate(-2)}>Hi</Button>
                        </div>
                    </Center>
                ),
            ]}
        />
    );
}
