import React, { useState } from 'react';
import { Box, Container, Grid, GridItem } from '@chakra-ui/react';

import { IApplet } from '../../../contracts/interface/IApplet';
import { Applet } from '../../window/applet/applet';
import { SettingItem } from './settingItem';
import { SettingHome } from './section/home';
import { SettingAbout } from './section/about';
import { SettingGithub } from './section/github';
import { SettingSocials } from './section/socials';
import { defaultSettingWidth } from '../../../constants/window';

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

    const pages = [
        {
            title: 'General',
            new: false,
            comp: <SettingHome />
        },
        {
            title: 'Github',
            new: false,
            comp: <SettingGithub />
        },
        {
            title: 'Socials',
            new: false,
            comp: <SettingSocials />
        },
        {
            title: 'About',
            new: false,
            comp: <SettingAbout />
        },
    ];

    return (
        <Applet
            {...props}
            defaultWidth={defaultSettingWidth}
        >
            <Container maxW={"container.xl"}>
                <Box mt={4}>
                    <Grid templateColumns="repeat(3, 1fr)" gap={10}>
                        <GridItem colSpan={1}>
                            <Box borderColor={'whiteAlpha.400'} borderRadius={'md'} borderWidth={'1px'} >
                                {
                                    pages.map((page, index: number) => {
                                        return (
                                            <SettingItem
                                                key={page.title}
                                                name={page.title}
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
                        </GridItem>
                        <GridItem colSpan={2}>
                            {pages[state.pageIndex].comp}
                        </GridItem>
                    </Grid>
                </Box>
            </Container>
        </Applet>
    );
}
