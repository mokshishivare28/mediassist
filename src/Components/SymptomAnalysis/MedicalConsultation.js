import React, { useContext } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts';
import send_icon from '../../img/send_icon.png'
import user_icon from '../../img/user_icon.png'
import gemini_icon from '../../img/gemini_icon.png'
import { Context } from '../../context/Context';

function MedicalConsultation() {
  const {onSent,recentPrompt,showResult,loading,resultData,setInput,input} = useContext(Context)

  return (
    <MentStyled>
      <InnerLayout className='main'>
        <div className='nav'>
          <h2>Medi-Assist</h2>
        </div>
        <div className="main-container">
          {!showResult
          ?<>
            <div className='greet'>
            <p><span>Hi, there!</span></p>
            <p>What happened 🫣??</p>
            </div>
          </>
          :<div className='result'>
              <div className='result-title'>
                <img src={user_icon} alt=""/>
                <p>{recentPrompt}</p>
              </div>
              <div className='result-data'>
                <img src={gemini_icon} alt=""></img>
                {loading
                ?<div className='loader'>
                    <hr/>
                    <hr/>
                    <hr/>
                </div>
                :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                }
              </div>
            </div>
          }
          <div className='main-bottom'>
            <div className='search-box'>
              <input 
                onChange={(e)=>setInput(e.target.value)} 
                onKeyPress={(e) => e.key === 'Enter' && onSent()}
                value={input} 
                type="text" 
                placeholder='Share your thoughts here'
              />
              <div>
                <img onClick={()=>onSent()} src = {send_icon} alt=""/>

              </div>
            </div>
            <p className='bottom-info'>
              Medi-Assist cannot replace professional medical assistance. This can give you a basic idea about your symptoms and possible causes, but for accurate diagnosis and treatment, please consult a healthcare professional doctor.
            </p>
          </div>
        </div>
      </InnerLayout>
    </MentStyled>  
  )
}

const MentStyled = styled.nav`
  .nav h2{
    color: darkviolet;
    font-size: 25px;
    font-weight: 605;
    margin: 11px 12px;
  }
  .main{
      flex: 1;
      min-height: 100vh;
      padding-bottom: 15vh;
      position: relative;
  }

  .main .nav{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 22px;
    padding: 20px;
    /* color: white; */
  }

  .main-container {
    max-width: 900px;
    /* padding: -70px; */
    margin: -15px 88px;
    color: black;
    overflow: hidden;
  }

  .main .greet{
    margin: 50px 0px;
    font-size: 40px;
    color: #928989;
    font-weight: 540;
    padding: 20px;
  }

  .main .greet span{
    background: -webkit-linear-gradient(16deg, #4b90ff, #ff5546);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .main-bottom{
    position: absolute;
    bottom: 0;
    width: 100%;
    max-width: 900px;
    padding: 0px 20px;
    margin: 70px -48px;
  }

  .search-box{
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    background-color: #f0f4f9;
    margin: 10px 40px;
    padding: 7px 17px;
    border-radius: 50px;
    /* margin-right: 70px */
  }

  .search-box img{
    width: 24px;
    cursor: pointer;
  }

  .search-box input{
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    padding: 9px;
    font-size: 18px;
  }

  .search-box div{
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .main .bottom-info{
    font-size: 13px;
    margin: 15px;
    text-align: center;
    font-weight: 300px;
  }

  .result{
    padding: 0px 5%;
    padding-bottom: 20vh;
    overflow: hidden;
  }

  .result-title{
    margin: 40px 0px;
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .result img{
    width: 40px;
    border-radius: 50%;
    opacity: 59%;
  }

  .result-data{
    display: flex;
    align-items: start;
    gap: 20px;
    overflow: hidden;
  }

  .result-data p{
    flex: 1;
    font-size: 17px;
    font-weight: 300;
    line-height: 1.8;
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;
    max-height: 50vh;
    overflow-y: auto;
    padding: 15px;
    background: #f9f9f9;
    border-radius: 8px;
    border: 1px solid #e8e8e8;
  }

  .result-data p::-webkit-scrollbar {
    width: 6px;
  }

  .result-data p::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  .result-data p::-webkit-scrollbar-thumb {
    background: #d5a8ff;
    border-radius: 10px;
  }

  .result-data p::-webkit-scrollbar-thumb:hover {
    background: #c494ff;
  }

  .loader{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .loader hr{
    border-radius: 4px;
    border: none;
    background-color: #f6f7f8;
    background: linear-gradient(to right, #D5A8FF, #f6f7f8, #D5A8FF);
    background-size: 800px 50px;
    height: 20px;
    animation: loader 3s infinite linear;                                                 
  }
  @keyframes loader {
    0%{
      background-position: -800px 0px;
    }
    100%{
      background-position: 800px 0px;
    }
  }
 
`;


export default MedicalConsultation