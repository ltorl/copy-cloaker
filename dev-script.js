async function copyCloak() {
    if (window.confirm("Copy the URL of the page you want to cloak from, then press OK.")) {
        
        let targetUrl = window.prompt("Enter the URL to cloak you copyed:");
        if (!targetUrl) return; 
        
        if (!targetUrl.startsWith('http')) {
            targetUrl = 'https://' + targetUrl;
        }

        try {
            const proxyUrl = 'https://corsproxy.anjomous.workers.dev/?url=' + encodeURIComponent(targetUrl);
            const response = await fetch(proxyUrl);
            const html = await response.text();

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            let fetchedTitle = doc.title || "";

            let finalTitle = window.prompt("Edit the tab title:", fetchedTitle);
            if (finalTitle === null) return;
            
            document.title = finalTitle || fetchedTitle;

            let faviconUrl = "";
            const iconElement = doc.querySelector('link[rel="icon"], link[rel="shortcut icon"]');
            
            if (iconElement && iconElement.getAttribute('href')) {
                faviconUrl = new URL(iconElement.getAttribute('href'), targetUrl).href;
            }

            let currentIcon = document.querySelector("link[rel*='icon']");
            if (!currentIcon) {
                currentIcon = document.createElement('link');
                currentIcon.rel = 'icon';
                document.head.appendChild(currentIcon);
            }
            currentIcon.href = faviconUrl;

        } catch (error) {
            alert(`Failed to fetch the URL. The proxy might be blocking it or the site doesn't exist.\n\nError: ${error.message || error}`);
        }
    }
}

copyCloak();