import React, { useState } from 'react'
import styled from 'styled-components'
import avatar from '../../img/avatar.png'
import { menuItems } from '../../utils/menuItems'

function Navigation({ active, setActive, onSignOut, user }) {

  const [message, setMessage] = useState(""); // ✅ toast state

  return (
    <NavStyled>
        <div className="user-con">
            <img src={avatar} alt="loading" />
            <div className="text">
                <p>MediAssist</p>
            </div>
        </div>

        <ul className="menu-items">
            {menuItems.map((item) => {
                return (
                  <li 
                    key={item.id}

                    // ✅ UPDATED CLICK LOGIC
                    onClick={() => {
                      if (item.title === "Consult Doctor") {
                        setMessage("Feature Coming Soon 😒");
                        setTimeout(() => setMessage(""), 3000);
                      } else {
                        setActive(item.id);
                      }
                    }}

                    className={active === item.id ? 'active': ''}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </li>
                )
            })}
        </ul>

        {/* ✅ TOAST */}
        {message && <MessageBox>{message}</MessageBox>}

        <div className="bottom-nav">
          {user && (
            <div className="signout-row">
              <span>{user.email}</span>
              <button type="button" onClick={onSignOut}>Sign Out</button>
            </div>
          )}
        </div>
    </NavStyled>
  )
}

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 336px;
    max-width: 100%;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;

    @media (max-width: 768px) {
      width: 100%;
      padding: 1.5rem 1rem;
      border-radius: 24px;
    }

    @media (max-width: 480px) {
      padding: 1rem 0.85rem;
      border-radius: 18px;
    }

    .user-con{
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;

        img{
            margin-right: -2px;
            width: 60px;
            height: 60px;
            border-radius: 40%;
            object-fit: cover;
            background: #fcf6f9;
            border: 0.3px solid #FFFFFF;
            padding: .15rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }

        p{
            color: darkViolet;
            font-weight: 900;
            font-size: 37px;
        }

        @media (max-width: 480px) {
          flex-direction: column;
          align-items: flex-start;

          img {
            width: 52px;
            height: 52px;
          }

          p {
            font-size: 28px;
          }
        }
    }

    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;

        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .3s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;

            @media (max-width: 480px) {
              grid-template-columns: 32px auto;
              padding-left: 0.8rem;
            }

            &:hover{
                color: darkviolet;
                transform: translateX(5px);
            }

            i{
                font-size: 1.4rem;
            }
        }
    }

    .active{
        color: rgba(34, 34, 96, 1) !important;

        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #222260;
            border-radius: 0 10px 10px 0;
        }
    }

    .bottom-nav {
      padding-top: 1rem;
      border-top: 1px solid rgba(34, 34, 96, 0.08);
    }

    .signout-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      padding-top: 1rem;
      color: #4b0082;
      font-size: 14px;
      font-weight: 700;
    }

    .signout-row button {
      background: transparent;
      border: 1px solid #7b2ff7;
      color: #7b2ff7;
      border-radius: 12px;
      padding: 8px 14px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .signout-row button:hover {
      background: rgba(123, 47, 247, 0.1);
    }
`;

/* 🔥 SAME TOAST STYLE */
const MessageBox = styled.div`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  
  font-weight: bold;
  color: white;
  background: crimson;
  padding: 12px 20px;
  border-radius: 8px;
  z-index: 1000;

  box-shadow: 0 4px 12px rgba(0,0,0,0.2);

  animation: slideUp 0.3s ease;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translate(-50%, 20px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
`;

export default Navigation;