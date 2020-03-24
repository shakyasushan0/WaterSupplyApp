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

      firebase
        .auth()
        .currentUser.sendEmailVerification()
        .then(() => console.log("Email sent"))
        .catch(err => console.log("Error : ", err));

      let db = this.firestore.collection("users").doc(this.uid);

      db.set({
        name: user.name,
        email: user.email,
        avatar: null,
        telnum: user.telnum,
        address: user.address,
        latitude: user.latitude,
        longitude: user.longitude
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
    name,
    contact,
    email,
    address,
    garment,
    noOfClothes,
    service,
    time,
    date,
    status,
    latitude,
    longitude
  ) {
    let db = this.firestore.collection("orders").doc(this.timestamp.toString());
    db.set({
      amount: "0",
      customer: name,
      contact: contact,
      email: email,
      address: address,
      garment: garment,
      noOfClothes: noOfClothes,
      service: service,
      time: time,
      date: date,
      status: status,
      latitude: latitude,
      longitude: longitude,
      occupied: false,
      occupiedBy: ""
    });
  }
}

Fire.shared = new Fire();
export default Fire;
