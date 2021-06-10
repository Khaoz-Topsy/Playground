import clippy from 'clippyjs'

export class VirtualAssistantService {
    private _agent: any;
    private _agentIsVisible: boolean = false;

    constructor() {
        clippy.load('Clippy', (agent: any) => {
            this._agent = agent;
            console.log(agent.animations());
            // this._agent.show();
        });
    }

    public show = () => {
        if (this._agentIsVisible) return;
        this._agent?.show?.();
        this._agentIsVisible = true;
    }

    public say = (text: string) => {
        if (!this._agentIsVisible) return;
        this._agent?.speak?.(text);
    }

    public play = (animName: string) => {
        if (!this._agentIsVisible) return;
        this._agent?.play?.(animName);
    }

    public animate = () => {
        if (!this._agentIsVisible) return;
        this._agent?.animate?.();
    }

    public hide = () => {
        if (!this._agentIsVisible) return;
        this._agent?.hide?.();
        this._agentIsVisible = false;
    }
}
