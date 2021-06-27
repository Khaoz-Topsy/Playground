import React, { useState } from 'react';
import { Box, Container } from '@chakra-ui/react';
import { SettingsIcon, InfoOutlineIcon, StarIcon, QuestionIcon } from '@chakra-ui/icons';

import { IApplet } from '../../../contracts/interface/IApplet';
import { defaultSettingWidth } from '../../../constants/window';

import { WindowHeader } from '../../window/windowHeader';
import { windowIcon } from '../../window/windowIcon';
import { Window } from '../../window/window';
import { SettingItem } from './settingItem';
import { SettingHome } from './section/home';
import { SettingAbout } from './section/about';
import { SettingGithub } from './section/github';
import { SettingPersonalSocials } from './section/personalSocials';
import { SettingOtherSocials } from './section/otherSocials';

interface IProps extends IApplet {
    pageIndex?: number;
}

interface IState {
    pageIndex: number;
}

export const SettingApplet: React.FC<IProps> = (props: IProps) => {
    const [state, setState] = useState<IState>({
        pageIndex: props.pageIndex ?? 0,
    });

    const chakraIconMarginRight = "3";
    const chakraIconMarginBottom = "1";

    const pages = [
        {
            title: 'General',
            new: false,
            comp: <SettingHome />,
            icon: <SettingsIcon mr={chakraIconMarginRight} mb={chakraIconMarginBottom} />,
        },
        {
            title: 'Github',
            new: false,
            comp: <SettingGithub />,
            icon: <InfoOutlineIcon mr={chakraIconMarginRight} mb={chakraIconMarginBottom} />,
        },
        {
            title: 'Personal Socials',
            new: false,
            comp: <SettingPersonalSocials />,
            icon: <StarIcon mr={chakraIconMarginRight} mb={chakraIconMarginBottom} />,
        },
        {
            title: 'Other Socials',
            new: false,
            comp: <SettingOtherSocials />,
            icon: <StarIcon mr={chakraIconMarginRight} mb={chakraIconMarginBottom} />,
        },
        {
            title: 'About',
            new: false,
            comp: <SettingAbout />,
            icon: <QuestionIcon mr={chakraIconMarginRight} mb={chakraIconMarginBottom} />,
        },
    ];

    return (
        <Window
            {...props}
            isFullscreen={true}
            classNames="setting"
            headerFunc={() => <WindowHeader {...props} windowIcon={windowIcon(props.appletType)} />}
            defaultWidth={defaultSettingWidth}
            sidebar={
                <Box borderColor={'whiteAlpha.400'} borderRadius={'md'} borderWidth={'1px'} >
                    {
                        pages.map((page, index: number) => {
                            return (
                                <SettingItem
                                    key={page.title}
                                    name={page.title}
                                    icon={page.icon}
                                    isActive={index === state.pageIndex}
                                    onClick={() => setState({ ...state, pageIndex: index })}
                                    isFirst={index === 0}
                                    isLast={index === (pages.length - 1)}
                                    new={page.new}
                                />
                            );
                        })
                    }
                </Box>
            }
        >
            <Container maxW={"container.xl"}>
                <Box mt={4}>
                    {pages[state.pageIndex].comp}
                </Box>
            </Container>
        </Window>
    );
}
