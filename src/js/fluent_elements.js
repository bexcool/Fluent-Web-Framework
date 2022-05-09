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
                                    'class="fluent-expander"><div class="fluent-expander-header" style="border-radius: 4px 4px 0px 0px; -webkit-border-radius: 4px 4px 0px 0px; -moz-border-radius: 4px 4px 0px 0px; -ms-border-radius: 4px 4px 0px 0px; -o-border-radius: 4px 4px 0px 0px;">' +
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
            this.outerHTML =    `<div class="fluent-menu" ${AttributesToString(this)}>
                                    <h1 class="fluent-menu-header">
                                        ${this.attributes.header != null ? this.attributes.header.value : ""}
                                    </h1>
                                    <button class="fluent-menu-button">
                                        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 20" width="10"><path d="M2 4.5c0-.28.22-.5.5-.5h15a.5.5 0 010 1h-15a.5.5 0 01-.5-.5zm0 5c0-.28.22-.5.5-.5h15a.5.5 0 010 1h-15a.5.5 0 01-.5-.5zm.5 4.5a.5.5 0 000 1h15a.5.5 0 000-1h-15z"/></svg>
                                    </button>
                                    <ul class="fluent-menu-list">
                                        ${this.innerHTML}
                                    </ul>
                                </div>`
        );
    }
}

customElements.define('fluent-menu', Menu);

// Main content

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

// Button

class Button extends HTMLElement {
    connectedCallback() {
        setTimeout(() => {
            if (this.hasAttribute("accent")) {
                this.outerHTML = '<a class="fluent-button-accent" href="#"' + AttributesToString(this) + ' >' + this.innerHTML + '</a>';
            }
        });
    }
}

customElements.define('fluent-button', Button);

// Label

class Label extends HTMLElement {
    connectedCallback() {
        setTimeout(() => {
            this.outerHTML = '<span class="fluent-label"' + AttributesToString(this) + ' >' + this.innerHTML + '</span>';
        });
    }
}

customElements.define('fluent-label', Label);

// Content dialog

class ContentDialog extends HTMLElement {
    connectedCallback() {
        setTimeout(() => {
            this.outerHTML = '<div class="fluent-content-dialog-background"><div class="fluent-content-dialog" ' + AttributesToString(this) + '>' + this.innerHTML + '</div></div>';
        });
    }
}

customElements.define('fluent-content-dialog', ContentDialog);

// Hyperlink

class Hyperlink extends HTMLElement {
    connectedCallback() {
        setTimeout(() => {
            this.outerHTML = '<a class="fluent-hyperlink" ' + AttributesToString(this) + '>' + this.innerHTML + '</a>';
        });
    }
}

customElements.define('fluent-hyperlink', Hyperlink);

// Icon

class Icon extends HTMLElement {
    connectedCallback() {
        setTimeout(() => {
            this.outerHTML = `<div class="fluent-icon" ${AttributesToString(this)}></div>`;
        });
    }
}

customElements.define('fluent-icon', Icon);

// Page

class Page extends HTMLElement {
    connectedCallback() {
        setTimeout(() => {
            let isCustomHeader = false;
            let customHeader;

            for (const headerElement of Array.from(this.children)) {
                if (headerElement.tagName.toLowerCase() == "fluent-page.header" && !isCustomHeader) {
                    customHeader = headerElement;
                    isCustomHeader = true;
                }
            }

            this.outerHTML =    `<div class="fluent-page" ${AttributesToString(this)}>
                                    ${this.attributes.header != null ? "<h2>" + this.attributes.header.value + "</h2>" :
                                    isCustomHeader ? `<div ${AttributesToString(customHeader)}>${customHeader.innerHTML}</div>` : "" }
                                    ${isCustomHeader ? customHeader.remove() == "undefind" ? "" : "" : " "}
                                    <div class="fluent-page-body">
                                        ${this.innerHTML}
                                    </div>
                                </div>`;
        });
    }
}

customElements.define('fluent-page', Page);

// Page title

class PageTitle extends HTMLElement {
    connectedCallback() {
        setTimeout(() => {
            this.outerHTML =    `<h2>${this.innerHTML}</h2>`;
        });
    }
}

customElements.define('fluent-page.title', PageTitle);

// Progress ring

class ProgressRing extends HTMLElement {
    connectedCallback() {
        setTimeout(() => {
            this.outerHTML =    `<div class="progress-ring-container"><svg tabindex="-1" class="progress-ring" viewBox="0 0 16 16"><circle cx="50%" cy="50%" r="7" stroke-dasharray="3" stroke-dashoffset="NaN" class="progress-ring"></circle></svg></div>`;
        });
    }
}

customElements.define('fluent-progressring', ProgressRing);