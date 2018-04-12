module.exports = {
  mode: "universal",
  build: {
    extend(config, { isClient, isDev }) {
      // Run ESLint on save
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }
      // you using Nuxt.js for Vue.s server-side rendering, webpack can be extended as follow
      // https://goo.gl/m978L6
      config.node = {
        fs: "empty"
      }
      config.resolve.alias["create-api"] = `./create-api-${
        isClient ? "client" : "server"
      }.js`
    },
    vendor: ["firebase"]
  },
  head: {
    titleTemplate: "aiie | %s",
    meta: [
      {
        property: "og:image",
        content: ""
      },
      { property: "twitter:card", content: "summary_large_image" },
      { property: "twitter:site", content: "@nuxt_js" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "dns-prefetch", href: "https://nonoway-6acc1.firebaseio.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Roboto"
      }
    ]
  },
  loading: {
    color: "#7572ff"
  },
  loadingIndicator: {
    name: "rectangle-bounce",
    color: "white",
    background: "#7572ff"
  },
  manifest: {
    name: "aiie",
    description:
      "aiie is a social sharing service for web developers and web designers.",
    theme_color: "#7572ff"
  },
  modules: ["@nuxtjs/pwa", "@nuxtjs/component-cache"],
  plugins: [
    "~/plugins/vuex-router-sync",
    "~/plugins/filters",
    "~/plugins/components"
  ],
  // https://github.com/PrismJS/prism-themes/blob/master/themes/prism-duotone-sea.css
  css: ["~/assets/main.css"],
  router: {
    middleware: ["https"]
  },
  serverMiddleware: ["~/serverMiddleware/authedUserToken"],
  render: {
    static: {
      maxAge: "1y",
      setHeaders(res, path) {
        if (path.includes("sw.js")) {
          res.setHeader("Cache-Control", "public, max-age=0")
        }
      }
    }
  }
}
