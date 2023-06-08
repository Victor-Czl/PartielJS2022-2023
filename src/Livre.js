//Un livre
export default class Livre {
  constructor(id, titre, prix, qte) {
    this._id = id;
    this._titre = titre;
    this._prix = prix;
    this._qte = qte;
  }

  //Getter
  get id() {
    return this._id;
  }

  get titre() {
    return this._titre;
  }

  get prix() {
    return this._prix;
  }

  get qte() {
    return this._qte;
  }
}
