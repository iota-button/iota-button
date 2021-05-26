import { Component, Prop, h } from '@stencil/core';
import { FireflyHelper } from '../../helpers/fireflyHelper';
import { toDataURL } from 'qrcode';

@Component({
  tag: 'ibtn-qr-payment',
  styleUrl: 'qr-payment.scss',
  shadow: true,
})
export class QrPayment {
  /**
   * The IOTA address to send funds to.
   */
  @Prop() address: string;

  /**
   * Define button label text. Defaults to 'Pay with IOTA'
   */
  @Prop() amount: number;
  private qrCodeBase64: string;

  protected connectedCallback(): void {
    // Create QR code.
    toDataURL('iota://' + this.address, (_err, base64) => {
      this.qrCodeBase64 = base64;
    });
  }

  render() {
    return (
      <div>
        <p>Scan with <a href="//firefly.iota.org" target="new">Firefly</a></p>
        <a href={FireflyHelper.getPayUrl(this.address, this.amount)} target="new"><img class='m-4' src={this.qrCodeBase64}></img></a>

        <p class="break-all w-48 text-xs">
          {this.address}
        </p>
      </div>
    );
  }
}
