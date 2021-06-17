import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'ibtn-button-payment',
  styleUrl: 'button-payment.scss',
  shadow: true,
})
export class ButtonPayment {
  /**
   * Button label.
   */
  @Prop() label: string;

  render() {
    return (
      <button class="bg-blue-500 border-transparent hover:bg-blue-700 text-white font-bold py-3 px-4 rounded inline-flex items-center cursor-pointer">
        <span>{this.label}</span>
      </button>
    );
  }
}
