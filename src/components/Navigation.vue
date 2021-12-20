<template>
    <header class="flex flex-column">
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
  .header{
    z-index: 99;
    background-color: #30355c !important;
    border-right: 1px solid #fff;
    position: relative;
  }

  .branding{
    border-radius: 0 20px 20px 0;
    background-color: #7c5dfa;
    justify-content: center;
    padding: 24px;
    position: fixed;
  } 

  .branding img{
    width: auto;
    height: 30px;
  }

  @media (min-width: 900px) {
    .header{
      min-height: 100%;
      min-width: 90px;
      flex-direction: column;
      background-color: #30355c !important;
      border-radius: 0 20px 20px 0;
    }

    .header .branding{
      width: 100%;

    }
  }
</style>