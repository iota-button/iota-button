## Overview
IOTA Button - No fees, your terms, full privacy.

[![Open Source Love](https://firstcontributions.github.io/open-source-badges/badges/open-source-v1/open-source.svg)](https://github.com/firstcontributions/open-source-badges)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Generic badge](https://img.shields.io/badge/STATUS-PROTOTYPE-blue.svg)](https://shields.io/)
[![GitHub issues](https://img.shields.io/github/issues/iota-button/iota-button.svg)](https://GitHub.com/iota-button/iota-button/issues/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/5f84f1fa-ffa4-43ba-a9e2-7a395aeefecb/deploy-status)](https://app.netlify.com/sites/iota-button/deploys)

> This project is an initial prototype to share it with IOTA community to collect feedback.

Adding IOTA button to existing websites should be simple and easy to implement. It should work without registration (or accesing any of your private data) and ideally can be implemented by anyone (even those without coding experience). This is what IOTA button trying to do. 

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

At the moment, wallet implements payment and donation flow. Once Firefly supports messages, we will be able to detect arrival of the payment. We are not able to distinguish the payment from others atm. Although, we show user historical payments and continue to monitor it so they'll see their payment coming through. 

## Roadmap / Suggested Enhancements / Use cases

See list of suggested enhancements to be discussed in our discussion forum.

Big thanks to @obany and his work on: https://github.com/iotaledger/explorer

> Personally, I love the idea of eventually integrating MAM channels as part of the iota-button to support thread/chat/conversations together with [https://github.com/iotaledger/identity.rs](DID) it can cover huge amount of use cases. We might have more on this soon.

## Integration into other systems
* Wordpress plugin - https://github.com/LFSanja/iota-pay-wordpress

## Technology

* Stencil.js (https://stenciljs.com/)
* Tailwindcss (https://tailwindcss.com/)
* Iota.js

## Get Involved

If you're interested to get involved reach out to me on twitter (https://twitter.com/adam_unchained) or IOTA's discord (#adam_unchained#5334)

Any feedback will be highly appreciated.

## Contributors
<a href="https://github.com/iota-button/iota-button/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=iota-button/iota-button" />
</a>

## Donations

iota1qqnfhjeq0kzv9clem2r23hwte458teds8eucem75syn3zsrvts2xzp6gd8s
