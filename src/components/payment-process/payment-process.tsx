import { Component, Prop, h } from '@stencil/core';
import { CurrencyHelper } from '../../helpers/currencyHelper';
import { FireflyHelper } from '../../helpers/fireflyHelper';
import { UnitsHelper } from '../../helpers/unitsHelper';
import { CurrencyService } from '../../services/currencyService';
import { ServiceFactory } from '../../services/serviceFactory';

@Component({
  tag: 'ibtn-payment-process',
  styleUrl: 'payment-process.scss',
  shadow: true,
})
export class PaymentProcess {
  /**
   * The IOTA address to send funds to.
   */
  @Prop() address: string;

  /**
   * Real currency code. Error is thrown if currency not supported.
   * Undefined means MIOTA
   */
  @Prop() currency: string;

  /**
   * Define button label text. Defaults to 'Pay with IOTA'
   */
  @Prop() amount: number;

  /**
   * Current address balance.
   */
  @Prop() balance: number;

  /**
   * Currency exchange rate.
   */
  @Prop() currencyExchangeRate: number;

  /**
   * USD Exchange rate
   */
  @Prop() usdExchangeRate: number;

  private get currencyService(): CurrencyService {
    return ServiceFactory.get<CurrencyService>('currency');
  }
  
  private printIotaAmount(): string {
    if (this.currency) {
      return UnitsHelper.formatBest(Math.ceil((this.amount * this.currencyExchangeRate) * 1000000), 2);
    } else {
      return UnitsHelper.formatBest(this.amount, 2);
    }
  }
  
  private printBalanceAmount(): string {
    if (isNaN(this.balance)) {
      return '';
    }

    if (this.currency) {
      return this.currencyService.getSymbol(this.currency) + CurrencyHelper.printIotaBasedOnFx(this.balance, this.currencyExchangeRate);
    } else {
      return UnitsHelper.formatBest(this.balance, 2);
    }
  }

  private amountSepByDecimal(): string[] {
    return CurrencyHelper.formatLargeNumbers(this.amount.toString()).split('.');
  }
  
  render() {
    if (this.balance >= this.amount) {
      return (
        <div class="mt-32">
          <div class="relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md py-5 pl-6 pr-8 sm:pr-6">
          <div class="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
            <div class="text-green-500">
              <svg class="w-6 sm:w-5 h-6 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div class="text-sm font-medium ml-3">Success Payment.</div>
            </div>
            <div class="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">Your Payment was successful. Address balance: {this.printBalanceAmount()}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div class="font-medium tracking-wide text-center text-3xl mt-12 mb-2 text-gray-700">
              Make a payment
          </div>

          <div class="flex items-center text-center px-6 lg:hidden">
              {/* How to visualise amount. */}
              {this.currency ?
                <div class="flex-grow flex-no-shrink py-6">
                  <div class="text-grey-darker mb-2">
                    <span class="text-xl align-top">Amount: {this.currencyService.getSymbol(this.currency)}</span>
                    <span class="text-xl">{this.amountSepByDecimal()[0]}</span>
                    {parseInt(this.amountSepByDecimal()[1]) > 0 ?
                      <span class="text-xl align-top">
                        .{this.amountSepByDecimal()[1]}
                      </span>
                    : ''}
                  </div>
                  <div class="text-green-light text-sm">
                    {this.printIotaAmount()} (1 {this.currency} ≈ MIOTA {this.currencyExchangeRate})
                  </div>
                </div>
              : 
                <div class="flex-grow flex-no-shrink py-6">
                  <div class="text-grey-darker mb-2">
                    <span class="text-xl">Amount: {this.printIotaAmount()}</span>
                    {/* <span class="text-xl align-top">.00</span> */}
                  </div>

                  <div class="text-green-light text-sm">
                    {this.printIotaAmount()} (1 USD ≈ MIOTA {this.usdExchangeRate})
                  </div>
                </div>
              }
          </div>

          <ibtn-awaiting amount={UnitsHelper.formatBest(this.balance, 2)}></ibtn-awaiting>
          <div class="mt-8 text-center">
            <a class='button' href={FireflyHelper.getPayUrl(this.address, this.amount)}> Open wallet </a>
          </div>
        </div>
      );

    }
  }
}
