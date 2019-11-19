import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash/object'
import { Button, ButtonToolbar, FlexboxGrid, Grid, Row, Col } from 'rsuite'
import TopLevelNav from '@src/components/TopLevelNav'
import LanguageSwitchButton from '@src/components/LanguageSwitchButton'
import Logo from '@src/components/Logo'
import ReactLogo from '@src/components/ReactLogo'
import { Link } from 'react-router'
import yangshan from '../../resources/images/yangshan.jpg'

class HomePage extends React.Component {
  static contextTypes = {
    locale: PropTypes.object
  }
  constructor(props) {
    super()
    this.state = {
      running: false
    }
  }
  componentDidMount() {
    const setRunning = setTimeout(() => {
      this.home && this.setState({ running: true })
      clearTimeout(setRunning)
    }, 1.7e3)
  }

  render() {
    const { locale } = this.context
    const localePath = get(locale, 'id') === 'en-US' ? '/en/' : '/'

    return (
      <Grid
        className='page-home'
        ref={ref => {
          this.home = ref
        }}
      >
        <TopLevelNav hideToggle />

        <span className='language-switch-button-wrapper'>
          <LanguageSwitchButton
            size='lg'
            language={get(locale, 'id')}
            href={localePath}
            className='home-page'
          />
        </span>

        <Row>
          <FlexboxGrid align='middle' className='banner'>
            <FlexboxGrid.Item componentClass={Col} colspan={24} md={12}>
              <section className='section'>
                <h1 className='title'>{get(locale, 'common.name')}</h1>
                <p className='sub-title'> {get(locale, 'common.resume')}</p>
                {/* <p className='home-page-badge-wrap'>
                  <a
                    href='https://www.npmjs.com/package/rsuite'
                    target='_blank'
                  >
                    <img alt='npm' src='https://badge.fury.io/js/rsuite.svg' />
                  </a>
                  <a
                    style={{ marginLeft: 10 }}
                    href='https://github.com/rsuite/rsuite'
                    target='_blank'
                  >
                    <img
                      alt='GitHub stars'
                      src='https://img.shields.io/github/stars/rsuite/rsuite?style=social'
                    />
                  </a>
                </p> */}
                <ButtonToolbar>
                  <Button
                    size='lg'
                    appearance='primary'
                    componentClass={Link}
                    to={`${localePath}components/overview`}
                  >
                    {get(locale, 'common.gettingStarted')}
                  </Button>
                </ButtonToolbar>
              </section>
            </FlexboxGrid.Item>

            <FlexboxGrid.Item
              className='logo-react-suite-wrapper'
              componentClass={Col}
              colspan={24}
              md={12}
            >
              <div className='section logo-react-suite'>
                {/* <Logo width={120} height={138} />
                <ReactLogo running={this.state.running} /> */}
                <img src={yangshan} style={{ width: '100%' }} />
              </div>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Row>
        {/* <Row>
          <div className='footerbar'>
            <a href='http://beian.miit.gov.cn' target='_blank'>
              沪 ICP 备 12011101 号 - 10
            </a>
          </div>
        </Row> */}
      </Grid>
    )
  }
}

export default HomePage
