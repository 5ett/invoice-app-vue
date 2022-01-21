import { createStore, storeKey } from "vuex";
import db from "../firebase/firebaseInit";
import { getDocs, collection, updateDoc, deleteDoc, doc} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth"

const auth = getAuth()


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
    user: null,
    isLoggedIn: false,
  },

  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },

    CHANGE_AUTH_STATE( state, payload ){
      state.isLoggedIn = payload;
    },

    TOGGLE_INVOICE(state) {
      state.invoiceModal = !state.invoiceModal;
      console.log(state.invoiceModal);
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

    DELETE_INVOICE(state, payload) {
      state.invoiceData = state.invoiceData.filter(invoice => invoice.docId !== payload)
    },

    UPDATE_TO_PAID(state, payload) {
      state.invoiceData.forEach(invoice => {
          if(invoice.docId === payload){
            invoice.invoicePaid = true;
            invoice.invoicePending = false;
          }
        }
      )
    },

    UPDATE_TO_PENDING(state, payload) {
      state.invoiceData.forEach(invoice => {
          if(invoice.docId === payload){
            invoice.invoicePaid = false;
            invoice.invoicePending = true;
            invoice.invoiceDraft = false;
          }
        }
      )
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
    async SIGN_IN_USER({commit}, {email, password}){
      const result = await signInWithEmailAndPassword(auth, email, password)
      if(result) {
        commit("SET_USER", result.user);
        commit("CHANGE_AUTH_STATE", true);
      } else{
        throw new Error('could not complete signup');
      }
    },

    async SIGN_OUT_USER({commit}){
      await signOut(auth)
      commit("SET_USER", null)
      commit("CHANGE_AUTH_STATE", false);
    },

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

        if (state.invoiceData.length > 0  ){
          commit('INVOICES_LOADED');
          const toastMessageMeta = {
            message: 'Successfully loaded invoices',
            category: 'success'
          }
          commit('SET_TOAST_MESSAGE', toastMessageMeta);
          commit('TOGGLE_TOAST');
        }else{
           const toastMessageMeta = {
              message: "Failed to load invoices, check connection",
              category: "danger"
           }
          commit('SET_TOAST_MESSAGE', toastMessageMeta);
          commit('TOGGLE_TOAST');
        };

        // if(state.toastNotification){
        //   setTimeout(commit('TOGGLE_TOAST'), 5000);
        // }
    },

    async UPDATE_INVOICE({commit, dispatch}, {docId, routeId}) {
        commit('DELETE_INVOICE', docId);
        await dispatch('GET_INVOICES');
        commit('TOGGLE_EDIT_INVOICE');
        commit('SET_CURRENT_INVOICE', routeId);

        const toastMessageMeta = {
            message: "Successfully updated invoice!",
            category: "success"
        }
        commit('SET_TOAST_MESSAGE', toastMessageMeta);
    },

    async DELETE_INVOICE({commit}, docId) {
      const getInvoice = doc(db, 'invoices', docId);
      await deleteDoc(getInvoice);
      commit('DELETE_INVOICE', docId);
    }, 

    async UPDATE_TO_PAID({commit}, docId) {
      const getInvoice = doc(db, 'invoices', docId);
      await updateDoc(
        getInvoice, {
          invoicePaid: true,
          invoicePending: false,
        }
      );
      commit('UPDATE_TO_PAID', docId);
    },

    async UPDATE_TO_PENDING({commit}, docId) {
      const getInvoice = doc(db, 'invoices', docId);
      await updateDoc(
        getInvoice, {
          invoicePaid: false,
          invoicePending: true,
          invoiceDraft: false, 
        }
      );
      commit('UPDATE_TO_PENDING', docId);
    }

  },

  modules: {
  },
});

