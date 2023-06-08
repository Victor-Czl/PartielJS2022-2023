<script setup>

  //import des librairies vue nécessaires
  import { reactive } from "vue";

  //Import des components
  import ListeLivres from "./ListeLivres.vue";
  import RechercheForm from "./RechercheForm.vue";
  import AjouterLivreForm from "./AjouterLivreForm.vue";
  import Livre from "../Livre.js";

  //URL de l'API
  const url = "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/3/livres";

  //State : recherche envoyée par l'enfant RechercheForm
  const listeLivres = reactive([]);

  //Variable qui stock temporairement la recherche effectuée
  let rechercheTemp;

  //GET : Met à jour la state listeLivres en fonction de la recherche effectuée.
  //Récupère son paramètre de l'enfant RechercheForm
  function chercherLivres(recherche) {
    rechercheTemp = recherche;
    const fetchOption = { methode: "GET" };
    fetch(url + "?search=" + recherche, fetchOption)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        //On affiche le JSON dans les logs
        console.log(dataJSON);
        //On vide la state listeLivres
        listeLivres.splice(0, listeLivres.length);
        //On alimente la state listeLivres
        dataJSON.forEach((livre) =>
          listeLivres.push(
            new Livre(livre.id, livre.titre, livre.prix, livre.qtestock)
          )
        );
      })
      //On affiche les erreurs dans les logs
      .catch((error) => {
        console.log(error);
      });
  }

  //POST : Ajouter un nouveau livre dans l'api.
  //Récupère ses paramètres de l'enfant AjouterLivreForm
  function ajouterLivre(titre, prix, qte) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const fetchOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        titre: titre,
        prix: prix,
        qtestock: qte,
      }),
    };
    fetch(url, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        //On affiche le résultat du POST
        console.log(dataJSON);
        //On affiche le livre ajouité
        chercherLivres(titre);
      })
      .catch((error) => console.log(error));
  }

  //DELETE : Supprime un livre
  //Recupère son paramaitre de l'enfant ListeLivres
  function supprimerLivre(id) {
    console.log(id);
    const fetchOptions = {
      method: "DELETE",
    };
    fetch(url + "/" + id, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        //On affiche le résultat du DELETE
        console.log(dataJSON);
        //On actualiste la recherche
        chercherLivres(rechercheTemp);
      })
      .catch((error) => console.log(error));
  }

  //PUT : ajoute un livre en stock
  //Recupère ses paramaitres de l'enfant ListeLivres
  function plusUnQte(id, titre, prix, qte) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const fetchOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify({
        id: id,
        titre: titre,
        prix: prix,
        qtestock: qte + 1,
      }),
    };
    fetch(url, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        //On affiche le résultat du PUT
        console.log(dataJSON);
        //On actualiste la recherche
        chercherLivres(rechercheTemp);
      })
      .catch((error) => console.log(error));
  }

  //PUT : enlève un livre en stock
  //Recupère ses paramaitres de l'enfant ListeLivres
  function moinsUnQte(id, titre, prix, qte) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const fetchOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify({
        id: id,
        titre: titre,
        prix: prix,
        qtestock: qte - 1,
      }),
    };
    fetch(url, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        //On affiche le résultat du PUT
        console.log(dataJSON);
        //On actualiste la recherche
        chercherLivres(rechercheTemp);
      })
      .catch((error) => console.log(error));
  }

</script>

<template>

  <!--Formulaire de recherche-->
  <RechercheForm @addC="chercherLivres"></RechercheForm>

  <!--Liste des livres
  Se met à jour quand la state listeLivres est actualisée par la fonction chercherLivres-->
  <h3>Résultats</h3>

  <ListeLivres
    v-for="livre of listeLivres"
    :key="livre.id"
    :livre="livre"
    @suppLivre="supprimerLivre"
    @plusUn="plusUnQte"
    @moinsUn="moinsUnQte"
    class="listeLivres"
  ></ListeLivres>

  <!--Séparateur-->
  <hr />

  <!--Formulaire pour ajouter un livre-->
  <AjouterLivreForm @ajouterLivre="ajouterLivre"> </AjouterLivreForm>

</template>

<style scoped>

  .listeLivres {
    background-color: #d5d1d0;
    border: 2px solid #6d071a;
    border-radius: 10px;
    margin-bottom: 10px;
  }

  h3 {
    text-align: center;
  }

  hr {
    width: 50%;
    height: 2.5px;
    background-color: #6d071a;
  }

</style>