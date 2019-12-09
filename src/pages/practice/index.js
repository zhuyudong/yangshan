import React from 'react'
import Frame from '@src/components/Frame'
import PageContainer from '@src/components/PageContainer'

export default locale => {
  return () => {
    return (
      <Frame showSubmenu={false}>
        <PageContainer routerId="practice">
          <div>业务组件</div>
        </PageContainer>
      </Frame>
    )
  }
}
