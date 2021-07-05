import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import { FoundSecretType } from '../../constants/enum/foundSecretType';
import { secretsFound } from "../../constants/secretsFound";
import { translate } from "../../integration/i18n";
import { LocaleKey } from "../../localization/LocaleKey";

interface IProps { }
export const ToasterContainer: React.FC<IProps> = (props: IProps) => {
    return (
        <ToastContainer
            position="bottom-right"
            autoClose={10000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss={true}
            draggable={false}
            pauseOnHover={true}
        />
    );
}

export const secretFoundToast = (secret: FoundSecretType) => {
    const foundSecret = secretsFound.find(s => s.type === secret);
    if (foundSecret == null) return;

    toast(<p>Secret Found!<br /><small>{translate(foundSecret.howTo?.[0] ?? LocaleKey.unknown)}</small></p>);
}