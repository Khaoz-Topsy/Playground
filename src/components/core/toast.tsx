import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import { FoundSecretType } from '../../constants/enum/foundSecretType';

interface IProps { }
export const ToasterContainer: React.FC<IProps> = (props: IProps) => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={50000}
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
    toast(<p>Secret Found!<br /><small>{secret.toString()} secret found</small></p>);
}