import React from 'react'
import { Row, Col, Panel } from 'rsuite'
import Frame from '@src/components/Frame'
import PageContainer from '@src/components/PageContainer'
import sources from './sources'

export default () => {
  console.log(8)
  return () => (
    <Frame showSubmenu={false}>
      <PageContainer routerId="tools">
        <Row>
          {sources.map((i, ix) => (
            <Col
              key={i.title + ix}
              md={6}
              sm={12}
              className="opensource-card-col"
            >
              <a
                href={i.href}
                target="__blank"
                className="opensource-card-href"
              >
                <Panel bodyFill bordered className="opensource-card">
                  {i.image && <img src={i.image} width="100%" />}
                  <Panel
                    header={
                      i.icon ? (
                        <span>
                          {/* <img src={i.icon} /> */}
                          <span className="opensource-card-title">
                            {i.title}
                          </span>
                        </span>
                      ) : (
                        i.title
                      )
                    }
                  >
                    <p>
                      <small>{i.description}</small>
                    </p>
                  </Panel>
                </Panel>
              </a>
            </Col>
          ))}
        </Row>
      </PageContainer>
    </Frame>
  )
}
