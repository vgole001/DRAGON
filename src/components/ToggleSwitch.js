import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export default function ToggleButtons() {
  const [alignment, setAlignment] = React.useState('Off');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      <ToggleButton style={{color:'black'}} size='small' value="On" aria-label="left aligned">
        On
      </ToggleButton>
      <ToggleButton style={{color:'black'}} size='small' value="Off" aria-label="centered">
        Off
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
