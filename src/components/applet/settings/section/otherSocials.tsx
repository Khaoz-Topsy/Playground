import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';

import {
    AssistantAppsDiscord, AssistantAppsGithub,
    AssistantNmsTwitter, AssistantNmsYoutube, AssistantNmsGithub,
    AssistantSmsGithubOrg, AssistantSmsGithubApp,
} from '../../../socialButtons';
import { SettingItemSection } from '../settingItemSection';

export const SettingOtherSocials: React.FC = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <SettingItemSection heading="AssistantApps" showDivider={false}>
                <SimpleGrid minChildWidth="200px" columnGap="10px" rowGap="10px" className="mt1">
                    <AssistantAppsDiscord />
                    <AssistantAppsGithub />
                </SimpleGrid>
            </SettingItemSection>
            <SettingItemSection heading="No Man's Sky" showDivider={false}>
                <SimpleGrid minChildWidth="200px" columnGap="10px" rowGap="10px" className="mt1">
                    <AssistantNmsTwitter />
                    <AssistantNmsYoutube />
                    <AssistantNmsGithub />
                </SimpleGrid>
            </SettingItemSection>
            <SettingItemSection heading="Scrap Mechanic" showDivider={false}>
                <SimpleGrid minChildWidth="200px" columnGap="10px" rowGap="10px" className="mt1">
                    <AssistantSmsGithubOrg />
                    <AssistantSmsGithubApp />
                </SimpleGrid>
            </SettingItemSection>
        </div>
    );
}

