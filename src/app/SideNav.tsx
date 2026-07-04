import {View, Text} from '@adobe/react-spectrum'
import {ListBox, ListBoxItem} from 'react-aria-components'
import {useLocation, useNavigate} from 'react-router-dom'
import DashboardIcon from '@spectrum-icons/workflow/Dashboard'
import GraphIcon from '@spectrum-icons/workflow/GraphArea'
import UploadIcon from '@spectrum-icons/workflow/UploadToCloud'
import DocumentIcon from '@spectrum-icons/workflow/Document'
import BugIcon from '@spectrum-icons/workflow/Bug'
import './SideNav.css'
import {useEffect, useState} from 'react'

const navItems = [
  {key: 'dashboard', label: 'Dashboard', path: '/', icon: DashboardIcon},
  {key: 'portfolio', label: 'Portfolio', path: '/portfolio', icon: GraphIcon},
  {key: 'uploads', label: 'Uploads', path: '/uploads', icon: UploadIcon},
  {key: 'tax', label: 'Tax', path: '/tax', icon: DocumentIcon},
  {key: 'debug', label: 'Debug', path: '/debug', icon: BugIcon},
] as const

const useIsNarrow = (query: string): boolean => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    const update = (): void => setMatches(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [query])

  return matches
}

const routeToKey = (pathname: string): string => {
  if (pathname === '/') return 'dashboard'
  if (pathname.startsWith('/portfolio')) return 'portfolio'
  if (pathname.startsWith('/uploads')) return 'uploads'
  if (pathname.startsWith('/tax')) return 'tax'
  if (pathname.startsWith('/debug')) return 'debug'
  return 'dashboard'
}

const keyToPath: Record<string, string> = {
  dashboard: '/',
  portfolio: '/portfolio',
  uploads: '/uploads',
  tax: '/tax',
  debug: '/debug',
}

export const SideNav = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const isNarrow = useIsNarrow('(max-width: 960px)')
  const selectedKey = routeToKey(location.pathname)

  return (
    <View UNSAFE_className={`side-nav-shell${isNarrow ? ' side-nav-shell--mobile' : ''}`}>
      <View UNSAFE_className="side-nav-shell__header">
        <Text UNSAFE_className="side-nav-shell__section-label">Navigation</Text>
      </View>
      <ListBox
        aria-label="Primary navigation"
        selectionMode="single"
        selectionBehavior="replace"
        selectedKeys={new Set([selectedKey])}
        onSelectionChange={(selection) => {
          if (selection === 'all') return
          const key = selection.values().next().value as string | undefined
          const target = key ? keyToPath[key] ?? '/' : '/'
          if (target !== location.pathname) navigate(target)
        }}
        className={({orientation}) => `side-nav-list${orientation === 'horizontal' ? ' side-nav-list--horizontal' : ''}`}
        orientation={isNarrow ? 'horizontal' : 'vertical'}
      >
        {navItems.map((item) => (
          <ListBoxItem
            key={item.key}
            id={item.key}
            textValue={item.label}
            className={({isSelected, isHovered, isFocusVisible, isPressed}) =>
              [
                'side-nav-item',
                isSelected ? 'side-nav-item--selected' : '',
                isHovered ? 'side-nav-item--hovered' : '',
                isFocusVisible ? 'side-nav-item--focus-visible' : '',
                isPressed ? 'side-nav-item--pressed' : '',
              ].filter(Boolean).join(' ')
            }
          >
            <View UNSAFE_className="side-nav-item__content">
              <View UNSAFE_className="side-nav-item__icon" aria-hidden="true">
                <item.icon />
              </View>
              <Text UNSAFE_className="side-nav-item__label">{item.label}</Text>
            </View>
          </ListBoxItem>
        ))}
      </ListBox>
    </View>
  )
}
