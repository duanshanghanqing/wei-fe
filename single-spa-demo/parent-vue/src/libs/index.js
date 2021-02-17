import Vue from 'vue'
import api from './api'
import * as config from './config'
import * as utils from './utils'

Vue.prototype.Global = {
    api,
    config,
    utils
}
