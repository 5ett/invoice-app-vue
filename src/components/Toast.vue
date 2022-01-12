<template>
    <div class="blanket-toast flex">
        <div class="toast flex flex-column" 
        :class="{ 
            red: warningItem.category === 'danger',
            blue: warningItem.category === 'info',
            green: warningItem.category === 'success',
            }"
        >    
            <div class="flex toast-content">
                <p>{{ warningItem.message }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations } from "vuex";

    export default {
        name: "Toast",

        data() {
            return {
                warningItem: null,
            }
        },

        created() {
            this.getWarnings()
        },
        
        methods: {
            ...mapMutations(["TOGGLE_TOAST"]),
            
            getWarnings() {
                this.warningItem = this.toastMessage;
            }
        },

        computed: {
            ...mapState(["toastNotification", "toastMessage"])
        }
    }
</script>

<style lang="css" scoped>
    .blanket-toast{
        z-index: 1200;
        align-items: center;
        justify-content: center;
        /* position: relative; */
    }

    .toast{
        /* margin: 0 auto; */
        min-width: 290px;
        padding: 20px;
        color: #fff;
        border-radius: 9px;
        position:fixed;
        top: 3em;
        -webkit-animation: ease-in-out;

        /* bottom */
    }

    .toast-content{
        align-items: center;
        justify-content: center;
    }

    p{
        font-size: 11px;
        font-weight: 600px;
    }
</style>