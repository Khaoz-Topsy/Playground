import React, { ReactNode, useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import { motion } from "framer-motion"

import { minWidth, minHeight } from '../../constants/window';

import { WindowDragHandle } from './windowDragHandle';
import { WindowHeader } from './windowHeader';
import { WindowContent } from './windowContent';
import classNames from 'classnames';
import { Center, Spinner } from '@chakra-ui/react';

interface IProps {
    title: string;
    defaultHeight?: number;
    defaultWidth?: number;
    defaultX?: number;
    defaultY?: number;
    zIndex?: number;
    classNames?: string;
    children: ReactNode;
    windowIcon?: ReactNode;
    showLoading?: boolean;
    isFocused?: boolean;
    isMinimised?: boolean;
    onSetFocus: () => void;
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

    const topLevelStyle = {
        zIndex: props.zIndex ?? 1,
    };

    const windowStyle = {
        width: state.width + 'px',
        height: state.height + 'px',
    };

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

    const { isFocused } = props;

    return (
        <div style={topLevelStyle}>
            <Draggable
                handle=".window-header"
                defaultPosition={{ x: defaultX ?? 200, y: defaultY ?? 50 }}
            >
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
                        <div
                            className={classNames('window box', { 'is-focused': isFocused })}
                            style={windowStyle}
                            onClick={isFocused ? (_) => { } : props?.onSetFocus}
                        >
                            <WindowHeader
                                title={props.title}
                                windowIcon={props.windowIcon}
                                onMinimise={props.onMinimise}
                                onClose={props.onClose}
                            />
                            <WindowContent classNames={props.classNames}>
                                {
                                    props.showLoading && (
                                        <Center zIndex="1">
                                            <Spinner size="xl" thickness="2px" />
                                        </Center>
                                    )
                                }
                                {props.children}
                            </WindowContent>
                        </div>
                    </motion.div>
                </ResizableBox>
            </Draggable>
        </div>
    );
}

