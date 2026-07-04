import {View, Flex} from '@adobe/react-spectrum'
import {Outlet} from 'react-router-dom'
import {TopBar} from './TopBar'
import {SideNav} from './SideNav'

export const Layout = () => {
  return (
    <View UNSAFE_className="app-layout">
      <TopBar />
      <Flex UNSAFE_className="app-layout__body" direction="row" gap="size-0" flexGrow={1} minWidth={0}>
        <SideNav />
        <Flex direction="column" flexGrow={1} minWidth={0}>
          <main className="app-content">
            <Outlet />
          </main>
        </Flex>
      </Flex>
    </View>
  )
}
