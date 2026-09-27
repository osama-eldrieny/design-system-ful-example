/**
 * Sidebar Loader - Single Source of Truth
 * Loads sidebar from includes/sidebar.html and injects into all pages
 */

function loadSidebarDirect() {
  console.log('[Sidebar Loader] Starting sidebar injection...');

  const sidebarHTML = `<aside class="sidebar">
  <a class="sidebar-link" href="index.html">Home</a>
  <div class="sidebar-group-label">Foundations</div>
  <a class="sidebar-link" href="pages/tokens-borders.html">Borders</a>
  <a class="sidebar-link" href="pages/tokens-colors.html">Colors</a>
  <a class="sidebar-link" href="pages/tokens-spacing.html">Spacing</a>
  <a class="sidebar-link" href="pages/tokens-typography.html">Typography</a>
  <div class="sidebar-group-label">Components</div>
  <a class="sidebar-link" href="components/alert.html">Alert</a>
  <a class="sidebar-link" href="components/apps-notifications.html">Apps Notifications</a>
  <a class="sidebar-link" href="components/avatar.html">Avatar</a>
  <a class="sidebar-link" href="components/button.html">Button</a>
  <a class="sidebar-link" href="components/card.html">Card</a>
  <a class="sidebar-link" href="components/choose-card.html">Choose Card</a>
  <a class="sidebar-link" href="components/dropdown.html">Dropdown</a>
  <a class="sidebar-link" href="components/footer.html">Footer</a>
  <a class="sidebar-link" href="components/header.html">Header</a>
  <a class="sidebar-link" href="components/input-field.html">Input Field</a>
  <a class="sidebar-link" href="components/logo.html">Logo</a>
  <a class="sidebar-link" href="components/meeting-card.html">Meeting Card</a>
  <a class="sidebar-link" href="components/navbar.html">Navbar</a>
  <a class="sidebar-link" href="components/notification-list-item.html">Notification List Item</a>
  <a class="sidebar-link" href="components/pagination.html">Pagination</a>
  <a class="sidebar-link" href="components/palettes.html">Palettes</a>
  <a class="sidebar-link" href="components/radio-button.html">Radio Button</a>
  <a class="sidebar-link" href="components/tabs.html">Tabs</a>
  <a class="sidebar-link" href="components/toggle.html">Toggle</a>
  <div class="sidebar-group-label">Examples</div>
  <a class="sidebar-link" href="demo/index.html" target="_blank">Demo</a>
  <a class="sidebar-link" href="react-app-live/index.html#/landing" target="_blank">Landing Page</a>
  <a class="sidebar-link" href="react-app-live/index.html#/dashboard" target="_blank">Dashboard</a>
</aside>`;

  const pathname = window.location.pathname;
  let basePath = '';

  console.log('[Sidebar Loader] Current pathname:', pathname);

  // Determine base path based on page location
  if (pathname.includes('/pages/') || pathname.includes('/components/') || pathname.includes('/stories/')) {
    basePath = '../';
    console.log('[Sidebar Loader] Nested page detected, using basePath:', basePath);
  }

  // Inject sidebar into container
  const sidebarContainer = document.getElementById('sidebar-container');
  console.log('[Sidebar Loader] Container found:', !!sidebarContainer);

  if (sidebarContainer) {
    sidebarContainer.innerHTML = sidebarHTML;
    console.log('[Sidebar Loader] Sidebar HTML injected');

    // Adjust all links based on page depth
    const sidebarLinks = sidebarContainer.querySelectorAll('.sidebar-link');
    console.log('[Sidebar Loader] Found', sidebarLinks.length, 'sidebar links');

    sidebarLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http')) {
        // Store original href as data attribute for highlighting
        link.setAttribute('data-original-href', href);
        const newHref = basePath + href;
        link.setAttribute('href', newHref);
        console.log('[Sidebar Loader] Adjusted link:', href, '→', newHref);
      }
    });

    // Highlight active page
    highlightActivePage();
    console.log('[Sidebar Loader] Page highlighting complete');
  } else {
    console.error('[Sidebar Loader] ERROR: sidebar-container element not found!');
  }
}

/**
 * Highlight the current page link in the sidebar
 */
function highlightActivePage() {
  const currentPath = window.location.pathname;
  const sidebarLinks = document.querySelectorAll('.sidebar-link');

  console.log('[Sidebar Loader] Highlighting active page');
  console.log('[Sidebar Loader] Current path:', currentPath);

  sidebarLinks.forEach(link => {
    link.classList.remove('active');

    // Get original href from data attribute (before path adjustment)
    const originalHref = link.getAttribute('data-original-href') || link.getAttribute('href');

    if (originalHref && !originalHref.startsWith('http')) {
      // Check if current path ends with the original href
      const normalizedPath = currentPath.replace(/\/$/, '');
      const normalizedHref = originalHref.replace(/\/$/, '');

      if (normalizedPath.endsWith(normalizedHref) || normalizedPath.endsWith('/' + normalizedHref)) {
        link.classList.add('active');
        console.log('[Sidebar Loader] Activated link:', originalHref);
      }
    }
  });
}

// Load sidebar immediately when this script is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadSidebarDirect);
} else {
  loadSidebarDirect();
}
