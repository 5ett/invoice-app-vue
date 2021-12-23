<template>
  <div class="blanket">
    <div class="modal flex">
      <div class="modal-content">
          <p>Are you sure you want to exit? Your changes will not be saved</p>
          <div class="actions flex flex-column">
              <button @click='closeModal' class="plain">Cancel</button>
              <button @click='closeInvoice' class="red">Exit</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
    name: "warningModal",

    methods: {
        ...mapMutations(["TOGGLE_INVOICE", "TOGGLE_WARNING_MODAL", "TOGGLE_EDIT_INVOICE"]),

        closeModal() {
            this.TOGGLE_WARNING_MODAL();
        },

        closeInvoice() {
            this.TOGGLE_WARNING_MODAL();
            this.TOGGLE_INVOICE();
            // if (this.editInvoice){
            //     this.TOGGLE_EDIT_INVOICE();
            // }
        }
    },
     
    computed: {
        ...mapState(["editInvoice"])
    } 
}
</script>

<style lang="css" scoped>
    .blanket{
        z-index: 100;
        position: fixed;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.6);
    }

    .modal{
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100%;
    }

    .modal-content{
        border-radius: 32px;
        padding: 35px  32px;
        max-width: 360px;
        background-color: #252945;
        color: #fff;
    }

    p{
        text-align: center;
        font-size: 16px;
    }

    .actions{
        margin-top: 18px;
        align-items: center;
        justify-content: center;
    }

    button{
        flex: 1;
        border-radius: 7px;
        padding: 10px 14px;
        width: 50%;
    }

    .red:active{
        background-color: rgb(219, 50, 50);
    }

    .plain{
        background-color: transparent;
        text-decoration: underline;
        margin-bottom: 10px;
    }

    .plain:active{
        background-color: #7c5dfa;
        text-decoration: none;
        font-size: 12px;
    }
</style>