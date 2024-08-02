import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  components: {
    FileInput: {
      baseStyle: {
        input: {
          display: "none",
        },
        label: {
          bg: '#586D92',
          color: 'white',
          cursor: 'pointer',
          padding: '8px 16px',
          borderRadius: 'md',
          textAlign: 'center',
          _hover: {
            bg: '#4a5a7a',
          },
        },
      },
    },
  },
});

export default theme;