"use client"

export default function TestPage() {
  return (
    <div style={{ 
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: "linear-gradient(to bottom, #87CEEB, #E0F7FA)",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px"
    }}>
      <h1 style={{ color: "#2E7D32", marginBottom: "20px" }}>
        <i className="fas fa-tint"></i> Test Page - Animasi Sistem Penyiraman
      </h1>
      
      <div style={{
        width: "800px",
        height: "600px",
        background: "#fff",
        border: "2px solid #333",
        borderRadius: "10px",
        position: "relative",
        marginBottom: "20px"
      }}>
        {/* Test Pompa */}
        <div style={{
          position: "absolute",
          left: "50%",
          top: "90%",
          width: "40px",
          height: "40px",
          background: "linear-gradient(to bottom, #9E9E9E, #616161)",
          border: "3px solid #455A64",
          borderRadius: "10px",
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "16px"
        }}>
          <i className="fa-solid fa-pump"></i>
        </div>
        
        {/* Test Pipa */}
        <div style={{
          position: "absolute",
          left: "393px",
          top: "360px",
          width: "15px",
          height: "120px",
          backgroundColor: "#90A4AE",
          border: "2px solid #546E7A"
        }}></div>
        
        {/* Test Valve */}
        <div style={{
          position: "absolute",
          left: "300px",
          top: "358px",
          width: "30px",
          height: "30px",
          backgroundColor: "#F44336",
          border: "2px solid #000",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "16px"
        }}>
          <i className="fas fa-stop-circle"></i>
        </div>
        
        {/* Test Pohon */}
        <div style={{
          position: "absolute",
          left: "300px",
          top: "260px"
        }}>
          <div style={{
            position: "absolute",
            width: "8px",
            height: "20px",
            background: "linear-gradient(to right, #5D4037, #8D6E63)",
            border: "1px solid #4E342E",
            bottom: "0",
            left: "50%",
            transform: "translateX(-50%)"
          }}></div>
          <div style={{
            position: "absolute",
            width: "25px",
            height: "25px",
            backgroundColor: "transparent",
            borderRadius: "50%",
            bottom: "15px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#4CAF50",
            fontSize: "20px"
          }}>
            <i className="fa-solid fa-tree"></i>
          </div>
        </div>
      </div>
      
      <div style={{ textAlign: "center" }}>
        <p>Jika Anda melihat pompa, pipa, valve, dan pohon di atas, maka:</p>
        <ul style={{ textAlign: "left", display: "inline-block" }}>
          <li>✅ Font Awesome sudah terinstall</li>
          <li>✅ CSS styles sudah bekerja</li>
          <li>✅ Component sudah ter-render</li>
        </ul>
      </div>
    </div>
  )
}
