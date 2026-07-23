// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, onValue } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD62oKPEbSEh01ivm1oZecOZwlPtruqKho",
  authDomain: "jayawangi23-22605.firebaseapp.com",
  databaseURL: "https://jayawangi23-22605-default-rtdb.firebaseio.com",
  projectId: "jayawangi23-22605",
  storageBucket: "jayawangi23-22605.firebasestorage.app",
  messagingSenderId: "599981298575",
  appId: "1:599981298575:web:58d92c0829e4487c6fb1fa",
  measurementId: "G-P4Z4XPBLCP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Interface untuk tipe data
interface IrrigationData {
  pompa: boolean;
  valve1: boolean;
  valve2: boolean;
  valve3: boolean;
  valve4: boolean;
  valve5: boolean;
}

// Fungsi untuk menulis data ke Firebase
export const writeIrrigationData = async (data: IrrigationData): Promise<void> => {
  try {
    await set(ref(database, 'irrigation/'), data);
    console.log('Data berhasil disimpan ke Firebase');
  } catch (error) {
    console.error('Error menyimpan data ke Firebase:', error);
    throw error;
  }
};

// Fungsi untuk membaca data dari Firebase (one-time)
export const readIrrigationData = async (): Promise<IrrigationData> => {
  try {
    const snapshot = await get(ref(database, 'irrigation/'));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      // Return default data jika belum ada
      const defaultData: IrrigationData = {
        pompa: false,
        valve1: false,
        valve2: false,
        valve3: false,
        valve4: false,
        valve5: false,
      };
      await writeIrrigationData(defaultData);
      return defaultData;
    }
  } catch (error) {
    console.error('Error membaca data dari Firebase:', error);
    throw error;
  }
};

// Fungsi untuk listen real-time changes
export const listenIrrigationData = (callback: (data: IrrigationData) => void): (() => void) => {
  const irrigationRef = ref(database, 'irrigation/');
  const unsubscribe = onValue(irrigationRef, (snapshot: any) => {
    if (snapshot.exists()) {
      callback(snapshot.val());
    }
  });
  
  return unsubscribe;
};

export const listenToIrrigationData = (callback: (data: IrrigationData) => void) => {
  const irrigationRef = ref(database, 'irrigation')
  
  onValue(irrigationRef, (snapshot: any) => {
    const data = snapshot.val()
    if (data) {
      callback(data)
    }
  })
};

// Fungsi untuk update individual fields
export const updatePumpStatus = async (status: boolean): Promise<void> => {
  try {
    await set(ref(database, 'irrigation/pompa'), status);
  } catch (error) {
    console.error('Error update pump status:', error);
    throw error;
  }
};

export const updateValveStatus = async (valveNumber: number, status: boolean): Promise<void> => {
  try {
    await set(ref(database, `irrigation/valve${valveNumber}`), status);
  } catch (error) {
    console.error(`Error update valve ${valveNumber} status:`, error);
    throw error;
  }
};

export { database };
