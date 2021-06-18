import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'ibtn-button-donation',
  styleUrl: 'button-donation.scss',
  shadow: true,
})
export class ButtonDonation {
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
      <button disabled={this.disabled} class="rounded-md border-yellow-400 hover:border-yellow-300 border-solid font-inherit cursor-pointer font-mono py-2 px-6 w-50 bg-yellow-400 hover:bg-yellow-300 text-black shadow-none font-bold text-center">
        <div class="flex flex-row justify-around space-x-4">
          <div class="flex text-left items-center">
            <span class="text-sm font-light mr-2">{this.label} with</span>
            <span class="text-lg">IOTA</span>
          </div>
        </div>
      </button>
    );
  }
}
