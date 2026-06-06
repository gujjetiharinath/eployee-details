import { defineConfig } from 'vite'
import react from '@vitejs/react-dev-cards' // Mee file lo unna react plugin untundi

export default defineConfig({
  plugins: [react()],
  base: '/eployee-details/',  
})