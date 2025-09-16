"use client"

import { useEffect, useRef, useState } from "react"

export default function WateringAnimation() {
  const layoutRef = useRef<HTMLDivElement>(null)
  const [pumpOn, setPumpOn] = useState(false)
  const [valveStates, setValveStates] = useState([false, false, false, false, false])
  const [status, setStatus] = useState("Status: Pompa mati. Semua valve tertutup.")

  const getResponsiveValue = (baseValue: number, containerWidth = 850) => {
    if (!layoutRef.current) return baseValue * 0.9 // Scale down by default
    const layoutWidth = layoutRef.current.offsetWidth
    return (baseValue / containerWidth) * layoutWidth
  }

  const getResponsiveHeight = (baseValue: number, containerHeight = 650) => {
    if (!layoutRef.current) return baseValue * 0.9 // Scale down by default
    const layoutHeight = layoutRef.current.offsetHeight
    return (baseValue / containerHeight) * layoutHeight
  }

  const createPipe = (x: number, y: number, width: number, height: number, isHorizontal: boolean, id: string) => {
    const pipe = document.createElement("div")
    pipe.className = "pipe"
    pipe.id = id
    
    // Gunakan inline styles dengan !important
    pipe.style.cssText = `
      position: absolute !important;
      left: ${getResponsiveValue(x)}px !important;
      top: ${getResponsiveHeight(y)}px !important;
      width: ${getResponsiveValue(width)}px !important;
      height: ${getResponsiveHeight(height)}px !important;
      background-color: #90A4AE !important;
      border: 2px solid #546E7A !important;
      z-index: 1 !important;
    `
    
    layoutRef.current?.appendChild(pipe)
    return pipe
  }

  const togglePump = () => {
    setPumpOn(!pumpOn)

    const pumpIcon = document.getElementById("pump-icon")
    if (pumpIcon) {
      if (!pumpOn) {
        // Pump turning ON - green color
        pumpIcon.style.background = "linear-gradient(to bottom, #4CAF50, #2E7D32)"
        pumpIcon.style.borderColor = "#1B5E20"
      } else {
        // Pump turning OFF - gray color
        pumpIcon.style.background = "linear-gradient(to bottom, #9E9E9E, #616161)"
        pumpIcon.style.borderColor = "#455A64"
      }
    }

    if (!pumpOn) {
      setStatus("Status: Pompa mati. Semua valve tertutup.")
    } else {
      setStatus("Status: Pompa hidup. Siap untuk menyiram.")
      setValveStates([false, false, false, false, false])

      // Matikan semua sprinkler
      const sprays = document.querySelectorAll(".water-spray")
      sprays.forEach((spray) => {
        spray.classList.remove("active")
        spray.style.setProperty('background-color', 'transparent', 'important')
      })

      // Reset valve visual states
      for (let i = 1; i <= 5; i++) {
        const valve = document.getElementById(`valve-${i}`)
        if (valve) {
          valve.className = "valve closed"
          valve.style.setProperty('background-color', '#F44336', 'important')
          valve.innerHTML = '<i class="fas fa-stop-circle"></i>'
        }
      }
    }
  }

  const toggleValve = (index: number) => {
    if (!pumpOn) return

    const newValveStates = [...valveStates]
    newValveStates[index] = !newValveStates[index]
    setValveStates(newValveStates)

    const valve = document.getElementById(`valve-${index + 1}`)
    if (!valve) return

    if (newValveStates[index]) {
      valve.className = "valve open"
      valve.style.setProperty('background-color', '#2196F3', 'important')
      valve.innerHTML = '<i class="fas fa-play-circle"></i>'

      switch (index) {
        case 0: // Valve 1 - kiri
          for (let i = 0; i < 3; i++) {
            const spray = document.getElementById(`spray-left-${i}`)
            if (spray) {
              spray.classList.add("active")
              spray.style.setProperty('background-color', 'rgba(33, 150, 243, 0.5)', 'important')
            }
          }
          break
        case 1: // Valve 2 - tengah 1
          for (let i = 0; i < 3; i++) {
            const spray = document.getElementById(`spray-valve2-${i}`)
            if (spray) {
              spray.classList.add("active")
              spray.style.setProperty('background-color', 'rgba(33, 150, 243, 0.5)', 'important')
            }
          }
          break
        case 2: // Valve 3 - tengah 2
          for (let i = 0; i < 3; i++) {
            const spray = document.getElementById(`spray-valve3-${i}`)
            if (spray) {
              spray.classList.add("active")
              spray.style.setProperty('background-color', 'rgba(33, 150, 243, 0.5)', 'important')
            }
          }
          break
        case 3: // Valve 4 - kanan + area kanan (ex-keran 1)
          // Control valve 4 sprinklers
          for (let i = 0; i < 3; i++) {
            const spray = document.getElementById(`spray-valve4-${i}`)
            if (spray) {
              spray.classList.add("active")
              spray.style.setProperty('background-color', 'rgba(33, 150, 243, 0.5)', 'important')
            }
          }
          // Control ex-keran 1 sprinklers
          for (let i = 0; i < 3; i++) {
            const spray = document.getElementById(`spray-last-${i}`)
            if (spray) {
              spray.classList.add("active")
              spray.style.setProperty('background-color', 'rgba(33, 150, 243, 0.5)', 'important')
            }
          }
          break
        case 4: // Valve 5 - keran 2 area
          // Control valve 5 sprinklers (ex-keran 2)
          for (let i = 0; i < 4; i++) {
            const spray = document.getElementById(`spray-faucet2-${i}`)
            if (spray) {
              spray.classList.add("active")
              spray.style.setProperty('background-color', 'rgba(33, 150, 243, 0.5)', 'important')
            }
          }
          break
      }

      setStatus(`Status: Pompa hidup. Valve ${index + 1} terbuka.`)
    } else {
      valve.className = "valve closed"
      valve.style.setProperty('background-color', '#F44336', 'important')
      valve.innerHTML = '<i class="fas fa-stop-circle"></i>'

      switch (index) {
        case 0: // Valve 1 - kiri
          for (let i = 0; i < 3; i++) {
            const spray = document.getElementById(`spray-left-${i}`)
            if (spray) {
              spray.classList.remove("active")
              spray.style.setProperty('background-color', 'transparent', 'important')
            }
          }
          break
        case 1: // Valve 2 - tengah 1
          for (let i = 0; i < 3; i++) {
            const spray = document.getElementById(`spray-valve2-${i}`)
            if (spray) {
              spray.classList.remove("active")
              spray.style.setProperty('background-color', 'transparent', 'important')
            }
          }
          break
        case 2: // Valve 3 - tengah 2
          for (let i = 0; i < 3; i++) {
            const spray = document.getElementById(`spray-valve3-${i}`)
            if (spray) {
              spray.classList.remove("active")
              spray.style.setProperty('background-color', 'transparent', 'important')
            }
          }
          break
        case 3: // Valve 4 - kanan + area kanan (ex-keran 1)
          // Turn off valve 4 sprinklers
          for (let i = 0; i < 3; i++) {
            const spray = document.getElementById(`spray-valve4-${i}`)
            if (spray) {
              spray.classList.remove("active")
              spray.style.setProperty('background-color', 'transparent', 'important')
            }
          }
          // Turn off ex-keran 1 sprinklers
          for (let i = 0; i < 3; i++) {
            const spray = document.getElementById(`spray-last-${i}`)
            if (spray) {
              spray.classList.remove("active")
              spray.style.setProperty('background-color', 'transparent', 'important')
            }
          }
          break
        case 4: // Valve 5 - keran 2 area
          // Turn off valve 5 sprinklers (ex-keran 2)
          for (let i = 0; i < 4; i++) {
            const spray = document.getElementById(`spray-faucet2-${i}`)
            if (spray) {
              spray.classList.remove("active")
              spray.style.setProperty('background-color', 'transparent', 'important')
            }
          }
          break
      }

      setStatus("Status: Pompa hidup. Menunggu valve dibuka.")
    }
  }


  useEffect(() => {
    console.log('useEffect started')
    if (!layoutRef.current) {
      console.log('layoutRef.current is null')
      return
    }
    
    console.log('Creating watering system elements...')

    // Clear existing content
    layoutRef.current.innerHTML = ""
    console.log('Cleared existing content')

    const pump = document.createElement("div")
    pump.className = "pompa"
    pump.id = "pump-icon"
    pump.innerHTML = '<i class="fa-solid fa-pump"></i>'
    // Gunakan CSS class dengan !important untuk memastikan styles teraplikasi
    pump.style.cssText = `
      left: ${getResponsiveValue(385)}px !important;
      top: ${getResponsiveHeight(480)}px !important;
      display: flex !important;
      position: absolute !important;
      width: 40px !important;
      height: 40px !important;
      background: linear-gradient(to bottom, #9E9E9E, #616161) !important;
      border: 3px solid #455A64 !important;
      border-radius: 10px !important;
      justify-content: center !important;
      align-items: center !important;
      color: white !important;
      font-weight: bold !important;
      z-index: 10 !important;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3) !important;
      font-size: 16px !important;
      transition: all 0.3s ease !important;
      cursor: pointer !important;
    `
    layoutRef.current.appendChild(pump)
    console.log('Created pump element with CSS class and !important styles')

    // Pipa utama naik dari pompa
    createPipe(393, 360, 15, 120, false, "main-pipe-vertical")

    createPipe(300, 360, 100, 15, true, "main-pipe-horizontal")

    const valve1 = document.createElement("div")
    valve1.className = "valve closed"
    valve1.id = "valve-1"
    
    // Gunakan inline styles dengan !important
    valve1.style.cssText = `
      position: absolute !important;
      left: ${getResponsiveValue(373)}px !important;
      top: ${getResponsiveHeight(358)}px !important;
      width: 18px !important;
      height: 18px !important;
      background-color: #F44336 !important;
      border: 2px solid #000 !important;
      border-radius: 50% !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      color: white !important;
      font-size: 10px !important;
      cursor: pointer !important;
      z-index: 25 !important;
    `
    
    valve1.innerHTML = '<i class="fas fa-stop-circle"></i>'
    valve1.addEventListener("click", () => toggleValve(0))
    layoutRef.current.appendChild(valve1)

    createPipe(300, 240, 15, 120, false, "left-pipe-vertical")

    for (let i = 0; i < 3; i++) {
      const tree = document.createElement("div")
      tree.className = "pohon"
      tree.id = `tree-${i}`
      
      // Gunakan inline styles dengan !important
      tree.style.cssText = `
        position: absolute !important;
        left: ${getResponsiveValue(300)}px !important;
        top: ${getResponsiveHeight(260 + i * 40)}px !important;
        z-index: 10 !important;
      `

      const trunk = document.createElement("div")
      trunk.className = "tree-trunk"
      
      // Gunakan inline styles dengan !important
      trunk.style.cssText = `
        position: absolute !important;
        width: 8px !important;
        height: 20px !important;
        background: linear-gradient(to right, #5D4037, #8D6E63) !important;
        border: 1px solid #4E342E !important;
        bottom: 0 !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
      `

      const leaves = document.createElement("div")
      leaves.className = "tree-leaves"
      
      // Gunakan inline styles dengan !important
      leaves.style.cssText = `
        position: absolute !important;
        width: 25px !important;
        height: 25px !important;
        background-color: transparent !important;
        border-radius: 50% !important;
        bottom: 15px !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        color: #4CAF50 !important;
        font-size: 20px !important;
      `
      
      leaves.innerHTML = '<i class="fa-solid fa-tree"></i>'
      
      tree.appendChild(trunk)
      tree.appendChild(leaves)
      layoutRef.current.appendChild(tree)

      const sprinkler = document.createElement("div")
      sprinkler.className = "sprinkler"
      sprinkler.id = `sprinkler-left-${i}`
      
      // Gunakan inline styles dengan !important
      sprinkler.style.cssText = `
        position: absolute !important;
        left: ${getResponsiveValue(300)}px !important;
        top: ${getResponsiveHeight(240 + i * 40)}px !important;
        width: 25px !important;
        height: 25px !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        color: #2196F3 !important;
        font-size: 18px !important;
        cursor: pointer !important;
        z-index: 15 !important;
      `
      
      layoutRef.current.appendChild(sprinkler)

      const spray = document.createElement("div")
      spray.className = "water-spray"
      spray.id = `spray-left-${i}`
      
      // Gunakan inline styles dengan !important
      spray.style.cssText = `
        position: absolute !important;
        left: ${getResponsiveValue(285)}px !important;
        top: ${getResponsiveHeight(225 + i * 40)}px !important;
        width: 30px !important;
        height: 30px !important;
        background-color: transparent !important;
        border-radius: 50% !important;
        opacity: 1 !important;
        transition: opacity 0.3s, background-color 0.3s !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        z-index: 12 !important;
      `
      
      // Add fa-shower icon
      spray.innerHTML = '<i class="fas fa-shower" style="color: white !important; font-size: 16px !important;"></i>'
      
      layoutRef.current.appendChild(spray)
    }

    createPipe(400, 360, 200, 15, true, "right-pipe-horizontal")

    const valvePositions = [450, 500, 550]

    valvePositions.forEach((x, index) => {
      // Valve
      const valve = document.createElement("div")
      valve.className = "valve closed"
      valve.id = `valve-${index + 2}`
      
      // Gunakan inline styles dengan !important
      valve.style.cssText = `
        position: absolute !important;
        left: ${getResponsiveValue(x)}px !important;
        top: ${getResponsiveHeight(348)}px !important;
        width: 18px !important;
        height: 18px !important;
        background-color: #F44336 !important;
        border: 2px solid #000 !important;
        border-radius: 50% !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        color: white !important;
        font-size: 10px !important;
        cursor: pointer !important;
        z-index: 25 !important;
      `
      
      valve.innerHTML = '<i class="fas fa-stop-circle"></i>'
      valve.addEventListener("click", () => toggleValve(index + 1))
      layoutRef.current.appendChild(valve)

      createPipe(x, 240, 15, 120, false, `valve${index + 2}-pipe`)

      for (let i = 0; i < 3; i++) {
        const tree = document.createElement("div")
        tree.className = "pohon"
        tree.id = `tree-valve${index + 2}-${i}`
        
        // Gunakan inline styles dengan !important
        tree.style.cssText = `
          position: absolute !important;
          left: ${getResponsiveValue(x)}px !important;
          top: ${getResponsiveHeight(260 + i * 40)}px !important;
          z-index: 10 !important;
        `

        const trunk = document.createElement("div")
        trunk.className = "tree-trunk"
        
        // Gunakan inline styles dengan !important
        trunk.style.cssText = `
          position: absolute !important;
          width: 8px !important;
          height: 20px !important;
          background: linear-gradient(to right, #5D4037, #8D6E63) !important;
          border: 1px solid #4E342E !important;
          bottom: 0 !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
        `

        const leaves = document.createElement("div")
        leaves.className = "tree-leaves"
        
        // Gunakan inline styles dengan !important
        leaves.style.cssText = `
          position: absolute !important;
          width: 25px !important;
          height: 25px !important;
          background-color: transparent !important;
          border-radius: 50% !important;
          bottom: 15px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          color: #4CAF50 !important;
          font-size: 20px !important;
        `
        
        leaves.innerHTML = '<i class="fa-solid fa-tree"></i>'
        
        tree.appendChild(trunk)
        tree.appendChild(leaves)
        layoutRef.current.appendChild(tree)

        const sprinkler = document.createElement("div")
        sprinkler.className = "sprinkler"
        sprinkler.id = `sprinkler-valve${index + 2}-${i}`
        
        // Gunakan inline styles dengan !important
        sprinkler.style.cssText = `
          position: absolute !important;
          left: ${getResponsiveValue(x)}px !important;
          top: ${getResponsiveHeight(240 + i * 40)}px !important;
          width: 25px !important;
          height: 25px !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          color: #2196F3 !important;
          font-size: 18px !important;
          cursor: pointer !important;
          z-index: 15 !important;
        `
        
        layoutRef.current.appendChild(sprinkler)

        const spray = document.createElement("div")
        spray.className = "water-spray"
        spray.id = `spray-valve${index + 2}-${i}`
        
        // Gunakan inline styles dengan !important
        spray.style.cssText = `
          position: absolute !important;
          left: ${getResponsiveValue(x - 15)}px !important;
          top: ${getResponsiveHeight(225 + i * 40)}px !important;
          width: 30px !important;
          height: 30px !important;
          background-color: transparent !important;
          border-radius: 50% !important;
          opacity: 1 !important;
          transition: opacity 0.3s, background-color 0.3s !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          z-index: 12 !important;
        `
        
        // Add fa-shower icon
        spray.innerHTML = '<i class="fas fa-shower" style="color: white !important; font-size: 16px !important;"></i>'
        
        layoutRef.current.appendChild(spray)
      }
    })

    for (let i = 0; i < 3; i++) {
      const tree = document.createElement("div")
      tree.className = "pohon"
      tree.id = `tree-last-${i}`
      
      // Gunakan inline styles dengan !important
      tree.style.cssText = `
        position: absolute !important;
        left: ${getResponsiveValue(640)}px !important;
        top: ${getResponsiveHeight(260 + i * 40)}px !important;
        z-index: 10 !important;
      `

      const trunk = document.createElement("div")
      trunk.className = "tree-trunk"
      
      // Gunakan inline styles dengan !important
      trunk.style.cssText = `
        position: absolute !important;
        width: 8px !important;
        height: 20px !important;
        background: linear-gradient(to right, #5D4037, #8D6E63) !important;
        border: 1px solid #4E342E !important;
        bottom: 0 !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
      `

      const leaves = document.createElement("div")
      leaves.className = "tree-leaves"
      
      // Gunakan inline styles dengan !important
      leaves.style.cssText = `
        position: absolute !important;
        width: 25px !important;
        height: 25px !important;
        background-color: transparent !important;
        border-radius: 50% !important;
        bottom: 15px !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        color: #4CAF50 !important;
        font-size: 20px !important;
      `
      
      leaves.innerHTML = '<i class="fa-solid fa-tree"></i>'
      
      tree.appendChild(trunk)
      tree.appendChild(leaves)
      layoutRef.current.appendChild(tree)

      const sprinkler = document.createElement("div")
      sprinkler.className = "sprinkler"
      sprinkler.id = `sprinkler-last-${i}`
      
      // Gunakan inline styles dengan !important
      sprinkler.style.cssText = `
        position: absolute !important;
        left: ${getResponsiveValue(640)}px !important;
        top: ${getResponsiveHeight(240 + i * 40)}px !important;
        width: 25px !important;
        height: 25px !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        color: #2196F3 !important;
        font-size: 18px !important;
        cursor: pointer !important;
        z-index: 15 !important;
      `
      
      layoutRef.current.appendChild(sprinkler)

      const spray = document.createElement("div")
      spray.className = "water-spray"
      spray.id = `spray-last-${i}`
      
      // Gunakan inline styles dengan !important
      spray.style.cssText = `
        position: absolute !important;
        left: ${getResponsiveValue(625)}px !important;
        top: ${getResponsiveHeight(225 + i * 40)}px !important;
        width: 30px !important;
        height: 30px !important;
        background-color: transparent !important;
        border-radius: 50% !important;
        opacity: 1 !important;
        transition: opacity 0.3s, background-color 0.3s !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        z-index: 12 !important;
      `
      
      // Add fa-shower icon
      spray.innerHTML = '<i class="fas fa-shower" style="color: white !important; font-size: 16px !important;"></i>'
      
      layoutRef.current.appendChild(spray)
    }

    // Restore original pipes for spray-last sprinklers
    createPipe(580, 360, 60, 15, true, "after-faucet-pipe")
    createPipe(640, 240, 15, 120, false, "last-L-pipe")

    const valve5 = document.createElement("div")
    valve5.className = "valve closed"
    valve5.id = "valve-5"
    
    // Gunakan inline styles dengan !important
    valve5.style.cssText = `
      position: absolute !important;
      left: ${getResponsiveValue(440)}px !important;
      top: ${getResponsiveHeight(392)}px !important;
      width: 18px !important;
      height: 18px !important;
      background-color: #F44336 !important;
      border: 2px solid #000 !important;
      border-radius: 50% !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      color: white !important;
      font-size: 10px !important;
      cursor: pointer !important;
      z-index: 25 !important;
    `
    
    valve5.innerHTML = '<i class="fas fa-stop-circle"></i>'
    valve5.addEventListener("click", () => toggleValve(4))
    layoutRef.current.appendChild(valve5)

    createPipe(440, 380, 15, 100, false, "faucet2-pipe-vertical")

    createPipe(440, 480, 200, 15, true, "faucet2-pipe-horizontal")
    

    for (let i = 0; i < 4; i++) {
      const tree = document.createElement("div")
      tree.className = "pohon"
      tree.id = `tree-faucet2-${i}`
      
      // Gunakan inline styles dengan !important
      tree.style.cssText = `
        position: absolute !important;
        left: ${getResponsiveValue(480 + i * 50)}px !important;
        top: ${getResponsiveHeight(480)}px !important;
        z-index: 10 !important;
      `

      const trunk = document.createElement("div")
      trunk.className = "tree-trunk"
      
      // Gunakan inline styles dengan !important
      trunk.style.cssText = `
        position: absolute !important;
        width: 8px !important;
        height: 20px !important;
        background: linear-gradient(to right, #5D4037, #8D6E63) !important;
        border: 1px solid #4E342E !important;
        bottom: 0 !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
      `

      const leaves = document.createElement("div")
      leaves.className = "tree-leaves"
      
      // Gunakan inline styles dengan !important
      leaves.style.cssText = `
        position: absolute !important;
        width: 25px !important;
        height: 25px !important;
        background-color: transparent !important;
        border-radius: 50% !important;
        bottom: 15px !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        color: #4CAF50 !important;
        font-size: 20px !important;
      `
      
      leaves.innerHTML = '<i class="fa-solid fa-tree"></i>'
      
      tree.appendChild(trunk)
      tree.appendChild(leaves)
      layoutRef.current.appendChild(tree)

      const sprinkler = document.createElement("div")
      sprinkler.className = "sprinkler"
      sprinkler.id = `sprinkler-faucet2-${i}`
      
      // Gunakan inline styles dengan !important
      sprinkler.style.cssText = `
        position: absolute !important;
        left: ${getResponsiveValue(480 + i * 50)}px !important;
        top: ${getResponsiveHeight(480)}px !important;
        width: 25px !important;
        height: 25px !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        color: #2196F3 !important;
        font-size: 18px !important;
        cursor: pointer !important;
        z-index: 15 !important;
      `
      
      layoutRef.current.appendChild(sprinkler)

      const spray = document.createElement("div")
      spray.className = "water-spray"
      spray.id = `spray-faucet2-${i}`
      
      // Gunakan inline styles dengan !important
      spray.style.cssText = `
        position: absolute !important;
        left: ${getResponsiveValue(465 + i * 50)}px !important;
        top: ${getResponsiveHeight(465)}px !important;
        width: 30px !important;
        height: 30px !important;
        background-color: transparent !important;
        border-radius: 50% !important;
        opacity: 1 !important;
        transition: opacity 0.3s, background-color 0.3s !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        z-index: 12 !important;
      `
      
      // Add fa-shower icon
      spray.innerHTML = '<i class="fas fa-shower" style="color: white !important; font-size: 16px !important;"></i>'
      
      layoutRef.current.appendChild(spray)
    }
    
    console.log('Finished creating all watering system elements')
    console.log('Total elements in layout:', layoutRef.current.children.length)
  }, [])

  useEffect(() => {
    // Update faucet visual states based on pump status
    for (let i = 1; i <= 1; i++) {
      const faucet = document.getElementById(`faucet-${i}`)
      if (faucet) {
        if (pumpOn) {
          faucet.classList.remove("disabled")
          // Reset to closed state when pump turns on
          faucet.style.background = "linear-gradient(to bottom, #FF9800, #F57C00)"
          faucet.style.borderColor = "#E65100"
        } else {
          faucet.classList.add("disabled")
          faucet.style.background = "linear-gradient(to bottom, #9E9E9E, #616161)"
          faucet.style.borderColor = "#455A64"
        }
      }
    }
  }, [pumpOn])

  return (
    <div
      style={{
        fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        background: "#16610E",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "clamp(10px, 2vw, 20px)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Modern background effects with new color palette */}
      <div style={{
        position: "absolute",
        top: "-50%",
        left: "-50%",
        width: "200%",
        height: "200%",
        background: "radial-gradient(circle, rgba(254, 209, 106, 0.1) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
        animation: "float 20s linear infinite",
        zIndex: 1
      }} />
      
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(45deg, transparent 30%, rgba(249, 122, 0, 0.05) 50%, transparent 70%)",
        animation: "shimmer 3s infinite",
        zIndex: 2
      }} />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      <style jsx>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        /* Modern animations */
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-50px, -50px) rotate(360deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes waterScale {
          0% { 
            transform: scale(1); 
            opacity: 0.8; 
          }
          50% { 
            transform: scale(1.5); 
            opacity: 1; 
          }
          100% { 
            transform: scale(1); 
            opacity: 0.8; 
          }
        }
        
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 100vw;
          padding: 0 clamp(10px, 2vw, 20px);
          position: relative;
          z-index: 10;
        }
        
        .layout {
          position: relative;
          width: min(90vw, 85vh * 1.4);
          height: min(60vh, 90vw * 0.6);
          background: linear-gradient(145deg, #FED16A, #FFF4A4);
          border: 2px solid #F97A00;
          border-radius: 15px;
          margin-bottom: clamp(10px, 2vh, 15px);
          overflow: hidden;
          box-shadow: 
            0 15px 35px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(249, 122, 0, 0.1),
            inset 0 1px 0 rgba(255, 244, 164, 0.3);
        }
        
        @media (orientation: portrait) {
          .layout {
            width: 88vw;
            height: 50vh;
          }
        }
        
        @media (orientation: landscape) and (max-height: 600px) {
          .layout {
            width: 75vw;
            height: 65vh;
          }
        }
        
        .pompa {
          position: absolute;
          left: 50%;
          top: 90%;
          width: clamp(25px, 3.5vw, 40px);
          height: clamp(25px, 3.5vw, 40px);
          background: linear-gradient(to bottom, #9E9E9E, #616161);
          border: 5px solid blue !important;
          border-radius: 10px;
          transform: translateX(-50%);
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-weight: bold;
          z-index: 10;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          font-size: clamp(10px, 1.8vw, 16px);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .pompa:hover {
          transform: translateX(-50%) scale(1.05);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
        }
        
        .pipe {
          position: absolute;
          background-color: #90A4AE;
          border: 2px solid #546E7A;
          z-index: 1;
        }
        
        .pipe-vertical {
          width: clamp(8px, 1.2vw, 15px);
        }
        
        .pipe-horizontal {
          height: clamp(8px, 1.2vw, 15px);
        }
        
        .pipe-water {
          position: absolute;
          background-color: rgba(30, 136, 229, 0.7);
          z-index: 2;
          transition: all 0.5s ease;
          border-radius: 2px;
        }
        
        .valve {
          position: absolute;
          width: clamp(12px, 1.5vw, 18px);
          height: clamp(12px, 1.5vw, 18px);
          background-color: #263238;
          border: 2px solid #000;
          border-radius: 50%;
          z-index: 25;
          cursor: pointer;
          transition: background-color 0.3s;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-size: clamp(6px, 0.8vw, 10px);
        }
        
        .valve.open {
          background-color: #2196F3 !important;
        }
        
        .valve.closed {
          background-color: #F44336 !important;
        }
        
        .keran {
          position: absolute;
          width: clamp(10px, 1.2vw, 15px);
          height: clamp(10px, 1.2vw, 15px);
          background: linear-gradient(to bottom, #FF9800, #F57C00);
          border: 2px solid #E65100;
          border-radius: 5px;
          z-index: 18;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-size: clamp(5px, 0.7vw, 8px);
          transition: all 0.3s ease;
        }
        
        .keran.disabled {
          background: linear-gradient(to bottom, #9E9E9E, #616161) !important;
          border-color: #455A64 !important;
          cursor: not-allowed !important;
          opacity: 0.7 !important;
        }
        
        .keran:hover:not(.disabled) {
          transform: scale(1.05);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .pohon {
          position: absolute;
          z-index: 8;
        }
        
        .tree-trunk {
          position: absolute;
          width: clamp(4px, 0.8vw, 8px);
          height: clamp(12px, 1.5vw, 20px);
          background: linear-gradient(to right, #5D4037, #8D6E63);
          border: 1px solid #4E342E;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }
        
        .tree-leaves {
          position: absolute;
          width: clamp(16px, 2vw, 25px);
          height: clamp(16px, 2vw, 25px);
          background-color: transparent;
          border-radius: 50%;
          bottom: clamp(10px, 1.2vw, 15px);
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          justify-content: center;
          align-items: center;
          color: #4CAF50;
          font-size: clamp(12px, 1.6vw, 20px);
        }
        
        .sprinkler {
          position: absolute;
          width: clamp(6px, 0.8vw, 10px);
          height: clamp(6px, 0.8vw, 10px);
          background-color: #00B0FF;
          border: 2px solid #0091EA;
          border-radius: 50%;
          z-index: 12;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-size: clamp(4px, 0.6vw, 8px);
        }
        
        .water-spray {
          position: absolute;
          width: clamp(24px, 3vw, 40px);
          height: clamp(24px, 3vw, 40px);
          border-radius: 50%;
          opacity: 1;
          transition: opacity 0.3s;
          z-index: 20;
        }
        
        .water-spray.active {
          opacity: 1 !important;
          background-color: rgba(33, 150, 243, 0.5) !important;
          animation: waterScale 2s infinite ease-in-out !important;
          box-shadow: 0 0 20px rgba(33, 150, 243, 0.8) !important;
        }
        
        
        @keyframes waterScale {
          0% { 
            transform: scale(1); 
            opacity: 0.8; 
          }
          50% { 
            transform: scale(1.5); 
            opacity: 1; 
          }
          100% { 
            transform: scale(1); 
            opacity: 0.8; 
          }
        }
        
        .controls {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: clamp(8px, 1.5vw, 15px);
          margin-top: clamp(15px, 3vh, 25px);
          width: 100%;
          padding: 0 clamp(10px, 2vw, 20px);
        }

        .manual-controls {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: clamp(8px, 1.5vw, 15px);
          margin-top: clamp(20px, 3.5vh, 30px);
          width: 100%;
          padding: clamp(20px, 3vw, 30px) clamp(10px, 2vw, 20px);
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.05);
          border-radius: 15px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .manual-controls::before {
          content: "Kontrol Manual (Tidak Terhubung IoT)";
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7));
          padding: clamp(4px, 1vw, 8px) clamp(12px, 2vw, 20px);
          font-size: clamp(10px, 1.3vw, 14px);
          font-weight: 600;
          color: #4a5568;
          border-radius: 20px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          white-space: nowrap;
        }
        
        .control-btn {
          padding: clamp(8px, 1.5vw, 16px) clamp(16px, 2.5vw, 24px) !important;
          border: 2px solid #F97A00 !important;
          border-radius: 12px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15) !important;
          min-width: clamp(100px, 14vw, 140px) !important;
          font-size: clamp(9px, 1.4vw, 16px) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: clamp(6px, 1vw, 10px) !important;
          background: linear-gradient(145deg, #FED16A, #F97A00) !important;
          color: #16610E !important;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2) !important;
          position: relative;
          overflow: hidden;
        }
        
        .control-btn::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 244, 164, 0.4), transparent);
          transition: left 0.5s;
        }
        
        .control-btn:hover::before {
          left: 100%;
        }
        
        .control-btn:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 12px 40px rgba(249, 122, 0, 0.3) !important;
          border: 2px solid #FED16A !important;
        }
        
        .control-btn:active {
          transform: translateY(0) scale(0.98);
        }

        .manual-btn {
          padding: clamp(8px, 1.5vw, 16px) clamp(16px, 2.5vw, 24px) !important;
          border: 2px dashed #FED16A !important;
          border-radius: 12px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15) !important;
          min-width: clamp(100px, 14vw, 140px) !important;
          font-size: clamp(9px, 1.4vw, 16px) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: clamp(6px, 1vw, 10px) !important;
          background: linear-gradient(145deg, #FFF4A4, #FED16A) !important;
          color: #16610E !important;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2) !important;
        }
        
        .manual-btn:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 12px 40px rgba(249, 122, 0, 0.3) !important;
          border: 2px solid #FFF4A4 !important;
          background: linear-gradient(145deg, #FFF4A4, #F97A00) !important;
        }

        .manual-btn.active {
          background: linear-gradient(145deg, #16610E, #0F4A0B) !important;
          color: #FFF4A4 !important;
          border: 2px solid #F97A00 !important;
          box-shadow: 0 8px 32px rgba(22, 97, 14, 0.5) !important;
        }

        .manual-btn:disabled {
          background: linear-gradient(145deg, #666, #444) !important;
          color: #999 !important;
          cursor: not-allowed !important;
          opacity: 0.6 !important;
          border: 2px dashed #666 !important;
          transform: none !important;
        }
        
        .pump-btn {
          background: linear-gradient(145deg, #F97A00, #E56700) !important;
          border: 2px solid #FED16A !important;
          color: #FFF4A4 !important;
        }
        
        .pump-btn:hover {
          background: linear-gradient(145deg, #FED16A, #F97A00) !important;
          border: 2px solid #FFF4A4 !important;
          color: #16610E !important;
        }
        
        .pump-btn.active {
          background: linear-gradient(145deg, #16610E, #0F4A0B) !important;
          border: 2px solid #F97A00 !important;
          color: #FFF4A4 !important;
          box-shadow: 0 8px 32px rgba(22, 97, 14, 0.5) !important;
        }
        
        .valve-btn {
          background: linear-gradient(145deg, #FED16A, #F97A00) !important;
          border: 2px solid #FFF4A4 !important;
          color: #16610E !important;
        }
        
        .valve-btn:hover {
          background: linear-gradient(145deg, #FFF4A4, #FED16A) !important;
          border: 2px solid #F97A00 !important;
        }
        
        .valve-btn.active {
          background: linear-gradient(145deg, #16610E, #0F4A0B) !important;
          border: 2px solid #F97A00 !important;
          color: #FFF4A4 !important;
          box-shadow: 0 8px 32px rgba(22, 97, 14, 0.5) !important;
        }
        
        .valve-btn:disabled {
          background: linear-gradient(145deg, #666, #444) !important;
          border: 2px solid #999 !important;
          color: #999 !important;
          cursor: not-allowed !important;
          opacity: 0.6 !important;
          transform: none !important;
        }

        .status {
          margin-top: clamp(15px, 3vh, 25px);
          padding: clamp(12px, 2.5vw, 20px);
          background: linear-gradient(145deg, #FED16A, #FFF4A4);
          border-radius: 15px;
          border: 2px solid #F97A00;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.25),
            inset 0 1px 0 rgba(255, 244, 164, 0.3);
          width: 100%;
          max-width: min(95vw, 1000px);
          text-align: center;
          font-weight: 600;
          color: #16610E;
          font-size: clamp(11px, 1.6vw, 18px);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
          position: relative;
          overflow: hidden;
        }
        
        .status::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(249, 122, 0, 0.2), transparent);
          animation: shimmer 3s infinite;
        }

        @media (max-width: 768px) {
          .controls, .manual-controls {
            flex-direction: column;
            align-items: center;
          }
          
          .control-btn, .manual-btn {
            width: 90%;
            max-width: 280px;
          }
        }
        
        @media (max-width: 480px) {
          .layout {
            width: 95vw;
            height: 50vh;
          }
          
          .control-btn, .manual-btn {
            width: 95%;
            font-size: 10px !important;
            padding: 8px 12px !important;
          }
        }
        
        @media (orientation: landscape) and (max-height: 500px) {
          .layout {
            height: 75vh;
            width: 85vw;
          }
          
          .controls, .manual-controls {
            flex-direction: row;
            flex-wrap: wrap;
          }
          
          .control-btn, .manual-btn {
            min-width: 100px !important;
            font-size: 9px !important;
          }
        }
      `}</style>

      <div
        style={{
          color: "#FFF4A4",
          marginBottom: "clamp(15px, 3vh, 25px)",
          textAlign: "center",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
          fontSize: "clamp(1.4rem, 4vw, 2.8rem)",
          fontWeight: "700",
          letterSpacing: "-0.5px",
          padding: "clamp(15px, 2.5vw, 25px)",
          borderRadius: "15px",
          background: "rgba(22, 97, 14, 0.8)",
          border: "2px solid #F97A00",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          position: "relative",
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(10px, 2vw, 20px)"
        }}
      >
        {/* Farm Logo */}
        <div style={{
          width: "clamp(40px, 6vw, 60px)",
          height: "clamp(40px, 6vw, 60px)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid #FFF4A4",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          overflow: "hidden"
        }}>
          <img 
            src="/JWF.png" 
            alt="Jayawangi Farm Logo" 
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%"
            }}
          />
        </div>
        
        <div>
          <div style={{
            fontSize: "clamp(1.2rem, 3.5vw, 2.4rem)",
            marginBottom: "clamp(2px, 0.5vw, 5px)",
            lineHeight: "1.2"
          }}>
            Penyiraman Durian
          </div>
          <div style={{
            fontSize: "clamp(1rem, 2.5vw, 1.8rem)",
            color: "#FED16A",
            fontWeight: "600"
          }}>
            Jayawangi Farm
          </div>
        </div>
      </div>

      <div className="container">
        <div className="layout" ref={layoutRef}>
          {/* Komponen akan ditambahkan dengan JavaScript */}
        </div>

        <div className="controls">
          <button className={`control-btn pump-btn ${pumpOn ? "active" : ""}`} onClick={togglePump}>
            <i className="fas fa-power-off"></i> {pumpOn ? "Matikan Pompa" : "Hidupkan Pompa"}
          </button>
          <button
            className={`control-btn valve-btn ${valveStates[0] ? "active" : ""}`}
            disabled={!pumpOn}
            onClick={() => toggleValve(0)}
          >
            <i className="fas fa-valve"></i> Valve 1: {valveStates[0] ? "Terbuka" : "Tertutup"}
          </button>
          <button
            className={`control-btn valve-btn ${valveStates[1] ? "active" : ""}`}
            disabled={!pumpOn}
            onClick={() => toggleValve(1)}
          >
            <i className="fas fa-valve"></i> Valve 2: {valveStates[1] ? "Terbuka" : "Tertutup"}
          </button>
          <button
            className={`control-btn valve-btn ${valveStates[2] ? "active" : ""}`}
            disabled={!pumpOn}
            onClick={() => toggleValve(2)}
          >
            <i className="fas fa-valve"></i> Valve 3: {valveStates[2] ? "Terbuka" : "Tertutup"}
          </button>
          <button
            className={`control-btn valve-btn ${valveStates[3] ? "active" : ""}`}
            disabled={!pumpOn}
            onClick={() => toggleValve(3)}
          >
            <i className="fas fa-valve"></i> Valve 4: {valveStates[3] ? "Terbuka" : "Tertutup"}
          </button>
          <button
            className={`control-btn valve-btn ${valveStates[4] ? "active" : ""}`}
            disabled={!pumpOn}
            onClick={() => toggleValve(4)}
          >
            <i className="fas fa-valve"></i> Valve 5: {valveStates[4] ? "Terbuka" : "Tertutup"}
          </button>
        </div>


        <div className="status">
          <i className="fas fa-info-circle"></i> {status}
        </div>
        
        {/* Support By Section */}
        <div style={{
          marginTop: "clamp(20px, 4vh, 30px)",
          padding: "clamp(15px, 2.5vw, 25px)",
          background: "linear-gradient(145deg, rgba(22, 97, 14, 0.9), rgba(15, 74, 11, 0.9))",
          borderRadius: "15px",
          border: "2px solid #F97A00",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          textAlign: "center",
          position: "relative",
          zIndex: 10
        }}>
          <div style={{
            color: "#FFF4A4",
            fontSize: "clamp(12px, 1.8vw, 20px)",
            fontWeight: "600",
            marginBottom: "clamp(10px, 2vw, 15px)",
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)"
          }}>
            Support By
          </div>
          
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(15px, 3vw, 25px)",
            flexWrap: "wrap"
          }}>
            {/* Company Logo 1 */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "clamp(5px, 1vw, 8px)"
            }}>
              <div style={{
                width: "clamp(100px, 15vw, 140px)",
                height: "clamp(40px, 6vw, 60px)",
                borderRadius: "25%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease",
                overflow: "hidden"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)"
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(249, 122, 0, 0.4)"
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)"
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)"
              }}>
                <img 
                  src="/PLN.jpg" 
                  alt="PLN Logo" 
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
