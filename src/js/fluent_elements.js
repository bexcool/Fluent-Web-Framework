// Context menu
class ContextMenu extends HTMLElement {
    connectedCallback() {
        const Header =this.attributes.Header != null ? this.attributes.Header.value : "";
        const Url = this.attributes.Url != null ? this.attributes.Url.value : "#";

        setTimeout( () =>
            this.outerHTML =    '<div style="' + this.style.cssText + '" ' + 
                                'class="fluent-context-menu-container" style="">' +
                                '<a href="' + Url + '">' + Header + '</a><div class="fluent-context-menu">' +
                                '<ul class="fluent-menu-list">' +
                                this.innerHTML +
                                '</ul></div>' +
                                '</div>'
        );
    }
}

customElements.define('fluent-contextmenu', ContextMenu);

// Menu item
class MenuItem extends HTMLElement {
    connectedCallback() {
        setTimeout( () => {
            // Check if is selectable
            if (!this.hasAttribute("selectable")) {
                this.outerHTML =    '<li><a class="fluent-menu-item"' + AttributesToString(this) + '>' +
                                    this.innerHTML || "" +
                                    '</a></li>'
            }
            else {
                this.outerHTML =    '<li><a class="fluent-menu-item-select"' + AttributesToString(this) + '>' +
                                    this.innerHTML || "" +
                                    '</a></li>'
            }
        });
    }
}

customElements.define('fluent-menu-item', MenuItem);

// Menu item expander

class MenuItemExpander extends HTMLElement {
    connectedCallback() {
        const Header = this.attributes.Header != null ? this.attributes.Header.value : "";

        setTimeout( () => {
            if (this.hasAttribute("expanded")) {
                this.outerHTML =    '<div style="' + this.style.cssText + '" ' +
                                    'class="fluent-menu-item-expander"><div class="fluent-menu-item-expander-header" ' + (this.attributes.icon != null ? 'icon="' + this.attributes.icon.value + '"' : "") + '>' +
                                    '<p>' + Header + '</p><div><img class="fluent-menu-item-expander-arrow" style="transform: rotate(180deg)" src="https://resources.bexcool.eu/fluentwebframework/src/img/arrow_down.svg"></div></div>' +
                                    '<div class="fluent-menu-item-expander-body-container"><div class="fluent-menu-item-expander-body expanded">' +
                                    this.innerHTML +
                                    '</div></div></div>';
            }
            else {
                this.outerHTML =    '<div style="' + this.style.cssText + '" ' +
                                    'class="fluent-menu-item-expander"><div class="fluent-menu-item-expander-header" ' + (this.attributes.icon != null ? 'icon="' + this.attributes.icon.value + '"' : "") + '>' +
                                    '<p>' + Header + '</p><div><img class="fluent-menu-item-expander-arrow" src="https://resources.bexcool.eu/fluentwebframework/src/img/arrow_down.svg"></div></div>' +
                                    '<div class="fluent-menu-item-expander-body-container"><div class="fluent-menu-item-expander-body">' +
                                    this.innerHTML +
                                    '</div></div></div>';
            }
        });
    }
}

customElements.define('fluent-menu-item-expander', MenuItemExpander);

// Expander

class Expander extends HTMLElement {
    connectedCallback() {
        const Header = this.attributes.Header != null ? this.attributes.Header.value : "";

        setTimeout( () => {
            if (this.hasAttribute("expanded")) {
                this.outerHTML =    '<div style="' + this.style.cssText + '" ' +
                                    'class="fluent-expander"><div class="fluent-expander-header">' +
                                    '<p>' + Header + '</p><div><img class="fluent-expander-arrow" style="transform: rotate(180deg)" src="https://resources.bexcool.eu/fluentwebframework/src/img/arrow_down.svg"></div></div>' +
                                    '<div class="fluent-expander-body-container"><div class="fluent-expander-body expanded">' +
                                    this.innerHTML +
                                    '</div></div></div>';
            }
            else {
                this.outerHTML =    '<div style="' + this.style.cssText + '" ' +
                                    'class="fluent-expander"><div class="fluent-expander-header">' +
                                    '<p>' + Header + '</p><div><img class="fluent-expander-arrow" src="https://resources.bexcool.eu/fluentwebframework/src/img/arrow_down.svg"></div></div>' +
                                    '<div class="fluent-expander-body-container"><div class="fluent-expander-body">' +
                                    this.innerHTML +
                                    '</div></div></div>';
            }
        });
    }
}

customElements.define('fluent-expander', Expander);

// Border

class Border extends HTMLElement {
    connectedCallback() {
        setTimeout( () => 
            this.outerHTML =    '<div style="' + this.style.cssText + '" ' + 
                                'class="fluent-background-border">' + this.innerHTML + '</div>'
        );
    }
}

customElements.define('fluent-border', Border);

// Toggle Button

class ToggleButton extends HTMLElement {
    connectedCallback() {
        setTimeout( () => 
            this.outerHTML =    '<button style="' + this.style.cssText + '" ' + 
                                'class="fluent-button">' + this.innerHTML + '</button>'
        );
    }
}

customElements.define('fluent-togglebutton', ToggleButton);

// Menu

class Menu extends HTMLElement {
    connectedCallback() {
        setTimeout( () =>
            this.outerHTML =    '<div class="fluent-menu"' + AttributesToString(this) + '>' +
                                '<ul class="fluent-menu-list">' +
                                this.innerHTML +
                                '</ul></div>' +
                                '</div>'
        );
    }
}

customElements.define('fluent-menu', Menu);

// Menu

class MainContent extends HTMLElement {
    connectedCallback() {
        setTimeout( () =>
            this.outerHTML =    '<div class="fluent-main-content"' + AttributesToString(this) + '>' +
                                this.innerHTML +
                                '</div>'
        );
    }
}

customElements.define('fluent-main-content', MainContent);