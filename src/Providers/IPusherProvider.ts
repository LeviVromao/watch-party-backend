export interface IPusherProvider {
    configureVideo(url: string, room: string): void
    configureMessage(message: string, name: string, room: string): void
}