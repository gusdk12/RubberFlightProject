import React from 'react';
import * as auth from '../../../apis/auth.js';
import * as Swal from '../../../apis/alert.js';
import { useNavigate } from 'react-router-dom';
import JoinForm from '../components/Join/JoinForm.jsx';
import { background } from '@chakra-ui/react';
import { color } from 'framer-motion';

const Join = () => {

  const navigate = useNavigate();

  // 회원가입 요청
  // form <= {username, password}
  const join = async (form) => {
    // console.log(`join()`, form);

    let response;
    try{
      response = await auth.join(form);
    } catch(error) {
      // console.log(`${error}`);
      // console.log(`회원 가입 요청중 에러가 발생했습니다`);
      return;
    }

    const { data, status } = response;
    // console.log(`data : ${data}`);
    // console.log(`status : ${status}`);

    if( status === 200 ) { 
      // console.log(`회원가입 성공!`);
      Swal.alert("회원가입 성공", "로그인 화면으로 이동합니다.", "success", () => { navigate("/login") })
    }
    else { 
      // console.log(`회원가입 실패!`);
      Swal.alert("회원가입 실패", "회원가입에 실패하였습니다.", "error" )
    }


  }

  return (
    <div
      className='container'
      style={{
        width: '100%',       
        height: '100vh',      
        background: 'linear-gradient(rgb(176, 201, 230), rgb(213, 225, 235), rgb(239, 243, 246))',
        overflow: 'auto'
      }}
    >
      <JoinForm join={join} />
    </div>
  );
};

export default Join;
