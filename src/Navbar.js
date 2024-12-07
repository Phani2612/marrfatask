// import React, { useEffect, useState } from 'react'
// import './Navbar.css'
// import axios from 'axios'
// import Select , { components } from 'react-select';

// function Navbar() {


//   const [Products, setProducts] = useState([])

//   const [cloneproducts, setcloneproducts] = useState([])

//   const [Searchitem, setsearchitem] = useState('')

//   const [selectedOptions, setSelectedOptions] = useState([]);

//   const [filtereditems, setfiltereditems] = useState([])

//   const options = [
//     { value: "men's clothing", label: "men's clothing" },
//     { value: 'jewelery', label: 'jewelery' },
//     { value: 'electronics', label: 'electronics' },
//     { value: "women's clothing", label: "women's clothing" },
//     { value: 'priceH', label: 'price (High to Low)' },
//     { value: 'priceL', label: 'price (Low to High)' }
//   ];

//   const CustomOption = (props) => {
//     const { data, isSelected, innerRef, innerProps } = props;
//     return (
//       <div ref={innerRef} {...innerProps} className="custom-option">
//         <input
//           type="checkbox"
//           checked={isSelected}
//           readOnly
//           style={{ marginRight: '8px' }}
//         />
//         {data.label}
//       </div>
//     );
//   };


//   const handleChange = (selected) => {
//     setSelectedOptions(selected);

//     console.log('Selected', selected)

//     if (selected.length === 0) {
//       setfiltereditems([]);
//       return;
//     }

//     const priceHighFilter = selected.some((item) => item.value === 'priceH');
//     const priceLowFilter = selected.some((item) => item.value === 'priceL');

//     if (priceHighFilter && priceLowFilter) {
//       const updatedSelection = selected.filter((item) => item.value !== 'priceL');
//       setSelectedOptions(updatedSelection); // Update state with only "priceH"

//       if (filtereditems && filtereditems.length > 0) {
//         hightolow(filtereditems); // Apply high to low sorting
//       }

//       else {
//         hightolow(cloneproducts); // Apply high to low sorting
//       }
//       return;
//     }


//     if (priceHighFilter) {
//       const filteredData = cloneproducts.filter((item) =>
//         selected.some((i) => i.value === item.category)
//       );


//       if (filteredData.length == 0) {
//         hightolow(cloneproducts)
//       }

//       hightolow(filteredData);  // Apply high to low sorting
//       return;
//     }

//     if (priceLowFilter) {
//       const filteredData = cloneproducts.filter((item) =>
//         selected.some((i) => i.value === item.category)
//       );

//       if (filteredData.length == 0) {
//         lowtohigh(cloneproducts)
//       }



//       lowtohigh(filteredData);  // Apply low to high sorting
//       return;
//     }

//     const filteredData = cloneproducts.filter((item) =>
//       selected.some((i) => {


//         return i.value === item.category
//       })
//     );


//     setfiltereditems(filteredData)

//   };



//   let hightolow = (data) => {

//     const hightolow = data.sort((a, b) => {

//       return b.price - a.price
//     })



//     setfiltereditems(hightolow)

//     return true
//   }



//   let lowtohigh = (data) => {

//     const lowtohigh = data.sort((a, b) => {

//       return a.price - b.price
//     })



//     setfiltereditems(lowtohigh)

//     return true
//   }






//   useEffect(() => {


//     const GetProducts = async () => {

//       try {
//         const response = await axios.get('https://fakestoreapi.com/products')

//         setProducts(response.data)

//         setcloneproducts(response.data)
//       }

//       catch (error) {
//         console.log(error)
//       }

//     }


//     GetProducts()



//   }, [])




//   const filteredinfo = cloneproducts.filter((item) => {


//     const searchLower = Searchitem.toLowerCase();




