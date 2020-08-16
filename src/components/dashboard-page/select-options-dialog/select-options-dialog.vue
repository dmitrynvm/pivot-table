<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

const formatDate = (date) => {
  if (!date) return null
  const [year, month, day] = date.split('-')
  return `${day}/${month}/${year}`
}

const parseDate = (date) => {
  if (!date) return null
  const [day, month, year] = date.split('/')
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

export default {
    computed: {
    ...mapGetters({
      "start_date" : "dashboard/start_date",
      "final_date" : "dashboard/final_date",
      "active" : "dashboard/select-options/active",
      "visible" : "dashboard/select-options/visible",
      "headers" : "dashboard/select-options/headers",
      "items" : "dashboard/select-options/items",
      "subheaders" : "dashboard/select-options/subheaders",
      "subitems" : "dashboard/select-options/subitems",
      "series" : "dashboard/select-options/series",
      "options" : "dashboard/select-options/options",
      "charts_xheaders" : "dashboard/select-options/charts_xheaders",
      "charts_xitems" : "dashboard/select-options/charts_xitems",
      "charts_yheaders" : "dashboard/select-options/charts_yheaders",
      "charts_yitems" : "dashboard/select-options/charts_yitems",
    }),
    mstart_date: {
      get () {
        return formatDate(this.start_date)
      },
      set (start_date) {
        this.setStartDate(parseDate(start_date))
      }
    },
    mfinal_date: {
      get () {
        return formatDate(this.final_date)
      },
      set (final_date) {
        this.setFinalDate(parseDate(final_date))
      }
    },
    mcharts_xitems: {
      get () {
        return this.charts_xitems
      },
      set (charts_xitems) {
        this.setChartsXItems(charts_xitems)
      }
    },
    mcharts_yitems: {
      get () {
        return this.charts_yitems
      },
      set (charts_yitems) {
        this.setChartsYItems(charts_yitems)
      }
    }
  },
  methods: {
    ...mapActions({
      "check_column" : "dashboard/select-options/check_column",
      "check_value" : "dashboard/select-options/check_value",
      "close" : "dashboard/select-options/close",
      "drill" : "dashboard/select-options/drill",
      "submit" : "dashboard/submit",
      "draw" : "dashboard/select-options/draw",
    }),
    ...mapMutations({
      "setStartDate" : "dashboard/setStartDate",
      "setFinalDate" : "dashboard/setFinalDate",
      "setChartsXItems" : "dashboard/select-options/setChartsXItems",
      "setChartsYItems" : "dashboard/select-options/setChartsYItems",
    }),
  },
  data: () => ({
    selected: [],
    tab: 0,
    counter: 0,
  }),
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
    <v-tabs
      v-model="tab"
      background-color="primary"
      dark
    >
      <v-tab
        :key="1"
      >
        Filters
      </v-tab>
      <v-tab
        :key="2"
      >
        Charts
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        :key="1"
      >
        <v-card flat>
          <v-card-text>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="mstart_date"
                    label="Start Date of Birth"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="mfinal_date"
                    label="Final Date of Birth"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <vue-good-table
                    v-if="headers && items"
                    @on-selected-rows-change="check_column"
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
                          @click="drill(props.row.originalIndex)"
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
                <v-col cols="12" sm="6">
                  <vue-good-table
                    v-if="subheaders && subitems"
                    @on-selected-rows-change="check_value"
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
      </v-tab-item>
      <v-tab-item
        :key="2"
      >
        <v-card flat>
          <v-card-title>
            <span>
              Pick dates of birth to filter the data
            </span>
          </v-card-title>
          <v-card-text>
              <v-row>
                <v-col cols="12" sm="6">
                  <tree-select
                    v-model=mcharts_xitems
                    :options="charts_xheaders"
                    :multiple="false"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <tree-select
                    v-model=mcharts_yitems
                    :options="charts_yheaders"
                    :multiple="true"
                    :limit=5
                  />
                </v-col>
                <v-col cols="12" sm="12">
                  <gchart
                    type="LineChart"
                    :data="series"
                    :options="options"
                  />
                </v-col>
              </v-row>
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
              @click="draw"
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
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</v-dialog>
</template>


<style>
tr {
  padding-bottom: 5em;
}
</style>
