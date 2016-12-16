YARD3 is an easily composable library that binds D3's svg generation functions with React's renderer.  The philosophy of the library is to take care of all view logic, such as svg transforms, selections, and DOM updates, while leaving all data handling to the developer. In practice, this means a minimum amount of logic is handled within the library, allowing visualizations to be easily customized and composed.

## Internal to the library

* rendering, in particular providing the glue between react and D3
* managing chart pixel dimensions, specifically scale ranges
* managing chart svg positioning, for example css transforms

## External to the library

* data transforms, such as x and y accessor functions
* scale domains and interpolation methods
* DOM event handling

---
