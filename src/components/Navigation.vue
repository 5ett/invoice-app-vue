<template>
    <header class="flex">
      <div class="branding flex"> 
          <img src="@/assets/file-invoice-dollar-solid.png" alt="">
      </div>

      <nav class="navbar flex flex-column">
        <ul class="navlinks flex flex-colum">
          
        </ul>
      </nav>

      <div class="sub-menu flex">
        <div v-if="showNav" class="profile-img flex flex-column">
          <img @click="signOutUser" src="@/assets/iccon.png" alt="">
        </div>
      </div>
    </header>
</template>

<script setup>
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  

  const store = useStore();
  const router = useRouter();

  const signOutUser = async () => {
    await store.dispatch('SIGN_OUT_USER');
    router.push({name: "Login"})
  }
</script>

<script>
  import { mapState } from "vuex"
  
  export default {
    data(){
      return{
        showNav:null
      }
    },

    computed: {
      ...mapState(['isLoggedIn'])
    },

    watch:{
      isLoggedIn(){
        if(this.isLoggedIn){
          this.showNav=true
        }
      }
    }
  }
</script>

<style lang="css" scoped>
  header{
    z-index: 1000;
    background-color: #30355c !important;
    position: fixed;
  }

  .branding,
  .sub-menu{
    flex:1;
  }

  .navbar{
    flex:2;
  }

  .branding{
    border-radius: 0 20px 20px 0;
    background-color: #7c5dfa;
    justify-content: center;
    padding: 15px;
    /* position: fixed; */
  } 

  .branding img{
    width: auto;
    height: 30px;
  }

  @media (min-width: 900px) {
    header{
      min-height: 100%;
      min-width: 56px;
      flex-direction: column;
      background-color: #30355c !important;
      border-radius: 0 20px 0 0;
    }

    .branding{
      width: 100%;
    }
  }

  .profile-img{
    border-radius: 50%;
    border: solid 2px #fff;
    height: 50px;
    width: 50px;
    justify-self: flex-end;
    cursor: pointer;
  }

  .profile-img img{
    width: 100%;
    height: 100%;
  }
</style>