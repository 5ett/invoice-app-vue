<template>
    <header class="flex">
      <div class="branding flex"> 
          <img src="@/assets/file-invoice-dollar-solid.png" alt="">
      </div>
    </header>
</template>

<script>
export default {
  name: "navigation"
}
</script>

<style lang="css" scoped>
  header{
    z-index: 1000;
    background-color: #30355c !important;
    position: fixed;
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
</style>