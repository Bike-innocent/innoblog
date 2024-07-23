import React from 'react'
import HeaderSection from './index/HeaderSection'
import MixedCategorySection from './index/MixedCategorySection'
import SportSection from './index/SportSection'
import BusinessSection from './index/BusinessSection'

function Index() {
  return (
    <div>
      <HeaderSection/>
      <MixedCategorySection/>
      <SportSection/>
      <BusinessSection/>
    </div>
  )
}

export default Index
