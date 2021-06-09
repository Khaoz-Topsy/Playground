import classNames from 'classnames'
import Draggable from 'react-draggable'
import React, { ReactNode, useState } from 'react'
import { ResizableBox } from 'react-resizable'
import { Box, Center, Container, Spinner } from '@chakra-ui/react'
import { motion } from 'framer-motion'

import { minHeight, minWidth, defaultHeight, defaultWidth } from '../../constants/window'
import { IApplet } from '../../contracts/interface/IApplet'
import { IWindowProps } from '../../contracts/interface/IWindowProps'

import { WindowDragHandle } from './windowDragHandle'
import { WindowContent } from './windowContent'

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
    const [state, setState] = useState<IState>({
        height: props.defaultHeight ?? defaultHeight,
        width: props.defaultWidth ?? defaultWidth,
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
            <div className="handle" ref={ref} {...props}>
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

    const { isFocused, isMinimised } = props;

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
                props.isFullscreen
                    ? props.children
                    : <Container maxW={"container.xl"}>
                        <Box mt={4}>
                            {props.children}
                        </Box>
                    </Container>
            }
        </>
    )

    return (
        <div style={topLevelStyle} className={classNames({ 'is-minimised': isMinimised })}>
            <Draggable
                handle=".window-header"
                defaultPosition={{ x: defaultX ?? 200, y: defaultY ?? 50 }}
                bounds={{ top: 0, left: 0 }}
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
                            {
                                props.headerFunc(props)
                            }
                            <WindowContent classNames={classNames(props.classNames, { 'full-content': props.isFullscreen })}>
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

