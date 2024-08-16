
// import React from "react";
// import { Editor } from "@tinymce/tinymce-react";

// function Dashboard() {
//   const handleEditorChange = (content) => {
//     console.log("Content was updated:", content);
//   };

//   return (
//     <Editor
//       initialValue="<p>This is the initial content of the editor</p>"
//  apiKey='umd1w4jjnwidj0f2hnqciepoog33gbugqf64ebnc3jjo4yoy'
//     //   init={{
//     //     height: 500,
//     //     menubar: false,
//     //     plugins: [
//     //       "advlist autolink lists link image charmap print preview anchor",
//     //       "searchreplace visualblocks code fullscreen",
//     //       "insertdatetime media table paste code help wordcount",
//     //     ],
//     //     toolbar:
//     //       "undo redo | formatselect | bold italic backcolor | \
//     //       alignleft aligncenter alignright alignjustify | \
//     //       bullist numlist outdent indent | removeformat | help",
//     //   }}
//       init={{
//                 plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate  mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
//                 toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
//                 tinycomments_mode: 'embedded',
//                 tinycomments_author: 'Author name',
//                 mergetags_list: [
//                   { value: 'First.Name', title: 'First Name' },
//                   { value: 'Email', title: 'Email' },
//                 ],
//                 ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
//               }}
//       onEditorChange={handleEditorChange}
//     />
//   );
// }

// export default Dashboard;
import React, { useRef } from 'react';
import { Tab } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../axiosInstance'; // Adjust the path according to your project structure

// Function to fetch categories
const fetchCategories = async () => {
  const response = await axiosInstance.get('/categories');
  return response.data;
};

const Dashboard = ({ onSelectCategory }) => {
  const tabListRef = useRef(null);

  // Use React Query to fetch categories
  const { data: categories = [], isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const handleCategorySelect = async (category) => {
    if (!category) {
      onSelectCategory(null, []);
      return;
    }

    try {
      const response = await axiosInstance.get(`/categories/${category.slug}/subcategories`);
      onSelectCategory(category.slug, response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      onSelectCategory(category.slug, []);
    }
  };

  if (isLoading) {
    return <div></div>; // You can replace this with a loader component
  }

  if (error) {
    return <div>Error loading categories.</div>;
  }

  return (
  
   <div className='container'>
      <div className=""> {/* Keep overflow-hidden here to prevent page overflow */}
        <Tab.Group>
          <Tab.List
            ref={tabListRef}
            className="overflow-hidden flex my-width"
         
          >
            <Tab>
              {({ selected }) => (
                <div
                  onClick={() => handleCategorySelect(null)}
                  className={` px-3 py-2 cursor-pointer ${selected ? 'border-b-2 border-blue-500 text-blue-500 font-bold' : ''}`}
                >
                  All
                </div>
              )}
            </Tab>
            {categories.map((category) => (
              <Tab key={category.id}>
                {({ selected }) => (
                  <div
                    onClick={() => handleCategorySelect(category)}
                    className={` focus:outline-none px-3 py-2 cursor-pointer ${selected ? 'border-b-2 border-blue-500 text-blue-500 focus:outline-none font-bold' : ' outline-none focus:outline-none border-none'}`}
                  >
                    {category.name}
                  </div>
                )}
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>
      </div>
      </div>
   
  );
};

export default Dashboard;
