import { createStore } from 'vuex'

export default createStore({
  state: {
    invoiceModal: null,
    warningModal: null,
  },
  mutations: {
    TOGGLE_INVOICE(state) {
      state.invoiceModal = !state.invoiceModal;
    },

    TOGGLE_WARNING_MODAL(state) {
      state.warningModal = !state.warningModal;
    }
  },
  actions: {
  },
  modules: {
  }
})
