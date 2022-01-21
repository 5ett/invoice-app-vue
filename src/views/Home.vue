<template>
  <div class="home container">
    <div class="header flex">
      <div class="left flex flex-column">
        <h1>Invoices</h1>
        <span>There are {{ invoiceData.length }} total invoices</span>
      </div>
      <div class="right flex">
        <div @click="toggleFilterMenu" class="filter flex">
          <span>Filter by status <span v-if="filteredInvoice"> : {{ filteredInvoice }} </span></span>
          <img src="@/assets/icon-arrow-down.svg" alt="">
          <ul v-show="filterMenu" class="filter-menu">
            <li @click="filteredInvoices">Draft</li>
            <li @click="filteredInvoices">Pending</li>
            <li @click="filteredInvoices">Paid</li>
            <li @click="filteredInvoices">View All</li>
          </ul>
        </div>
        <div @click="newInvoice" class="button flex">
          <div class="inner-button flex">
            <img src="@/assets/icon-plus.svg" alt="">
          </div>
          <span>New Invoice</span>
        </div> 
      </div>
    </div>

    <!-- <div v-if="invoicesLoaded">       -->
    <div>      
      <Invoice v-for="(invoice, index) in filteredData" :invoice="invoice" :key="index" />  
    </div>
    <!-- <div v-else class="flex flex-column empty">
      <transition name="notification">
        <div>
          <img src="@/assets/illustration-empty.svg"/>
          <div class="message">
            <h3>No Invoices Found!</h3>
            <p>Check connection if you already have existing invoices or Add new invoice</p>
          </div>
        </div>
      </transition>
    </div> -->
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import Invoice from "../components/Invoice"

export default {
  name: "Home",

  data() {
    return {
      filterMenu: null,
      filteredInvoice: null,
    }
  },

  components: {
    Invoice,
  },

  beforeCreate(){
    
  },

  created(){
    
  },

  methods: {
    ...mapMutations(['TOGGLE_INVOICE']),
    
    newInvoice() {
      this.TOGGLE_INVOICE();
    },

    toggleFilterMenu() {
      this.filterMenu = !this.filterMenu;
    },

    filteredInvoices(e) {
      if(e.target.innerText === "View All"){
        this.filteredInvoice = null;
        return;
      }
      this.filteredInvoice = e.target.innerText;
    },
  },

  computed: {
    ...mapState(["invoicesLoaded", "invoiceData", "isLoggedIn"]),

    filteredData() {
      return this.invoiceData.filter(invoice=>{
          if(this.filteredInvoice === "Draft"){
            return invoice.invoiceDraft === true;
          }
          if(this.filteredInvoice === "Pending"){
            return invoice.invoicePending === true;
          }
          if(this.filteredInvoice === "Paid"){
            return invoice.invoicePaid === true;
          }
          return invoice;
      })
    }

  }
};
</script>


<style lang="css" scoped>
  .home{
    color: #fff;
  }

  .header{
    margin-bottom: 65px;
  }

  .left,
  .right{
    flex: 1;
  }

  .header .right{
    justify-content: flex-end;
    align-items: center;
  }

  .button,
  .filter{
    align-items: center;
  }

  .button span,
  .filter span{
    font-size: 12px;
  }

  .filter{
    position: relative;
    margin-right: 40px;
    cursor: pointer;    
  }

  h1 {
    font-size: 25px;
  }

  span{
    font-size: 13px;
  }

  .filter img{
    margin-left: 12px;
    width: 9px;
    height: 5px;
  }

  .filter-menu{
    width: 120px;
    position: absolute;
    top: 25px;
    background-color: #1e2139;
    box-shadow: 0 4px 6px -3px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  
  .filter-menu li{
    cursor: pointer;
    font-size: 12px;
    padding: 10px 20px
  }

  .filter-menu li:hover{
    color: #1e2139;
    background-color: #fff;
  }

  .button{
    padding: 8px 9px 8px 7px;
    background-color: #7c5dfa;
    border-radius: 5px;
  }

  .inner-button{
    margin-right: 8px;
    border-radius: 9%;
    padding: 8px;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .inner-button img{
    width: 10px;
    height: 10px;
  }

  .button:focus,
  .button:active{
    background-color: #6d50e2;
  }

  .empty{
    align-items: center;
    justify-content: center;
    text-align: center;
    max-width: 350px;
    width: 100%;
    margin: 0 auto;
  }

  .empty img{
    width: 314.6px;
    height: 260px;
    margin-bottom: 10px;
  }

  .empty p{
    font-size: 12.7px;
    margin-top: 5px;
  }

/* transitions */

  .notification-enter-active,
  .notification-leave-active{
    transition: 0.4s all ease;
  }

  .notification-enter-from,
  .notification-leave-to{
    transform: translateX(-40px);
    opacity: 0;
  }

  .notification-leave-from,
  .notification-enter-to{
    opacity: 1;
    transform: translateX(0);
  }

  .invoise-enter-from,
  .invoise-leave-to{
    opacity:0;
    transform: translateX(-30px)
  }

  .invoice-enter-to,
  .invoise-leave-from{
    opacity:1;
    transform: translateX(0)
  }

  .invoise-enter-active,
  .invoise-leave-active{
    transition: 0.3s all ease-in-out;
  }

</style>
