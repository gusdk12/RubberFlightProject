import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Box, Button, Heading } from '@chakra-ui/react';
import styles from './SelectJoin.module.css';

const SelectJoin = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const navigate = useNavigate();

    const handleUserClick = () => {
        setSelectedOption('user');
        navigate('/join/user');
    };

    const handleAdminClick = () => {
        setSelectedOption('admin');
        navigate('/join/admin');
    };

    const home = () => {
        navigate("/");
    };

    return (
        <>
            <div
                style={{    
                    // background: 'linear-gradient(rgb(176, 201, 230), rgb(213, 225, 235), rgb(239, 243, 246))',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 100,
                }}
            >
                <div
                    style={{
                        backgroundImage: 'url(/images/icons/commercial-plane.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                        width: '75px',
                        height: '75px',
                        cursor: 'pointer',
                    }}
                    onClick={home}
                ></div>
            </div>

            <Flex direction="column" align="center" className={styles.selectJoinContainer}>
                <Heading as="h3" className={styles.heading} mb={6}>
                    회원가입 유형을 선택하세요
                </Heading>

                <Flex className={styles.buttonContainer}>
                    <Box className={styles.section}>
                        {/* 네모 박스 */}
                        <Box className={styles.leftbox}>
                            <div className={styles.header}>사용자</div>
                            <div className={styles.leftimage}></div>
                            <div className={styles.text}> 러버 플라이트의 <br/>
                                다양한 서비스를 이용해보세요.
                            </div>
                        </Box>

                        {/* 사용자 가입하기 버튼 */}
                        <Button
                            className={`${styles.joinButton} ${selectedOption === 'user' ? styles.joinButtonSelected : ''}`}
                            onClick={handleUserClick}
                            size="lg"
                        >
                            가입하기
                        </Button>
                    </Box>
                    
                    {/* <Box className={styles.divider}></Box> */}
                    
                    <Box className={styles.section}>
                        {/* 네모 박스 */}
                        <Box className={styles.rightbox}>
                        <div className={styles.header}>관리자</div>
                            <div className={styles.rightimage}></div>
                            <div className={styles.text}> 러버플라이트의 시스템을 <br/>
                            직접 관리해보세요.
                            </div>
                        </Box>

                        {/* 관리자 가입하기 버튼 */}
                        <Button
                            className={`${styles.joinButton} ${selectedOption === 'admin' ? styles.joinButtonSelected : ''}`}
                            onClick={handleAdminClick}
                            size="lg"
                        >
                           가입하기
                        </Button>
                    </Box>
                </Flex>
            </Flex>
        </>
    );
};

export default SelectJoin;
