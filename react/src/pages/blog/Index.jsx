import React, { useState } from 'react';
import CategoryTab from './index/CategoryTab';
import SubcategoryTab from './index/SubcategoryTab';






function Index() {
    const [selectedCategory, setSelectedCategory] = useState(null);

    return (
      <div className='m-0'>
          
          <CategoryTab onSelectCategory={setSelectedCategory} />
    
  
       
          <SubcategoryTab selectedCategory={selectedCategory} />
      
     

    </div>
  )
}

export default Index
