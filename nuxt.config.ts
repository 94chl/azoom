// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxt/eslint", "@nuxt/ui", "@nuxt/icon"],
  icon: {
    serverBundle: {
      collections: ["mdi"],
    },
    clientBundle: {
      icons: ["mdi"],
      scan: true,
      sizeLimitKb: 256,
    },
  },
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs",
  },
  typescript: {
    typeCheck: true,
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
});
