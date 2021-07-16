import React from 'react';

import { VirusScan } from '../../../components/common/virusScan';
import { AppletDetail } from '../../../components/window/applet/appletDetail';
import { MiscStore } from '../../../state/misc/store';

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

    //miscStr.appletViewProperties?.imgUrl ?? windowIconString(miscStr.appletViewProperties?.appletType ?? AppletType.none)

    return (
        <>
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
                onClose={closeVirusModal}
            />
        </>
    );
}