
import React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'
import Chip from '@mui/material/Chip'
// import Button from '@mui/material/Button'
import { TezosNode, Status } from '../models/Tezos'
import { useTheme, styled } from '@mui/material/styles'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}))

const statusToChipsStatus = (status: Status) => {
  switch (status) {
    case 'ONLINE':
      return 'success'
    case 'NOT SYNCED':
      return 'warning'
    case 'NOT BOOTSTRAPED':
      return 'warning'
    case 'ERROR':
      return 'error'
  }
  return 'info'
}

const StatusBox = (props: { tezos: TezosNode }) => {
  const [expanded, setExpanded] = React.useState(false)
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const theme = useTheme()
  return (
    <Card sx={{
      width: '80vw',
      maxWidth: '800px',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.text.primary,
      boxShadow: 'none',
      border: 'solid',
      borderWidth: '1px',
      borderRadius: '0px'
    }}>

      <CardActions sx={{ justifyContent: 'right' }}>

        <Typography sx={{ fontSize: '14px', display: 'flex' }} gutterBottom>
          <span style={{
            flex: '1',
            fontSize: '1.5em',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: 'bold',
            lineHeight: '2.66',
            marginLeft: '20px',
            letterSpacing: '0.08333em',
            textAlign: 'center'
          }}> {props.tezos.networkProtocol} </span>
        </Typography>

        <div style={{ flex: 1 }}></div>

        <Chip label={props.tezos.status} color={statusToChipsStatus(props.tezos.status)} />

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent style={{ marginLeft: '20px' }}>
          <Typography paragraph>Method:</Typography>
          {/* <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography> */}
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default StatusBox
