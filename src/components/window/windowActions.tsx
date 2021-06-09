import React from 'react';
import { MinusIcon, UpDownIcon, CloseIcon } from '@chakra-ui/icons';
import { Circle, HStack } from '@chakra-ui/react';

interface IProps {
    onMinimise: () => void;
    onMaximise: () => void;
    onClose: () => void;
}

export const WindowActions: React.FC<IProps> = (props: IProps) => {
    const circleSize = "15px";
    const iconSize = 2;
    return (
        <div className="window-actions">
            <div className="window-buttons">
                <HStack>
                    <Circle size={circleSize} bg="orange.300" color="orange.300" onClick={props?.onMinimise}
                        _hover={{ color: 'black', background: 'orange.500' }}>
                        <MinusIcon w={iconSize} h={iconSize} />
                    </Circle>
                    <Circle size={circleSize} bg="green.300" color="green.300" onClick={props?.onMaximise}
                        _hover={{ color: 'black', background: 'green.500' }}>
                        <UpDownIcon w={iconSize} h={iconSize} />
                    </Circle>
                    <Circle size={circleSize} bg="red.500" color="red.500" onClick={props?.onClose}
                        _hover={{ color: 'black', background: 'red.700' }}>
                        <CloseIcon w={iconSize} h={iconSize} />
                    </Circle>
                </HStack>
            </div>
        </div>
    );
}

