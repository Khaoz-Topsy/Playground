import React from 'react';
import classNames from 'classnames';

import { BasicImage } from '../../core/image';
import { IStartMenuItemProps, StartMenuSize } from '../../../contracts/interface/IFile';
import { translate } from '../../../integration/i18n';
import { LocaleKey } from '../../../localization/LocaleKey';
import { ContextMenuWrapper } from '../../core/contextMenu';
import { getContextWrapperItems } from './startMenuContextMenuItems';

interface IProps extends IStartMenuItemProps {
    id: number;
    name: LocaleKey;
    imgUrl: string;
    size: StartMenuSize;
    onClick: (e: any) => void;
}

export const StartMenuTile: React.FC<IProps> = (props: IProps) => {
    const baseCss = `tile tile-${StartMenuSize[props.size]}`;
    const styleObj = {
        backgroundColor: props.backgroundColour,
        backgroundImage: props.backgroundImage,
        color: props.textColour,
    };
    return (
        <div key={props.id}
            className={classNames(baseCss, { 'full': props.isFull })}
            style={styleObj}
        >
            <ContextMenuWrapper
                items={getContextWrapperItems(props, props?.onClick)}
            >
                <BasicImage imageUrl={props.imgUrl} />
                <p>{translate(props.name)}</p>
            </ContextMenuWrapper>
        </div>
    );
}

