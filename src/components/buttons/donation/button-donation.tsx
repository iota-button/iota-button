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
      <button disabled={this.disabled} 
        class="bg-blue-500 border-transparent hover:bg-blue-700 text-white font-bold py-3 px-4 rounded inline-flex items-center cursor-pointer">
        <span>{this.label}</span>
      </button>
    );
  }
}
