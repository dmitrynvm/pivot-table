import Vuetify from 'vuetify/lib'

import * as themes from '@/themes'

const options = {
  theme: {
    options: {
      customProperties: true,
    },
    themes,
    dark: false
  }
}

export default new Vuetify(options)
