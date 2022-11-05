import { sortRoutes } from '@nuxt/utils'
import axios from 'axios'

export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    htmlAttrs: {
      lang: 'en',
    },
    title: 'CurseRinth: Download Minecraft Mods',
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content:
          'Download Minecraft Fabric and Forge mods on CurseRinth. Discover projects on CurseRinth with a modern, easy to use interface and API.',
      },

      {
        hid: 'publisher',
        name: 'publisher',
        content: 'Rinth, Inc.',
      },
      {
        hid: 'apple-mobile-web-app-title',
        name: 'apple-mobile-web-app-title',
        content: 'CurseRinth',
      },
      {
        hid: 'theme-color',
        name: 'theme-color',
        content: '#30b27b',
      },
      {
        hid: 'color-scheme',
        name: 'color-scheme',
        content: 'light dark',
      },

      {
        hid: 'og:site_name',
        name: 'og:site_name',
        content: 'CurseRinth',
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: 'An open source modding platform',
      },
      {
        hid: 'og:title',
        name: 'og:title',
        content: 'CurseRinth',
      },
      {
        hid: 'og:type',
        name: 'og:type',
        content: 'website',
      },
      {
        hid: 'og:url',
        name: 'og:url',
        content: 'https://curserinth-api.kuylar.dev',
      },
      {
        hid: 'og:image',
        name: 'og:image',
        content: '', //todo: branding update
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary',
      },
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://cdn-raw.modrinth.com/fonts/inter/inter.css',
        // todo: ask the modrinth team if its ok to keep this
      },
      {
        rel: 'search',
        type: 'application/opensearchdescription+xml',
        href: '/opensearch.xml',
        title: 'CurseRinth mods',
      },
    ],
  },

  vue: {
    config: {
      devtools: false,
    },
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.splice(
        routes.findIndex((x) => x.name === 'search'),
        1
      )

      routes.push({
        path: '/search',
        component: resolve(__dirname, 'pages/search.vue'),
        name: 'search',
        chunkName: 'pages/search',
        children: [
          {
            path: '/mods',
            component: resolve(__dirname, 'pages/search/mods.vue'),
            name: 'mods',
          },
          {
            path: '/modpacks',
            component: resolve(__dirname, 'pages/search/modpacks.vue'),
            name: 'modpacks',
          },
          {
            path: '/plugins',
            component: resolve(__dirname, 'pages/search/plugins.vue'),
            name: 'plugins',
          },
          {
            path: '/resourcepacks',
            component: resolve(__dirname, 'pages/search/resourcepacks.vue'),
            name: 'resourcepacks',
          },
        ],
      })

      sortRoutes(routes)
    },
    middleware: ['auth', 'analytics'],
  },
  /*
   ** Global CSS
   */
  css: ['~assets/styles/global.scss'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '~/plugins/vue-tooltip.js',
    '~/plugins/vue-notification.js',
    '~/plugins/xss.js',
    '~/plugins/vue-syntax.js',
    '~/plugins/shorthands.js',
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/svg',
    '@nuxtjs/color-mode',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/dayjs',
    '@nuxtjs/axios',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxtjs/style-resources',
    '@nuxtjs/markdownit',
    'cookie-universal-nuxt',
  ],
  ads: {
    // Module options
    ghostMode: true,
    geoEdgeId: '',
  },
  robots: {
    Sitemap: 'https://curserinth-api.kuylar.dev/sitemap.xml',
  },
  sitemap: {
    exclude: [
      '/settings/**',
      '/settings',
      '/notifications',
      '/moderation',
      '/search',
      '/search/**',
      '/create/**',
    ],
    routes: ['mods', 'modpacks', 'resourcepacks', 'plugins'],
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'https://curserinth-api.kuylar.dev/v2/',
    headers: {
      common: {
        Accept: 'application/json',
      },
    },
  },
  dayjs: {
    locales: ['en'],
    defaultLocale: 'en',
    plugins: ['relativeTime'],
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: ['vue-tooltip', 'vue-notification'],
    html: {
      minify: {
        collapseWhitespace: true, // as @dario30186 mentioned
        removeComments: true, // 👈 add this line
      },
    },
    babel: {
      plugins: [
        [
          '@babel/plugin-proposal-private-methods',
          {
            loose: true,
          },
        ],
      ],
    },
  },
  markdownit: {
    runtime: true,
    preset: 'default',
    html: true,
    linkify: true,
    breaks: false,
  },
  loading: {
    color: '#1bd96a',
    height: '2px',
  },
  env: {
    owner: process.env.VERCEL_GIT_REPO_OWNER || 'kuylar',
    slug: process.env.VERCEL_GIT_REPO_SLUG || 'knossos',
    branch: process.env.VERCEL_GIT_COMMIT_REF || 'master',
    hash: process.env.VERCEL_GIT_COMMIT_SHA || 'unknown', // todo: get this to show the git commit sha of kuylar/knossos
    domain: getDomain(),
    authURLBase:
      process.env.BROWSER_BASE_URL || 'https://curserinth-api.kuylar.dev/v2/',
  },
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL,
    },
    ads: {
      ethicalAds: process.env.ETHICAL_ADS,
    },
    analytics: {
      base_url: null,
    },
  },
  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL,
      headers: {
        common: {
          'x-ratelimit-key': process.env.RATE_LIMIT_IGNORE_KEY || '',
        },
      },
    },
  }
}

function getDomain() {
  if (process.env.NODE_ENV === 'production') {
    if (process.env.SITE_URL) {
      return process.env.SITE_URL
    } else if (process.env.HEROKU_APP_NAME) {
      return `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`
    } else if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`
    } else {
      return 'https://curserinth.kuylar.dev'
    }
  } else {
    return 'http://localhost:3000'
  }
}
