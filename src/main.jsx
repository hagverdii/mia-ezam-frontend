import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import { AuthProvider } from './context/AuthContext.jsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
	// <React.StrictMode>
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<AuthProvider>
				<App />
			</AuthProvider>
		</BrowserRouter>
	</QueryClientProvider>
	// </React.StrictMode>,
)
