export interface ISavedEmail {
    guid: string;
    name: string;
    email: string;
    date: string;
    isSpam: boolean;
    isPending?: boolean;
    shortMessage: string;
    message: string;
}