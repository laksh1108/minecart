import React, { useEffect, useState } from 'react'
import { Offcanvas,Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Cart = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState(false);
  const navigate = useNavigate();

  const email = localStorage.getItem('email');
  const updated = email.replace('@gmail.com', '');


  const remover = async (id) => {
    try {
      await fetch(`https://crudcrud.com/api/7aa15b73edde4e49a9dfcce70c22802f/${updated}/${id}`, {
        method: 'DELETE',
      });
      setCartItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://crudcrud.com/api/7aa15b73edde4e49a9dfcce70c22802f/${updated}`);
        const data = await res.json();
        setCartItems(data);
        const count = data.reduce((acc, item) => acc + item.quantity * item.price, 0);
        setTotal(count);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
    setCart(true);
  }, [remover]);

  const handleClose = () => {
    setCart(false);
    navigate('/list');
  };

  


  return (
    <>
    <Offcanvas  show={cart} onHide={handleClose} placement="end">
       <Offcanvas.Header closeButton>
         <Offcanvas.Title className='fs-3 fw-bolder m-auto'>CART ITEMS</Offcanvas.Title>
       </Offcanvas.Header>
       <Offcanvas.Body className='w-100 '>
          <table class="table table-borderless">
             <thead>
               <tr>
                 <th scope="col" className='text-center'>Item</th>
                 <th scope="col">Price</th>
                 <th scope="col">Quantity</th>
               </tr>
             </thead>
             <tbody>
             {cartItems.map((i,index)=>(
               <tr >   
                 <td className='d-flex '>
                   <img src={i.img1} alt="" width='50px' height='50px' />
                   <div>{i.name}</div>
                 </td>
                 <td >{i.price}</td>
                 <td className='text-center'>
                   <div>{i.quantity}</div>
                   
                 </td>
                 <td >        
                 <button  className='but' onClick={() => remover(i._id)}>X</button>
                 </td>
               </tr>
                ))}
             </tbody>
           </table>     
         <div className='w-100 text-end mt-1 fw-bolder'>Total:{total} </div>
         <Button className='mt-5 w-100'>Purchase</Button>      
       </Offcanvas.Body>    
     </Offcanvas>
   </>
 )
}
export default Cart;
