import React from 'react';

import { PersonalGithub } from '../../../socialButtons';

export const SettingGithub: React.FC = () => {
    return (
        <>
            <PersonalGithub label="Github Profile" />
            <img src="https://github-readme-stats.vercel.app/api?username=Khaoz-Topsy&amp;show_icons=true&amp;line_height=24" alt="Github Stats" className="mt1" />
            <img src="https://github-readme-stats.vercel.app/api/top-langs?username=Khaoz-Topsy" alt="Github Language Stats" className="mt1" />
        </>
    );
}

