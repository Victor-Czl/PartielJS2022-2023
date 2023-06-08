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
      class="recherche"
    />
    <input type="submit" value="valider" class="valider" />
  </form>
</template>

<style scoped>
.rechercheForm {
  display: flex;
  justify-content: center;
}

.recherche {
  margin-right: 5px;
}

.valider {
  font-size: 15px;
  color: #333;
  border-radius: 5px;
}
</style>