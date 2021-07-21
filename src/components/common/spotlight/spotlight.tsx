import React, { useRef } from 'react';
import { Input, InputGroup, InputLeftElement, VStack } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { useState } from 'react';

import { allKnownApps } from '../../../constants/knownApplets';
import { spotlightSelect } from '../../../constants/enum/customWindowEvent';
import { IAppletFile } from '../../../contracts/interface/IFile';
import { openAppletOrFile } from '../../../helper/appletHelper';
import { translate } from '../../../integration/i18n';
import { WindowStore } from '../../../state/window/store';

import { SpotlightSearchResult } from './spotlightSearch';
import { knownKeyCodes } from '../../../constants/keybind';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SpotlightSearch: React.FC<IProps> = (props: IProps) => {
    const [text, setText] = useState<string | undefined>();
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
        try {
            var regex = new RegExp(`${pattern}`, "g")
            return value.match(regex);
        }
        catch (e) { }
        return false;
    }

    const getSearchResults = (searchText?: string): Array<IAppletFile> => {
        const searchResults: Array<IAppletFile> = [];
        if (searchText != null) {
            for (const appletProp of allKnownApps()) {
                if (searchText === '' || searchText.includes('*') || lenientMatch(translate(appletProp.name).toLocaleLowerCase(), searchText)) {
                    searchResults.push(appletProp)
                }
            }
        }
        return searchResults;
    }

    const onCloseSpotlight = () => {
        (inputRef as any)?.blur?.();
        setTimeout(() => {
            setText(undefined);
            setSelectedSearchResult(0);
        }, 1000);
        props.onClose?.();
    }

    const setSelectedSearchResultSafely = (newValue: number) => {
        if (newValue < 0) {
            setSelectedSearchResult(0);
            return;
        }

        if (newValue !== 0 && newValue >= searchResults.length) {
            setSelectedSearchResult(searchResults.length - 1);
            return;
        }
        setSelectedSearchResult(newValue);
    }

    const onSpotlightType = (e: any) => {
        if (e?.keyCode === knownKeyCodes.esc) onCloseSpotlight();
        if (e?.keyCode === knownKeyCodes.enter) {
            const openAppFunc = openApp(searchResults[selectedSearchResult]);
            openAppFunc({});
            return;
        }

        if (e?.keyCode === knownKeyCodes.up || e?.keyCode === knownKeyCodes.down) {
            e?.preventDefault?.();
        }
        if (e?.keyCode === knownKeyCodes.up) {
            setSelectedSearchResultSafely(selectedSearchResult - 1); // up
            return;
        }
        if (e?.keyCode === knownKeyCodes.down) {
            setSelectedSearchResultSafely(selectedSearchResult + 1); // down
            return;
        }

        setSelectedSearchResultSafely(0); // set to first item
    }

    const openApp = (app: IAppletFile) => (e: any) => {
        e?.preventDefault?.();
        e?.stopPropagation?.();
        onCloseSpotlight();
        openAppletOrFile(WindowStore, app);
    }

    const onSpotlightTextChange = (e: any) => {
        setText((e?.target?.value ?? text) ?? '');
    }

    const onSpotlightGroupClick = (e: any) => {
        if (e?.customEvent === spotlightSelect) return;
        (inputRef as any)?.focus?.();
    }

    const onClick = (props.isOpen) ? onCloseSpotlight : () => { };
    const searchResults: Array<IAppletFile> = getSearchResults(text?.toLocaleLowerCase?.());

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
                <VStack align="stretch" className="spotlight-group" onClick={onSpotlightGroupClick}>
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
                            value={text ?? ''}
                            onKeyDown={onSpotlightType}
                            onChange={onSpotlightTextChange}
                        />
                    </InputGroup>
                    <SpotlightSearchResult
                        searchText={text}
                        searchResults={searchResults}
                        selectedSearchResult={selectedSearchResult}
                        setSelectedSearchResult={setSelectedSearchResultSafely}
                        openApp={openApp}
                    />
                </VStack>
            </motion.div>
        </div>
    );
}