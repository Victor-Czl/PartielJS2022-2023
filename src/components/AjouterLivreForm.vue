<script setup>
//import des librairies vue nécessaires
import { ref } from "vue";
//States : livre ajouté
const titreNLivre = ref("titre");
const prixNLivre = ref("prix");
const qteNLivre = ref("qte");
</script>

<template>
  <h3>Ajouter un livre</h3>
  <!--Formulaire d'ajout d'un livre-->
  <form
    @submit.prevent="$emit('ajouterLivre', titre, prix, qte)"
    class="ajouterLivreForm"
  >
    <div class="champ">
      <p>Titre du livre :</p>
      <input type="text" v-model="titre" placeholder="titre" required />
    </div>
    <div class="champ">
      <p>Prix du livre :</p>
      <input type="text" v-model="prix" placeholder="prix" required />
    </div>
    <div class="champ">
      <p>Quantité initiale :</p>
      <input type="text" v-model="qte" placeholder="quantité" required />
    </div>
    <input type="submit" value="Ajouter" class="ajouter" />
  </form>
  <hr />
</template>

<style scoped>
h3 {
  text-align: center;
}

.ajouterLivreForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
}

.champ {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  height: 25px;
}

p {
  margin-right: 10px;
  font-size: 15px;
  color: #333;
}

hr {
  width: 50%;
  height: 2.5px;
  background-color: #6d071a;
}

.ajouter {
  font-size: 15px;
  color: #333;
  border-radius: 5px;
}
</style>

