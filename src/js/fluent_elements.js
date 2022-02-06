// Context menu
class ContextMenu extends HTMLElement {
    connectedCallback() {
        const Header =this.attributes.Header != null ? this.attributes.Header.value : "";
        const Url = this.attributes.Url != null ? this.attributes.Url.value : "#";

        setTimeout( () =>
            this.outerHTML =    '<div' + ' style="' + this.style.cssText + '" ' + 
                                'class="fluent-context-menu-container">' +
                                '<a href="' + Url + '">' + Header + '</a>' +
                                '<ul class="fluent-context-menu">' +
                                this.innerHTML +
                                '</ul>' +
                                '</div>'
        );
    }
}

customElements.define('fluent-contextmenu', ContextMenu);

// Context menu item
class ContextMenuItem extends HTMLElement {
    connectedCallback() {
        const Url = this.attributes.Url != null ? this.attributes.Url.value : "#";
        const Selected = this.attributes.Selected != null ? "selected" : "";

        setTimeout( () => {
            // Check if is selectable
            if (!this.hasAttribute("selectable")) {
                this.outerHTML =    '<li><a class="fluent-menu-item" href="' + Url + '">' +
                                    this.innerHTML || "" +
                                    '</a></li>'
            }
            else {
                this.outerHTML =    '<li><a class="fluent-menu-item-select" href="' + Url + '"' + Selected + '>' +
                                    this.innerHTML || "" +
                                    '</a></li>'
            }

            //if (Initialized) InitializeFluent();
        });
    }
}

customElements.define('fluent-contextmenu-item', ContextMenuItem);

// Expander

class Expander extends HTMLElement {
    connectedCallback() {
        const Header = this.attributes.Header != null ? this.attributes.Header.value : "";

        setTimeout( () => {
            if (this.hasAttribute("expanded")) {
                this.outerHTML =    '<div' + ' style="' + this.style.cssText + '" ' +
                                'class="fluent-expander"><div class="fluent-expander-header">' +
                                '<p>' + Header + '</p><div><img class="fluent-expander-arrow" style="transform: rotate(180deg)" src="https://resources.bexcool.eu/fluentstyle/src/img/arrow_down.svg"></div></div>' +
                                '<div class="fluent-expander-body expanded">' +
                                this.innerHTML +
                                '</div></div>';
            }
            else {
                this.outerHTML =    '<div' + ' style="' + this.style.cssText + '" ' +
                                'class="fluent-expander"><div class="fluent-expander-header">' +
                                '<p>' + Header + '</p><div><img class="fluent-expander-arrow" src="https://resources.bexcool.eu/fluentstyle/src/img/arrow_down.svg"></div></div>' +
                                '<div class="fluent-expander-body">' +
                                this.innerHTML +
                                '</div></div>';
            }
        });
    }
}

customElements.define('fluent-expander', Expander);

// Border

class Border extends HTMLElement {
    connectedCallback() {
        setTimeout( () => 
            this.outerHTML =    '<div' + ' style="' + this.style.cssText + '" ' + 
                                'class="fluent-background-border">' + this.innerHTML + '</div>'
        );
    }
}

customElements.define('fluent-border', Border);