import React from 'react';
import { Image, Center } from '@chakra-ui/react';
import { BasicLink } from '../../../core/link';

export const SettingAbout: React.FC = () => {
    return (
        <>
            <Center>
                <Image
                    borderRadius="full"
                    boxSize="150px"
                    src="https://kurtlourens.com/assets/images/KurtAvatar.svg"
                    alt="Kurt Lourens"
                />
            </Center>
            <br />
            <p style={{ textAlign: 'center' }}>This project was inspired by the work done on&nbsp;
                <BasicLink href="https://goodmanwen.github.io/">goodmanwen.github.io</BasicLink> and&nbsp;
                <BasicLink href="https://portfolio.zxh.io/">portfolio.zxh.io</BasicLink>.&nbsp;
            </p>
            <p style={{ textAlign: 'center' }}>
                This website is intended to give you information on projects I have worked on in a more fun and interactive way!
            </p>
        </>
    );
}

