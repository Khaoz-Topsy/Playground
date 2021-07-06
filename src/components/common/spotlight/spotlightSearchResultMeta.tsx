import React, { ReactNode } from "react";
import { Box, Center, Divider } from "@chakra-ui/react";

import { IAppletFile } from "../../../contracts/interface/IFile";
import { windowIcon } from "../../window/windowIcon";
import { BasicLink } from "../../core/link";

interface IProps {
    searchResult?: IAppletFile;
}

export const SpotlightSearchResultMeta: React.FC<IProps> = (props: IProps) => {
    if (props.searchResult == null) return (<span></span>);

    const renderInfoRow = (title: string, value?: string | ReactNode, defaultValue?: string | ReactNode) => {
        const valueToDisplay = value ?? defaultValue;
        if (valueToDisplay == null) return null;
        return (<li><Center>{title}:&nbsp;<span>{valueToDisplay}</span></Center></li>);
    }

    const divider = () => <Divider mx="auto" my={2} width="80%" opacity={0.25} />

    const { author, projectUrl, version, size, installedOn } = props.searchResult.info;

    return (
        <Box flex="1" className="search-meta noselect">
            <Center>{windowIcon(props.searchResult.appletType)}</Center>
            <ul>
                {
                    (author != null) && renderInfoRow('Author', author)
                }
                {
                    (projectUrl != null) &&
                    renderInfoRow('Project Url', <BasicLink href={projectUrl} >{(projectUrl ?? '').replace('https://', '').replace('www.', '')}</BasicLink>)
                }
                {
                    (author != null || projectUrl != null) && divider()
                }
                {
                    (version != null) && renderInfoRow('Version', version)
                }
                {
                    (size !== 0) && renderInfoRow('Size', size.toString() + ' kb')
                }
                {divider()}
                {
                    (installedOn != null) && renderInfoRow('Installed On', installedOn.toDateString())
                }
            </ul>
        </Box>
    );
}