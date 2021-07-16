import React from 'react';
import { Modal, ModalOverlay } from '@chakra-ui/react';

import { VirusScan } from '../../../components/common/virusScan';
import { MiscStore } from '../../../state/misc/store';

interface IProps { }

export const MiscLayer: React.FC<IProps> = (props: IProps) => {
    const miscStr = MiscStore.useState(store => store);

    const closeVirusModal = () => {
        MiscStore.update(store => {
            store.fileToScan = undefined;
            return store;
        });
    }

    return (
        <Modal isOpen={miscStr?.fileToScan != null} onClose={() => { }}>
            <ModalOverlay />
            <VirusScan
                name={miscStr?.fileToScan?.name}
                imgUrl={miscStr?.fileToScan?.imgUrl}
                onClose={closeVirusModal}
            />
        </Modal>
    );
}