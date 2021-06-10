import classNames from "classnames";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

import { appendRef } from "../../helper/linkHelper";

interface IProps {
    id?: string;
    href: string;
    onClick?: () => void;
    additionalClassNames?: string;
    children?: ReactNode;
}

export const BasicLink = (props: IProps) => {

    const localClick = (e: any) => {
        if (props.onClick != null) {
            e.preventDefault();
            props.onClick();
        }
    }

    return (
        <a
            id={props.id}
            href={appendRef(props.href)}
            target="_blank"
            rel="noopener noreferrer"
            className={classNames(props.additionalClassNames ?? '')}
            onClick={localClick}
            draggable={false}>
            {props.children}
        </a>
    );
}


export const BasicInternalLink = (props: IProps) => {
    return (
        <Link
            to={props.href}
            className={classNames(props.additionalClassNames ?? '')}
            draggable={false}>
            {props.children}
        </Link>
    );
}

