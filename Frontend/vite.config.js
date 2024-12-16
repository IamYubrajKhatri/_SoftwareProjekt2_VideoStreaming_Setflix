import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'




// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      "/api":{
        target:"https://setflixbackend-g5cyc7bzarh9cngu.germanywestcentral-01.azurewebsites.net/",
      }
    }
  }
})
