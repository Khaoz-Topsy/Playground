import * as React from 'react';
import { Box, Divider, Grid, GridItem, Text, useColorMode } from "@chakra-ui/react";

interface ISettingItemSection {
    heading: string;
    subTexts?: string[];
}

export const SettingItemSection: React.FunctionComponent<ISettingItemSection> = props => {
    return (
        <Box mb={14}>
            <Text fontSize="2xl" >{props.heading}</Text>
            <Divider mt={2} mb={2} />
            {
                props.subTexts &&
                props.subTexts.map((text, index) => <Text key={index} mb={1} fontSize="md" color={'whiteAlpha.600'}>{text}</Text>)
            }
            <Box mt={1}>
                <Grid templateColumns="repeat(10, 1fr)" gap={10}>
                    <GridItem colSpan={7}>
                        {props.children}
                    </GridItem>
                </Grid>
            </Box>
        </Box>
    )
};