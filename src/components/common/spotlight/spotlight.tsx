import React from 'react';
import { Input, InputGroup, InputLeftElement, VStack } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { useState } from 'react';

import { KnownApplets } from '../../../constants/knownApplets';
import { IAppletFile } from '../../../contracts/interface/IFile';
import { translate } from '../../../integration/i18n';
import { SpotlightSearchResult } from './spotlightSearch';
import { useRef } from 'react';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SpotlightSearch: React.FC<IProps> = (props: IProps) => {
    const [text, setText] = useState('');
    const [selectedSearchResult, setSelectedSearchResult] = useState(0);
    let inputRef = useRef<HTMLInputElement | null>(null);

    const variants = {
        initial: { scale: 0, opacity: 0, marginTop: '-50vh' },
        open: { scale: 1, opacity: 1, marginTop: 0 },
        closed: { scale: 0, opacity: 0, marginTop: 0 },
    }

    const lenientMatch = (value: string, str: string) => {
        var pattern = str.split("").map((x) => {
            return `(?=.*${x})`
        }).join("");
        var regex = new RegExp(`${pattern}`, "g")
        return value.match(regex);
    }

    const searchResults: Array<IAppletFile> = [];
    const searchText = text.toLocaleLowerCase();
    if (searchText != null && searchText.length > 0) {
        for (const appletProp in KnownApplets) {
            if (Object.prototype.hasOwnProperty.call(KnownApplets, appletProp)) {
                const knownApp: IAppletFile = (KnownApplets as any)[appletProp];
                if (lenientMatch(translate(knownApp.name).toLocaleLowerCase(), searchText)) {
                    searchResults.push(knownApp)
                }
            }
        }
    }

    const onCloseSpotlight = () => {
        (inputRef as any)?.blur?.();
        setTimeout(() => {
            setText('');
            setSelectedSearchResult(0);
        }, 1000);
        props.onClose?.();
    }

    const onClick = () => {
        if (props.isOpen) onCloseSpotlight();
    }

    const setSelectedSearchResultSafely = (newValue: number) => {
        console.log({ newValue });
        if (newValue < 0) {
            setSelectedSearchResult(0);
            return;
        }
        if (newValue >= searchResults.length) {
            setSelectedSearchResult(searchResults.length - 1);
            return;
        }
        setSelectedSearchResult(newValue);
    }

    const onSpotlightType = (e: any) => {
        if (e?.keyCode === 27) onCloseSpotlight();

        if (e?.keyCode === 38 || e?.keyCode === 40) {
            e?.preventDefault?.();
        }
        if (e?.keyCode === 38) setSelectedSearchResultSafely(selectedSearchResult - 1); // up
        if (e?.keyCode === 40) setSelectedSearchResultSafely(selectedSearchResult + 1); // down
        console.log(e?.keyCode)
    }

    const onSpotlightTextChange = (e: any) => {
        setText((e?.target?.value ?? text) ?? '');
    }

    return (
        <div className="spotlight layer">
            <div className={classNames('spotlight-bg fullscreen', { 'isOpen': props.isOpen })} onClick={onClick}></div>
            <motion.div
                key="spotlight"
                id="spotlight-wrapper"
                initial={variants.initial}
                transition={{ duration: 0.5 }}
                animate={(props.isOpen ?? false) ? "open" : "initial"}
                variants={variants}
                exit={variants.closed}
            >
                <VStack align="stretch" className="spotlight-group" onClick={() => (inputRef as any)?.focus?.()}>
                    <InputGroup>
                        <InputLeftElement children={<SearchIcon boxSize={8} mt={3} ml={4} color="whiteAlpha.500" />} />
                        <Input
                            ref={input => {
                                input && props.isOpen && input.focus();
                                inputRef = input as any;
                            }}
                            id="spotlight"
                            type="text"
                            placeholder="Search"
                            value={text}
                            onKeyDown={onSpotlightType}
                            onChange={onSpotlightTextChange}
                        />
                    </InputGroup>
                    <SpotlightSearchResult
                        searchText={text}
                        searchResults={searchResults}
                        selectedSearchResult={selectedSearchResult}
                        setSelectedSearchResult={setSelectedSearchResultSafely}
                    />
                </VStack>
            </motion.div>
        </div>
    );
}