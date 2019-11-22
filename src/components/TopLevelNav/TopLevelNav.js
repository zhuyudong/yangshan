import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash/object'
import { Link } from 'react-router'
import { Button, Icon, Whisper, Tooltip } from 'rsuite'
import { isMobile } from 'react-device-detect'
import Logo from '@src/components/Logo'
import {
  rtl,
  ltr,
  docs,
  github,
  search,
  wrench,
  lightOn,
  lightOff,
  component
} from '@src/components/SvgIcons'
import SearchDrawer from '@src/components/SearchDrawer'
import loadCssFile from '@src/utils/loadCssFile'
import { DirectionContext } from '@src/components/Context'
import yangshan from '../../resources/images/yangshan.jpg'

function WithTooltipButton({ children, tip, ...props }) {
  if (isMobile) {
    return (
      <Button size="lg" {...props}>
        {children}
      </Button>
    )
  }
  return (
    <DirectionContext.Consumer>
      {({ direction }) => (
        <Whisper
          speaker={<Tooltip>{tip}</Tooltip>}
          placement={direction === 'ltr' ? 'right' : 'left'}
          trigger="hover"
        >
          <Button size="lg" {...props}>
            {children}
          </Button>
        </Whisper>
      )}
    </DirectionContext.Consumer>
  )
}

const iconColor = '#fff'

const svgStyle = {
  fill: iconColor
}

class TopLevelNav extends React.Component {
  static contextTypes = {
    locale: PropTypes.object,
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    showSubmenu: PropTypes.bool,
    onToggleMenu: PropTypes.func,
    onChangeTheme: PropTypes.func,
    hideToggle: PropTypes.bool
  }

  constructor() {
    super()
    this.state = {
      light: localStorage.getItem('theme') === 'dark' ? false : true,
      search: false
    }
  }

  showSearchDrawer = () => {
    this.setState({ search: true })
  }
  hideSearchDrawer = () => {
    this.setState({ search: false })
  }
  handleToggleMenu = (event, show) => {
    const { onToggleMenu } = this.props
    onToggleMenu && onToggleMenu(show)
  }

  loadTheme = themeName => {
    localStorage.setItem('theme', themeName)
    const { globalVars = {} } = window.less || {}
    window.less &&
      window.less.modifyVars({
        ...globalVars,
        '@theme-is-default': themeName === 'default'
      })

    const themeId = `theme-${themeName}`
    loadCssFile(`/resources/css/theme-${themeName}.css`, themeId).then(() => {
      Array.from(document.querySelectorAll('[id^=theme]')).forEach(css => {
        if (css.id !== themeId) {
          css.remove()
        }
      })
    })
  }

  handleToggleThemeButtonClick = () => {
    const { light } = this.state
    const { onChangeTheme } = this.props
    this.setState({ light: !light }, () => {
      const themeName = this.state.light ? 'default' : 'dark'
      this.loadTheme(themeName)
      onChangeTheme && onChangeTheme(themeName)
    })
  }

  render() {
    const { children, showSubmenu, hideToggle } = this.props
    const { router, locale } = this.context
    const localePath = get(locale, 'id') === 'en-US' ? '/en/' : '/'
    const { light } = this.state
    const menu = [
      {
        key: 'tools',
        tip: get(locale, 'common.tools'),
        to: `${localePath}tools`,
        icon: wrench
      },
      {
        key: 'opensources',
        tip: get(locale, 'common.opensources'),
        to: `${localePath}opensources`,
        icon: github
      },
      {
        key: 'components',
        tip: get(locale, 'common.components'),
        to: `${localePath}components/overview`,
        icon: component
      },
      {
        key: 'docs',
        tip: get(locale, 'common.docs'),
        to: `${localePath}docs`,
        icon: docs
      }
    ]
    const renderSearchButton = className => (
      <WithTooltipButton
        disabled
        tip={get(locale, 'common.search')}
        className={`icon-btn-circle ${className}`}
        onClick={this.showSearchDrawer}
        style={{ background: 'transparent' }}
      >
        <Icon icon={search} svgStyle={svgStyle} size="lg" />
      </WithTooltipButton>
    )
    return (
      <DirectionContext.Consumer>
        {({ direction, handleToggleDirection }) => {
          return (
            <div className="top-level-nav">
              <Link to={`${localePath}`}>
                {/* <Logo width={26} height={30} className='logo-sm' /> */}
                <img src={yangshan} className="logo-circle" />
              </Link>

              <div className="top-level-nav-menu">
                {renderSearchButton('visible-xs')}
                {menu.map(item => (
                  <WithTooltipButton
                    tip={item.tip}
                    key={item.key}
                    className="icon-btn-circle"
                    componentClass={Link}
                    to={item.to}
                    onClick={event => {
                      this.handleToggleMenu(event, true)
                    }}
                  >
                    <Icon
                      icon={item.icon}
                      svgStyle={{
                        ...svgStyle,
                        fill: router.isActive({ pathname: item.key })
                          ? '#169de0'
                          : iconColor
                      }}
                      size="lg"
                    />
                  </WithTooltipButton>
                ))}

                {/* <WithTooltipButton
                  tip={get(locale, 'common.design')}
                  className='icon-btn-circle'
                  componentClass='a'
                  target='_blank'
                  href='/design/default/index.html'
                >
                  <Icon icon={design} svgStyle={svgStyle} size='lg' />
                </WithTooltipButton>

                {renderSearchButton('hidden-xs')} */}

                <div className="nav-menu-bottom">
                  <WithTooltipButton
                    tip="Toggle light/dark theme"
                    className="icon-btn-circle"
                    onClick={this.handleToggleThemeButtonClick}
                  >
                    <Icon
                      icon={light ? lightOff : lightOn}
                      svgStyle={svgStyle}
                      size="lg"
                    />
                  </WithTooltipButton>

                  <WithTooltipButton
                    tip="Toggle RTL/LTR"
                    className="icon-btn-circle"
                    onClick={handleToggleDirection}
                  >
                    <Icon
                      icon={direction === 'ltr' ? rtl : ltr}
                      svgStyle={svgStyle}
                      size="lg"
                    />
                  </WithTooltipButton>

                  <WithTooltipButton
                    tip="GitHub"
                    className="icon-btn-circle"
                    href="https://devcloud.huaweicloud.com/codehub/project/933940192fa2419b91ee3c8905a3b107/codehub/591388/home"
                    target="_blank"
                  >
                    <Icon icon="code" size="lg" style={{ color: iconColor }} />
                  </WithTooltipButton>

                  {hideToggle ? null : (
                    <WithTooltipButton
                      tip={
                        showSubmenu
                          ? get(locale, 'common.closeMenu')
                          : get(locale, 'common.openMenu')
                      }
                      className="icon-btn-circle"
                      onClick={this.handleToggleMenu}
                    >
                      <Icon
                        icon={showSubmenu ? 'angle-left' : 'angle-right'}
                        size="lg"
                      />
                    </WithTooltipButton>
                  )}
                </div>
              </div>
              {children}
              <SearchDrawer
                show={this.state.search}
                onHide={this.hideSearchDrawer}
              />
            </div>
          )
        }}
      </DirectionContext.Consumer>
    )
  }
}

export default TopLevelNav
