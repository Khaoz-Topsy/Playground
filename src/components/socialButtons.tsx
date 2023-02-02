import classNames from "classnames";
import React, { ReactNode } from "react";
import { site } from "../constants/site";
import { DiscordLogo } from "./core/icon";
import { BasicImage } from "./core/image";
import { BasicLink } from "./core/link";

interface IBasicBtnProps {
    href: string;
    buttonClass: string;
    children: ReactNode;
    label: string;
}

const BasicBtn: React.FC<IBasicBtnProps> = (props: IBasicBtnProps) => {
    return (
        <BasicLink href={props.href}>
            <div className={classNames('social-btn', props.buttonClass)}>
                <div className="inner">
                    <div className="icon">{props.children}</div>
                    <div className="text">{props.label}</div>
                </div>
            </div>
        </BasicLink>
    );
}

interface IGithubBtnProps {
    href: string;
    label: string;
}
export const GithubButton: React.FC<any> = (props: IGithubBtnProps) => {
    return (
        <BasicBtn href={props.href} buttonClass="github" label={props.label}>
            <svg fill="#FFFFFF" role="img" viewBox="0 0 24 24" width="26px" height="26px" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
            </svg>
        </BasicBtn>
    );
}

export const PersonalGithub: React.FC<any> = () => (<GithubButton href={site.kurt.github} label="Khaoz-Topsy" />);

export const PersonalTwitter: React.FC = () => {
    return (
        <BasicBtn href={site.kurt.twitter} buttonClass="twitter" label="KhaozTopsy">
            <svg xmlns="http://www.w3.org/2000/svg" width="26px" height="26px" viewBox="0 0 24 24"><path fill="#FFFFFF" d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
        </BasicBtn>
    );
}

export const PersonalTwitch: React.FC = () => {
    return (
        <BasicBtn href={site.kurt.twitch} buttonClass="twitch" label="KhaozTopsy">
            <BasicImage imageUrl="/assets/img/social/twitch.svg" />
        </BasicBtn>
    );
}

export const PersonalYoutube: React.FC = () => {
    return (
        <BasicBtn href={site.kurt.youtube} buttonClass="youtube" label="KhaozTopsy">
            <BasicImage imageUrl="/assets/img/social/youtube.svg" />
        </BasicBtn>
    );
}

export const PersonalLinkedIn: React.FC = () => {
    return (
        <BasicBtn href={site.kurt.linkedin} buttonClass="linkedin" label="Kurt Lourens">
            <svg xmlns="http://www.w3.org/2000/svg" width="26px" height="26px" viewBox="0 0 430.117 430.117"><g><path d="M430.117,261.543V420.56h-92.188V272.193c0-37.271-13.334-62.707-46.703-62.707   c-25.473,0-40.632,17.142-47.301,33.724c-2.432,5.928-3.058,14.179-3.058,22.477V420.56h-92.219c0,0,1.242-251.285,0-277.32h92.21   v39.309c-0.187,0.294-0.43,0.611-0.606,0.896h0.606v-0.896c12.251-18.869,34.13-45.824,83.102-45.824   C384.633,136.724,430.117,176.361,430.117,261.543z M52.183,9.558C20.635,9.558,0,30.251,0,57.463   c0,26.619,20.038,47.94,50.959,47.94h0.616c32.159,0,52.159-21.317,52.159-47.94C103.128,30.251,83.734,9.558,52.183,9.558z    M5.477,420.56h92.184v-277.32H5.477V420.56z" fill="#FFFFFF"></path></g></svg>
        </BasicBtn>
    );
}

export const PersonalSteam: React.FC = () => {
    return (
        <BasicBtn href={site.kurt.steam} buttonClass="steam" label="Khaoz-Topsy">
            <BasicImage imageUrl="/assets/img/social/steam.svg" />
        </BasicBtn>
    );
}

export const PersonalDiscord: React.FC = () => {
    return (
        <div className="social-btn discord">
            <div className="inner">
                <div className="icon">
                    <DiscordLogo />
                </div>
                <div className="text">{site.kurt.discord}</div>
            </div>
        </div>
    );
}

export const AssistantNmsYoutube: React.FC = () => {
    return (
        <BasicBtn href={site.assistantApps.youtube} buttonClass="youtube" label="AssistantNMS">
            <BasicImage imageUrl="/assets/img/social/youtube.svg" />
        </BasicBtn>
    );
}

export const AssistantAppsDiscord: React.FC = () => {
    return (
        <BasicBtn href={site.assistantApps.discord} buttonClass="discord" label="AssistantApps">
            <DiscordLogo />
        </BasicBtn>
    );
}

export const AssistantNmsTwitter: React.FC = () => {
    return (
        <BasicBtn href={site.assistantApps.nms.twitter} buttonClass="twitter" label="AssistantNMS">
            <svg xmlns="http://www.w3.org/2000/svg" width="26px" height="26px" viewBox="0 0 24 24"><path fill="#FFFFFF" d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
        </BasicBtn>
    );
}

export const AssistantNmsMastodon: React.FC = () => {
    return (
        <BasicBtn href={site.assistantApps.mastodon} buttonClass="mastodon" label="@AssistantNMS">
            <BasicImage imageUrl="/assets/img/social/mastodon.svg" />
        </BasicBtn>
    );
}

export const AssistantAppsGithub: React.FC = () => (<GithubButton href={site.assistantApps.github} label="AssistantApps Organization" />);
export const AssistantNmsGithub: React.FC = () => (<GithubButton href={site.assistantApps.nms.github} label="No Man's Sky Organization" />);
export const AssistantSmsGithubOrg: React.FC = () => (<GithubButton href={site.assistantApps.sms.githubOrg} label="Scrap Mechanic Organization" />);
export const AssistantSmsGithubApp: React.FC = () => (<GithubButton href={site.assistantApps.sms.githubApp} label="Scrap Mechanic App" />);