//     return (
//       item.title.toLowerCase().includes(searchLower) ||
//       item.description.toLowerCase().includes(searchLower) ||
//       item.category.toLowerCase().includes(searchLower) ||
//       item.price.toString().includes(searchLower)
//     );

//   })


//   useEffect(() => {


//     setfiltereditems(filteredinfo)

//   }, [Searchitem])




//   return (
//     <div>
//       <nav class="navbar navbar-dark bg-dark"  >
//         <div className='search-con'  >
//           <form class="form-inline my-2 my-lg-0" className='form-con' >
//             <input class="form-control mr-sm-2" type="search" placeholder="Search" id='search-bar' onChange={(e) => setsearchitem(e.target.value)} />
//           </form>
//         </div>


//       </nav>

//       <div className="multi-select">
//       <Select
//         options={options}
//         isMulti
//         value={selectedOptions}
//         onChange={handleChange}
//         placeholder="Select your filters"
//         components={{ Option: CustomOption }}
//         className="custom-multi-select"
//       />
//     </div>



//       <div className="product-container">
//         {(filtereditems.length != 0 ? filtereditems : Products).map((item) => (
//           <div className="product-item" key={item.id}>
//             <img src={item.image} alt={item.title} id="product-image" />
//             <h3>{item.title}</h3>
//             <p>{item.description}</p>
//             <h5>${item.price}</h5>
//           </div>
//         ))}
//       </div>




//     </div>
//   )
// }

// export default Navbar











import React, { useEffect, useState } from 'react'
import './Navbar.css'
import axios from 'axios'
import Select, { components } from 'react-select';

