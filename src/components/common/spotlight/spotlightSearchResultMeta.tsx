import React, { ReactNode } from "react";
import { Box, Center, Divider } from "@chakra-ui/react";

import { IAppletFile } from "../../../contracts/interface/IFile";
import { windowIcon } from "../../window/windowIcon";
import { BasicLink } from "../../core/link";
import { LocaleKey } from "../../../localization/LocaleKey";
import { translate } from "../../../integration/i18n";

interface IProps {
    hideImage?: boolean;
    searchResult?: IAppletFile;
}

export const SpotlightSearchResultMeta: React.FC<IProps> = (props: IProps) => {
    if (props.searchResult == null) return (<span></span>);

    const renderInfoRow = (title: LocaleKey, value?: string | ReactNode, defaultValue?: string | ReactNode) => {
        const valueToDisplay = value ?? defaultValue;
        if (valueToDisplay == null) return null;
        return (<li><Center>{translate(title)}:&nbsp;<span>{valueToDisplay}</span></Center></li>);
    }

    const divider = () => <Divider mx="auto" my={2} width="80%" opacity={0.25} />

    const { author, projectUrl, version, size, installedOn, updatedOn } = props.searchResult.info;

    return (
        <Box flex="1" className="search-meta noselect">
            {
                (props.hideImage !== true)
                    ? <Center>{windowIcon(props.searchResult.appletType)}</Center>
                    : <br />
            }
            <ul>
                {(author != null) && renderInfoRow(LocaleKey.author, author)}
                {
                    (projectUrl != null) &&
                    renderInfoRow(LocaleKey.projectUrl, <BasicLink href={projectUrl} >{(projectUrl ?? '').replace('https://', '').replace('www.', '')}</BasicLink>)
                }
                {(author != null || projectUrl != null) && divider()}
                {(version != null) && renderInfoRow(LocaleKey.version, version)}
                {(size !== 0) && renderInfoRow(LocaleKey.size, size.toString() + ' kb')}
                {divider()}
                {(installedOn != null) && renderInfoRow(LocaleKey.installedOn, installedOn.toDateString())}
                {(updatedOn != null) && renderInfoRow(LocaleKey.updatedOn, updatedOn.toDateString())}
            </ul>
        </Box>
    );
}