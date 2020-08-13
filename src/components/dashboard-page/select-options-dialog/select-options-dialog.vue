<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    "active" : "dashboard/select-options/active",
    "visible" : "dashboard/select-options/visible",
    "headers" : "dashboard/select-options/headers",
    "items" : "dashboard/select-options/items",
    "subheaders" : "dashboard/select-options/subheaders",
    "subitems" : "dashboard/select-options/subitems",
  }),
  methods: mapActions({
    "close" : "dashboard/select-options/close",
    "submit" : "dashboard/select-options/submit",
  }),
  data() {
    return {
      selected: [],
    }
  }
}
</script>


<template>
  <v-dialog
    :value="visible"
    @click:outside="close"
    @keydown.enter="submit"
    @keydown.esc="close"
    max-width="700px"
  >
    <v-card>
      <v-card-title>
        <span>
          What Data to Display?
        </span>
        <v-spacer />
        <v-btn
          @click="close"
          class="mx-2"
          icon
        >
          <v-icon>
            clear
          </v-icon>
        </v-btn>
      </v-card-title>
        <v-card-text>
          <table cellspacing="3">
            <v-row>
              <v-col>
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
                    rowsPerPageLabel: 'Rows',
                    nextLabel: '',
                    prevLabel: '',
                  }"
                  :sort-options="{
                    enabled: false,
                  }"
                  :select-options="{
                    disableSelectInfo: true,
                    enabled: true,
                    selectOnCheckboxOnly: true
                  }"
                  compactMode
                >
                  <template
                    slot="table-row"
                    slot-scope="props"
                  >
                    <span v-if="props.column.field == 'action'">
                      <v-btn
                        icon
                        x-small
                      >
                        <div v-if="props.row.id == active">
                          <v-icon
                        class="ma-0 pa-0"
                            >
                            arrow_right
                          </v-icon>
                        </div>
                        <div v-else>
                          <v-icon>
                            arrow_drop_down
                          </v-icon>
                        </div>
                      </v-btn>
                    </span>
                    <span v-else>
                      {{ props.formattedRow[props.column.field] }}
                    </span>
                  </template>
                </vue-good-table>
              </v-col>
              <v-col>
                <vue-good-table
                  v-if="subheaders && subitems"
                  :columns="subheaders"
                  :rows="subitems"
                  :pagination-options="{
                    enabled: true,
                    mode: 'records',
                    perPage: 10,
                    setCurrentPage: 1,
                    nextLabel: 'next',
                    prevLabel: 'prev',
                    rowsPerPageLabel: 'Rows',
                    nextLabel: '',
                    prevLabel: '',
                  }"
                  :sort-options="{
                    enabled: false,
                  }"
                  :select-options="{
                    enabled: true,
                    disableSelectInfo: true
                  }"
                  compactMode
                >
                </vue-good-table>
              </v-col>
            </v-row>
          </table>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            @click="close"
            class="mx-1"
            text
            width="110"
          >
            Cancel
          </v-btn>
          <v-btn
            @click="submit"
            class="mx-1"
            color="primary"
            width="110"
          >
          <v-icon
            class="mx-1"
            left
          >
            done
          </v-icon>
          <span>
            Apply
          </span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<style>
tr {
  padding-bottom: 5em;
}
</style>
