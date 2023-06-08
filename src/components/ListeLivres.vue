<script setup>

  //import des librairies vue nécessaires
  import { defineProps, reactive } from "vue";

  //import des fichiers js nécessaires
  import Livre from "../Livre";

  //url de l'api
  const url =
    "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/3/livres?search=";

  //sate : liste des livres reçus par l'api
  const listeLivres = reactive([]);

  //props : données transmises par le parent
  const props = defineProps(["livre"]);

</script>

<template>

  <div class="unLivre">

    <!--Titre du livre-->
    <div class="titre">{{ livre.titre }}</div>

    <!--Prix du livre-->
    <div class="prix">prix : {{ livre.prix }} €</div>

    <!--Quantité en stock et gestion de la quantité-->
    <div class="gestionQuantite">

      <div class="quantite">quantité en stock : {{ livre.qte }}</div>

      <!--Bouton, enlève un livre en stock.
      Envoie les modifications au parent Librairie.vue
      Désactivé si quantité = 0-->
      <div class="modificateurQte">
        <button
          :disabled="livre.qte == 0"
          @click="$emit('moinsUn', livre.id, livre.titre, livre.prix, livre.qte)"> -
        </button>
      </div>

      <!--Bouton, ajouter un livre en stock
      Envoie les modifications au parent Librairie.vue-->      
      <div class="modificateurQte">
        <button
          @click="$emit('plusUn', livre.id, livre.titre, livre.prix, livre.qte)"> +
        </button>
      </div>

    </div>

    <!--Bouton pour supprimer un livre
    Envoie l'id du livre a supprimer au parent Librairie.vue-->
    <div class="supprimer">
      <button @click="$emit('suppLivre', livre.id)">Supprimer</button>
    </div>

  </div>

</template>

<style scoped>
  .unLivre {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
  }

    .titre {
      font-family: cursive;
      font-size: 20px;
      color: #333;
      margin-bottom: 5px;
    }

    .prix {
      font-size: 15px;
      color: #333;
      margin-bottom: 2.5px;
    }

    .gestionQuantite {
      display: flex;
      margin-bottom: 2.5px;
    }

      .quantite {
        margin-right: 10px;
        font-size: 15px;
        color: #333;
      }

      .modificateurQte {
        margin: 0px 1px 0px 1px;
      }

        .modificateurQte button {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          font-size: 15px;
          color: #333;
        }

    .supprimer button {
      background-color: red;
      border-radius: 5px;
      font-size: 15px;
      color: #333;
    }
  
</style>