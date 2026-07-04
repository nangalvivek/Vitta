import {View, Flex, Text, ActionButton} from '@adobe/react-spectrum'
import LightIcon from '@spectrum-icons/workflow/Light'
import MoonIcon from '@spectrum-icons/workflow/Moon'
import DashboardIcon from '@spectrum-icons/workflow/Dashboard'
import {useAppTheme} from './theme'
import './TopBar.css'

export const TopBar = () => {
  const {colorScheme, toggleColorScheme} = useAppTheme()
  const nextScheme = colorScheme === 'dark' ? 'light' : 'dark'
  const ToggleIcon = nextScheme === 'dark' ? MoonIcon : LightIcon

  return (
    <View UNSAFE_className="top-bar">
      <Flex alignItems="center" justifyContent="space-between" gap="size-200" UNSAFE_className="top-bar__inner">
        <Flex alignItems="center" gap="size-100" UNSAFE_className="top-bar__brand">
          <View UNSAFE_className="top-bar__brand-mark" aria-hidden="true">
            <DashboardIcon />
          </View>
          <Text UNSAFE_className="top-bar__brand-text">Portfolio Tracker</Text>
        </Flex>

        <ActionButton
          isQuiet
          aria-label={`Switch to ${nextScheme} mode`}
          onPress={toggleColorScheme}
          UNSAFE_className="top-bar__theme-toggle"
        >
          <ToggleIcon aria-hidden="true" />
        </ActionButton>
      </Flex>
    </View>
  )
}
