import React from 'react';

import { BasicImage } from '../../../core/image';
import { PersonalGithub } from '../../../socialButtons';

export const SettingGithub: React.FC = () => {
    return (
        <>
            <PersonalGithub label="Github Profile" />
            <BasicImage imageUrl="https://github-readme-stats.vercel.app/api?username=Khaoz-Topsy&amp;show_icons=true&amp;line_height=24" alt="Github Stats" classNames="mt1" />
            <BasicImage imageUrl="https://github-readme-stats.vercel.app/api/top-langs?username=Khaoz-Topsy" alt="Github Language Stats" classNames="mt1" />
        </>
    );
}

