import React from 'react';
import { SimpleGrid, Text } from '@chakra-ui/react';

import {
    PersonalGithub, PersonalTwitter,
    AssistantAppsDiscord, AssistantAppsTwitter
} from '../../../socialButtons';

export const SettingSocials: React.FC = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <Text fontSize="xl">Personal accounts</Text>
            <br />
            <SimpleGrid minChildWidth="200px" columnGap="10px" rowGap="10px">
                <PersonalGithub />
                <PersonalTwitter />
            </SimpleGrid>
            <br />
            <hr />
            <br />
            <Text fontSize="xl">AssistantApps accounts</Text>
            <br />
            <SimpleGrid minChildWidth="200px" columnGap="10px" rowGap="10px">
                <AssistantAppsDiscord />
                <AssistantAppsTwitter />
            </SimpleGrid>
        </div>
    );
}

