# Shopgate Connect - Generic frontend for loyalty provider

This extension provides a generic frontend for loyalty provider. It offers:
- overview page with points balance, card number incl. barcode or QR code
- subpage with coupons
- subpage with points history
- barcode scanner page which can be linked via portal from another extension

If you want to display points next to products use [@shopgate-project/configurable-bonuspoints](https://github.com/shopgate-professional-services/ext-configurable-bonuspoints)

## Configuration

- `icon` (string): the icon for TabBar/NavDrawer loyalty link
- `barcodeFormat` (string): the format of the barcode. Eg EAN13, CODE128 or CODE39
- `showQrCodeInstead` (boolean): if set to true, it will show a QR code instead of barcode
- `addTabBarItem` (boolean): if set to true, it will add a link to loyalty page to TabBar (iOS theme only)

## About Shopgate

Shopgate is the leading mobile commerce platform.

Shopgate offers everything online retailers need to be successful in mobile. Our leading
software-as-a-service (SaaS) enables online stores to easily create, maintain and optimize native
apps and mobile websites for the iPhone, iPad, Android smartphones and tablets.
