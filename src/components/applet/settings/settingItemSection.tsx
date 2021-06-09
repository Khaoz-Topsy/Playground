import * as React from 'react';
import { Box, Divider, Grid, GridItem, Text } from "@chakra-ui/react";

interface ISettingItemSection {
    heading: string;
    subTexts?: string[];
    showDivider?: boolean;
}

export const SettingItemSection: React.FunctionComponent<ISettingItemSection> = props => {
    return (
        <Box mb={6}>
            <Text fontSize="2xl" >{props.heading}</Text>
            {
                (props.showDivider ?? true) &&
                <Divider mt={2} mb={2} />
            }
            {
                props.subTexts &&
                props.subTexts.map((text, index) => <Text key={index} mb={1} fontSize="md" color={'whiteAlpha.600'}>{text}</Text>)
            }
            <Box mt={1}>{props.children}</Box>
        </Box>
    )
};