import React from 'react';

import { VirusScan } from '../../../components/common/virusScan';
import { AppletDetail } from '../../../components/window/applet/appletDetail';
import { MiscStore } from '../../../state/misc/store';
import { NewEmailPopup } from '../../applet/email/newEmailPopup';

interface IProps { }

export const MiscLayer: React.FC<IProps> = (props: IProps) => {
    const miscStr = MiscStore.useState(store => store);

    const closeVirusModal = () => {
        MiscStore.update(() => ({
            fileToScan: undefined,
        }));
    }

    const closePropertiesModal = () => {
        MiscStore.update(() => ({
            appletViewProperties: undefined,
        }));
    }

    const closeEmailModal = () => {
        MiscStore.update(() => ({
            newEmailIsOpen: false,
        }));
    }

    return (
        <div draggable="false">
            <VirusScan
                key={miscStr?.fileToScan?.name}
                isOpen={miscStr?.fileToScan != null}
                name={miscStr?.fileToScan?.name}
                imgUrl={miscStr?.fileToScan?.imgUrl}
                onClose={closeVirusModal}
            />

            <AppletDetail
                key={miscStr?.appletViewProperties?.id}
                isOpen={miscStr?.appletViewProperties != null}
                applet={miscStr?.appletViewProperties}
                onClose={closePropertiesModal}
            />

            <NewEmailPopup
                key={miscStr?.newEmailIsOpen?.toString?.()}
                isOpen={miscStr?.newEmailIsOpen}
                onClose={closeEmailModal}
            />
        </div>
    );
}