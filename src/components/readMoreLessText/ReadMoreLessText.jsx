import { Button } from '@mui/material';
import { useState } from 'react';

const ReadMoreLessText = ({ children }) => {
  const [isReadMoreShown, setIsReadMoreShown] = useState(false);
  const handleReadMoreShow = () => {
    setIsReadMoreShown(!isReadMoreShown);
  };
  return (
    <div>
      <p>{isReadMoreShown ? children : children?.substring(0, 200)}</p>
      {children && (
      <Button
        onClick={handleReadMoreShow}
        variant="contained"
      >
        {isReadMoreShown ? 'Close' : 'Read More'}
      </Button>
      )}

    </div>
  );
};

export default ReadMoreLessText;
