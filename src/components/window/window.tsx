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
        console.log('hi');
        setState({
            width: data.size.width,
            height: data.size.height
        });
    };

    const onResizeStop = (_: any, __: ResizeCallbackData) => {
        // if (props.refreshOnResize !== true) return;
        console.log('bye');
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
        const classes = classNames('handle', 'noselect', { isMinimised });
        return (
            <motion.div
                {...props}
                key={`handle-w${state.width}-h${state.height}`} ref={ref} className={classes}
                initial={variants.initial}
                transition={{ duration: 0.25 }}
                animate={(isMinimised ?? false) ? "minimised" : "open"}
                variants={variants}
                exit={variants.closed}
                draggable="false"
            >
                <WindowDragHandle />
            </motion.div >
        );
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
            draggable="false"
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
                    onResizeStart={() => console.log('start')}
                    minConstraints={[minWidth, minHeight]}
                    handle={<CustomResizeHandle key={`${props.appletType}-handle`} />}
                >
                    <motion.div
                        key={`motion-${props.appletType}`}
                        draggable="false"
                        initial={variants.initial}
                        transition={{ duration: 0.5 }}
                        animate={(isMinimised ?? false) ? "minimised" : "open"}
                        variants={variants}
                        exit={variants.closed}
                    >
                        <div
                            draggable="false"
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
                                            <div className="window-with-sidebar" draggable="false">
                                                <div className="sidebar">{props.sidebar}</div>
                                                <div className={classNames('offset-content', { 'full-content': props.isFullscreen })}>{windowContentNode}</div>
                                            </div>
                                        )
                                        : windowContentNode
                                }
                            </WindowContent>
                            {
                                (isFocused === false && props.handleUnfocusedClick) && (
                                    <div className="window-content full-content pos-abs-top-left" onClick={props?.onSetFocus} style={{ position: 'absolute' }}></div>
                                )
                            }
                        </div>
                    </motion.div>
                </ResizableBox>
            </Draggable>
        </div>
    );
}

