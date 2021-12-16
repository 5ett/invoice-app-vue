import { createStore } from "vuex";
import db from "../firebase/firebaseInit";
import { getDocs, collection} from "firebase/firestore";

export default createStore({
  state: {
    invoiceData: [],
    invoiceModal: null,
    warningModal: null,
    invoicesLoaded: null,
    currentInvoiceArray: [],
    editInvoice: null,
    toastNotification: null,
    toastMessage: null,
  },

  mutations: {
    TOGGLE_INVOICE(state) {
      state.invoiceModal = !state.invoiceModal;
    },

    TOGGLE_WARNING_MODAL(state) {
      state.warningModal = !state.warningModal;
    },

    SET_INVOICE_DATA(state, payload){
      state.invoiceData.push(payload);
    },

    INVOICES_LOADED(state) {
      state.invoicesLoaded = true;
    },

    SET_CURRENT_INVOICE(state, payload) {
      state.currentInvoiceArray = state.invoiceData.filter((invoice) => {
         return invoice.invoiceId === payload;
      });
    },

    TOGGLE_EDIT_INVOICE(state){
      state.editInvoice = !state.editInvoice;
    },

    SET_TOAST_MESSAGE(state, payload) {
      state.toastMessage = payload;
      console.log(payload)
    },

    TOGGLE_TOAST(state) {
      state.toastNotification = !state.toastNotification;
    }
  },

  actions: {
    async GET_INVOICES({commit, state}){
      const getData = collection(db,"invoices");
      const result = await getDocs(getData);
      result.forEach(doc => {
            if(!state.invoiceData.some(invoice => invoice.docId === doc.id)){
              const data = {
                docId: doc.id,
                invoiceId: doc.data().invoiceId,
                billerStreetAddress: doc.data().billerStreetAddress,
                billerCity: doc.data().billerCity,
                billerZipCode: doc.data().billerZipCode,
                billerCountry: doc.data().billerCountry,
                clientName: doc.data().clientName,
                clientEmail: doc.data().clientEmail,
                clientStreetAddress: doc.data().clientStreetAddress,
                clientCity: doc.data().clientCity,
                clientZipCode: doc.data().clientZipCode,
                clientCountry: doc.data().clientCountry,
                invoiceDateUnix: doc.data().invoiceDateUnix,
                invoiceDate: doc.data().invoiceDate,
                paymentTerms: doc.data().paymentTerms,
                paymentDueDateUnix: doc.data().paymentDueDateUnix,
                paymentDueDate: doc.data().paymentDueDate,
                productDescription: doc.data().productDescription,
                invoiceItemList: doc.data().invoiceItemList,
                invoiceTotal: doc.data().invoiceTotal,
                invoicePending: doc.data().invoicePending,
                invoiceDraft: doc.data().invoiceDraft,
                invoicePaid: doc.data().invoicePaid,
              };

              commit("SET_INVOICE_DATA", data)
            }
          }
        );

        if (state.invoiceData.length > 0){
          commit('INVOICES_LOADED');
        }else{
           const toastMessageMeta = {
              message: "Failed to load invoices, check connection",
              category: "danger"
           }
          commit('SET_TOAST_MESSAGE', toastMessageMeta);
          commit('TOGGLE_TOAST');
        };
    }
  },
  modules: {
  }
})
