// Initializes animations
function InitializeAnimations() {

  setTimeout( () => {
    // Initialize context menus
    const context_menus = document.querySelectorAll(".fluent-context-menu-container");
  
    for (const context_menu of context_menus) {
      context_menu.addEventListener("mouseenter", function (e) {
        e.preventDefault();
  
        const menu_child = e.target.querySelector(".fluent-context-menu");
  
        menu_child.animate(
          [
            // keyframes
            { transform: 'translateY(-20px)', opacity: '0', easing: 'ease-out' },
            { transform: 'translateY(0px)', opacity: '1', easing: 'ease-in' }
          ],
          {
            // timing options
            duration: 90
          });
      });
    }
  }

  )
}