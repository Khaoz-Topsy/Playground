import React from 'react';
import { Box, Flex, VStack } from '@chakra-ui/react';
import classNames from 'classnames';

import { IAppletFile } from '../../../contracts/interface/IFile';
import { translate } from '../../../integration/i18n';
import { windowIcon } from '../../window/windowIcon';
import { SpotlightSearchResultMeta } from './spotlightSearchResultMeta';

interface IProps {
    searchText: string;
    selectedSearchResult: number;
    searchResults: Array<IAppletFile>;
    setSelectedSearchResult: (newIndex: number) => void;
}

export const SpotlightSearchResult: React.FC<IProps> = (props: IProps) => {

    return (
        <div
            key="spotlight"
            className={classNames('spotlight-results-bg', { isOpen: props.searchResults.length > 0 })}>
            <Flex>
                <VStack
                    pl={3}
                    flex="1"
                    spacing={1}
                    align="stretch"
                    className="results-list"
                    overflowY="scroll"
                    pointerEvents="all"
                    zIndex={3}
                >
                    {
                        props.searchResults.map((sr: IAppletFile, index: number) => (
                            <Box
                                key={sr.id}
                                className={classNames('result', { 'selected': index === props.selectedSearchResult })}
                                onClick={() => props.setSelectedSearchResult(index)}
                            >
                                {windowIcon(sr.appletType)}
                                <p>{
                                    translate(sr.name).split('').map((char: string, index: number) => {
                                        const itemClassObj = { 'highlight': props.searchText.includes(char.toLocaleLowerCase()) };
                                        return (
                                            <span key={`${char}-${index}`} className={classNames(itemClassObj)}>{char}</span>
                                        );
                                    })
                                }</p>
                            </Box>
                        ))
                    }
                </VStack>
                <SpotlightSearchResultMeta
                    searchResult={props.searchResults?.[props.selectedSearchResult]}
                />
            </Flex>
        </div>
    );
}