import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC3InEt9ce-vkAATZsVfkpIFwBBmaPwRnM",
  authDomain: "raind-5a6fe.firebaseapp.com",
  projectId: "raind-5a6fe",
  storageBucket: "raind-5a6fe.firebasestorage.app",
  messagingSenderId: "165047986298",
  appId: "1:165047986298:web:ebed6ea70f8df2640df3c3",
  measurementId: "G-MB9YSYQXTB"
};

export const service = initializeApp(firebaseConfig);
export const analytics = getAnalytics(service);