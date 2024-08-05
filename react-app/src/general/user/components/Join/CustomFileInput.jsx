import React, { useState } from 'react';
import { Input, Button, Box, Flex } from '@chakra-ui/react';

const CustomFileInput = ({ name, accept, ...props }) => {
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFileName(file ? file.name : '선택된 파일이 없습니다');
    };

    return (
        <Flex alignItems="center">
            <Input
                id={name}
                type="file"
                name={name}
                accept={accept}
                display="none"
                onChange={handleFileChange}
                {...props}
            />
            <Button as="label" htmlFor={name} bg='#bbc7db' color='white'>
                Choose File
            </Button>
            <Box color='gray.400' fontSize={12} mx="auto" p={3} bg="#f0f5f8" borderRadius="md" width={'72%'} marginLeft={'13px'}>
                <span>{fileName || '　'}</span>
            </Box>
        </Flex>
    );
};

export default CustomFileInput;
