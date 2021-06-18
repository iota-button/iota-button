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

  /**
   * Button disabled.
   */
  @Prop() disabled: boolean = false;

  render() {
    return (
      <button disabled={this.disabled}
        class="rounded-md border-black hover:border-gray-800 border-solid font-inherit cursor-pointer font-mono py-2 px-6 w-50 bg-black hover:bg-gray-800 text-white shadow-none font-bold text-center">
        <div class="flex flex-row justify-around space-x-8">
          <div class="flex flex-col text-left">
            <span class=" text-sm font-light">{this.label} with</span>
            <span class=" text-lg">IOTA BUTTON</span>
          </div>
          </div>
      </button>
        );
  }
}
