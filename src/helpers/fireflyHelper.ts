export class FireflyHelper {
    public static getPayUrl(address: string, amount: number): string {
        return 'iota://wallet/send/' + address + '?amt=' + amount;
    }
}