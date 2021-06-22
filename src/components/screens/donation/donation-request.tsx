import { Component, Prop, h, State } from '@stencil/core';
import { openTangleExplorer, tangleExplorerUrl } from '../../../helpers/clientHelper';
import { CurrencyHelper } from '../../../helpers/currencyHelper';
import { DateTimeHelper } from '../../../helpers/dateTimeHelper';
import { UnitsHelper } from '../../../helpers/unitsHelper';
import { BalanceHistory } from '../../common.interfaces';

@Component({
  tag: 'ibtn-donation-request',
  styleUrl: 'donation-request.scss',
  shadow: true,
})
export class DonationRequest {
  /**
   * The IOTA address to send funds to.
   */
  @Prop() address: string;

  /**
   * Define button label text. Defaults to 'Pay with IOTA'
   */
  @Prop({ mutable: true }) amount: number;

  /**
   * Merchant name
   */
  @Prop() merchant: string;

  /**
   * Real currency code. Error is thrown if currency not supported.
   * Undefined means MIOTA
   */
  @Prop() currency: string;

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

  /**
   * Default amounts
   */
  @State() defAmounts: number[] = [1, 5, 10, 50];

  /*
   * Show in foreign currency
   */
  @State() showForeignCurrency: boolean = false;

  /*
   * Process to payment step.
   */
  @State() paymentStep: boolean = false;

  protected connectedCallback(): void {
    this.showForeignCurrency = !!this.currency;

    // By default set defAmount to MI.
    if (!this.showForeignCurrency) {
      this.defAmounts.forEach((v, i) => {
        this.defAmounts[i] = (v * 1000000);
      });
    }

    if (!this.amount) {
      this.amount = this.defAmounts[0];
    }
  }

  public getPrintAmount(value: number): string {
    if (this.showForeignCurrency) {
      return CurrencyHelper.printAmount(this.currency, value);
    } else {
      return CurrencyHelper.printIotaAmount(value, this.currency, this.currencyExchangeRate, 0);
    }
  }

  public renderCircleValue(value: number) {
    const active: boolean = (this.amount === value);
    return (
      <label class='label'>
        <input class={'w-9 h-9 flex items-center justify-center' + active ? 'bg-gray-100 rounded-lg' : ''}
          name='size' type='radio' value={value} checked={active} onChange={(e) => this.handleCustomDonation(e)} />
        <span>{this.getPrintAmount(value)}</span>
      </label>
    )
  }

  public handleCustomDonation(event: Event): void {
    // I'm not happy with below. Very messy.
    const am: number = parseFloat((event.target as HTMLInputElement).value);
    if (am > 0) {
      this.amount = am;
    } else {
      this.amount = this.defAmounts[0];
    }
  }

  public toggleCurrency(): void {
    if (this.currency) {
      this.showForeignCurrency = !this.showForeignCurrency;
    }
  }

  public processToPayment(): void {
    this.paymentStep = true;
  }

  public highlightCurrency(foreign: 'f' | 'iota'): string {
    if ((foreign === 'f' && this.showForeignCurrency) || (foreign === 'iota' && !this.showForeignCurrency)) {
      return 'font-bold text-gray-500';
    } else {
      return '';
    }
  }

  public renderTotalDonationAmount() {
    if (this.getTotalDonatatedAmount() > 0) {
      return (
        <p>Total donated amount
          <a onClick={() => openTangleExplorer(this.address)}>
            <b class="text-gray-700"> {CurrencyHelper.printBalanceAmount(this.getTotalDonatatedAmount(), this.currency, this.currencyExchangeRate)}</b>
          </a>
        </p>
      );
    } else {
      return '';
    }
  }

  public getTotalDonatatedAmount() {
    let total: number = 0;
    if (this.balanceHistory?.length > 0) {
      for (let b of this.balanceHistory) {
        total += b.amount;
      }
    }

    return total;
  }

  public renderLastDonationTimestamp() {
    if (this.balanceHistory?.[0]) {
      return <p>Last donation <b class="text-gray-700">{DateTimeHelper.fromNow(this.balanceHistory[0].timestamp)}</b></p>;
    } else {
      return '';
    }
  }

  public renderTransactionalHistory(line: BalanceHistory) {
    return (
      <span>
        <a href={tangleExplorerUrl(line.outputId)} target='new'>{DateTimeHelper.fromNow(line.timestamp)}</a> - {UnitsHelper.formatBest(line.amount, 2)}
      </span>
    )
  }

  public renderDonationWidget() {
    return (
      <div class='font-mono w-full'>
        <div class='step_1 p-8 mt-2'>
          <div class='font-medium tracking-wide text-center text-gray-700'>
            <div class='text-3xl font-'>Donate {this.merchant ? <span>to</span> : ''}</div>
            <div class='text-xl'>{this.merchant}</div>
          </div>

          <form class='flex-auto p-4'>
            <div class='flex flex-wrap'>
              <div class='w-full flex-none text-lg font-medium text-gray-400 py-2'>
                <a class={'cursor-pointer hover:underline' + this.highlightCurrency('iota')} onClick={() => this.toggleCurrency()}>IOTA</a>
                {this.currency ?
                  <span>/<a class={'cursor-pointer hover:underline' + this.highlightCurrency('f')} onClick={() => this.toggleCurrency()}>{this.currency}</a></span>
                  : ''}
              </div>
            </div>
            <div class='flex items-baseline mb-6'>
              <div class='space-x-2 flex items-center text-sm w-full justify-between'>
                {this.defAmounts.map((v) => { return this.renderCircleValue(v) }
                )}
                <input onInput={(e) => this.handleCustomDonation(e)} placeholder=" "
                  class='input_number w-16 p-4 border rounded-sm border-solid font-mono text-sm' type='number' />
              </div>
            </div>
            <div class='flex space-x-3 mb-4 text-sm font-medium'>
              <div class='flex-auto flex space-x-3'>
                <button onClick={() => this.processToPayment()}
                  class='font-mono cursor-pointer w-full flex items-center justify-center border-solid text-lg rounded-sm bg-yellow-400 hover:bg-yellow-300 border-yellow-400 hover:border-yellow-300 h-12'
                  type='button'>
                  Donate {this.getPrintAmount(this.amount)}
                </button>
              </div>
            </div>
            <div class='text-sm text-gray-500 leading-3 pt-2'>
              {this.renderTotalDonationAmount()}
              {this.renderLastDonationTimestamp()}
            </div>
          </form>
        </div>
      </div>
    );
  }

  public render() {
    if (this.paymentStep) {
      if (this.showForeignCurrency) {
        return (
          <ibtn-payment-process class='content'
            currency={this.currency} address={this.address} balanceHistory={this.balanceHistory}
            amount={this.amount} balance={this.balance} currencyExchangeRate={this.currencyExchangeRate}
            usdExchangeRate={this.usdExchangeRate}>
          </ibtn-payment-process>
        );
      } else {
        // We must convert it to IOTA and pass it as that.
        let amount: number = this.amount;
        if (this.currency) {
          amount = CurrencyHelper.convertFiatToIota(amount, this.currencyExchangeRate);
        }

        return (
          <ibtn-payment-process class='content'
            address={this.address} balanceHistory={this.balanceHistory}
            amount={amount}
            balance={this.balance} currencyExchangeRate={this.currencyExchangeRate}
            usdExchangeRate={this.usdExchangeRate}>
          </ibtn-payment-process>
        );
      }
    } else {
      return this.renderDonationWidget();
    }
  }
}
