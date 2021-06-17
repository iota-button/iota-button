import { UnitsHelper } from './unitsHelper';
import { CurrencyService } from './../services/currencyService';
import { ServiceFactory } from './../services/serviceFactory';

export class CurrencyHelper {
    public static printIotaBasedOnFx(balance: number, exchangeRate: number): string {
        return CurrencyHelper.formatLargeNumbers((Math.round(((balance / 1000000) * exchangeRate) * 100) / 100).toString());
    }

    public static formatLargeNumbers(str: string): string { 
        return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    public static fCurrencyService(): CurrencyService {
        return ServiceFactory.get<CurrencyService>('currency');
    }    

    public static amountSepByDecimal(amount: number): string[] {
      return CurrencyHelper.formatLargeNumbers(amount.toString()).split('.');
    }

    public static convertFiatToIota(amount: number, exchangeRate: number): number {
      return Math.ceil(amount * exchangeRate * 1000000);
    }

    public static printIotaAmount(amount: number, currency: string, exchangeRate: number): string {
      if (currency) {
        return UnitsHelper.formatBest(CurrencyHelper.convertFiatToIota(amount, exchangeRate), 2);
      } else {
        return UnitsHelper.formatBest(amount, 2);
      }
    }

    public static printAmount(currency: string, amount: number): string {
        if (currency) {
          return CurrencyHelper.fCurrencyService().getSymbol(currency) + CurrencyHelper.formatLargeNumbers(amount.toString());
        } else {
          return UnitsHelper.formatBest(amount, 2);
        }
    }
    
    public static printBalanceAmount(balance: number, currency: string, exchangeRate: number): string {
        if (isNaN(balance)) {
          return '';
        }
        
        if (currency) {
          return CurrencyHelper.fCurrencyService().getSymbol(currency) + CurrencyHelper.printIotaBasedOnFx(balance, exchangeRate);
        } else {
          return UnitsHelper.formatBest(balance, 2);
        }
    }
}