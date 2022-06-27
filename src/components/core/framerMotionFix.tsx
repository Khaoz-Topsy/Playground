import { AnimatePresence } from "framer-motion";

export const AnimatePresenceWithoutType = (props: any) => {
    const AnimatePresenceFix: any = AnimatePresence;
    return (
        <AnimatePresenceFix>
            {props.children}
        </AnimatePresenceFix>
    );
};