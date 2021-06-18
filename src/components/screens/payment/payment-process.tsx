import { Component, Prop, h } from '@stencil/core';
import { tangleExplorerUrl } from '../../../helpers/clientHelper';
import { CurrencyHelper } from '../../../helpers/currencyHelper';
import { DateTimeHelper } from '../../../helpers/dateTimeHelper';
import { FireflyHelper } from '../../../helpers/fireflyHelper';
import { UnitsHelper } from '../../../helpers/unitsHelper';
import { BalanceHistory } from '../../common.interfaces';

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
   * Current address balance.
   */
  @Prop() balanceHistory: BalanceHistory[] = [];

  /**
   * Currency exchange rate.
   */
  @Prop() currencyExchangeRate: number;

  /**
   * USD Exchange rate
   */
  @Prop() usdExchangeRate: number;


  public getAmountForWalet(): number {
    if (this.currency) {
      return CurrencyHelper.convertFiatToIota(this.amount, this.currencyExchangeRate);
    } else {
      return this.amount;
    }
  }

  public renderTransactionalHistory(line: BalanceHistory) {
    return (
      <span>
        <a class="no-underline text-gray-600" href={tangleExplorerUrl(line.outputId)} target='new'>{DateTimeHelper.fromNow(line.timestamp)}</a> - {UnitsHelper.formatBest(line.amount, 2)}
      </span>
    )
  }

  private tempWarningDueFireflyIssue(): void {
    // Unable to pass address/amount into Firefly. Waiting for: https://github.com/iotaledger/firefly/pull/773
    setTimeout(() => {
      prompt(
        'Once Firefly fixes: https://github.com/iotaledger/firefly/pull/773 this will be automated. For now, please enter values manually.\n\n---\n' +
        'Amount: ' + UnitsHelper.formatUnits(this.getAmountForWalet(), 'Mi') + '\n' + 
        'Address: ', this.address
      );
    }, 1000);
  }

  render() {
    return (
      <div class='font-mono w-full'>
        <div class='step_2 p-8 '>
          <div class='font-medium tracking-wide text-center text-gray-700 mb-2'>
            <div class='text-xl'>
              <span>You will be charged </span>
              {this.currency ?
                <span>
                  {CurrencyHelper.fCurrencyService().getSymbol(this.currency)}
                  {CurrencyHelper.amountSepByDecimal(this.amount)[0]}
                  {parseInt(CurrencyHelper.amountSepByDecimal(this.amount)[1]) > 0 ?
                    <span class='text-xl align-top'>
                      .{CurrencyHelper.amountSepByDecimal(this.amount)[1]}
                    </span>
                    : ''}

                  <p class='text-sm'>(1 {this.currency} ≈ MIOTA {this.currencyExchangeRate || this.usdExchangeRate})</p>
                </span>
                :
                <span>
                  <span>{CurrencyHelper.printIotaAmount(this.amount, this.currency, this.currencyExchangeRate)}</span>
                </span>
              }
            </div>
          </div>

          <div class='flex-auto p-4'>
            <div class='text-lg'>Pay with...</div>
            <div class='flex space-x-3 mb-4 text-sm font-medium'>
              <div class='flex-auto flex space-x-3'>
                <a class='cursor-pointer no-underline w-full flex items-center justify-center text-lg rounded-md bg-blue-600 text-white h-12 hover:bg-blue-800' 
                  onClick={() => this.tempWarningDueFireflyIssue()}
                  href={FireflyHelper.getPayUrl(this.address, this.getAmountForWalet())}>Firefly wallet</a>
              </div>
            </div>

            <div class='my-6'>
              <ibtn-awaiting amount={UnitsHelper.formatBest(this.balance, 2)}></ibtn-awaiting>
            </div>

            {this.balanceHistory.length > 0 ? 
            <div class="flex flex-col">
              {this.balanceHistory.map((line) =>
                  {return this.renderTransactionalHistory(line)}
              )}
            </div> : ''}  
            

            <div class='text-sm text-gray-500 leading-3 pt-4'>
              <p>No fees, your terms, full privacy.</p>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
