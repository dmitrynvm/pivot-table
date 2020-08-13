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
    "cols": "dashboard/cols",
    "rows": "dashboard/rows",
  }),
  methods: mapActions({
    "dashboard_fetch": "dashboard/fetch",
    "select_options_fetch": "dashboard/select-options/fetch",
    "select_options_open": "dashboard/select-options/open",
    "loading_close": "dashboard/loading/close",
  }),
  async created() {
    await this.dashboard_fetch()
    await this.select_options_fetch()
    await this.select_options_open()
    await this.loading_close()
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
            v-if="cols && rows"
            :columns="cols"
            :rows="rows"
            :pagination-options="{
              enabled: true,
              mode: 'records',
              perPage: 10,
              setCurrentPage: 1,
              nextLabel: 'next',
              prevLabel: 'prev',
            }"
            :sort-options="{
              enabled: false,
            }"
          />
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>
