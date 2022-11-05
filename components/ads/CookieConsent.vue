<template>
</template>

<script>
import scopes from '~/privacy-toggles'
export default {
  name: 'CookieConsent',
  props: {
    mobileMenuOpen: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      shown: false,
    }
  },
  fetch() {
    this.checkVisibility()
  },
  watch: {
    $route() {
      this.checkVisibility()
    },
  },
  methods: {
    checkVisibility() {
      this.$store.dispatch('consent/loadFromCookies', this.$cookies)

      this.shown =
        !this.$store.state.consent.is_consent_given &&
        this.$route.path !== '/settings/privacy'
    },
    hide() {
      this.$store.commit('consent/set_consent', true)
      // Accept all scopes
      for (const elem in scopes.settings) {
        this.$store.commit('consent/add_scope', elem)
      }
      this.$store.dispatch('consent/save', this.$cookies)

      this.shown = false
    },
    review() {
      this.shown = false
      this.$router.push('/settings/privacy')
    },
  },
}
</script>

<style scoped lang="scss">
</style>
