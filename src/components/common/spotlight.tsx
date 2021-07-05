import React from "react";
import { Box, HStack, Input, InputGroup, InputLeftElement, VStack } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons';
import { motion } from "framer-motion";
import classNames from "classnames";
import { useState } from "react";
import { KnownApplets } from "../../constants/knownApplets";
import { IAppletFile } from "../../contracts/interface/IFile";
import { translate } from "../../integration/i18n";
import { windowIcon } from "../window/windowIcon";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SpotlightSearch: React.FC<IProps> = (props: IProps) => {
    const [text, setText] = useState('');

    const variants = {
        initial: { scale: 0, opacity: 0, marginTop: '-50vh' },
        open: { scale: 1, opacity: 1, marginTop: 0 },
        closed: { scale: 0, opacity: 0, marginTop: 0 },
    }

    const onCloseSpotlight = () => {
        setTimeout(() => setText(''), 1000);
        props.onClose?.();
    }

    const onClick = () => {
        if (props.isOpen) onCloseSpotlight();
    }

    const onSpotlightType = (e: any) => {
        if (e?.keyCode === 27) onCloseSpotlight();
    }

    const onSpotlightTextChange = (e: any) => {
        setText((e?.target?.value ?? text) ?? '');
    }

    const searchResults: Array<IAppletFile> = [];
    const searchText = text.toLocaleLowerCase();
    if (searchText != null && searchText.length > 0) {
        for (const appletProp in KnownApplets) {
            if (Object.prototype.hasOwnProperty.call(KnownApplets, appletProp)) {
                const knownApp: IAppletFile = (KnownApplets as any)[appletProp];
                if (translate(knownApp.name).toLocaleLowerCase().includes(searchText)) {
                    searchResults.push(knownApp)
                }
            }
        }
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
                <VStack align="stretch" className="spotlight-group">
                    <InputGroup>
                        <InputLeftElement children={<SearchIcon boxSize={8} mt={3} ml={4} color="whiteAlpha.500" />} />
                        <Input
                            ref={input => input && props.isOpen && input.focus()}
                            id="spotlight"
                            type="text"
                            placeholder="Search"
                            value={text}
                            onKeyDown={onSpotlightType}
                            onChange={onSpotlightTextChange}
                        />
                    </InputGroup>
                    <VStack
                        align="stretch"
                        className="spotlight-results-bg"
                        zIndex={3}
                    >
                        {
                            searchResults.map(sr => (
                                <Box h="40px" key={sr.id}>
                                    {windowIcon(sr.appletType)}
                                    <span className="noselect">{translate(sr.name)}</span>
                                </Box>
                            ))
                        }
                    </VStack>
                </VStack>
            </motion.div>
        </div>
    );
}