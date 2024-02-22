import { Button } from '@mui/material';
import React, { useState } from 'react';
const CreatingPost: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
      <div>
        <Button>Create new add</Button>
      </div>
    );
  };
  
  export default CreatingPost;