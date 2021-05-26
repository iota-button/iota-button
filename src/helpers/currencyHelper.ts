export class CurrencyHelper {
    public static printIotaBasedOnFx(balance: number, exchangeRate: number): string {
        return CurrencyHelper.formatLargeNumbers((Math.round(((balance / 1000000) * exchangeRate) * 100) / 100).toString());
    }

    public static formatLargeNumbers(str: string): string { 
        return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}