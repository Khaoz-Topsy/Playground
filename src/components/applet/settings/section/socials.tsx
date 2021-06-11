import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';

import { PersonalGithub, PersonalTwitter, AssistantAppsDiscord, AssistantAppsTwitter, AssistantNmsYoutube } from '../../../socialButtons';
import { SettingItemSection } from '../settingItemSection';

export const SettingSocials: React.FC = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <SettingItemSection heading="Personal accounts" showDivider={false}>
                <SimpleGrid minChildWidth="200px" columnGap="10px" rowGap="10px" className="mt1">
                    <PersonalGithub />
                    <PersonalTwitter />
                </SimpleGrid>
            </SettingItemSection>
            <br />
            <SettingItemSection heading="AssistantApps accounts" showDivider={false}>
                <SimpleGrid minChildWidth="200px" columnGap="10px" rowGap="10px" className="mt1">
                    <AssistantAppsDiscord />
                    <AssistantAppsTwitter />
                    <AssistantNmsYoutube />
                </SimpleGrid>
            </SettingItemSection>
        </div>
    );
}

