# Dynamic Tab Cloaker

A lightweight, zero-dependency JavaScript utility that instantly disguises the current browser tab. It uses a CORS proxy to fetch the HTML of a target URL (like Google or Classroom), extracts its metadata, and dynamically replaces the current page's title and favicon. 

Perfect for keeping game portals, proxies, and web projects discreet.

## Features
- **Dynamic Metadata Extraction:** Automatically fetches the exact title and favicon of the target site.
- **Smart Favicon Resolution:** Properly resolves relative favicon paths (e.g., `/favicon.ico`) to absolute URLs so they render correctly on your domain.
- **Title Customization:** Prompts the user to override or tweak the fetched title before applying it.
- **Bypass CORS:** Uses a Cloudflare Worker CORS proxy to safely fetch remote DOM data.

---

## How to Use as a Bookmarklet

You can use this script on *any* webpage to instantly cloak the tab. 

1. Right-click the bookmarks bar and select **Add page**.
2. In the **URL** field, paste the following code:

```
javascript:(function()%7Basync%20function%20copyCloak()%20%7B%0A%20%20%20%20if%20(window.confirm(%22Copy%20the%20URL%20of%20the%20page%20you%20want%20to%20cloak%20from%2C%20then%20press%20OK.%22))%20%7B%0A%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20let%20targetUrl%20%3D%20window.prompt(%22Enter%20the%20URL%20to%20cloak%20you%20copyed%3A%22)%3B%0A%20%20%20%20%20%20%20%20if%20(!targetUrl)%20return%3B%20%0A%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20if%20(!targetUrl.startsWith('http'))%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20targetUrl%20%3D%20'https%3A%2F%2F'%20%2B%20targetUrl%3B%0A%20%20%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20%20%20try%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20const%20proxyUrl%20%3D%20'https%3A%2F%2Fcorsproxy.anjomous.workers.dev%2F%3Furl%3D'%20%2B%20encodeURIComponent(targetUrl)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20const%20response%20%3D%20await%20fetch(proxyUrl)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20const%20html%20%3D%20await%20response.text()%3B%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20const%20parser%20%3D%20new%20DOMParser()%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20const%20doc%20%3D%20parser.parseFromString(html%2C%20'text%2Fhtml')%3B%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20let%20fetchedTitle%20%3D%20doc.title%20%7C%7C%20%22%22%3B%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20let%20finalTitle%20%3D%20window.prompt(%22Edit%20the%20tab%20title%3A%22%2C%20fetchedTitle)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(finalTitle%20%3D%3D%3D%20null)%20return%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20document.title%20%3D%20finalTitle%20%7C%7C%20fetchedTitle%3B%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20let%20faviconUrl%20%3D%20%22%22%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20const%20iconElement%20%3D%20doc.querySelector('link%5Brel%3D%22icon%22%5D%2C%20link%5Brel%3D%22shortcut%20icon%22%5D')%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(iconElement%20%26%26%20iconElement.getAttribute('href'))%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20faviconUrl%20%3D%20new%20URL(iconElement.getAttribute('href')%2C%20targetUrl).href%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20let%20currentIcon%20%3D%20document.querySelector(%22link%5Brel*%3D'icon'%5D%22)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(!currentIcon)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20currentIcon%20%3D%20document.createElement('link')%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20currentIcon.rel%20%3D%20'icon'%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20document.head.appendChild(currentIcon)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20currentIcon.href%20%3D%20faviconUrl%3B%0A%0A%20%20%20%20%20%20%20%20%7D%20catch%20(error)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20alert(%60Failed%20to%20fetch%20the%20URL.%20The%20proxy%20might%20be%20blocking%20it%20or%20the%20site%20doesn't%20exist.%5Cn%5CnError%3A%20%24%7Berror.message%20%7C%7C%20error%7D%60)%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%7D%0A%0AcopyCloak()%3B%7D)()%3B
```

5. Click the bookmark anytime to activate the cloaker.

---

## How to Use as a Developer (Cloak your site)

If you are building a site and want to give your users a cloaked site, you can easily wire this function up to a button in your UI.

### 1. Add the Script
Include the function in your frontend JavaScript:

```
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
```

### 2. Create the UI Trigger
Bind the function to a button in your HTML. Here is an example of a simple button:

```
<button onclick='copyCloak()'>
    Copy Cloak
</button>
```

## Disclaimer
This script relies on a free, public CORS proxy (`corsproxy.anjomous.workers.dev`). Depending on traffic, public proxies can occasionally experience rate limits or downtime. For high-traffic production environments, consider hosting your own lightweight proxy worker on Cloudflare.
