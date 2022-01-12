<template>
    <router-link class="invoice flex" :to="{ name: 'Invoice', params:{invoiceId: invoice.invoiceId}}">
        <div class="left flex">
            <span class="tracking-number">#{{ invoice.invoiceId }}</span>
            <span class="due-date">{{ invoice.paymentDueDate }}</span>
            <span class="person">{{ invoice.clientName }}</span>
        </div>
        
        <div class="right flex">
            <span class="price">${{ invoice.invoiceTotal }}</span>
            <div class="status-button flex" :class="{ paid: invoice.invoicePaid, draft:invoice.invoiceDraft, pending:invoice.invoicePending }">
                <span  v-if="invoice.invoicePaid">Paid</span>
                <span  v-if="invoice.invoiceDraft">Draft</span>
                <span  v-if="invoice.invoicePending">Pending</span>
            </div>

            <div class="icon">
                <img src="@/assets/icon-arrow-right.svg" alt="">
            </div>
        </div>
    </router-link>
</template>

<script>
    export default {
        name: "invoice",
        props: ["invoice"]
    }
</script>

<style lang="css" scoped>
    .invoice{
        cursor: pointer;
        gap: 16px;
        color: #fff;
        padding: 13px 36px;
        align-items: center;
        font-size: 13px;
        box-shadow: 0 4px 6px -23px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .invoice:nth-child(odd){
        background-color: #1e2139;
    }

    .invoice:nth-child(even){
        background-color: #141625;
    }

    .invoice:first-child{
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
        box-shadow: 0 4px 6px -23px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    .invoice:last-child{
        border-bottom-left-radius: 7px;
        border-bottom-right-radius: 7px;
        box-shadow: 0 -5px -5px -3px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .left{
        align-items: center;
        text-align: left;
        flex-basis: 60%;
        gap: 8px;
    }

    .left span{
        flex: 1;
    }
    .left .person{
        flex: 2 !important;
    }

    .tracking-number{
        text-transform: uppercase;
    }

    .right{
        gap: 16px;
        flex-basis: 40%;
        align-items: center;
    }

    .price{
        flex: 1;
        font-size: 13px;
        font-weight:600px;
    }
</style>