# Shopgate Connect - Product Disclaimer extension

This extension provide a memoized popup content for product details page.

You can also see a [demo](./demo/pdp.png) of popup disclaimer

## Configuration

- `triggerProperty` (json): The product property to trigger showing a disclaimer
    - `name` (string): property name
    - `value` (string): property value
- `header` (string): The header of popup content
- `content` (string): Content to show (can be in html format)
- `memoization` (json): Memoization options of shown disclaimer (fifo based)
    - `limit` (number): limit of memoized items
    - `ttl` (number): time life (in sec) to memoize shown disclaimer
- `buttons` (json): Buttons to show underneath content
- `styles` (json): Styles for content and buttons (glamor)
    - `content` (json): styles of content
    - `button` (json): style for single button

## Example Configuration

```json
{
  "triggerProperty": {
    "name": "overlay",
    "value": "yes"
  },
  "header": "Important product disclaimer",
  "content": "<div>Content in HTML format</div>",
  "cache": {
    "limit": 200,
    "ttl": 7776000
  },
  "buttons": [
    {
      "label": "I confirm to process choice."
    },
    {
      "label": "I consent to given choice."
    }
  ],
  "styles": {
    "content": {
      "fontSize": "0.85rem"
    },
    "button": {
      "fontSize": "0.85rem"
    }
  }
}
```

## Dependencies
- @shopgate-project/products-properties
    - `addProperties` Add the product property that is configured to trigger product disclaimer.

## About Shopgate

Shopgate is the leading mobile commerce platform.

Shopgate offers everything online retailers need to be successful in mobile. Our leading
software-as-a-service (SaaS) enables online stores to easily create, maintain and optimize native
apps and mobile websites for the iPhone, iPad, Android smartphones and tablets.
