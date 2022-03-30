# Fluent Web Framwork

Framework for using Windows 11 Fluent design on the web.

## Documentation

Visit the [Fluent Web Framework](https://cdn.spej.eu/fwf/showcase/) - still in progress

Docs are not fully updated (yet)

### Some controls

![controls example](https://user-images.githubusercontent.com/53868994/151600056-709ddcb5-838a-4f69-a518-a249130aa712.png)

### Expander

```html
<fluent-expander header="Open me!">
   <p>Welcome to fluent framework!</p>
</fluent-expander>
```

![expander example](https://user-images.githubusercontent.com/53868994/151600680-22a9beb1-b5e1-42b2-b3c4-115aed8be7fc.gif)

## Features

- Windows 11 Fluent design.
- Smooth animations.
- Accurate colors.
- Custom elements for easier usage.
- Light and Dark theme.

## Usage

```html
In <head>:
<link rel="stylesheet" href="https://cdn.spej.eu/fwf/fluent-bundle.min.css">

Before </body>:
<script src="https://cdn.spej.eu/fwf/fluent-bundle.min.js"></script>
```

## Options

```html
<script>
// Fluent Web Framework options
const FLUENT = {
   noPrefix: false,
   enableCode: false,
};
Fluent_onReady(() => { // or Fluent_onInitialized
   // Called when FWF is ready
});
</script>
<!-- Import fluent-bundle.min.js here -->
```

### noPrefix - Compatibility with the original project

Make functions and variables available without the `Fluent_` prefix and capitalizes the first letter.
E.g. `Fluent_showSplashScreen()` becomes available as `ShowSplashScreen()`.
Default: `false`

### enableCode - Enable code highlighting

Loads and enables code highlighting stuff.
Default: `false`
