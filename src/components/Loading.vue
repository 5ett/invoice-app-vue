<template>
   <div class="loading flex flex-column">
       <span></span>
       <h4>Adding invoice to database</h4>
    </div> 
</template>

<script>
    export default {
        name: "loading",
    };
</script>

<style lang="css" scoped>
    .loading {
        top: 0;
        left: 0;
        z-index: 101;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @keyframes spin{
        to{
            transform: rotateZ(360deg);
        }
    }

    span {
        display: block;
        width: 60px;
        height: 60px;
        margin: 0 auto;
        border: 3px solid transparent;
        border-top-color: #fff;
        border-bottom-color: #fff;
        border-radius: 50%;
        animation: spin ease 1000ms infinite;
    }

    h4{
        font-size: 12px;
        margin-top: 27px;
    }
</style>