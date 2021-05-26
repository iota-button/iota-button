import { Component, h } from '@stencil/core';

@Component({
  tag: 'ibtn-modal-close',
  styleUrl: 'modal-close.scss',
  shadow: true,
})
export class ModalClose {
  render() {
    return (
      <div>
        <svg class='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18L18 6M6 6l12 12'></path>
        </svg>
        <p class='font-bold'>CLOSE</p>
      </div>
    );
  }
}
