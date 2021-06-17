## Overview
IOTA Button is your one click away from the tangle.

[![Open Source Love](https://firstcontributions.github.io/open-source-badges/badges/open-source-v1/open-source.svg)](https://github.com/firstcontributions/open-source-badges)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Generic badge](https://img.shields.io/badge/STATUS-PROTOTYPE-blue.svg)](https://shields.io/)
[![GitHub issues](https://img.shields.io/github/issues/iota-button/iota-button.svg)](https://GitHub.com/iota-button/iota-button/issues/)

> This project is an initial prototype to share it with IOTA community to collect feedback.

Adding IOTA button to existing websites should be simple and easy to implement. It should work without registration and ideally can be implemented by anyone (even those without coding experience). This is what IOTA button trying to do. 

** Easy to use configurable HTML component **

```javascript
// Add JS scripts to your website
<script type="module" src="//iota-button.org/build/iota-button.esm.js"></script>
<script nomodule src="//iota-button.org/build/iota-button.js"></script> 
```

```javascript
// Request $20 paid to IOTA address. Exchange rates refreshed every 1 minute.
<iota-button address="iota1qpec4rvuxj4am5q3560k273amlumfged2mvhuhq4cazxjr6lvqxguye5wjh" 
             amount="20" currency="USD">
</iota-button>
```

```javascript
// Show wallet balance in EUR
<iota-button address="iota1qqmsaf9rl5ptn0dn5r534hzx9pmankmh3k790ljwupe44aacgdzjcjkawel" 
             label="Wallet Balance" type="balance" currency="EUR">
</iota-button> 
```

At the moment, wallet only implements basic payment flow. Application assumes that user is requesting value transfer to unique address. Once funds are received, iota-button detects it and informs user that payment has been received. 

Note, there is an enhancement to match payment by transaction reference instead of just relaying on the "amount". This will improve re-usability of an address.

## Roadmap / Suggested Enhancements / Use cases

See list of suggested enhancements to be discussed here (slowly building this one up): [labels/enhancement](Enhancements)

Initially, these enhancements are focusing on functional requirements before we agree on technical solution.

Features/ideas:
* Accepting Payment - https://github.com/iota-button/iota-button/issues/1
* Address Balance (inc. history) - https://github.com/iota-button/iota-button/issues/9
* Donations (inc. history) - https://github.com/iota-button/iota-button/issues/7
* Reviews (utilising MAM) - https://github.com/iota-button/iota-button/issues/4
   * this could go really nicely with physical hardware (i.e. https://www.maclocks.com/blog/your-business-needs-a-customer-feedback-kiosk/)   
* Receipts/Checkout - https://github.com/iota-button/iota-button/issues/8
* MAM Channels (seller/buyer communication, receiving of digital assets, widgets) - https://github.com/iota-button/iota-button/issues/2
* Plugins (for 3rd parties) - https://github.com/iota-button/iota-button/issues/3
   * This can give third party ability to extend it. For example, ability to fund IOTA from credit card. Those users that don't have any.
   * Notifications
   * Validations

> I'll be slowly adding these enhancements into the issue list so there can be conversation around it.

Big thanks to @obany and his work on: https://github.com/iotaledger/explorer

> Personally, I love the idea of eventually integrating MAM channels as part of the iota-button to support thread/chat/conversations together with [https://github.com/iotaledger/identity.rs](DID) it can cover huge amount of use cases.

## Technology

* Stencil.js (https://stenciljs.com/)
* Tailwindcss (https://tailwindcss.com/)
* Iota.js

## Get Involved

If you're interested to get involved reach out to me on twitter (https://twitter.com/adam_unchained) or IOTA's discord (#adam_unchained)

Any feedback will be highly appreciated.

## Contributors
<a href="https://github.com/iota-button/iota-button/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=iota-button/iota-button" />
</a>

## Donations

iota1qqnfhjeq0kzv9clem2r23hwte458teds8eucem75syn3zsrvts2xzp6gd8s
