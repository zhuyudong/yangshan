import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Sidebar, Nav, Icon, IconButton } from 'rsuite'
import { Link } from 'react-router'
import { get } from 'lodash/object'
import getMenu from '@src/utils/getMenu'

const NavItem = Nav.Item
class DocSidebar extends React.PureComponent {
  static contextTypes = {
    locale: PropTypes.object,
    router: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    const { pathname } = location
    const arr =
      pathname.match(/.+\/([\w-]+)\/.+/) || pathname.match(/.+\/([\w-]+)$/)
    this.state = {
      mediaSidebarShow: false,
      expandedMenus: arr ? [arr[1]] : []
    }
  }

  getMenuItems() {
    const { locale } = this.context
    return getMenu(locale)
  }

  getRootPath() {
    return get(this.context.router, 'routes.0.path')
  }

  handleOpenMediaSidebarShow = () => {
    this.setState({
      mediaSidebarShow: true
    })
  }

  handleCloseMediaSidebarShow = () => {
    this.setState({
      mediaSidebarShow: false
    })
  }

  onMenuClick = id => {
    const { expandedMenus } = this.state
    this.setState({
      expandedMenus: expandedMenus.includes(id)
        ? expandedMenus.filter(i => i !== id)
        : expandedMenus.concat(id)
    })
  }

  render() {
    const { expandedMenus } = this.state
    const nodeItems = []
    const menuItems = this.getMenuItems()
    const rootPath = this.getRootPath()
    const { locale, router } = this.context
    const showMediaToggleButton = this.props.style.width !== 0
    const isActive = router.isActive
    const menu = getMenu(locale)
    const { mediaSidebarShow } = this.state
    const { name: activeTitle, icon } = menu.filter(({ id }) =>
      isActive(`${rootPath}${id}`)
    )[0]
    menuItems
      .filter(({ id }) => this.context.router.isActive(`${rootPath}${id}`))
      .map((item, key) => {
        if (item.children && item.children.length) {
          item.children.map((child, index) => {
            const pathname = child.url
              ? child.url
              : `${rootPath}${item.id}/${child.id}`
            const active = this.context.router.isActive({ pathname })
            if (child.children) {
              nodeItems.push(
                <NavItem panel key={child.id}>
                  <span className="tr-collapse-menu">
                    <Link
                      to={pathname}
                      onClick={() => this.onMenuClick(child.id)}
                    >
                      <span
                        className={classnames({
                          'focus-color': expandedMenus.includes(child.id)
                        })}
                      >
                        {child.name}
                      </span>
                    </Link>
                    {!!child.children.length && (
                      <Icon
                        className="tr-collapse-icon"
                        onClick={() => this.onMenuClick(child.id)}
                        icon={expandedMenus.includes(child.id) ? 'up' : 'down'}
                      />
                    )}
                  </span>
                </NavItem>
              )
              if (child.children.length && expandedMenus.includes(child.id)) {
                child.children.forEach((i, ix) => {
                  const showName = !i.title.match(/\./)
                  const toPath = `${pathname}/${i.id}`
                  nodeItems.push(
                    <NavItem
                      key={toPath}
                      to={toPath}
                      componentClass={Link}
                      active={location.pathname === toPath}
                      className={classnames({ 'mt-0': ix === 0 })}
                    >
                      {showName ? i.name : i.title}{' '}
                      {showName && i.title !== i.name && `(${i.title})`}
                    </NavItem>
                  )
                })
              }
              return
            }

            const title =
              get(locale, 'id') === 'en-US' || !child.title ? null : (
                <span className="title-zh">{child.title}</span>
              )

            if (child.target === '_blank' && child.url) {
              nodeItems.push(
                <NavItem key={child.id} href={child.url} target="_blank">
                  {child.name} {title}
                  <Icon icon="external-link-square" className="external-link" />
                </NavItem>
              )
            } else {
              nodeItems.push(
                <Nav.Item
                  key={child.id}
                  componentClass={Link}
                  to={pathname}
                  active={active}
                  className="overview"
                >
                  {child.name}
                  {title}
                </Nav.Item>
              )
            }
          })
        }
      })
    return (
      <Fragment>
        {showMediaToggleButton && (
          <IconButton
            className="media-toggle-side-bar"
            icon={<Icon icon="bars" />}
            onClick={this.handleOpenMediaSidebarShow}
          />
        )}
        <div
          className={classnames('rs-sidebar-wrapper fixed', {
            'media-sidebar-show': mediaSidebarShow
          })}
          onClick={this.handleCloseMediaSidebarShow}
          {...this.props}
        >
          <Sidebar>
            <IconButton
              className="media-close-side-bar-button"
              icon={<Icon icon="close" />}
              onClick={this.handleCloseMediaSidebarShow}
            />
            <div className="title-wrapper">
              {icon} {activeTitle}
            </div>
            <Nav className="nav-docs" vertical>
              {nodeItems}
            </Nav>
          </Sidebar>
        </div>
        <div
          className={classnames('rs-sidebar-media-backdrop', {
            'media-sidebar-show': mediaSidebarShow
          })}
          onClick={this.handleCloseMediaSidebarShow}
        />
      </Fragment>
    )
  }
}

export default DocSidebar
