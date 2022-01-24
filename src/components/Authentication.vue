<template>
  <div class="auth-form flex flex-colum">
      <form action="" @submit.prevent="submitForm" class="sign-in flex flex-column">
        <input type="text" id="email" v-model="email" autocomplete="current-email" autofocus placeholder="email">
        <input type="password" v-model="password" autocomplete="current-password" placeholder="password">
        <button @click="signInUser" class="purple">Sign in</button>
      </form>
  </div>
</template>

<script setup>
    import { ref } from "vue";
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";

    const router = useRouter();
    const store = useStore();

    const email = ref("");
    const password = ref("");

    const signInUser = async() => {
        try{
            await store.dispatch('SIGN_IN_USER', {email: email.value, password: password.value})
            router.push('/')
        } catch(err) {
            const errMessage = {
                message: err.message,
                category: 'danger'
            }
            store.commit('SET_TOAST_MESSAGE', errMessage);
            store.commit('TOGGLE_TOAST');
        }
    }

</script>

<style lang="css" scoped>
    .auth-form{
       justify-content: center;
       align-items: center; 
    }

    .sign-in{
        max-width: 300px;
        width: 100%;
        margin: 200px auto;
    }

    .sign-in input{
        background-color: #1e2139;
        color: #fff;
        border-radius: 4px;
        padding: 12px;
        border: none; 
        margin-bottom: 8px;
        font-size: 11px;
    }

    input:focus{
        outline: none;
    }

    .sign-in label{
        color: #fff;
    }

    input::placeholder{
        color: #a5a5a5;
    }

    button{
        width: 100%;
        padding: 10px;
        border-radius: 7px;
        margin-top: 15px;
        font-size: 11px;
    }
</style>