import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

import { auth } from "./firebase";

export const signup = async (email, password, fullName) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateProfile(userCredential.user, {
    displayName: fullName,
  });

  return userCredential.user;
};

export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential.user;
};

const provider = new GoogleAuthProvider();

export const googleLogin = async () => {
  const result = await signInWithPopup(auth, provider);
  return result.user;
};

export const logout = async () => {
  await signOut(auth);
};

export const resetPassword = async (email) => {

  const actionCodeSettings = {
    url: "http://localhost:5173/reset-password",
    handleCodeInApp: true,
  };

  await sendPasswordResetEmail(
    auth,
    email,
    actionCodeSettings
  );
};

export const getCurrentUser = () => auth.currentUser;