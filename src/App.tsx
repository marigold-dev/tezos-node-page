import React, { CSSProperties, useEffect, useState } from 'react'
import axios from 'axios'
import { useTheme, ThemeProvider } from '@mui/material/styles'
import {
  TezosNode,
  IsBootstrapedResponse,
  StatusBySyncState,
  VersionResponse,
} from './models/Tezos'
import StatusBox from './components/StatusBox'
import HeaderBar from './components/HeaderBar'

export function App() {
  const theme = useTheme()
  const [tezosNodes, setTezosNodes] = useState<TezosNode[]>([])

  useEffect(() => {
    const nodesEnv = process.env.REACT_APP_NODES!.split(',')
    if (tezosNodes.length < 1) {
      const nodes = nodesEnv.map((node) => {
        return {
          networkProtocol: node,
          status: 'WAITING',
          url: `https://${node.toLowerCase()}.tezos.marigold.dev`,
          version: 'v0.0',
        } as TezosNode
      })
      setTezosNodes(nodes)
    }

    if (
      tezosNodes.length < 1 ||
      tezosNodes.some((node) => node.status === 'WAITING')
    ) {
      const requests = tezosNodes
        .filter((node) => node.status === 'WAITING')
        .map(async (node) => {
          return {
            node: node,
            isBootstrappedTask: axios.get(
              node.url + '/chains/main/is_bootstrapped'
            ),
            versionTask: axios.get(node.url + '/version'),
          }
        })

      Promise.all(requests).then((results) => {
        results.forEach(async (result) => {
          const response = await Promise.allSettled([
            result.isBootstrappedTask,
            result.versionTask,
          ])

          // Set the status of the node
          if (response[0].status === 'fulfilled') {
            const isBootstrapped = response[0].value
              .data as IsBootstrapedResponse
            result.node.status = StatusBySyncState(isBootstrapped)
          } else {
            console.log(response[0].reason)
            result.node.status = 'ERROR'
          }

          // Set the version of the node
          if (response[1].status === 'fulfilled') {
            const versionTask = response[1].value.data as VersionResponse
            result.node.version =
              'v' + versionTask.version.major + '.' + versionTask.version.minor
          } else {
            console.log(response[1].reason)
          }
          setTezosNodes([...tezosNodes])
        })
      })
    }
  }, [tezosNodes, setTezosNodes])

  const styles = {
    page: {
      backgroundColor: theme.palette.primary.main,
      overflow: 'auto',
      height: 'calc(100vh - 66px)',
    } as CSSProperties,
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontSize: '1.2em',
      height: '100%',
      justifyContent: 'center',
    } as CSSProperties,
  }

  return (
    <ThemeProvider theme={theme}>
      <HeaderBar></HeaderBar>

      <div style={styles.page}>
        <div style={styles.content}>
          <div style={{ paddingBottom: '30px', textAlign: 'left' }}>
            {tezosNodes.map((tezos, index) => (
              <StatusBox
                key={tezos.networkProtocol}
                tezos={tezos}
                expandedDefault={index === 0}
              ></StatusBox>
            ))}
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}
