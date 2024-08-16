import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';

export default defineConfig(({ mode }) => {
  const isProduction = process.env.NODE_ENV === 'production' || mode === 'production';
  const useApi = isProduction || process.env.USE_API === 'true';
  const port = useApi ? 5173 : 5172;
  
  console.log('Mode:', isProduction ? 'production' : 'development');
  console.log('USE_API:', useApi);
  
  return {
    plugins: [
      react(),
      svgr(),
    ],
    define: {
      'process.env.USE_API': JSON.stringify(useApi),
      'process.env.API_BASE_URL': JSON.stringify('http://localhost:3000'),
    },
    server: {
      port: port,
    },
  };
});