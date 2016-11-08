## Yet Another React D3 Integration Library

The philosophy of this library is to take care of rendering, while leaving all data manipulation up to the developer.  In practice:

### Internal
* rendering, in particular providing the glue between react and D3
* managing chart pixel dimensions, specifically scale ranges
* managing chart svg positioning, for example css transforms

### External
* data transforms, such as x and y accessor functions
* scale domains and interpolation methods
* DOM interaction, exposed via event hooks

### Installation
```bash
npm install
```

### Development

```bash
npm run dev
```
