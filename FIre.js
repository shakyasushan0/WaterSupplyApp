import firebase from "firebase";
require("firebase/firestore");

class Fire {
  constructor() {}

  uploadPhotoAsync = (uri, filename) => {
    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const file = await response.blob();

      let upload = firebase
        .storage()
        .ref(filename)
        .put(file);

      upload.on(
        "state_changed",
        snapshot => {},
        err => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        }
      );
    });
  };
  createUser = async user => {
    let remoteUri = null;

    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);

      let db = this.firestore.collection("users").doc(this.uid);

      db.set({
        id: this.uid,
        name: user.name,
        email: user.email,
        avatar: null,
        telnum: user.telnum,
        address: user.address
      });

      if (user.avatar) {
        remoteUri = await this.uploadPhotoAsync(
          user.avatar,
          `avatars/${this.uid}`
        );

        db.set({ avatar: remoteUri }, { merge: true });
      }
    } catch (error) {
      alert("Error: ", error);
    }
  };

  addDeliveryBoy = async (fn, ln, em, pw, con) => {
    try {
      let db = this.firestore
        .collection("DeliveryBoy")
        .doc(this.timestamp.toString());

      db.set({
        FirstName: fn,
        LastName: ln,
        email: em,
        address: pw,
        Contact: con
      });

      alert("successfully added");
    } catch (error) {
      alert("Error: ", error);
    }
  };

  signOut = () => {
    firebase.auth().signOut();
  };

  get firestore() {
    return firebase.firestore();
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return Date.now();
  }

  addOrder(
    id,
    amount,
    name,
    contact,

    address,
    date,
    time,
    qty1,
    qty2,
    qty3,

    status
  ) {
    let db = this.firestore.collection("orders").doc(this.timestamp.toString());
    db.set({
      userId: id,
      amount,
      customer: name,
      contact: contact,

      address: address,

      date: date,
      time: time,
      order: {
        jar_20l: qty1,
        jar_18l: qty2,
        bottle_1l: qty3
      },
      status: status,

      occupied: false,
      occupiedBy: "",
      deliveredDate: ""
    });
  }
}

Fire.shared = new Fire();
export default Fire;
