import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'ibtn-awaiting',
  styleUrl: 'awaiting.scss',
  shadow: true,
})
export class Awaiting {
  /**
   * The IOTA address to send funds to.
   */
  @Prop() amount: string;

  render() {
    return (
      <div class="bg-white border py-2 flex items-center flex-col">
        <div class='text-lg self-start'>Listening to payments...
        </div>
        {/* <span class="text-sm self-start">(balance {this.amount})</span> */}


        <div class="pending-dots block relative w-20 h-5 mt-4">
          <div class="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
          <div class="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
          <div class="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
          <div class="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>
    );
  }
}
