import React, { useState } from 'react';

import SubcategoryTab from '../blog/index/SubcategoryTab';
import CategoryTab from '../blog/index/CategoryTab';


function Index() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className='m-0'>
        
        <CategoryTab onSelectCategory={setSelectedCategory} />
  

     
        <SubcategoryTab selectedCategory={selectedCategory} />
    

     
  
    </div>
  );
}

export default Index;
