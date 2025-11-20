import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import awsExports from "./aws-exports.js";
import { Amplify } from 'aws-amplify';
Amplify.configure(awsExports);

createRoot(document.getElementById('root')!).render(
  <App />
)
