import React from "react";
import ReactMarkdown from 'react-markdown'

interface IMarkdownContentProps {
    content: string;
    classNames?: string;
}
export const MarkdownContent: React.FC<IMarkdownContentProps> = (props: IMarkdownContentProps) => {
    return (
        <ReactMarkdown className={props.classNames}>
            {props.content}
        </ReactMarkdown>
    );
}