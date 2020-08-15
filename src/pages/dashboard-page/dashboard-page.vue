<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    "loading-overlay": () => import("@/components/dashboard-page/loading-overlay"),
    "select-options-dialog": () => import("@/components/dashboard-page/select-options-dialog")
  },
  computed: mapGetters({
    "headers": "dashboard/headers",
    "items": "dashboard/items",
  }),
  methods: mapActions({
    "dashboard_fetch": "dashboard/fetch",
    "select_options_fetch": "dashboard/select-options/fetch",
    "select_options_open": "dashboard/select-options/open",
    "loading_close": "dashboard/loading/close",
  }),
  async created() {
    await this.select_options_fetch()
    await this.dashboard_fetch()
    await this.loading_close()
    this.select_options_open()
  }
}
</script>

<template>
  <v-container class="fill-height">
    <loading-overlay/>
    <select-options-dialog/>
    <v-row
      justify="center"
      align="center"
    >
      <v-card flat>
        <v-card-title
          class="justify-center"
        >
        </v-card-title>
        <v-card-text>
          <vue-good-table
            v-if="headers && items"
            :columns="headers"
            :rows="items"
            :pagination-options="{
              enabled: true,
              mode: 'records',
              perPage: 10,
              setCurrentPage: 1,
              nextLabel: 'next',
              prevLabel: 'prev',
            }"
            :sort-options="{
              enabled: true,
            }"
          />
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>
