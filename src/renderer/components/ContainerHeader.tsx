import React, { ReactNode } from 'react';
import { Box, IconButton, Modal, Typography } from '@mui/material';
import Grid from '@mui/system/Unstable_Grid';
import HelpIcon from '@mui/icons-material/Help';

const ContainerHeader = ({title, children}: {title: string, children?: ReactNode}) => {
  const [helpOpen, setHelpOpen] = React.useState(false);

  return (
    <Grid xs={12}>
      <Typography variant="h6" style={{display: 'inline-block'}}>{title}</Typography>
      <IconButton color="primary" aria-label='help' style={{float: "right"}} onClick={() => setHelpOpen(true)}>
        <HelpIcon />
      </IconButton>

      <Modal open={helpOpen} onClose={() => setHelpOpen(false)} onClick={() => setHelpOpen(false)}>
        <Box className="modal-container" style={{padding: 0}}>
          <div style={{display: "flex", width: "100%", position: 'sticky', left: 0, top: 0, padding: 16, flexDirection: "row", marginBottom: 16, background: '#272727'}}>
            <HelpIcon />
            <Typography variant="h6" style={{display: 'inline-block', marginLeft: 16, marginTop: -4}}>Help: {title}</Typography>
          </div>

          <div style={{padding: 16}}>
            {children}
          </div>
        </Box>
      </Modal>
    </Grid>
  )
}


export default ContainerHeader;
