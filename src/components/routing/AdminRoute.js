import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

const AdminRoute = ({
  children,
  auth: { isAuthenticated, loading, user }
}) => {
  if (loading) return <div>Cargando...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (user && user.role !== 'admin') return <Navigate to="/dashboard" />;
  
  return children;
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AdminRoute);