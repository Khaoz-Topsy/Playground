import React from 'react';
import { MinusIcon, UpDownIcon, CloseIcon } from '@chakra-ui/icons';
import { Circle, HStack } from '@chakra-ui/react';

import { windowActionEvent } from '../../constants/enum/customWindowEvent';

interface IProps {
    onMinimise: (e: any) => void;
    onMaximise: (e: any) => void;
    onClose: (e: any) => void;
}

export const WindowActions: React.FC<IProps> = (props: IProps) => {
    const circleSize = '17px';
    const iconSize = 10;

    const onMinimise = (e: any) => {
        e.customEvent = windowActionEvent;
        props?.onMinimise?.(e);
    }

    const onMaximise = (e: any) => {
        e.customEvent = windowActionEvent;
        props?.onMaximise?.(e);
    }

    const onClose = (e: any) => {
        e.customEvent = windowActionEvent;
        props?.onClose?.(e);
    }

    return (
        <div className="window-actions">
            <div className="window-buttons">
                <HStack>
                    <Circle size={circleSize} bg="#FFB74D" color="#FFB74D" onClick={onMinimise}
                        _hover={{ color: 'black', background: '#FFB74D' }}>
                        <MinusIcon w={iconSize} h={iconSize} pr="1px" />
                    </Circle>
                    <Circle size={circleSize} bg="#81C784" color="#81C784" onClick={onMaximise}
                        _hover={{ color: 'black', background: '#81C784' }}>
                        <UpDownIcon w={iconSize} h={iconSize} pr="1px" />
                    </Circle>
                    <Circle size={circleSize} bg="#F44336" color="#F44336" onClick={onClose}
                        _hover={{ color: 'black', background: '#D32F2F' }}>
                        <CloseIcon w={iconSize} h={iconSize} pr="1px" />
                    </Circle>
                </HStack>
            </div>
        </div>
    );
}

