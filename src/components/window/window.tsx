import classNames from 'classnames'
import Draggable from 'react-draggable'
import React, { ReactNode, useState } from 'react'
import { ResizableBox, ResizeCallbackData } from 'react-resizable'
import { Box, Center, Container, Spinner } from '@chakra-ui/react'
import { motion } from 'framer-motion'

import { minHeight, minWidth, defaultHeight, defaultWidth, defaultWindowXPosition, defaultWindowYPosition } from '../../constants/window'
import { IApplet } from '../../contracts/interface/IApplet'
import { IWindowProps } from '../../contracts/interface/IWindowProps'

import { WindowDragHandle } from './windowDragHandle'
import { WindowContent } from './windowContent'
import { AppletType } from '../../constants/enum/appletType'

interface IProps extends IWindowProps {
    children: ReactNode;
    sidebar?: ReactNode;
    headerFunc: (appletProps: IApplet) => ReactNode;
}

interface IState {
    height: number;
    width: number;
}

export const Window: React.FC<IProps> = (props: IProps) => {
    const [keyIndex, setKeyIndex] = useState<number>(0);
    const [state, setState] = useState<IState>({
        height: props.defaultHeight ?? defaultHeight,
        width: props.defaultWidth ?? defaultWidth,
    });

    const onResize = (_: any, data: ResizeCallbackData) => {
        setState({
            width: data.size.width,
            height: data.size.height
        });
    };

    const onResizeStop = (_: any, __: ResizeCallbackData) => {
        if (props.refreshOnResize !== true) return;
        setKeyIndex(keyIndex + 1);
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
            <div key={`handle-w${state.width}-h${state.height}`} className="handle" ref={ref} {...props}>
                <WindowDragHandle />
            </div >
        )
    });

    const { defaultX, defaultY, } = props;
    const variants = {
        initial: { scale: 0, opacity: 0, marginTop: '100vh' },
        open: { scale: 1, opacity: 1, marginTop: 0 },
        minimised: { scale: 0, opacity: 0, marginTop: '100vh' },
        closed: { scale: 0, opacity: 0, marginTop: 0 },
    }

    const { isFocused, isFullscreen, isMinimised, isMaximised } = props;

    const windowContentNode = (
        <>
            {
                props.showLoading && (
                    <Center zIndex="1">
                        <Spinner size="xl" thickness="2px" />
                    </Center>
                )
            }
            {
                isFullscreen
                    ? props.children
                    : <Container maxW={"container.xl"}>
                        <Box mt={4}>
                            {props.children}
                        </Box>
                    </Container>
            }
        </>
    );

    return (
        <div
            style={{ ...topLevelStyle, zIndex: isMinimised ? -1 : topLevelStyle.zIndex }}
            className={classNames({ 'is-minimised': isMinimised, 'is-maximised': (isMaximised && !isMinimised) })}
        >
            <Draggable
                handle=".window-header"
                defaultPosition={{ x: defaultX ?? defaultWindowXPosition, y: defaultY ?? defaultWindowYPosition }}
                bounds={{ top: 0, left: 0 }}
            >
                <ResizableBox
                    height={isMinimised ? 0 : state.height}
                    width={isMinimised ? 0 : state.width}
                    onResize={onResize}
                    onResizeStop={onResizeStop}
                    minConstraints={[minWidth, minHeight]}
                    handle={<CustomResizeHandle key={`${props.appletType}-handle`} />}
                >
                    <motion.div
                        key={`motion-${props.appletType}`}
                        initial={variants.initial}
                        transition={{ duration: 0.5 }}
                        animate={(isMinimised ?? false) ? "minimised" : "open"}
                        variants={variants}
                        exit={variants.closed}
                    >
                        <div
                            className={classNames('window box', AppletType[props.appletType], { 'is-focused': isFocused })}
                            style={isMinimised ? { width: 0, height: 0 } : windowStyle}
                            onClick={isFocused ? (_) => { } : props?.onSetFocus}
                        >
                            {
                                props.headerFunc(props)
                            }
                            <WindowContent
                                key={`${props.appletType}-${keyIndex}`}
                                classNames={classNames(props.classNames, { 'full-content': props.isFullscreen })}
                            >
                                {
                                    (props.sidebar != null)
                                        ? (
                                            <div className="window-with-sidebar">
                                                <div className="sidebar">{props.sidebar}</div>
                                                <div className={classNames('offset-content', { 'full-content': props.isFullscreen })}>{windowContentNode}</div>
                                            </div>
                                        )
                                        : windowContentNode
                                }
                            </WindowContent>
                        </div>
                    </motion.div>
                </ResizableBox>
            </Draggable>
        </div>
    );
}