function Navbar() {


  const [Products, setProducts] = useState([])

  const [cloneproducts, setcloneproducts] = useState([])

  const [Searchitem, setsearchitem] = useState('')

  const [selectedOptions, setSelectedOptions] = useState([]);

  const [filtereditems, setfiltereditems] = useState([])
  const [duplicate, setduplicate] = useState([]); // Duplicate copy of filtered data


  const options = [
    { value: "men's clothing", label: "men's clothing" },
    { value: 'jewelery', label: 'jewelery' },
    { value: 'electronics', label: 'electronics' },
    { value: "women's clothing", label: "women's clothing" },
    { value: 'priceH', label: 'price (High to Low)' },
    { value: 'priceL', label: 'price (Low to High)' }
  ];

  const CustomOption = (props) => {
    const { data, isSelected, innerRef, innerProps } = props;
    return (
      <div ref={innerRef} {...innerProps} className="custom-option">
        <input
          type="checkbox"
          checked={isSelected}
          readOnly
          style={{ marginRight: '8px' }}
        />
        {data.label}
      </div>
    );
  };


  const handleChange = (selected) => {
    setSelectedOptions(selected);


    if (selected.length === 0) {
      setfiltereditems([]);
      setduplicate([])
      return;
    }

    const priceHighFilter = selected.some((item) => item.value === 'priceH');
    const priceLowFilter = selected.some((item) => item.value === 'priceL');

    if (priceHighFilter && priceLowFilter) {
      const updatedSelection = selected.filter((item) => item.value !== 'priceL');
      setSelectedOptions(updatedSelection); //it will Update state with only "priceH"

      if (filtereditems && filtereditems.length > 0) {
        hightolow(filtereditems); // it Apply high to low sorting
      }

      else {
        hightolow(cloneproducts); //it  Apply high to low sorting
      }
      return;
    }



    if (priceHighFilter) {
      const filteredData = cloneproducts.filter((item) =>
        selected.some((i) => i.value === item.category)
      );

      if (filteredData.length === 0 && !Searchitem) {
        hightolow(cloneproducts);
        return;
      }

      setfiltereditems((prevItems) => {
        // Remove deselected categories from previous items
        const updatedItems = prevItems.filter((item) =>
          selected.some((i) => i.value === item.category)
        );

        if (updatedItems.length === 0) {

          hightolow(filtereditems); // Sort and display the previously filtered items
          return filtereditems;
        }

        // Merge the updated items with the new filtered data
        const newItems = [...new Set([...updatedItems, ...filteredData])];

        // Apply high-to-low sorting after updating state
        hightolow(newItems);
        return newItems;
      });



      hightolow(filteredData); // Apply high to low sorting
      return;
    }






    // Handle "priceLowFilter"
    if (priceLowFilter) {
      const filteredData = cloneproducts.filter((item) =>
        selected.some((i) => i.value === item.category)
      );

      if (filteredData.length === 0 && !Searchitem) {
        lowtohigh(cloneproducts);
        return;
      }

      setfiltereditems((prevItems) => {
        // Remove deselected categories from previous items
        const updatedItems = prevItems.filter((item) =>
          selected.some((i) => i.value === item.category)
        );

        if (updatedItems.length === 0) {

          lowtohigh(filtereditems); // Sort and display the previously filtered items
          return filtereditems;
        }


        // Merge the updated items with the new filtered data
        const newItems = [...new Set([...updatedItems, ...filteredData])];

        // Apply low-to-high sorting after updating state
        lowtohigh(newItems);
        return newItems;
      });



      lowtohigh(filteredData); // Apply low to high sorting
      return;
    }

    const filteredData = cloneproducts.filter((item) =>
      selected.some((i) => {


        return i.value === item.category
      })
    );




    setduplicate((prevDuplicate) => {
      const updatedDuplicate = [...new Set([...prevDuplicate, ...filteredData])];
      return updatedDuplicate;
    });



    setfiltereditems((prevItems) => {
      const updatedItems = prevItems.filter((item) =>
        selected.some((i) => i.value === item.category)
      );
      const newItems = [...new Set([...updatedItems, ...filteredData])];
      return newItems;
    });

  };








  let hightolow = (data) => {

    const hightolow = [...data].sort((a, b) => {

      return b.price - a.price
    })



    setfiltereditems(hightolow)

    return true
  }



  let lowtohigh = (data) => {

    const lowtohigh = [...data].sort((a, b) => {

      return a.price - b.price
    })



    setfiltereditems(lowtohigh)

    return true
  }






  useEffect(() => {


    const GetProducts = async () => {

      try {
        const response = await axios.get('https://fakestoreapi.com/products')

        setProducts(response.data)

        setcloneproducts(response.data)
      }

      catch (error) {
        console.log(error)
      }

    }


    GetProducts()



  }, [])




  const filteredinfo = cloneproducts.filter((item) => {


    const searchLower = Searchitem.toLowerCase();




    return (
      item.title.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower) ||
      item.category.toLowerCase().includes(searchLower) ||
      item.price.toString().includes(searchLower)
    );

  })


  useEffect(() => {

    if (!Searchitem) {

      setSelectedOptions([])


    }


    setfiltereditems(filteredinfo)


  }, [Searchitem])


  console.log(duplicate)


  return (
    <div>
      <nav class="navbar navbar-dark bg-dark"  >
        <div className='search-con'  >
          <form class="form-inline my-2 my-lg-0" className='form-con' >
            <input class="form-control mr-sm-2" type="search" placeholder="Search" id='search-bar' onChange={(e) => setsearchitem(e.target.value)} />
          </form>
        </div>


      </nav>

      <div className="multi-select">
        <Select
          options={options}
          isMulti
          value={selectedOptions}
          onChange={handleChange}
          placeholder="Select your filters"
          components={{ Option: CustomOption }}
          className="custom-multi-select"
        />
      </div>



      <div className="product-container">
        {(filtereditems.length != 0 ? filtereditems : Products).map((item) => (
          <div className="product-item" key={item.id}>
            <img src={item.image} alt={item.title} id="product-image" />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <h5>${item.price}</h5>
          </div>
        ))}
      </div>




    </div>
  )
}

export default Navbar

























