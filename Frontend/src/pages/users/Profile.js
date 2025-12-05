import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Profile.css';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import ChangePassword from '../../components/ChangePassword/ChangePassword';
import PersonalInfo from './usersPersonalinfo';
import Orders from './usersOrders';
import Addresses from './usersAddresses'; // Import the new Addresses component

const Profile = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('profile');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="profile-page">
      <Header />

      <div className="profileContainer">
        <div className="profileMain">
          <div className="profile__left">
            <div className="profileNavigation">
              <h3>MY ACCOUNT</h3>
              <ul>
                <li>
                  <a
                    href="#profile"
                    className={activeSection === 'profile' ? 'active' : ''}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveSection('profile');
                      setIsDrawerOpen(false);
                    }}
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    href="#orders"
                    className={activeSection === 'orders' ? 'active' : ''}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveSection('orders');
                      setIsDrawerOpen(false);
                    }}
                  >
                    View Orders
                  </a>
                </li>
                <li>
                  <a
                    href="#password"
                    className={activeSection === 'password' ? 'active' : ''}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveSection('password');
                      setIsDrawerOpen(false);
                    }}
                  >
                    Change Password
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="profile__right">
            <div className="profileHeader">
              <div className="profileBreadcrumbLink">
                <a href="/">HOME</a> / <span>MY ACCOUNT</span>
              </div>
              <div className="filterLeft" onClick={() => setIsDrawerOpen(true)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
                <p>MENU</p>
              </div>
            </div>

            {activeSection === 'profile' && (
              <div className="profileContent">
                {/* Use the PersonalInfo component here */}
                <PersonalInfo />

                {/* Use the Addresses component here */}
                <Addresses />
              </div>
            )}

            {activeSection === 'orders' && (
              <div className="profileContent">
                {/* Use the Orders component here */}
                <Orders />
              </div>
            )}

            {activeSection === 'password' && (
              <div className="profileContent">
                <ChangePassword />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`filterDrawer ${isDrawerOpen ? 'open' : ''}`}>
        <div className="drawerHeader">
          <p>MY ACCOUNT</p>
          <div className="closeButton" onClick={() => setIsDrawerOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        </div>
        <div className="drawerContent">
          <ul className="drawerMenu">
            <li>
              <a
                href="#profile"
                className={activeSection === 'profile' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection('profile');
                  setIsDrawerOpen(false);
                }}
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="#orders"
                className={activeSection === 'orders' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection('orders');
                  setIsDrawerOpen(false);
                }}
              >
                View Orders
              </a>
            </li>
            <li>
              <a
                href="#password"
                className={activeSection === 'password' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection('password');
                  setIsDrawerOpen(false);
                }}
              >
                Change Password
              </a>
            </li>
          </ul>
        </div>
      </div>

      {isDrawerOpen && (
        <div
          className="drawerOverlay"
          onClick={() => setIsDrawerOpen(false)}
        ></div>
      )}

      <Footer />
    </div>
  );
};

export default Profile;