import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import { FoundSecretType } from '../../constants/enum/foundSecretType';
import { getSecretsFound } from "../../constants/secretsFound";
import { translate } from "../../integration/i18n";

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

export const secretFoundToast = (currentSecretsFound: Array<FoundSecretType>, secret: FoundSecretType) => {
    const secretsFound = getSecretsFound(currentSecretsFound);
    const foundSecret = secretsFound.find(s => s.type === secret);
    if (foundSecret == null) return;

    toast(<p>Secret Found!<br /><small>{translate(foundSecret.howTo)}</small></p>);
}