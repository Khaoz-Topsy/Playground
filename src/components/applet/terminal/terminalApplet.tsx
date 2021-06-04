import React from 'react';
import { Box, Container } from '@chakra-ui/react';

import { AppletType } from '../../../constants/enum/appletType';
import { IApplet } from '../../../contracts/interface/IApplet';
import { Window } from '../../window/window';
import { windowIcon } from '../../window/windowIcon';

interface IProps extends IApplet { }

export const TerminalApplet: React.FC<IProps> = (props: IProps) => {

    return (
        <Window
            {...props}
            title="Terminal"
            windowIcon={windowIcon(AppletType.setting)}
        >
            <Container maxW={"container.xl"}>
                <Box mt={4}>

                </Box>
            </Container>
        </Window>
    );
}
