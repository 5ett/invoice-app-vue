<template>
  <div class="body">
    <div v-if="!mobile" class="app flex flex-column">
      <Navigation />
      <div class="app-content flex flex-column">
        <WarningModal v-if="warningModal"/>
        <transition name="invoice">
          <InvoiceModal v-if='invoiceModal' />
        </transition>

        <transition name="slide">
          <Toast v-if="toastNotification" />
        </transition>
        
        <router-view/>
      </div>
    </div>
    <div v-else class="mobile-message flex flex-column">
      <h2>Sorry, this app is not supported on Mobile Devices</h2>
      <p>To use this app, please use a computer or Tablet</p>
    </div>
  </div>

</template>

<script>
  import {mapState, mapActions, mapMutations} from "vuex";
  import Navigation from "./components/Navigation";
  import InvoiceModal from "./components/InvoiceModal";
  import WarningModal from "./components/WarningModal";
  import Toast from "./components/Toast";

  export default {
    data() {
      return{
        mobile: null
      }
    },

    components: {
      Navigation,
      InvoiceModal,
      WarningModal,
      Toast,
    },

    created() {
      this.GET_INVOICES();
      this.checkScreen();
      // this.switchOffToast();
      window.addEventListener("resize", this.checkScreen);
    },
      
    methods: {

      ...mapMutations(["TOGGLE_TOAST", "SET_TOAST_MESSAGE"]),
      ...mapActions(["GET_INVOICES",]),

      checkScreen() {
        const windowWidth = window.innerWidth;
        if (windowWidth <= 750) {
          this.mobile = true;
          return;
        }
        this.mobile = false;
      },
    },

    computed: {
      ...mapState(["invoiceModal", "warningModal", "toastNotification", "toastMessage"]),
    },

    watch:{

    }
    
  }
</script>

<style lang="css">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
    list-style: none;
    text-decoration: none;
  }

  .app{
    background-color: #141625;
    min-height: 100vh;
  }

  .app .app-content{
    padding: 0 20px;
    flex: 1;
    position: relative;
  }

  @media (min-width: 900px){
    .app{
      flex-direction: row !important;
    }
  }

  .mobile-message{
    text-align: center;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #141625;
    color: #fff;
  }

  .mobile-message p{
    margin-top: 16px;
  }

  /* slide-in modal */
  .invoice-enter-active,
  .invoice-leave-active{
    transition: 0.8s ease all;
  }

  .invoice-enter-from,
  .invoice-leave-to{
    transform: translate(-700px);
  }


  button,
  .button {
    cursor: pointer;
    padding: 10px 24px;
    border-radius: 6px;
    border: none;
    font-size: 12px;
    margin-right: 8px;
    color: #fff;
  }

  .dark-purple {
    background-color: #252945;
  }

  .red {
    background-color: #ec5757;
  }

  .purple {
    background-color: #7c5dfa;
  }

  .green {
    background-color: #33d69f;
  }

  .orange {
    background-color: #ff8f00;
  }

  /* // utility classes */

  .flex {
    display: flex;
  }

  .flex-column {
    flex-direction: column;
  }

  .container {
    width: 100%;
    padding: 40px 10px;
    max-width: 850px;
    margin: 0 auto;
  }

  @media (min-width: 900px) {
      .container{
        padding-top: 72px;
      }
    }

  .nav-link {
    text-decoration: none;
    color: initial;
  }

  /* Status Button Styling */

  .status-button::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 8px;
  }

  .status-button{
    font-size: 10px;
    margin-right: 30px;
    align-items: center;
    padding: 7px 13px;
    border-radius: 7px;
  }

  .paid::before {
    background-color: #33d69f;
  }

  .paid {
    color: #33d69f;
    background-color: rgba(51, 214, 160, 0.1);
  }

  .pending::before {
    background-color: #ff8f00;
  }

  .pending {
    color: #ff8f00;
    background-color: rgba(255, 145, 0, 0.1);
  }

  .draft::before {
    background-color: #dfe3fa;
  }

  .draft {
    color: #dfe3fa;
    background-color: rgba(223, 227, 250, 0.1);
  }

  .slide-enter-from,
  .slide-leave-to{
    opacity: 0;
  }

  .slide-enter-active,
  .slide-leave-active{
    transition: opacity 0.5s ease-out;
  }
</style>
