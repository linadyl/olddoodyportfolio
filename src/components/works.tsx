import React from 'react';
import CustomPopup from './customPopup.tsx';
import popupBgWorks from '../assets/popup/bookOpti.svg'; 

interface WorksPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const WorksPopup: React.FC<WorksPopupProps> = ({ isOpen, onClose }) => {
  return (
    <CustomPopup
      isOpen={isOpen}
      onClose={onClose}
      backgroundImage={popupBgWorks}
    >
      {/* Works-specific content and stickers */}
      {/* You can add your interactive stickers here */}
    </CustomPopup>
  );
};

export default WorksPopup;