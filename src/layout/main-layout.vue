<script>
import { mapActions } from 'vuex'

export default {
    methods: {
    ...mapActions({
      "fetch": "dashboard/fetch",
      "open": "dashboard/select-options/open",
    }),
      }
}
</script>


<template>
  <v-app
    dark
  >
    <v-app-bar
      color="primary"
      app
      flat
      dark
      dense
    >
      <span
        justify="space-around"
        class="px-2"
      >
        <v-icon>
          dashboard
        </v-icon>
      </span>
      <v-toolbar-title>
        Dashboard
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        @click="fetch"
        icon
      >
        <v-icon>
          cached
        </v-icon>
      </v-btn>
      <v-btn
        @click="open"
        icon
      >
        <v-icon>
          settings
        </v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main >
    <v-footer
      color="primary"
      app
      dark
    >
      <v-layout
        justify-center
        row
        wrap
      >
        <span class="white--text">
          <a href="https://www.head-kraken.com/">
            HeadKraken
          </a>
          Dmitry Nikolayev &copy; Moscow {{ new Date().getFullYear() }}
        </span>
      </v-layout>
    </v-footer>
  </v-app>
</template>
