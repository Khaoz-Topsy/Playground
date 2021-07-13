import React, { ReactNode } from 'react';
import { ChevronDownIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, Tooltip } from '@chakra-ui/react';

import { SpotlightSearchResultMeta } from '../common/spotlight/spotlightSearchResultMeta';
import { allKnownApps } from '../../constants/knownApplets';
import { LocaleKey } from '../../localization/LocaleKey';
import { openExternalInNewTab } from '../../helper/linkHelper';
import { getIframeUrl } from '../../helper/iframeHelper';
import { translate } from '../../integration/i18n';
import { WindowActions } from './windowActions';

interface IProps {
    name: LocaleKey;
    windowIcon?: ReactNode;
    onMinimise: (e: any) => void;
    onMaximise: (e: any) => void;
    onClose: (e: any) => void;
}

export const WindowHeader: React.FC<IProps> = (props: IProps) => {
    let foundApplet;
    for (const appletProp of allKnownApps()) {
        if (appletProp.name === props.name) {
            foundApplet = { ...appletProp };
            break;
        }
    }

    const iframeUrl = getIframeUrl(foundApplet);

    return (
        <div className="window-header" onDoubleClick={props.onMaximise}>
            {
                props.windowIcon != null &&
                <div className="window-icon">
                    {props.windowIcon}
                </div>
            }
            {
                (foundApplet != null) &&
                <>
                    <Popover placement="top-start">
                        <PopoverTrigger>
                            <div className="window-info">
                                <ChevronDownIcon />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent border="none" className="popover-custom">
                            <PopoverArrow />
                            <PopoverCloseButton />
                            {/* <PopoverHeader>Confirmation!</PopoverHeader> */}
                            <PopoverBody>
                                <SpotlightSearchResultMeta searchResult={foundApplet} hideImage={true} />
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>

                    {
                        iframeUrl &&
                        <Tooltip label="Open in new tab" fontSize="md">
                            <div className="window-info" onClick={() => openExternalInNewTab(iframeUrl)}>
                                <ExternalLinkIcon />
                            </div>
                        </Tooltip>
                    }
                </>
            }
            <div className="content noselect">
                {translate(props.name)}
            </div>
            <WindowActions {...props} />
        </div>
    );
}

