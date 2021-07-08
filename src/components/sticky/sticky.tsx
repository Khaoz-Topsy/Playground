import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import Draggable from 'react-draggable';

interface IStickyProps {
    classNames?: string;
    children: ReactNode;
}


export const Sticky: React.FC<IStickyProps> = (props: IStickyProps) => {

    return (
        <Draggable
            handle=".sticky"
            onDrag={(e: any) => { e?.preventDefault?.(); e?.stopPropagation(); }}
        >
            <Box className={classNames('sticky', 'window-header', props.classNames)}>
                {props.children}
            </Box>
        </Draggable>
    );
}

