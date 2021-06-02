import React, { ReactNode, useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import { motion } from "framer-motion"

import { minWidth, minHeight } from '../../constants/window';

import { WindowDragHandle } from './windowDragHandle';
import { WindowHeader } from './windowHeader';
import { WindowContent } from './windowContent';

interface IProps {
    title: string;
    defaultHeight?: number;
    defaultWidth?: number;
    defaultX?: number;
    defaultY?: number;
    children: ReactNode;
    windowIcon?: ReactNode;
    isMinimised?: boolean;
    onMinimise: () => void;
    onClose: () => void;
}

interface IState {
    height: number;
    width: number;
}

export const Window: React.FC<IProps> = (props: IProps) => {
    const [state, setState] = useState<IState>({
        height: props.defaultHeight ?? minHeight,
        width: props.defaultWidth ?? minWidth,
    });

    const onResize = (event: any, data: any) => {
        setState({
            ...state,
            width: data.size.width,
            height: data.size.height
        });
    };

    const windowStyle = { width: state.width + 'px', height: state.height + 'px' };

    const CustomResizeHandle = React.forwardRef((props, ref: any) => {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                transition={{ duration: 2 }}
                animate={{ opacity: 1 }}
            >
                <div className="handle" ref={ref} {...props}>
                    <WindowDragHandle />
                </div >
            </motion.div>
        )
    });

    const { defaultX, defaultY, } = props;
    const variants = {
        initial: { scale: 0, opacity: 0, marginTop: '100vh' },
        open: { scale: 1, opacity: 1, marginTop: 0 },
        minimised: { scale: 0, opacity: 0, marginTop: '100vh' },
        closed: { scale: 0, opacity: 0, marginTop: 0 },
    }
    return (
        <Draggable
            handle=".window-header"
            defaultPosition={{ x: defaultX ?? 200, y: defaultY ?? 50 }}
            scale={1}>
            <ResizableBox
                height={state.height}
                width={state.width}
                onResize={onResize}
                minConstraints={[minWidth, minHeight]}
                handle={<CustomResizeHandle />}
            >
                <motion.div
                    initial={variants.initial}
                    transition={{ duration: 0.5 }}
                    animate={(props.isMinimised ?? false) ? "minimised" : "open"}
                    variants={variants}
                    exit={variants.closed}
                >
                    <div className="window box" style={windowStyle}>
                        <WindowHeader
                            title={props.title}
                            windowIcon={props.windowIcon}
                            onMinimise={props.onMinimise}
                            onClose={props.onClose}
                        />
                        <WindowContent>
                            {props.children}
                        </WindowContent>
                    </div>
                </motion.div>
            </ResizableBox>
        </Draggable>
    );
}

