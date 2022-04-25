
import React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'
import Chip from '@mui/material/Chip'
import { TezosNode, Status, HeaderLink, SnapshotLink, APILink } from '../models/Tezos'
import { useTheme, styled } from '@mui/material/styles'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import UrlLink from './SnapshotLink'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

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
    case 'UNSYNCED':
      return 'warning'
    case 'STUCK':
      return 'warning'
    case 'NOT BOOTSTRAPED':
      return 'warning'
    case 'ERROR':
      return 'error'
  }
  return 'info'
}

const StatusBox = (props: { tezos: TezosNode, expandedDefault: boolean }) => {
  const [expanded, setExpanded] = React.useState(props.expandedDefault)
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

      <CardActions sx={{ justifyContent: 'right' }} onClick={handleExpandClick}>

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

        <Chip label={props.tezos.version} color='info' />

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
          <List sx={{ width: '100%' }}>
              <ListItem disableGutters secondaryAction={
                  <UrlLink url={props.tezos.url}>{props.tezos.url}</UrlLink>
                }>
                <ListItemText primary={<Typography>URL:</Typography>} />
              </ListItem>
              <ListItem disableGutters secondaryAction={
                  <UrlLink url={APILink(props.tezos)}>{APILink(props.tezos)}</UrlLink>
                }>
                <ListItemText primary={<Typography>API:</Typography>} />
              </ListItem>
              <ListItem disableGutters secondaryAction={
                  <UrlLink url={SnapshotLink(props.tezos, 'full')}>{SnapshotLink(props.tezos, 'full')}</UrlLink>
                }>
                <ListItemText primary={<Typography>FULL SNAPSHOT:</Typography>} />
              </ListItem>
              <ListItem disableGutters secondaryAction={
                  <UrlLink url={SnapshotLink(props.tezos, 'rolling')}>{SnapshotLink(props.tezos, 'rolling')}</UrlLink>
                }>
                <ListItemText primary={<Typography>ROLLING SNAPSHOT:</Typography>} />
              </ListItem>
              <ListItem disableGutters secondaryAction={
                  <UrlLink url={HeaderLink(props.tezos)}>{HeaderLink(props.tezos)}</UrlLink>
                }>
                <ListItemText primary={<Typography>HEADER:</Typography>} />
              </ListItem>
          </List>

        </CardContent>
      </Collapse>
    </Card>
  )
}

export default StatusBox
