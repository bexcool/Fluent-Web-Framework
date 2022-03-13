// Initializes animations
function InitializeAnimations() {
    setTimeout( () => {
        // Initialize context menus
        const context_menus = document.querySelectorAll(".fluent-context-menu-container");
        console.log(context_menus.length);
    
        for (const context_menu of context_menus) {
            const menu_child = context_menu.querySelector(".fluent-context-menu ul");
            
            context_menu.addEventListener("mouseenter", function (e) {
                menu_child.parentElement.style.width = menu_child.scrollWidth +  "px";
                menu_child.parentElement.style.height = menu_child.scrollHeight + "px";
            
                menu_child.animate(
                  [
                    // keyframes
                    { transform: 'translateY(-100px)', opacity: '1', easing: 'ease-out' },
                    { transform: 'translateY(0px)', opacity: '1', easing: 'ease-in' }
                  ],
                  {
                    // timing options
                    duration: 200
                  });
                
                setTimeout(() => {
                    menu_child.animate(
                        [
                          // keyframes
                          { boxShadow: '0 0 0 0 rgba(0,0,0,0)' },
                          { boxShadow: '0px 5px 13px 5px rgba(0, 0, 0, 0.1)' }
                        ],
                        {
                          // timing options
                          duration: 150
                        });
                        menu_child.style.boxShadow = '0px 5px 13px 5px rgba(0, 0, 0, 0.1)';
                }, 200);
            });
  
            context_menu.addEventListener("mouseleave", function (e) {
                const menu_child = e.target.querySelector(".fluent-context-menu ul");
            
                menu_child.style.boxShadow = '';
            });
        }
    }, 50);
}