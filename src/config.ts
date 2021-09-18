type NameResolverFunction = (key: string) => Promise<string>;

export enum LogType {
    None,
    Errors,
    Normal,
    Debug,
    FFDebug
}

export default interface IConfig {
    auth: {
        publish: boolean;
        play: boolean;
    }
    logType: LogType,
    cluster: boolean,
    paths: {
        media_root: string;
        web_root: string;
    },
    http?: {
        port?: number;
        allow_origin: boolean;
    },
    https?: {
        port?: number;

        key: string;
        cert: string;
    },
    relay: {},
    trans: {
        mp4: boolean,
        mp4Flags?: string,

        hls: boolean,
        hlsFlags?: string,

        dash: boolean,
        dashFlags?: string,

        nameResolver?: NameResolverFunction;
    },
    rtmp: {
        port: number;
        chunk_size: number;
        ping: number;
        ping_timeout: number;
        gop_cache: boolean;
    }
}
