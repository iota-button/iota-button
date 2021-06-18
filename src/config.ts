// Configuration file.
export class Config {
    // And point.
    public static API_ENDPOINT: string = 'https://iota-explorer-proxy.herokuapp.com';

    // Target network
    public static API_NETWORK: string = 'mainnet';

    // 30 seconds for now. This eventually should be Websocket.
    public static SYNC_ADDRESS_FREQUENCY_SHORT: number = 3 * 1000;
    public static SYNC_ADDRESS_FREQUENCY_LONG: number = 10 * 1000;

    // Refresh exchange rates every one minute.
    public static EXCHANGE_RATE_INTERVAL_RESYNC: number = 60 * 1000;
}