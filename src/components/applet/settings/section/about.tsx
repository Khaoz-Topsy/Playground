import React from 'react';
import { Box, Center } from '@chakra-ui/react';

import { BasicLink } from '../../../core/link';
import { BasicLazyImage } from '../../../core/image';
import { site } from '../../../../constants/site';

import packageJson from '../../../../../package.json';

export const SettingAbout: React.FC = () => {
    return (
        <Box marginX={2}>
            <Center position="relative">
                <BasicLazyImage
                    classNames="settings-about"
                    imageUrl={site.kurt.profilePic}
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
            <br />
            <p style={{ textAlign: 'center' }}>Version: {packageJson.version}</p>
        </Box>
    );
}

