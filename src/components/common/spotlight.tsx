import React from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons';
import { motion } from "framer-motion";
import classNames from "classnames";
import { useRef } from "react";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SpotlightSearch: React.FC<IProps> = (props: IProps) => {
    const variants = {
        initial: { scale: 0, opacity: 0, marginTop: '-50vh' },
        open: { scale: 1, opacity: 1, marginTop: 0 },
        closed: { scale: 0, opacity: 0, marginTop: 0 },
    }

    const onClick = props.isOpen ? props.onClose : () => { };

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
                <div id="spotlight-wrapper">
                    <InputGroup className="spotlight-group">
                        <Input ref={input => input && props.isOpen && input.focus()} type="text" id="spotlight" placeholder="Search" />
                        <InputLeftElement children={<SearchIcon boxSize={8} mt={3} ml={4} color="blackAlpha.500" />} />
                    </InputGroup>
                </div>
            </motion.div>
        </div>
    );
}