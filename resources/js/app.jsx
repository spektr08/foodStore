import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import App from "./Layouts/App";
const root = createRoot(document.getElementById('app'));
root.render(<App />);