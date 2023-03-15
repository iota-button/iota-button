export class FireflyHelper {
    public static getPayUrl(address: string, amount: number): string {
        return 'firefly://wallet/sendForm?' + address + '?amt=' + amount;
    }
}
