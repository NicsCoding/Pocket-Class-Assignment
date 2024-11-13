const { app, auth } = require("../firebase");
const {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} = require("firebase/auth");
const signinUser = async (req, res, body) => {
  try {
    let auth = getAuth();
    const { email, password } = body;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        res.status(201).json({
          message: "Logged In",
          user: userCredential.user.stsTokenManager.accessToken,
        });
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
exports.createUser = async (req, res) => {
  try {
    let auth = getAuth();
    console.log("I am here", req.body);
    const { email, password } = req.body;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        res.status(201).json({
          message: "Created account",
          user: userCredential.user.stsTokenManager.accessToken,
        });
      })
      .catch((err) => {
        if (err.message.includes("already")) {
          signinUser(req, res, req.body);
        }
        // res.status(400).json({ message: err.message });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
