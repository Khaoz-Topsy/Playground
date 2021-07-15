import React, { useEffect, useState } from 'react';
import { Icon } from '@chakra-ui/icons';
import { Center } from '@chakra-ui/react';
import {
    MdBattery20, MdBattery30, MdBattery50, MdBattery60, MdBattery80, MdBattery90,
    MdBatteryCharging20, MdBatteryCharging30, MdBatteryCharging50, MdBatteryCharging60, MdBatteryCharging80, MdBatteryCharging90,
    MdBatteryFull, MdBatteryChargingFull, MdBatteryAlert, MdBatteryUnknown
} from 'react-icons/md';

import { BatteryStatus, IBatteryData } from '../../../contracts/battery';
import { SillyService } from '../../../services/SillyService';

interface IProps {
    sillyService: SillyService;
};

const defaultBatteryData: IBatteryData = {
    status: BatteryStatus.Unknown,
    percent: 100,
}

export const TaskbarBatteryIcon: React.FC<IProps> = (props: IProps) => {
    const [batteryData, setBatteryData] = useState<IBatteryData>(defaultBatteryData);

    useEffect(() => {
        if (batteryData.status !== BatteryStatus.Unknown) return;

        props.sillyService.batteryLevel().then(batt => setBatteryData(batt))
        // eslint-disable-next-line
    });

    const getIconFromList = (icons: Array<any>, value: number) => {
        if (value > 99) return icons[0];
        if (value > 90) return icons[1];
        if (value > 80) return icons[2];
        if (value > 60) return icons[3];
        if (value > 50) return icons[4];
        if (value > 30) return icons[5];
        if (value > 20) return icons[6];
        if (value > 0) return icons[7];
    }

    let iconToDisplay = MdBatteryUnknown;
    if (batteryData.status === BatteryStatus.PluggedInIsCharging) {
        iconToDisplay = getIconFromList(
            [MdBatteryAlert, MdBatteryCharging20, MdBatteryCharging30, MdBatteryCharging50, MdBatteryCharging60, MdBatteryCharging80, MdBatteryCharging90, MdBatteryChargingFull],
            batteryData.percent
        );
    }
    if (batteryData.status === BatteryStatus.Discharging) {
        iconToDisplay = getIconFromList(
            [MdBatteryAlert, MdBattery20, MdBattery30, MdBattery50, MdBattery60, MdBattery80, MdBattery90, MdBatteryFull],
            batteryData.percent
        );
    }
    if (batteryData.status === BatteryStatus.PluggedInFullCharge) iconToDisplay = MdBatteryFull;

    return (
        <div className="taskbar-notification taskbar-highlight-on-hover noselect">
            <Center>
                <Icon as={iconToDisplay} />
            </Center>
        </div>
    );
}

