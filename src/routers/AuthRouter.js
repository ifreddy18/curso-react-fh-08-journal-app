import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginScreen } from '../components/auth/LoginScreen'
import { RegisterScreen } from '../components/auth/RegisterScreen'

export const AuthRouter = () => {
    return (
        <div className="auth__main">
            
            <div className="auth__box-container">
                <Routes>
                    <Route 
                        path="/auth/login" 
                        element={<LoginScreen />} 
                        exact 
                    />
                    <Route 
                        path="/auth/register" 
                        element={<RegisterScreen />} 
                        exact
                    />
                    <Route 
                        path="*" 
                        element={<Navigate replace to="/auth/login" />} 
                    />

                </Routes> 
            </div>
        
        </div>
    )
}
