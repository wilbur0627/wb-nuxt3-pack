# **wb-nuxt3-pack**  
🚀 **Quickly integrate essential packages into your Nuxt 3 project**  

## **✨ Features**
`wb-nuxt3-pack` helps you seamlessly integrate the following essential packages into your **existing Nuxt 3 project**, enhancing development efficiency:  
- 📷 **[@nuxt/image](https://image.nuxt.com/)** - Optimized image handling  
- 🎯 **[@nuxt/eslint](https://github.com/nuxt/eslint-config)** - Enforced coding standards  
- 🌍 **[@nuxt/i18n](https://i18n.nuxt.com/)** - Internationalization support  
- 📦 **[Pinia](https://pinia.vuejs.org/)** - Lightweight state management  
- 🔋 **[@vite-pwa/nuxt](https://vite-pwa-org.netlify.app/)** - PWA support  
- 🎨 **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework  

## **📥 Installation**
Ensure you have an **existing Nuxt 3 project**, then run the following command in your project root directory:  

## **✨ Usage**
```console
npx wb-nuxt3-pack
```

This will automatically install and configure all required dependencies.

## **⚙️ Configuration**
Since `@vite-pwa/nuxt` is included, you'll need to add the following configuration to your `nuxt.config.{js,ts}`:  

```
pwa: {
  registerType: "autoUpdate",
  manifest: {
    name: "Your Site's Name",
    short_name: "Your Site's Name",
    description: "Your Site's Description",
    theme_color: "Your Site's Theme Color",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  },
  workbox: {
    navigateFallback: "/",
  },
  devOptions: {
    enabled: true,
    type: "module",
  },
},
```

📜 License
MIT