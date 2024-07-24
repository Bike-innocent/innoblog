import React from 'react'
import HeaderSection from './index/HeaderSection'
import MixedCategorySection from './index/MixedCategorySection'
import SportSection from './index/SportSection'
import BusinessSection from './index/BusinessSection'
import TechnologySection from './index/TechnologySection'

function Index() {
  return (
    <div className='m-0'>
      <HeaderSection/>
      <MixedCategorySection/>
      <SportSection/>
      <BusinessSection/>
      <TechnologySection/>
    </div>
  )
}

export default Index
