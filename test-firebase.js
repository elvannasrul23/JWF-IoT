// Simple test file to verify Firebase connection
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set, get, onValue } = require("firebase/database");

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsgfXfuxwZTYmXpAa3cmoJudsOmWx8g9E",
  authDomain: "jayawangi-65dd2.firebaseapp.com",
  databaseURL: "https://jayawangi-65dd2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "jayawangi-65dd2",
  storageBucket: "jayawangi-65dd2.firebasestorage.app",
  messagingSenderId: "430991747678",
  appId: "1:430991747678:web:d9cf8e842eed2be20722cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

console.log("Firebase initialized successfully!");

// Test writing data
async function testWrite() {
  try {
    const testData = {
      pompa: false,
      valve1: false,
      valve2: false,
      valve3: false,
      valve4: false,
      valve5: false,
      timestamp: new Date().toISOString()
    };
    
    await set(ref(database, 'irrigation'), testData);
    console.log("✅ Test write successful!");
    return true;
  } catch (error) {
    console.error("❌ Test write failed:", error);
    return false;
  }
}

// Test reading data
async function testRead() {
  try {
    const snapshot = await get(ref(database, 'irrigation'));
    if (snapshot.exists()) {
      console.log("✅ Test read successful!");
      const data = snapshot.val();
      console.log("Current Firebase data:");
      console.log("  pompa:", data.pompa);
      console.log("  valve1:", data.valve1);
      console.log("  valve2:", data.valve2);
      console.log("  valve3:", data.valve3);
      console.log("  valve4:", data.valve4);
      console.log("  valve5:", data.valve5);
      if (data.timestamp) {
        console.log("  timestamp:", data.timestamp);
      }
      return true;
    } else {
      console.log("❌ No data found");
      return false;
    }
  } catch (error) {
    console.error("❌ Test read failed:", error);
    return false;
  }
}

// Fungsi untuk menulis data awal jika belum ada
async function writeInitialData() {
  try {
    const initialData = {
      pompa: false,
      valve1: false,
      valve2: false,
      valve3: false,
      valve4: false,
      valve5: false
    };
    
    await set(ref(database, 'irrigation'), initialData);
    console.log("✅ Initial data written successfully!");
    return true;
  } catch (error) {
    console.error("❌ Failed to write initial data:", error);
    return false;
  }
}

// Run tests
async function runTests() {
  console.log("🚀 Checking Firebase data...\n");
  
  const readSuccess = await testRead();
  
  if (!readSuccess) {
    console.log("\n📝 No data found, writing initial data...");
    await writeInitialData();
    console.log("\n📖 Reading data after writing initial data:");
    await testRead();
  }
  
  console.log("\n🏁 Test completed!");
}

runTests();
