import { UnitsHelper } from '../../helpers/unitsHelper';
import { Component, Prop, h, State } from '@stencil/core';
import { BUTTON_TYPES } from '../../enums';
import { Config } from '../../config';
import { CurrencyService } from '../../services/currencyService';
import { ApiClient } from '../../services/apiClient';
import { ISearchResponse } from '../../interfaces/api/chrysalis/ISearchResponse';
import { ICurrencySettings } from '../../interfaces/services/ICurrencySettings';
import { ServiceFactory } from '../../services/serviceFactory';
import { SettingsService } from '../../services/settingsService';
import { LocalStorageService } from '../../services/localStorageService';
import { find } from 'lodash-es';
import { CurrencyHelper } from '../../helpers/currencyHelper';

@Component({
  tag: 'iota-button',
  styleUrl: 'iota-button.scss',
  shadow: true,
})
export class IotaButton {
  /**
   * The IOTA address to send funds to.
   */
  @Prop() address: string;

  /**
   * Define button label text. Defaults to 'Pay with IOTA'
   */
  @Prop({ mutable: true }) label: string;

  /**
   * Button types supported by IOTA BUTTON. Each of them visualise differently.
   */
  @Prop() type: BUTTON_TYPES = BUTTON_TYPES.PAYMENT;

  /**
   * Define button label text. Defaults to 'Pay with IOTA'
   */
  @Prop() amount: number;

  /**
   * Real currency code. Error is thrown if currency not supported.
   * Undefined means MIOTA
   */
  @Prop() currency: string;

  /**
   * Unique tran id to understand we received this particular payment.
   * You must make sure you provide an unique ID. Otherwise, system might think
   * that the payment was already finalised.
   */
  @Prop() tranid: string;

  /**
   * Show modal. This is default by true but can be overwriten.
   */
  @State() show: boolean = false;

  /**
   * Current address balance.
   */
  @State() balance: number;

  /**
   * Holds exchange rates.
   */
  @State() private currencySettings: ICurrencySettings;

  // Holds timer for setInterval that syncs address every so on.
  private addressSyncTimer: NodeJS.Timeout;
  private exchangeRateSyncTimer: NodeJS.Timeout;

  constructor() {
    // Initialising necessary services.
    ServiceFactory.register('api-client', () => new ApiClient(Config.API_ENDPOINT));
    ServiceFactory.register('settings', () => new SettingsService());
    ServiceFactory.register('currency', () => new CurrencyService(Config.API_ENDPOINT));
    ServiceFactory.register('local-storage', () => new LocalStorageService());
  }

  private get currencyService(): CurrencyService {
    return ServiceFactory.get<CurrencyService>('currency');
  }

  private get apiClient(): ApiClient {
    return ServiceFactory.get<ApiClient>('api-client');
  }

  private get currencyExchangeRate(): number {
    if (this.currency) {
      const cur: any = find(this.currencySettings?.currencies, { id: this.currency })!;
      return cur.rate;
    } else {
      return 1;
    }
  }

  private get usdExchangeRate(): number {
    const cur: any = find(this.currencySettings?.currencies, { id: 'USD' })!;
    return cur?.rate || 'n/a';
  }

  protected validateInputs(): void {
    if (!this.address) {
      throw new Error('To initite the component you must provide an IOTA address.')
    }

    if (this.currency && !CurrencyService.SYMBOL_MAP[this.currency]) {
      throw new Error('Currency provided is not supported.');
    }
  }

  protected connectedCallback(): void {
    this.validateInputs();

    if (!this.label) {
      if (this.type === BUTTON_TYPES.BALANCE) {
        this.label = 'Balance';
      } else if (this.type === BUTTON_TYPES.PAYMENT) {
        this.label = 'Pay';
      }
    }

    this.getLatestAddressBalance();
    this.addressSyncTimer = setInterval(() => {
      this.getLatestAddressBalance();
    }, Config.SYNC_ADDRESS_FREQUENCY);

    this.refreshCurrenciesAndExchangeRates();
    this.exchangeRateSyncTimer = setInterval(() => {
      // TODO We need to indicate that it can refresh within one minute.
      this.refreshCurrenciesAndExchangeRates();
    }, Config.EXCHANGE_RATE_INTERVAL_RESYNC);
  }

  private async refreshCurrenciesAndExchangeRates(): Promise<void> {
    return new Promise((accept, reject) => {
      this.currencyService.loadCurrencies((_avail, data?, err?) => {
        if (err) {
          reject('Failed to load currencies: ' + err);
          return;
        }

        this.currencySettings = data;
        accept();
      });
    });
  }

  private async getLatestAddressBalance(): Promise<void> {
    try {
      const result: ISearchResponse = await this.apiClient.search({
        network: Config.API_NETWORK,
        query: this.address
      });

      this.balance = result.address.balance;
    } catch (e) {
      console.error('Failed to load the address, ' + e);
    }
  }

  private handleClick(): void {
    // For balance we only show button ATM.
    if (this.type === BUTTON_TYPES.BALANCE) {
      return;
    }
    this.show = !this.show;
  }

  private openTangleExplorer(url: string): void {
    window.open('https://explorer.iota.org/mainnet/addr/' + url);
  }

  protected disconnectedCallback(): void {
    if (this.addressSyncTimer) {
      clearInterval(this.addressSyncTimer);
    }
    if (this.exchangeRateSyncTimer) {
      clearInterval(this.exchangeRateSyncTimer);
    }
  }

  private printAmount(): string {
    if (this.currency) {
      return this.currencyService.getSymbol(this.currency) + CurrencyHelper.formatLargeNumbers(this.amount.toString());
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

  render() {
    /* Handling which button to show. For now only Balance or Payment supported. */
    let button: any;
    if (this.type === BUTTON_TYPES.PAYMENT) {
      button = <ibtn-button-payment  onClick={() => this.handleClick()}  label={this.label + ' ' + this.printAmount()}></ibtn-button-payment>;
    } else {
      button = <ibtn-button-balance  onClick={() => this.openTangleExplorer(this.address)}  label={this.label + ' ' + this.printBalanceAmount()}></ibtn-button-balance>;
    }

    let content: string;
    let leftContent: string;
    // Only payment supported atm.
    /* TODO Balance view */
    /* TODO Coloured coin view */
    if (this.type === BUTTON_TYPES.PAYMENT) {
      leftContent = (this.balance >= this.amount) ? '' : <ibtn-qr-payment class='summary' address={this.address} amount={this.amount}></ibtn-qr-payment>;
      content = <ibtn-payment-process class='content' 
                  currency={this.currency} address={this.address}
                  amount={this.amount} balance={this.balance} currencyExchangeRate={this.currencyExchangeRate} 
                  usdExchangeRate={this.usdExchangeRate}>
                </ibtn-payment-process>;
    } else {
      leftContent = '';
      content = <p>Not supported yet</p>;
    }

    return (
      <div>
        {button}

        {/* Handling modal. */}
        {this.show ?
          <div class='iota-button-overlay-container'>
            <div class='iota-button-overlay-backdrop'></div>
            <div class='iota-button-overlay'>
              <div class='iota-button-modal-container'>
                <div class='iota-button-modal'>
                  {leftContent}

                  { /* PAYMENT / Donation PROCESS */}
                  {content}
                
                  <ibtn-modal-close class='close' onClick={() => this.handleClick()}></ibtn-modal-close>
                </div>
              </div>
            </div>
          </div>
          : ''}
      </div>
    );
  }
}
