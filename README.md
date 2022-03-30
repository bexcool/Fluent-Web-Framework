# Fluent Web Framwork

 Framework for creating fluent Windows 11 design for your website.

## Documentation

Visit the [Fluent Web Framework](https://cdn.spej.eu/fwf/showcase/) - still in progress

### Some controls

![obrazek](https://user-images.githubusercontent.com/53868994/151600056-709ddcb5-838a-4f69-a518-a249130aa712.png)

### Expander

```html
<fluent-expander header="Open me!">
   <p>Welcome to fluent framework!</p>
</fluent-expander>
```

![firefox_GWKvhDP0pl](https://user-images.githubusercontent.com/53868994/151600680-22a9beb1-b5e1-42b2-b3c4-115aed8be7fc.gif)

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

Docs are not fully updated (yet)

### Compatibility with the vanilla.js project

Setting `window.FLUENT_NO_PREFIX` to `true`  
makes functions and variables in the global namespace available without the Fluent_ prefix this project uses.
