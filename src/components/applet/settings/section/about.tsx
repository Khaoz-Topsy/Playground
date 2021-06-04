import React from 'react';
import { Center } from '@chakra-ui/react';
import { BasicLink } from '../../../core/link';
import { BasicImage } from '../../../core/image';

export const SettingAbout: React.FC = () => {
    return (
        <>
            <Center>
                <BasicImage
                    classNames="settings-about"
                    imageUrl="https://kurtlourens.com/assets/images/KurtAvatar.svg"
                    imageName="Kurt Lourens"
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

