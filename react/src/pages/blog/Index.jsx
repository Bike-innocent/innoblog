import React, { useState } from 'react';
import CategoryTab from './index/CategoryTab';
import SubcategoryTab from './index/SubcategoryTab';

function Index() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [subcategories, setSubcategories] = useState([]);

    const handleSelectCategory = (category, subcategories) => {
        setSelectedCategory(category);
        setSubcategories(subcategories || []);
    };

    return (
        <div className="m-0">
            <CategoryTab onSelectCategory={handleSelectCategory} />
            <SubcategoryTab selectedCategory={selectedCategory} subcategories={subcategories} />
        </div>
    );
}

export default Index;
