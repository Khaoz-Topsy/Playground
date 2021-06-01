import React, { ReactNode, useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';

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
        setState({ width: data.size.width, height: data.size.height });
    };

    const windowStyle = { width: state.width + 'px', height: state.height + 'px' };

    const CustomResizeHandle = React.forwardRef((props, ref: any) => {
        return (
            <div className="handle" ref={ref} {...props}>
                <WindowDragHandle />
            </div >
        )
    });

    const { defaultX, defaultY, } = props;

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
                <div className="window box" style={windowStyle}>
                    <WindowHeader title={props.title} />
                    <WindowContent>
                        {props.children}
                    </WindowContent>
                </div>
            </ResizableBox>
        </Draggable>
    );
}

