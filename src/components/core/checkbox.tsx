import React, { ReactNode } from 'react';
import { Checkbox } from '@chakra-ui/react';

import { translate } from '../../integration/i18n';
import { LocaleKey } from '../../localization/LocaleKey';

export interface ICustomCheckbox {
    name?: LocaleKey;
    isChecked: boolean;
    children?: ReactNode;
    onChange?: (newIsChecked: boolean) => void;
}
export const CustomCheckbox = (props: ICustomCheckbox) => {
    return (
        <Checkbox colorScheme="primary" iconColor="white" isChecked={props.isChecked} onChange={() => props.onChange?.(!props.isChecked)}>
            {props.name && translate(props.name)}
            {props.children && props.children}
        </Checkbox>
    );
}