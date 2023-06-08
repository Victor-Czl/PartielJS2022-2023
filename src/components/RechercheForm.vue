<script setup>

  //import des librairies vue nécessaires
  import { ref } from "vue";

  //State : recherche effectuée
  const motClef = ref("");

</script>

<template>

  <!--Formulaire de recherche-->
  <form @submit.prevent="$emit('addC', motClef)" class="rechercheForm">
    
    <input
      type="text"
      v-model="motClef"
      placeholder="recherche"
      class="rechercheChamp"
    />

    <input type="submit" value="valider" class="validerBt" />

  </form>

</template>

<style scoped>
  .rechercheForm {
    display: flex;
    justify-content: center;
  }

    .rechercheChamp {
      margin-right: 5px;
    }

    .validerBt {
      font-size: 15px;
      color: #333;
      border-radius: 5px;
    }

</style>