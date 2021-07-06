import { Store } from 'pullstate';
import { ISavedEmail } from '../../contracts/interface/ISavedEmail';

export interface IEmailStore {
    savedEmails: Array<ISavedEmail>;
}

export const defaultEmailProps = {
    savedEmails: [],
};

export const EmailStore = new Store<IEmailStore>(defaultEmailProps);