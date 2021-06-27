import React from 'react';
import { site } from '../../../../constants/site';

import { BasicLazyImage } from '../../../core/image';
import { GithubButton } from '../../../socialButtons';

export const SettingGithub: React.FC = () => {
    return (
        <>
            <GithubButton href={site.kurt.github} label="Personal Github Profile" />
            <BasicLazyImage imageUrl="https://github-readme-stats.vercel.app/api?username=Khaoz-Topsy&amp;show_icons=true&amp;line_height=24" alt="Github Stats" classNames="mt1 m-h-auto" />
            <BasicLazyImage imageUrl="https://github-readme-stats.vercel.app/api/top-langs?username=Khaoz-Topsy" alt="Github Language Stats" classNames="mt1 m-h-auto" />
        </>
    );
}

