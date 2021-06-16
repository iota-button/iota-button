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
    // if (this.balance >= this.amount) {
    if (this.balance < this.amount) {

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
        <div class="font-mono w-full">

          <div class="step_1 p-8 mt-2">
            <div class="font-medium tracking-wide text-center text-gray-700">
              <div class="text-3xl font-">Donate to</div>
              <div class="text-xl">Customer name</div>
            </div>

            <form class="flex-auto p-4">
              <div class="flex flex-wrap">
                <div class="w-full flex-none text-sm font-medium text-gray-400 mt-2 text-right"><a class="cursor-pointer font-bold text-gray-500 hover:underline">MIOTA</a> / <a class="cursor-pointer hover:underline">USD</a></div>
              </div>
              <div class="flex items-baseline mb-6 border border-solid py-8 px-4 rounded-lg border-gray-400">
                <div class="space-x-2 flex items-center text-sm w-full justify-between">
                  <label class="label">
                    <input class="w-9 h-9 flex items-center justify-center bg-gray-100 rounded-lg" name="size" type="radio" value="xs" checked />
                    <span>1</span>
                  </label>
                  <label class="label">
                    <input class="w-9 h-9 flex items-center justify-center" name="size" type="radio" value="5" />
                    <span>5</span>
                  </label>
                  <label class="label">
                    <input class="w-9 h-9 flex items-center justify-center" name="size" type="radio" value="10" />
                    <span>10</span>
                  </label>
                  <label class="label">
                    <input class="w-9 h-9 flex items-center justify-center" name="size" type="radio" value="15" />
                    <span>15</span>
                  </label>
                  <label class="label">
                    <input class="w-9 h-9 flex items-center justify-center" name="size" type="radio" value="20" />
                    <span>20</span>
                  </label>
                  <input placeholder="100" class="input_number w-16 p-4 border rounded-lg border-gray-200 border-solid font-mono text-sm" type="number" />
                </div>
              </div>
              <div class="flex space-x-3 mb-4 text-sm font-medium">
                <div class="flex-auto flex space-x-3">
                  <button class="cursor-pointer w-full flex items-center justify-center text-lg rounded-md bg-black text-white h-12 hover:bg-gray-800" type="submit">Donate 5$</button>
                </div>
              </div>
              <div class="text-sm text-gray-500 leading-3 pt-2">
                <p>Total donated amount <b>100$</b></p>
                <p>Last donation <b>1min ago</b></p>
              </div>
            </form>
          </div>

          <div class="step_2 p-8 ">
            <div class="font-medium tracking-wide text-center text-gray-700 mb-2">
              <div class="text-xl">
                <span>You will be charged </span>
                {this.currency ?
                  <span>
                    {this.currencyService.getSymbol(this.currency)}
                    {this.amountSepByDecimal()[0]}
                    {parseInt(this.amountSepByDecimal()[1]) > 0 ?
                      <span class="text-xl align-top">
                        .{this.amountSepByDecimal()[1]}
                      </span>
                      : ''}
                  </span>
                  :
                  <span>
                    <span>{this.printIotaAmount()}</span>
                    <p class="text-sm">
                      (1 USD ≈ MIOTA {this.usdExchangeRate})
                    </p>
                  </span>
                }
              </div>
            </div>

            <div class="flex-auto p-4">
              <div class="text-lg">Pay with...</div>
              <div class="flex space-x-3 mb-4 text-sm font-medium">
                <div class="flex-auto flex space-x-3">
                  <a class="cursor-pointer no-underline w-full flex items-center justify-center text-lg rounded-md bg-blue-600 text-white h-12 hover:bg-blue-800"
                    href={FireflyHelper.getPayUrl(this.address, this.amount)}>Firefly wallet</a>
                </div>
              </div>

              <div class="my-6">
                <ibtn-awaiting amount={UnitsHelper.formatBest(this.balance, 2)}></ibtn-awaiting>
              </div>


              <a class="cursor-pointer">Go Back</a>

              <div class="text-sm text-gray-500 leading-3 pt-2">
                <p>No fees, your terms, full privacy.</p>
              </div>
            </div>

          </div>
        </div>
      );

    }
  }
}
