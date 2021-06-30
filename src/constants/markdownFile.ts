import { IExistingNoteMeta } from '../contracts/interface/IExistingNoteMeta';
import { LocaleKey } from '../localization/LocaleKey';

export class MarkdownFile {
    static secrets = 'secrets.md';
    static assistantNMSGeneral = 'assistantNMS.md';
    static assistantSMSGeneral = 'assistantSMS.md';
};

export const visibleNotesList: Array<IExistingNoteMeta> = [
    {
        guid: '98f8e922-1fb3-4e5f-bf82-0ae8b1cd90a9',
        name: LocaleKey.assistantNMS,
        fileUrl: MarkdownFile.assistantNMSGeneral,
        date: '2021-06-21',
    },
    {
        guid: '0c278049-d8a0-4dd4-87a4-70228806ac2b',
        name: LocaleKey.assistantSMS,
        fileUrl: MarkdownFile.assistantSMSGeneral,
        date: '2021-06-21',
    }
];