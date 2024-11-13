// getDocs(collectionRef)
//   .then((res) => {
//     // console.log(res.docs.data());
//     let data = [{}];
//     data = res.docs.map((item) => {
//       return { ...item.data(), id: item.id };
//     });
//     console.log(data);
//   })
//   .catch((err) => {
//     alert("can't find your data:", err);

//   });
// const docToUpdate = doc(database, "users", "GdY508P62ZQDL3lEQDbM");
// updateDoc(docToUpdate, {
//   email: "Sorry",
//   password: 123343,
// })
//   .then((res) => {
//     getDocs(collectionRef).then((res) => {
//       console.log(
//         res.docs.map((item) => {
//           return { ...item.data(), id: item.id };
//         })
//       );
//     });
//   })
//   .catch((err) => {
//     alert(err.message);
//   });
// const docToDelete = doc(database, "users", "MpXVDNvXDGmyCpiq7IY7");
// deleteDoc(docToDelete)
//   .then((res) => {
//     alert("deleted");
//   })
//   .catch((err) => {
//     alert(err.message);
//   });

// addDoc(collectionRef, data)
//   .then((res) => {
//     alert("Thanks");
//   })
//   .catch((err) => {
//     alert("sorry", err.message);
//   });
// createUserWithEmailAndPassword(auth, data.email, data.password)
//   .then((res) => {
//     alert("Created");
//   })
//   .catch((err) => {
//     alert(err.message);
//   });
// signInWithEmailAndPassword(auth, data.email, data.password)
//   .then((res) => {
//     alert("signin");
//   })
//   .catch((err) => {
//     alert(err.message);
//   });
// signInWithPopup(auth, provider)
//   .then((res) => {
//     alert("thanks ");
//   })
//   .catch((err) => {
//     alert("Sorry", err.message);
//   });
// import {
//   collection,
//   addDoc,
//   getDocs,
//   doc,
//   updateDoc,
//   deleteDoc,
// } from "firebase/firestore";
// const storageRef = ref(storage, data.name);
// const uploadTask = uploadBytesResumable(storageRef, data);
// uploadTask.on(
//   "state_changed",
//   (snapshot) => {
//     const progress =
//       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     console.log("progress is", progress);
//   },
//   (error) => {
//     console.log(error.message);
//   },
//   () => {
//     getDownloadURL(uploadTask.snapshot.ref).then((downloadURl) => {
//       console.log("file is at", downloadURl);
//     });
//   }
// );
// console.log(data.file.name);
import "bootstrap/dist/css/bootstrap.min.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app, database, storage } from "./fireBase";
import {
  onSnapshot,
  collection,
  addDoc,
  where,
  query,
} from "firebase/firestore";
import { useEffect } from "react";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
const App = () => {
  let auth = getAuth();
  const collectionRef = collection(database, "users");
  // To use where we want to implement The collection Ref in different Way:
  // const NameQuery = query(collectionRef, where("email", "==", "Shubham"));
  // let provider = new GoogleAuthProvider();
  useEffect(() => {
    onSnapshot(collectionRef, (data) => {
      console.log(
        data.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
    });
  }, [onSnapshot]);
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        alert("Created User");
      })
      .catch((err) => {
        alert(err.message);
      });
    // addDoc(collectionRef, data)
    //   .then((res) => {
    //     alert("Data Is added:");
    //   })
    //   .catch((err) => {
    //     alert(err.message);
    //   });
    // const data = formData.get("file");
    // console.log(file);
  };
  return (
    <>
      <form
        onSubmit={submitHandler}
        className="d-flex flex-column "
        style={{ width: "40%", margin: "20px 30%", gap: "20px" }}
      >
        {/* <input type="file" name="file" /> */}
        <input type="text" name="email" placeholder="Enter your name" />
        <input
          type="password"
          name="password"
          placeholder="Enter your Password"
        />
        <button className="btn btn-primary">Add</button>
      </form>
    </>
  );
};
export default App;
