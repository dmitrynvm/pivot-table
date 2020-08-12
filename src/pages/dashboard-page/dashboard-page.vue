<script>
import { mapGetters } from 'vuex'

export default {
  components: {
    "select-options-dialog": () => import("@/components/dashboard-page/select-options-dialog")
  },
  computed: mapGetters({
    "headers": "dashboard/headers",
    "items": "dashboard/items",
    "cols": "dashboard/cols",
    "rows": "dashboard/rows",
  }),
}
</script>

<template>
  <v-container class="fill-height">
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
