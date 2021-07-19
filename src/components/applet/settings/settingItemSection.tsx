import * as React from 'react';
import { Box, Divider, Text, Tooltip } from "@chakra-ui/react";
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { translate } from '../../../integration/i18n';
import { LocaleKey } from '../../../localization/LocaleKey';
import { ReactNode } from 'react-markdown';

interface ISettingItemSection {
    heading: string;
    subTexts?: string[];
    showDivider?: boolean;
    topRightChild?: ReactNode;
    headingTooltip?: LocaleKey;
}

export const SettingItemSection: React.FunctionComponent<ISettingItemSection> = props => {
    return (
        <Box mb={6}>
            <Text fontSize="2xl" className="noselect">
                {props.heading}
                {
                    (props.headingTooltip != null) &&
                    <Tooltip label={translate(props.headingTooltip)} fontSize="md">
                        <InfoOutlineIcon ml={2} fontSize={20} />
                    </Tooltip>
                }
            </Text>
            {
                (props.topRightChild) &&
                <Box className="pos-abs-top-right">
                    {props.topRightChild}
                </Box>
            }
            {
                (props.showDivider ?? true) &&
                <Divider mt={2} mb={2} />
            }
            {
                props.subTexts &&
                props.subTexts.map((text, index) => (
                    <Text key={index} mb={1} fontSize="md" color={'whiteAlpha.600'} className="noselect">{text}</Text>
                ))
            }
            <Box mt={1}>{props.children}</Box>
        </Box>
    )
};